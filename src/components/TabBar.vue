<template>
  <div class="content">
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in tabBars"
        :key="index"
        :icon="item.icon"
        @click="tab(index, item.name)"
      >
        {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {setStoregeItem, getStoregeItem} from "../utils/utils";
  import { Tabbar, TabbarItem } from 'vant';
  Vue.use(Tabbar).use(TabbarItem);

  const key = 'tabIndex';
  export default {
    name: "TabBar",
    data() {
      return {
        active: getStoregeItem(key) ? getStoregeItem(key) : 0,
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
        setStoregeItem(key, index);
        this.active = index;
        this.$router.push(val);
      }
    }
  };
</script>

<!-- 样式 -->
<style scoped>

</style>