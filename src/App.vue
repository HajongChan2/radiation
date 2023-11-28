<template>
  <div>
    <header @click="headerClicked">
      <nav-bar class="col-12 gnb"></nav-bar>
    </header>

    <div id="container" class="col-sm-10">
      <div class="col-12 top-box">
        <BeachData />
      </div>
      <div class="content col-sm-12">
        <img src="./assets/map_img.png" alt="" class="korea-map col-12">
        <div class="btn-group data-btn" role="group" aria-label="Basic radio toggle button group">
          <input @click="toggleButton(true)" type="radio" class="btn-check" name="btnradio" id="btnradio1"
            autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="btnradio1">세슘137</label>

          <input @click="toggleButton(false)" type="radio" class="btn-check" name="btnradio" id="btnradio2"
            autocomplete="off">
          <label class="btn btn-outline-primary" for="btnradio2">삼중수소</label>
        </div>
        <div v-if="this.status" class="ct-data col-12">
          <cesium-data :cesiumData="cesiumData" />
        </div>
        <div v-if="!this.status" class="ct-data col-12">
          <tritium-data :tritiumData="tritiumData" />
        </div>
        <content-bottom />
      </div>
      <user-comment></user-comment>
    </div>
    <footer>
      <footer-content />
    </footer>
  </div>
</template>
<script>
import CesiumData from './components/CesiumData.vue';
import TritiumData from './components/TritiumData.vue';
import NavBar from './components/NavBar.vue';
import MyData from './js/MyData.js';
import BeachData from './components/Beach.vue'
import ContentBottom from './components/ContentBottom.vue'
import { ContentScroll } from './js/ContentScroll.js';
import FooterContent from './components/FooterContent.vue';
import UserComment from './components/UserComment.vue';

export default {
  components: {
    CesiumData,
    TritiumData,
    NavBar,
    BeachData,
    ContentBottom,
    UserComment,
    FooterContent,

  },
  mixins: [MyData],

  data() {
    return {
      cesiumData: [],
      tritiumData: [],
      status: true,
      scrollPostion: 0,
    };
  },
  methods: {
    toggleButton: function (data) {
      this.status = data;
    },
    headerClicked(e) {
      const textContent = e.target.innerText;
      const offsetTop = ContentScroll(textContent);

      window.scrollTo({
        top: offsetTop - 70,
        behavior: 'smooth',
      });
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap');

body {
  background: linear-gradient(to left, #c9d7ff, #f5f5f5) !important;
  position: relative;
}
body::after{
  content: "";
  opacity: 0.5;
  position: absolute;
}

* {
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
  font-family: 'IBM Plex Sans KR' !important;
  color: #333;
  list-style: none;

}

.gnb {
  position: fixed;
  top: 0;
  z-index: 3;

}

#container {
  margin: 0 auto;
  padding: 0 10px 150px 10px;
  background-color: #fff;
  max-width: 1280px;
  border-radius: 50px;
}

.content {
  position: relative;
  background-color: #3A8FDD;
  height: 100%;
  margin-top: 100px;
  padding-bottom: 200px;
}

.data-btn {
  position: absolute !important;
  left: 0;
  top: 0;
  z-index: 2;
}

.ct-data {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.korea-map {
  height: 100%;
}

.data-btn {
  background-color: #fff;
}

.top-box {
  margin-top: 100px;
}
</style>