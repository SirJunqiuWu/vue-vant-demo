<template>
  <page
    class="page"
    :has-header="showNav"
    :has-footer="true"
  >

    <!-- 头部 -->
    <template slot="header">
      <NavBar title="首页" :show-left="false" />
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

        <van-notice-bar
          color="#383838"
          background="white"
          left-icon="volume-o"
        >
          重磅来袭，圣诞节前大狂欢，全场八折，尽情享受我们的折扣狂欢吧!
        </van-notice-bar>

        <van-grid square gutter="10" :column-num="3">
          <van-grid-item
                  v-for="(item, index) in girdArray"
                  :key="index"
                  :icon="item.icon"
                  :text="item.title"
                  @click="girdItemClick(index, item)"
          />
        </van-grid>

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
            <div>
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
            </div>

            <div class="goods-info-des">
              <div class="goods-title van-multi-ellipsis--l">{{item.goodsName}}</div>
              <div class="goods-sale-count">{{item.saleCount}}</div>
              <div class="goods-price">当前售价：<span> ¥ 500.00</span></div>
            </div>
          </li>

        </van-list>
      </van-pull-refresh>

    </template>

    <!-- 底部 -->
    <template slot="footer">
      <TabBar :index="0" />
    </template>

  </page>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import logo from '../../assets/app-logo.png';
  import {utils} from "../../utils/utils";
  import Vue from 'vue';
  import { Swipe, SwipeItem, Lazyload, PullRefresh, Toast, List, Cell, Image, NoticeBar } from 'vant';
  Vue.use(Swipe).use(SwipeItem).use(Lazyload).use(PullRefresh).use(Toast).use(List).use(Cell).use(Image).use(NoticeBar);

  const result = [
      {
        image:'https://rentupload.topshopstv.com//2019-12-13//5df360b9b4fd2.jpg',
        clickUrl:'https://segmentfault.com/a/1190000012393587',
        title:'路由传值'
      },
      {
        image:'https://rentupload.topshopstv.com//2019-10-19//5daab871029e0.png',
        clickUrl:'https://rentstatic.topshopstv.com/h5/index8.html',
        title:'粉丝大回馈'
      },
      {
        image:'https://rentupload.topshopstv.com//2019-08-27//5d64d1fe060a8.png',
        clickUrl:'https://cn.vuejs.org/',
        title:'vue.js'
      }
    ];
  window.console.log('banners:', utils.getLocalStorage('banners'));
  export default {
    name: "HomePage",
    components:{
      TabBar,
      NavBar,
    },
    data(){
      return {
        showNav:!utils.isWeChat(),
        bannerHeight:window.document.documentElement.clientWidth * 320.0 / 750.0,
        banners: utils.getLocalStorage('banners') ? result : result,
        // 下拉刷新控制符
        isLoading:false,
        // 列表控制符
        finished:false,
        girdArray:[
          {
            icon:logo,
            title:'时尚秒杀',
            url:''
          },
          {
            icon:'photo-o',
            title:'今日最新',
            url:''
          },
          {
            icon:'photo-o',
            title:'最佳爆款',
            url:''
          },
          {
            icon:'photo-o',
            title:'女神推荐',
            url:''
          },
          {
            icon:'photo-o',
            title:'男神推荐',
            url:''
          },
          {
            icon:'gift-card-o',
            title:'今日有礼',
            url:''
          },
        ],
        dataArray:utils.getLocalStorage('list') ? utils.getLocalStorage('list') : [],
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
        if (item.clickUrl) {
          this.$router.push({
            path:'web',
            query:{
              title:item.title,
              src:item.clickUrl
            }
          });
        }
      },

      // 宫格按钮点击事件
      girdItemClick(index, item) {
        window.console.log('当前点击宫格索引:', index, '宫格:', item);
      },

      // 列表加载
      onLoad() {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            let temp = {};
            temp.goodsName =  '正品美特斯邦威夏季凉爽裙女神款魅力十足青春活力';
            temp.image = 'https://gw.alicdn.com/bao/uploaded/i1/369128276/TB1z8hDdLfM8KJjSZPfXXbklXXa_!!0-item_pic.jpg_400x400q90.jpg';
            temp.saleCount = '销量:800';
            this.dataArray.push(temp);
          }
          // 加载状态结束
          this.isLoading = false;

          // 数据全部加载完成
          if (this.dataArray.length >= 10) {
            this.finished = true;
          }
          utils.setLocalStorage('list', this.dataArray);
          utils.setLocalStorage('banners', result);

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

  .notice-bar {

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
    height:3.6rem;
    padding: 0.3rem 0.3rem;
    border-bottom: 0.02rem solid #EDEDED;
    box-sizing: border-box;
    font-size: 0.4rem;
    color: #383838;
  }

  .goods-image {
    background: #E8E8E8;
    width: 3rem;
    height: 3rem;
  }

  .goods-info-des {
    margin-left: 0.3rem;
    position: relative;
  }

  .goods-title {

  }

  .goods-sale-count {
    margin-top: 0.3rem;
  }

  .goods-price {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .goods-price span {
    color:red;
  }

  .van-grid {
    margin-top: px2rem(10);
  }

</style>