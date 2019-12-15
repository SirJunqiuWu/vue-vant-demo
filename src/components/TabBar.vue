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
        @click="clickTab(index, item)"
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
  export default {
    name: "TabBar",
    props:{
      // 数据双向绑定
      index:{
        type:Number,
        require:false,
        default:0,
        validator:(value) => {
          return true;
        }
      }
    },
    data() {
      return {
        active: 0,
        tabBars: [
          {
            routerName: "home",
            title: "首页",
            icon:'wap-home'
          },
          {
            routerName: "shopping-mall",
            title: "商城",
            icon:'goods-collect'
          },
          {
            routerName: "cart",
            title: "购物车",
            icon:'wap-home'
          },
          {
            routerName: "message",
            title: "消息",
            icon:"chat"
          },
          {
            routerName: "my",
            title: "我的",
            icon:"manager"
          }
        ]
      };
    },
    methods: {
      clickTab(index, item) {
        window.console.log('selectedIndex:', index);
        this.$forceUpdate();
        if (item.clickUrl) {
          // 如果存在点击链接
          window.location.href = item.clickUrl;
          return;
        }
        if (item.routerName) {
          // 无点击链接 进路由
          this.$router.push(item.routerName);
        }
      }
    },
    watch:{
      index:{
        handler:function(val, oldVal) {
          window.console.log('old:', oldVal, 'new:', val);
          this.active = this.index;
        },
        immediate:true,
        deep:true
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