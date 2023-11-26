<template>
    <div :class="$style.bottom" class="col-sm-8">
        <div :class="$style.content">
            <div :class="$style.circle"></div>
            <p :class="$style.font">세슘 : 0.1Bq/L 이하</p>
        </div>
        <div :class="$style.content">
            <div :class="$style.circle"></div>
            <p :class="$style.font">삼중수소 : 0.1Bq/L 이하</p> 
        </div>
            
               
        
        
    </div>
</template>
<script>
    export default {
        props: ['ContentBottom'],
    };
</script>

<style lang="scss" module>
@import '../css/contentBottom.module.scss';
</style>