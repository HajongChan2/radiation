import axios from 'axios';
import xml2js from 'xml2js';

export default {
  created() {
    const xmlUrl =
      'https://apis.data.go.kr/1192000/service/marineRadiationSafetyRegionInfoService/marineRadiationSafetyRegionInfoService?serviceKey=AEalJHPrNuO5QG23vN1vO1c%2BwntDx7lezVS8EET8BwLDRWN%2BhFa1qMPsYn%2Fi%2FAmatNAsMy3BWZQva7V%2BGirlaA%3D%3D&pageNo=1&numOfRows=18';
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
            const dataItems = result.response.body[0].items[0].item.map((item) => ({
              num: item.num[0],
              type: item.type[0],
              part: item.part[0],
              rdosExmnYr: item.rdosExmnYr[0],
              rdosExmnMo: item.rdosExmnMo[0],
              estnm: item.estnm[0],
              value: parseFloat(item.value[0]).toFixed(6),
            }));
            this.cesiumData = dataItems.filter(item => item.type === '세슘137');
            this.tritiumData = dataItems.filter(item => item.type === '삼중수소');
          }
        });
      })
      .catch((error) => {
        console.error('XML 데이터 가져오기 오류:', error);
      });
  },
};
