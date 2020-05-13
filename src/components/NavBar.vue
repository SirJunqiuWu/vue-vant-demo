<!-- 导航栏封装 -->
<template>
   <van-nav-bar
     id="navBar"
     border
     :title="title"
     :left-arrow="showLeft"
     @click-left="onClickLeft"
     @click-right="onClickRight"
   >
      <template #right v-show="showRight">
         <van-icon :name="rightIcon" size="18" />
      </template>
   </van-nav-bar>
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
      showRight:Boolean,
       rightIcon:String,
    },
    data(){
      return {

      }
    },
    methods:{
      onClickLeft() {
        window.console.log('返回按钮点击');
        this.$router.back();
      },
       onClickRight() {
          window.console.log('右侧按钮点击');
         this.$emit('onClickRight');
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