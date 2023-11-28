<template>
    <div>
        <div class="beach_header"><h2>해수욕장 방사능</h2></div>
        <div class="update_font" v-show="time != undefined">{{ time }}</div>
        <div class="choice_box col-sm-12">
            <div v-if="Center.length === 0">데이터가 없습니다.</div>
            <div class="card col-4"  v-for="(item, index) in Center" :key="index">
                <img :src="item.po" :alt="item.beachName" class="photo-img">
                <div class="card-body content_card">
                    <h5>{{ item.beachName }}</h5>
                    <img v-if="item.cesium == '안전'" src="../assets/safe.png" alt="" class="safe-img">
                </div>
            </div>
        </div>
        <div>
            <div v-if="BeachData.length === 0"></div>
            <transition name="fade">
                <table class="table" v-if="!btn">
                    <thead>
                        <tr>
                            <th scope="col">num</th>
                            <th scope="col">해수욕장</th>
                            <th scope="col">검사 날짜</th>
                            <th scope="col">결과</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in BeachData" :key="index">
                            <th scope="row">{{ item.num }}</th>
                            <td>{{ item.beachName }}</td>
                            <td>{{ item.updateDate }}</td>
                            <td><div class="circle" v-if="item.cesium == '안전'"></div></td>
                        </tr>
                    </tbody>
                </table>
            </transition>
            <button class="more-btn col-12" type="button" value="button" @click="click(!btn)">{{ font }}
                <img :src="imgUrl" alt="">
            </button>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import xml2js from 'xml2js';
  
  export default {
    name: 'BeachData',

    data() {
      return {
        BeachData: [],
        Center: [],
        Number : [],
        btn : true,
        font : '더보기',
        imgUrl : require('/src/assets/Vector.png'),
        time : '',
      };
    },
    created() {
      const photo = [require('/src/assets/gyengpo.png'),require('/src/assets/gwanganri.png'), 
      require('/src/assets/daechun.png'),require('/src/assets/manripo.png'), require('/src/assets/byeonsan.png'), 
      require('/src/assets/bosung.png'), require('/src/assets/sangju.png'), require('/src/assets/sunudo.png'),
      require('/src/assets/sockcho.png'), require('/src/assets/sinzi.png'), require('/src/assets/youngil.png'), 
      require('/src/assets/eulwang.png'), require('/src/assets/ilsan.png'), require('/src/assets/janggyeng.png'), 
      require('/src/assets/jangsa.png'), require('/src/assets/joongmoon.png'), require('/src/assets/jinha.png'), 
      require('/src/assets/hakdong.png'), require('/src/assets/hamduck.png'), require('/src/assets/haeundae.png')];  
      const xmlUrl = 'https://apis.data.go.kr/1192000/marineRadiationSafetyBeachInfoService/marineRadiationSafetyBeachInfoService?serviceKey=AEalJHPrNuO5QG23vN1vO1c%2BwntDx7lezVS8EET8BwLDRWN%2BhFa1qMPsYn%2Fi%2FAmatNAsMy3BWZQva7V%2BGirlaA%3D%3D';
      axios
        .get(xmlUrl)
        .then((xmlLink) => {
          const xmlData = xmlLink.data;
          const parser = new xml2js.Parser();
          parser.parseString(xmlData, (err, result) => {
            if (err) {
              console.error('XML 파싱 오류:', err);
            } else {
              // 데이터 변수에 담아놓기
              let num = 0;
              const dataItems = result.response.body[0].items[0].item.map((item) => ({
                num : ++num,
                updateDate: item.updateDate[0],
                beachName: item.beachName[0],
                cesium: item.cesium[0],
                tritium: item.tritium[0],
                po : photo[num - 1]
              }));
              this.BeachData = dataItems;
              this.time = dataItems[0].updateDate != undefined ? dataItems[0].updateDate + '일 기준' : 'not';
              let i = 0;
              while (i <= 2) {
                let num1 = Math.floor(Math.random() * dataItems.length);
                if(this.Number.indexOf(num1)==-1){
                    this.Number.push(num1);
                    this.Center.push(dataItems[num1]);
                    i++;
                }
              }
              
            }
          });
        })
        .catch((error) => {
          console.error('XML 데이터 가져오기 오류:', error);
        });
    },
    methods: {
        click(data){
            this.btn = data;
            this.font = this.btn ? '더보기' : '접기';
            this.imgUrl = this.btn ? require('/src/assets/Vector.png') : require('/src/assets/ReverseVector.png');
           
        },
    },
  };
  </script>
<style>

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    transform: scaleY(0);
    transition: .3s;
}
.beach_header{
    text-align: center;
    font-weight: bold;
    margin: 30px 0;
}
.beach_header > h2{
    padding:20px 0;
}
.update_font{
    font-size: 0.8em;
    color:#bababa;
    font-weight: bold;
}
.choice_box{
    display: flex;
    justify-content: center;
}
.table{
    transform-origin: top;
    transition: transform .4s ease-in-out;
}
.box{
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 320px;
    border: solid 3px #DADADA;
    align-items: center;
}
.box > img{
    display: block;
}
.photo-img{
    width: 90%;
    height: 65%;
}
.box > h2{
    text-align: center;
    font-size: 1.5em;
}
.more-btn{
    height: 50px;
    display: block;
    background-color: #eee;
    border: none;
    border-radius: 0 0 5px 5px;
}
.more-btn:hover{
    cursor: pointer;
}
.card{
    padding: 10px 0;
}
.content_card{
    text-align: center;
}
.safe-img{
    width:50px;
    height: 50px;
}
.circle{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0EC33B;
}
@media (max-width: 768px) {
    
  }
</style>