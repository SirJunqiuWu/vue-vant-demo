<!-- 导航栏封装 -->
<template>
 <div id="navBar">
   <van-nav-bar
     :title="title"
     :left-arrow="showLeft"
     fixd
     @click-left="onClickLeft" />
 </div>
</template>

<script>
  import Vue from 'vue';
  import {NavBar} from 'vant';
  Vue.use(NavBar);
  export default {
    name: "NavBar",
    props:{
      title:String,
      showLeft:Boolean,
    },
    data(){
      return {

      }
    },
    methods:{
      onClickLeft() {
        window.console.log('返回按钮点击');
        this.$router.back();
      }
    },
  }
</script>

<style scoped>
  #navBar {
    /*position: fixed;*/
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

</style>