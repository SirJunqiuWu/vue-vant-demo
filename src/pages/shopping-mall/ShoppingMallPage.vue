<template>
  <page :has-header="showNav" :has-footer="true">
    <template slot="header">
      <!-- 导航 -->
      <NavBar  title="商城" :show-left="false"></NavBar>
    </template>

    <template slot="content">
      <van-card
        v-for="(item, index) in dataArray"
        :key="index"
        :thumb="item.thumb"
        :title="item.title"
        :desc="item.desc"
        :num="item.num"
        :price="item.price"
        lazy-load
      >
        <div slot="tags" v-for="(tag, key) in item.tags" :key="key">
          <van-tag plain type="danger">{{tag}}</van-tag>
        </div>
        <div slot="footer">
          <van-button size="mini">收藏</van-button>
          <van-button size="mini">购买</van-button>
        </div>
      </van-card>
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
      }
    },
    created() {
      this.uploadDataReq();
    },
    methods: {
      uploadDataReq() {
        for (let i = 0; i < 10; i += 1) {
          let temp = {};
          temp.thumb = "https://gw.alicdn.com/bao/uploaded/i2/158929230/TB1pP_bn_nI8KJjy0FfXXcdoVXa_!!0-item_pic.jpg_400x400q90.jpg"
          temp.title = "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题"
          temp.desc = "描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
          temp.num = "2"
          temp.price = "2.00"
          temp.tags = ['满100减10', '满300减50']
          this.dataArray.push(temp);
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";
  // 卡片
  .van-card {
    background: white;
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
  }

  // 按钮
  .van-button {
    border-radius: 0.3rem;
  }

  .van-button--mini {
    // 使文本垂直居中
    height: 0.6rem;
    line-height: 0.6rem;
  }

</style>