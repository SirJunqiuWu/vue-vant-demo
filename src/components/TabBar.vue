<template>
    <van-tabbar
      id="tabBar"
      v-model="active"
      fixed
    >
      <van-tabbar-item
        v-for="(item, index) in tabBars"
        replace
        route
        :to="item.to"
        :key="index"
        :icon="item.icon"
        safe-area-inset-bottom
        @click="tab(index, item.name)"
      >
        {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
</template>

<script>
  import Vue from 'vue';
  import {utils} from "../utils/utils";
  import { Tabbar, TabbarItem } from 'vant';
  Vue.use(Tabbar).use(TabbarItem);

  const key = 'tabIndex';
  window.console.log('tabIndex-----------:', utils.getLocalStorage('tabIndex').valueOf());
  export default {
    name: "TabBar",
    data() {
      return {
        active: Number(utils.getLocalStorage('tabIndex')),
        tabBars: [
          {
            name: "home",
            title: "首页",
            icon:'wap-home'
          },
          {
            name: "shopping-mall",
            title: "商城",
            icon:'goods-collect'
          },
          {
            name: "cart",
            title: "购物车",
            icon:'wap-home'
          },
          {
            name: "message",
            title: "消息",
            icon:"chat"
          },
          {
            name: "my",
            title: "我的",
            icon:"manager"
          }
        ]
      };
    },
    methods: {
      tab(index, val) {
        window.console.log('val:', index);
        utils.setLocalStorage('tabIndex', index);
        this.active = index;
        this.$router.push(val);
      }
    }
  };
</script>

<!-- 样式 -->
<style scoped lang="less">
  @import "../styles/px2rem.less";
  #tabBar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }


</style>