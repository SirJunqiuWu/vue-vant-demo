<!-- 导航栏封装 -->
<template>
   <van-nav-bar
     id="navBar"
     border
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
  .van-nav-bar {
     position: relative !important;
     border: none !important;
     height: 1.1rem;
     line-height: 1.1rem;
     background: white;
  }

</style>