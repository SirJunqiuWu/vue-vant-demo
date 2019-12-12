<!-- 导航栏封装 -->
<template>
   <van-nav-bar
     id="navBar"
     :title="title"
     :left-arrow="showLeft"
     @click-left="onClickLeft"
   />
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

<style lang="less">
  @import "../styles/px2rem.less";
  #navBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

</style>