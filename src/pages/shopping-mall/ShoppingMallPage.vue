<template>
  <page :has-header="showNav" :has-footer="true">
    <template slot="header">
      <!-- 导航 -->
      <NavBar title="商城" :show-left="false"></NavBar>
    </template>

    <template slot="content">
      <van-pull-refresh
        v-model="isRefresh"
        pulling-text="下拉刷新"
        loosing-text="松手即可刷新"
        loading-text="正在努力的刷新"
        @refresh="onRefresh"
      >
        <van-list
          v-model="isLoading"
          :finished="finished"
          :immediate-check="false"
          finished-text="————— 我是有底线的 ——————"
          @load="onLoad"
        >
          <van-cell
            v-for="(item, index) in dataArray"
            :key="index"
            style="margin-bottom: 0.2rem;padding: 0"
          >
            <van-card
              :thumb="item.thumb"
              :title="item.title"
              :desc="item.desc"
              :num="item.num"
              :price="item.price"
              :origin-price="item.originPrice"
              lazy-load
              @click-thumb="imageClicked(item, index)"
              @click="cellClicked(item, index)"
            >
              <div slot="tags">
                <van-tag plain type="danger"  v-for="(tag, tagIndex) in item.tags" :key="tagIndex">{{tag}}</van-tag>
              </div>
              <div slot="footer">
                <van-button size="mini" @click.stop="collectGoods(item, index)">收藏</van-button>
                <van-button size="mini" @click="buyGoods(item, index)">购买</van-button>
              </div>
            </van-card>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </template>

    <template slot="footer">
      <TabBar :index="1" />
    </template>
  </page>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import {utils} from "../../utils/utils";
  import {ImagePreview} from 'vant'; // 函数调用的方式
  import Vue from 'vue';
  Vue.use(ImagePreview);
  export default {
    name: "ShoppingMallPage",
    components: {
      TabBar,
      NavBar
    },
    props: {

    },
    data() {
      return {
        showNav:!utils.isWeChat(),
        dataArray:[],
        isRefresh:false,
        isLoading:false,
        finished:false,
      }
    },
    created() {
      // 网页标题更改
      document.title = '商城';
      this.uploadDataReq();
    },
    methods: {
      onRefresh() {
        this.finished = false;
        this.uploadDataReq(true);
      },

      onLoad() {
        this.uploadDataReq(false);
      },

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
          for (let i = 0; i < 5; i += 1) {
            let temp = {};
            temp.id = i + 1;
            temp.thumb = "https://gw.alicdn.com/bao/uploaded/i2/158929230/TB1pP_bn_nI8KJjy0FfXXcdoVXa_!!0-item_pic.jpg_400x400q90.jpg"
            temp.title = "商品标题"
            temp.desc = "描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
            temp.num = "2"
            temp.price = "280.00"
            temp.originPrice = '350'
            temp.tags = ['满100减10', '满300减50']
            temp.images = [
              'https://gd1.alicdn.com/imgextra/i3/1052798159/TB2gOaFaC3PL1JjSZPcXXcQgpXa_!!1052798159.jpg',
              'https://gd2.alicdn.com/imgextra/i2/1052798159/TB2VMS3aBcHL1JjSZJiXXcKcpXa_!!1052798159.jpg',
              'https://gd4.alicdn.com/imgextra/i4/1052798159/TB2tB1OaC3PL1JjSZFxXXcBBVXa_!!1052798159.jpg'
            ]
            temp.clickUrl = '';
            temp.routeName = 'goods-detail';
            this.dataArray.push(temp);
          }
          if (refresh) {
            this.isRefresh = false;
            this.$toast.success('刷新成功');
          } else {
            this.isLoading = false;
            if (this.dataArray.length >= 20) {
              this.finished = true;
            }
          }
        }, 1000)
      },

      cellClicked(item, index) {
        window.console.log('cell击索引:', index, '信息:', item)
        if (item.clickUrl && item.clickUrl.length > 0) {
          window.location.href = item.clickUrl;
          return;
        }
        if (item.routeName && item.routeName.length > 0) {
          this.$router.push(item.routeName);
        }
      },

      // 商品图点击
      imageClicked(item, index) {
        window.console.log('商品图点击索引:', index, '信息:', item)
        this.$toast('商品图片:' + index);
        if (item.images && item.images.length > 0) {
          // 查看商品图片(如果想组件调用时，可支持自定义显示)
          ImagePreview({
            images:item.images,
            startPosition:0,
            showIndicators:true,
            lazyLoad:true
          });
        }
      },

      // 收藏商品点击
      collectGoods(item, index) {
        window.console.log('收藏商品索引:', index, '信息:', item)
        this.$toast('收藏商品:' + index);
        stop();
      },

      // 购买商品点击
      buyGoods(item, index) {
        window.console.log('购买商品击索引:', index, '信息:', item)
        this.$toast('购买商品:' + index);
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";
  // 卡片
  .van-card {
    background-color: white;
    padding: 0.4rem 0.4rem;
  }

  // 商品图
  .van-card__thumb {
    width: 2.8rem;
    height: 2.8rem;
    margin-right: 0.25rem;
  }

  // 图片右侧的内容区
  .van-card__content {
    min-height: 2.8rem;
  }

  // 商品标题
  .van-card__title {
    font-weight: 600;
    margin-bottom: 0.16rem;
  }

  // 商品描述
  .van-card__desc {
    margin-bottom: 0.16rem;
  }

  // 标签
  .van-tag--danger.van-tag--plain {
    margin-bottom: 0.16rem;
    margin-right: 0.1rem;
  }

  // 按钮
  .van-button {
    border-radius: 0.3rem;
  }

  div-tags {
    display: flex;
  }

  // 底下的功能按钮
  .van-button--mini {
    // 使文本垂直居中
    height: 0.6rem;
    line-height: 0.6rem;
  }

</style>