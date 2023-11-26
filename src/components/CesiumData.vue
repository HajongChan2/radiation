<template>
  <div>  
    <div v-if="cesiumData.length == 0">데이터가 없습니다.</div>
    <div v-for="(item, index) in cesiumData" :key="index" :class="[$style['class' + item.num]]">
      <img v-if="item.value < 0.1" src="../assets/safe.png" alt="">
      <h3>{{ item.part }}</h3> 
      <p>{{ parseFloat(item.value).toFixed(3) }}</p> 
      
        
    </div>
  </div>
</template>
<script>
  export default {
    props: ['cesiumData'],
  };
</script>

<style lang="scss" module>
@import '../css/main.module.scss';

</style>
