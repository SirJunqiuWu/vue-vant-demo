<template>
  <page :has-header="showNav" :has-footer="true">

    <!-- 头部 -->
    <template slot="header">
      <NavBar  title="首页" :show-left="false" />
    </template>

    <!-- 内容区 -->
    <template slot="content">
      <van-pull-refresh
        v-model="isLoading"
        pulling-text="下拉刷新"
        loosing-text="松手即可刷新"
        loading-text="正在努力的刷新"
        @refresh="onRefresh"
      >
        <!-- 轮播 -->
        <van-swipe
          :autoplay="3000"
          :height="bannerHeight"
          indicator-color="#F08080"
          @change="onchange"
        >
          <van-swipe-item
            v-for="(item, index) in banners"
            :key="index"
            @click="bannerClick(index, item)"
          >
            <img
              v-lazy="item.image"
              :height="bannerHeight"
            />
          </van-swipe-item>
        </van-swipe>

        <!-- 列表 -->
        <van-list
          v-model="isLoading"
          :finished="finished"
          :offset="400"
          finished-text="————— 我是有底线的 ——————"
          @load="onLoad"
        >
          <li
            class="list-cell"
            v-for="(item, index) in dataArray"
            :key="index"
          >
            <van-image
              class="goods-image"
              :src="item.image"
              lazy-load
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20">加载中...</van-loading>
              </template>
              <template v-slot:error>加载失败</template>
            </van-image>
          </li>

        </van-list>
      </van-pull-refresh>

    </template>

    <!-- 底部 -->
    <template slot="footer">
      <TabBar />
    </template>

  </page>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import {isWeChat} from "../../utils/utils";
  import Vue from 'vue';
  import { Swipe, SwipeItem, Lazyload, PullRefresh, Toast, List, Cell, Image } from 'vant';
  Vue.use(Swipe).use(SwipeItem).use(Lazyload).use(PullRefresh).use(Toast).use(List).use(Cell).use(Image);

  export default {
    name: "HomePage",
    components:{
      TabBar,
      NavBar,
    },
    data(){
      return {
        showNav:!isWeChat(),
        bannerHeight:window.document.documentElement.clientWidth * 360 / 802,
        banners:[
          {
            image:'https://img12.360buyimg.com/da/jfs/t1/96135/2/5916/125798/5df0ac8bEff4965d6/50652d43920450c7.jpg!q80.webp',
            clickUrl:''
          },
          {
            image:'https://img11.360buyimg.com/da/jfs/t1/85756/33/6145/98805/5df18cecE5573006d/c1f5655b21b9f357.jpg!q95.webp',
            clickUrl:'',
          },
          {
            image:'https://img13.360buyimg.com/da/jfs/t1/103381/1/4446/143275/5de77c22E0054e6d2/67fda44fc74d9325.jpg!q95.webp',
            clickUrl:''
          }
        ],
        // 下拉刷新控制符
        isLoading:false,

        // 列表控制符
        finished:false,

        dataArray:[],
      }
    },
    methods:{
      // 下拉刷新
      onRefresh() {
        setTimeout(() => {
          // 加载状态结束
          this.isLoading = false;
          this.$toast('刷新成功');
        }, 1500)
      },
      // 轮播图滑动事件
      onchange(index) {
        window.console.log('当前 Swipe 索引：', index);
      },
      // 轮播图点击事件
      bannerClick(index, item) {
        window.console.log('当前点击banner索引:', index, 'banner数据:', item);
      },

      // 列表加载
      onLoad() {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            let temp = {};
            temp.name = '张三' + i;
            // temp.image = 'https://gw.alicdn.com/bao/uploaded/i1/369128276/TB1z8hDdLfM8KJjSZPfXXbklXXa_!!0-item_pic.jpg_400x400q90.jpg';
            temp.image = '';
            this.dataArray.push(temp);
          }
          // 加载状态结束
          this.isLoading = false;

          // 数据全部加载完成
          if (this.dataArray.length >= 10) {
            this.finished = true;
          }
        }, 1500);
      }
    }
  }
</script>

<!-- 样式 -->
<style scoped lang="less">
  @import "../../styles/px2rem.less";

  .list-cell {
    display: flex;
    font-size: 0.2rem;
    height:3.6rem;
    padding: 0.3rem 0.3rem;
    border-bottom: 0.02rem solid #EDEDED;
    box-sizing: border-box;
  }

  .goods-image {
    background: #E8E8E8;
    width: 3rem;
    height: 3rem;
  }
</style>