<template>
  <page :has-header="showNav" :has-footer="true" :footer-height="52">
    <template slot="header">
      <NavBar title="商品详情" :show-left="true" />
    </template>

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
        <div class="price-top">
          <div class="price-top-left">
            <div class="price-top-left-title">妃鱼售价</div>
            <div class="price-top-left-des">¥8357</div>
          </div>
          <div class="price-top-right">
            <div class="price-top-right-title">市场销售价</div>
            <div class="price-top-right-des">¥28888</div>
          </div>
        </div>
        <div class="goods-info">
          <div class="goods-tag">
            <van-tag color="#f2826a">性价比高</van-tag>
            <van-tag color="#f2826a" plain>口感好</van-tag>
            <van-tag color="#7232dd">补贴价</van-tag>
          </div>
          <div class="goods-name">时尚夏季裙</div>
        </div>
        <div class="goods-identify">
          <div class="goods-identify-title">保真  <span>此商品经鉴定师团队鉴定为正品</span></div>
          <div class="goods-identify-des">
            <div class="goods-identify-des-item">
              <div>
                <van-icon name="passed" color='red' size="0.3rem" />
              </div>
              <div class="goods-identify-des-title"> 精致面料</div>
            </div>
            <div class="goods-identify-des-item">
              <div>
                <van-icon name="passed" color='red' size="0.3rem" />
              </div>
              <div class="goods-identify-des-title"> 全场包邮</div>
            </div>
            <div class="goods-identify-des-item">
              <div>
                <van-icon name="passed" color='red' size="0.3rem" />
              </div>
              <div class="goods-identify-des-title"> 假一赔三</div>
            </div>
          </div>
        </div>
        <div class="goods-brand-info">
          <div class="brand-name">品牌</div>
          <div class="brand-bottom">
            <van-image
                    class="brand-image"
                    lazy-load
                    src="http://imgsrc.baidu.com/baike/pic/item/0d968f2313167351ac34de46.jpg"
            />
            <div class="brand-bottom-right">
              <div class="right-brand-name">古驰 Gucci</div>
              <div class="right-sale">1418件商品在售</div>
            </div>
          </div>
        </div>
        <van-swipe
                :show-indicators="false"
                @change="scrollToTargetPage"
        >
          <van-swipe-item
                  v-for="(arr, idx) in otherGoods"
                  :key="idx"
         >
            <div class="other-goods">
              <div>
                <ul class="other-goods-item">
                  <li v-for="(item, index) in arr" :key="index" :style="  index === arr.length - 1 ? 'margin-right:0' : ''  ">
                    <img class="goods-item-image" :src="item.image">
                    <div class="goods-item-goods-name">{{item.name}}</div>
                    <div>{{item.price}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>

        <div class="custom-indicator">
          <div class="custom-indicator-child">
            <div v-for="(arr, idx) in otherGoods" :key="idx" :class="idx === current ? 'custom-indicator-item-active' : 'custom-indicator-item' "  />
          </div>

        </div>

      </van-pull-refresh>
    </template>

    <template slot="footer">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
        <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </template>

  </page>
</template>

<script>
  import NavBar from '../../components/NavBar.vue';
  import {utils} from "../../utils/utils";
  const result = [
    {
      image:'https://rentupload.topshopstv.com//2019-12-13//5df360b9b4fd2.jpg',
      title:'路由传值'
    },
    {
      image:'https://rentupload.topshopstv.com//2019-10-19//5daab871029e0.png',
      title:'粉丝大回馈'
    },
    {
      image:'https://rentupload.topshopstv.com//2019-08-27//5d64d1fe060a8.png',
      title:'vue.js'
    }
  ];
  export default {
    name: "GoodsDetailPage",
    components:{
      NavBar,
    },
    props:{

    },
    data() {
      return {
        showNav:!utils.isWeChat(),
        isLoading:false,
        banners:result,
        bannerHeight:window.document.documentElement.clientWidth * 320.0 / 750.0,
        otherGoods:[],
        current:0,
      }
    },
    created() {
      setTimeout(() => {
        this.getOtherGoods();
      }, 500)
    },
    methods:{
      getOtherGoods() {
        const array0 = [];
        for (let i = 0; i < 4; i += 1) {
          const obj = {};
          obj.name = `商品0${i}`;
          obj.price = '¥1000';
          obj.image = 'https://gw.alicdn.com/bao/uploaded/i1/64723694/TB20n0IXU_C11Bjy1zeXXXtGpXa_!!64723694.jpg_400x400q90.jpg';
          obj.clickUrl = '';
          array0.push(obj);
        }
        const array1 = [];
        for (let i = 0; i < 4; i += 1) {
          const obj = {};
          obj.name = `商品1${i}`;
          obj.price = '¥1000';
          obj.image = 'https://gw.alicdn.com/bao/uploaded/i2/113740699/TB2DRluXCPA11Bjy0FaXXbucXXa-113740699.jpg_400x400q90.jpg';
          obj.clickUrl = '';
          array1.push(obj);
        }
        this.otherGoods = [array0, array1];
      },
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
        }, 500)
      },
      // 轮播图滑动事件
      onchange(index) {
        window.console.log('当前 Swipe 索引：', index);
      },
      scrollToTargetPage(index) {
        window.console.log('goods当前 Swipe 索引：', index);
        this.current = index;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";
  body {
    background: #efefef;
  }

  /**
    顶部价格信息
   */
  .price-top {
    display: flex;
    /*justify-content: space-between;*/
    align-content: center;
    align-items: center;
    height: px2rem(80);
    padding: px2rem(12);
    box-sizing: border-box;
    position: relative;
    background: white;
  }
  .price-top-left, .price-top-right {
    width: 50%;
    align-items: center;
    text-align: center;
    margin: auto;
  }

  .price-top-left {
    border-right: px2rem(1) solid #EDEDED;
  }

  .price-top-left-title {
    color: #DC143C;
    font-size: px2rem(15);
    margin-bottom: px2rem(12);
  }

  .price-top-left-des {
    color: red;
    font-size: px2rem(17);
  }

  .price-top-right-title {
    font-size: px2rem(15);
    margin-bottom: px2rem(12);
  }

  .price-top-right-des {
    font-size: px2rem(17);
    text-decoration:line-through;
  }

  .top-gap-line {
    position: absolute;
    width: px2rem(1);
    height: px2rem(60);
    top: px2rem(10);
    margin: 0 auto;
    display: block;
    background: #EDEDED;
  }

  .goods-info {
    height: px2rem(80);
    padding: px2rem(12);
    box-sizing: border-box;
    align-items: center;
    background: white;
    margin-bottom: px2rem(12);
  }

  .goods-tag {
    margin-bottom: px2rem(12);
  }

  .goods-name {
    font-size: px2rem(15);
    font-weight: bold;
    color: black;
  }

  /**
    商品鉴定信息
   */
  .goods-identify {
    background: white;
    padding: px2rem(12);
    box-sizing: border-box;
    margin-bottom: px2rem(12);
  }

  .goods-identify-title {
    font-size: px2rem(13);
    color: black;
    font-weight: bold;
    margin-bottom: px2rem(12);
  }

  .goods-identify span {
    font-size: px2rem(12);
    color: #8C8F98;
  }

  .goods-identify-des {
    display: flex;
  }

  .goods-identify-des-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    margin-right: px2rem(30);
  }

  .van-icon {
    width: px2rem(12);
    height: px2rem(12);
    display: block;
    margin: 0 auto;
  }

  .goods-identify-des-title {
    font-size: px2rem(11);
    color: #8C8F98;
    text-indent:px2rem(6)
  }

  /**
   品牌信息
   */
  .goods-brand-info {
    padding: px2rem(12);
    box-sizing: border-box;
    background: white;
  }

  .brand-name {
    font-size: px2rem(15);
    font-weight: bold;
    color: black;
    margin-bottom: px2rem(12);
  }

  .brand-bottom {
    display: flex;
    align-items: center;
  }

  .brand-image {
    width: px2rem(50);
    height: px2rem(50);
    border: px2rem(1) solid #383838;
    margin-right: px2rem(10);
  }

  .brand-bottom-right {

  }

  .right-brand-name {
    font-weight: bold;
    font-size: px2rem(14);
    color: #383838
  }

  .right-sale {
    font-size: px2rem(11);
  }

  /* 其他在售的商品 */
  .other-goods {
    display: flex;
    background: white;
    padding: 0 px2rem(12) px2rem(12) px2rem(12);
    box-sizing: border-box;
  }

  .other-goods-item {
    display: flex;
    display: -webkit-flex;
  }

  .other-goods-item li {
    width: 25%;
    height: 100%;
    text-align: center;
    margin-right: px2rem(12);
  }

  .other-goods-item li .goods-item-image {
    width: 100%;
    height: 100%;
  }

  .goods-item-goods-name {
    font-size: px2rem(12);
    color: #383838;
  }

  /* 自定义轮播指示器 */
  .custom-indicator {
    display: flex;
    align-content: center;
    background: white;
  }

  .custom-indicator-child {
    margin: 0 auto;
    display: flex;
  }

  .custom-indicator-item {
    text-align: center;
    width: px2rem(12);
    height: px2rem(3);
    background: #8C8F98;
    margin-right: px2rem(5);
  }

  .custom-indicator-item-active {
    text-align: center;
    width: px2rem(12);
    height: px2rem(3);
    background: red;
    margin-right: px2rem(5);
  }

</style>