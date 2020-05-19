<template>
  <page :has-header="showNav" :has-footer="true">

    <template slot="header">
      <!-- 导航 -->
      <NavBar  title="购物车" :show-left="false" />
    </template>

    <template slot="content">
      <div style="margin-bottom: 2rem">
        <van-pull-refresh
                v-model="isRefresh"
                pulling-text="下拉刷新"
                loosing-text="松手即可刷新"
                loading-text="正在努力的刷新"
                @refresh="onRefresh"
        >
          <!--   消息列表     -->
          <van-list
                  v-model="isLoading"
                  :finished="finished"
                  :offset="100"
                  :immediate-check="false"
                  finished-text="————— 我是有底线的 ——————"
                  @load="onLoad"
          >
            <div class="goodsCard"
                 v-for="(item, index) in dataArray"
                 :key="index"
            >
              <div class="cardTop">
                <van-icon class="cardTopSelectIcon" name="circle" />
                <div class="cardTopTitle">{{item.shopName}}</div>
                <van-icon name="arrow" />
              </div>
              <van-swipe-cell
                      v-for="(goodsItem, idx) in item.goodsArr"
                      :key="idx"
              >
                <div class="cardContent">
                  <div class="contentLeft">
                    <van-icon class="cardTopSelectIcon" name="circle" />
                    <van-image
                            class="goodsIcon"
                            lazy-load
                            :src="goodsItem.goodsImageUrl"
                    />
                  </div>
                  <div class="contentRight">
                    <div class="goodsName">{{goodsItem.goodsName}}</div>
                  </div>
                </div>
<!--          cell右侧删除按钮      -->
                <template slot="right">
                  <van-button
                          class="delete-btn"
                          square
                          type="danger"
                          text="删除"
                          @click="deleteMsg(item, index)"
                  />
                </template>
              </van-swipe-cell>
            </div>
          </van-list>
        </van-pull-refresh>
        <van-submit-bar
                loding
                :price="3050"
                button-text="提交订单"
                @submit="onSubmit"
        >
          <van-checkbox v-model="checked">全选</van-checkbox>
          <span slot="tip">
          你的收货地址不支持同城送，
          <span class="blue-title">修改地址</span>
        </span>
        </van-submit-bar>
      </div>
    </template>

    <template slot="footer">
      <TabBar :index="2" />
    </template>

  </page>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import {utils} from "../../utils/utils";
  import {getAllShopsWithArray} from "./Model/WJQShops";

  export default {
    name: "CartPage",
    components: {
      TabBar,
      NavBar
    },
    props: {

    },
    data() {
      return {
        showNav:!utils.isWeChat(),
        checked:false, // 是否全选
        isCommitting:true,  // 是否提交中
        isRefresh:false,
        isLoading:false,
        finished:false,
        dataArray:[],
      }
    },
    created() {
      // 网页标题更改
      document.title = '购物车';
      setTimeout(() => {
        this.uploadDataReq();
      }, 500)
    },
    methods: {
      /**
       * 下拉刷新
       */
      onRefresh() {
        this.finished = false;
        this.uploadDataReq(true);
      },

      /**
       * 加载更多
       */
      onLoad() {
        this.uploadDataReq(false);
      },

      /**
       * 获取数据
       * @param refresh 是否是刷新 ture是 反之为加载更多
       */
      uploadDataReq(refresh) {
        if (this.dataArray.length === 0) {
          // 自定义加载图标
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner'
          });
        }
        setTimeout(() => {
          if (refresh) {
            this.dataArray = [];
          }
          const res = [];
          for (let i = 0; i < 3; i += 1) {
            res.push({
              id: i,
              shopName:'美特斯邦威',
              goodsArr:[
                {
                  id:'100',
                  name:'夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子夏季裙子',
                  price:'99',
                  image:"https://img.yzcdn.cn/vant/cat.jpeg",
                },
                {
                  id:'101',
                  name:'夏季时尚短裤',
                  price:'299',
                  image:"https://img.yzcdn.cn/vant/cat.jpeg",
                }
              ],
            })
          }
          this.dataArray = getAllShopsWithArray(res);
          if (refresh) {
            this.$toast.success('刷新成功');
            this.isRefresh = false;
          } else {
            this.isLoading = false;
            if (this.dataArray.length >= 5) {
              this.finished = true;
            }
          }
        }, 1000);
      },

      /**
       * 提交按钮点击事情
       */
      onSubmit() {
        this.$toast.success('提交成功');
      },

    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";

  .content {
    margin-bottom: 2rem;
  }

  // 整个提交订单视图
  .van-submit-bar {
    bottom:1.225rem;
  }

  // 全选 checkbox
  .van-checkbox {
    margin-left: 0.3rem;
  }

  .blue-title {
    color: #1966FF;
  }

  // 商品卡片
  /*.van-swipe-cell {*/
  /*  background: white;*/
  /*  border-radius: px2rem(12);*/
  /*  margin: px2rem(12)*/
  /*}*/

  // 商品卡片
  .goodsCard {
    background: white;
    margin: px2rem(12);
    border-radius: px2rem(12);
  }

  // 卡片顶部
  .cardTop {
    display: flex;
    padding: px2rem(12);
    align-items: center;
  }

  .cardTopSelectIcon {
    display: block;
    margin-right: px2rem(12);
  }

  .cardTopTitle {
    font-size: px2rem(14);
    color: black;
    text-align: left;
    margin-right: px2rem(6);
  }

  // 卡片内容区
  .cardContent {
    padding: px2rem(12);
    display: flex;
    justify-content: space-between;
  }

  .contentLeft {
    display: flex;
    align-items: center;
  }

  .goodsIcon {
    background: #ededed;
    width: px2rem(80);
    height: px2rem(100);
  }

  .contentRight {

  }

  .goodsName {
    text-align: left;
    margin-left: px2rem(6);
  }

  .delete-btn {
    height: 100%;
  }
</style>