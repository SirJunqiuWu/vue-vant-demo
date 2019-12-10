<template>
  <div id="tabBar">
    <router-view />
    <van-tabbar
      v-model="active"
      route
      safe-area-inset-bottom
      @change="onchange"
    >
      <van-tabbar-item
        icon="wap-home"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" info="5">购物车</van-tabbar-item>
      <van-tabbar-item icon="bag" dot>商城</van-tabbar-item>
      <van-tabbar-item icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tabbar, TabbarItem } from 'vant';
  Vue.use(Tabbar).use(TabbarItem);
  export default {
    name: "TabBar",
    data(){
      return {
        active:0,
      }
    },
    mounted() {

    },
    methods:{
      onchange(index) {
        this.active = index;
      }
    }
  }
</script>

<style scoped>

</style>