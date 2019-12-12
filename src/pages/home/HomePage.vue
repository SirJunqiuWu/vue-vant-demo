<template>
  <page
    class="page"
    :has-header="showNav"
    :has-footer="true"
  >

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

        <div class="gap">最新商品</div>

        <!-- 列表 -->
        <van-list
          class="list"
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
            @click="cellClicked(index, item)"
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

        </van-list
                >
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
        bannerHeight:window.document.documentElement.clientWidth * 844 / 1500,
        banners:[
          {
            image:'http://formyself.oss-cn-hangzhou.aliyuncs.com/root/c591089f68164716bb988d3537517567.jpg',
            clickUrl:''
          },
          {
            image:'http://formyself.oss-cn-hangzhou.aliyuncs.com/root/6e82220336d94323ad75a7fe7013c51a.jpg',
            clickUrl:'',
          },
          {
            image:'http://formyself.oss-cn-hangzhou.aliyuncs.com/root/02a601ff31724f51801d5d6211534e9e.jpg',
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
            temp.goodsName =  '夏季凉爽裙';
            temp.image = 'https://gw.alicdn.com/bao/uploaded/i1/369128276/TB1z8hDdLfM8KJjSZPfXXbklXXa_!!0-item_pic.jpg_400x400q90.jpg';
            this.dataArray.push(temp);
          }
          // 加载状态结束
          this.isLoading = false;

          // 数据全部加载完成
          if (this.dataArray.length >= 10) {
            this.finished = true;
          }
        }, 1500);
      },

      // 列表点击
      cellClicked(index, item) {
        Toast('当前点击' + index + '行');
      }
    }
  }
</script>

<!-- 样式 -->
<style scoped lang="less">
  @import "../../styles/px2rem.less";
  .page {
    background: rebeccapurple;
  }

  .gap {
    background-color: #E8E8E8;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }

  .list {

  }

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