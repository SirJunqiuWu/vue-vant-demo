<template>
  <page :has-header="showNav" :has-footer="false">
    <template slot="header">
      <NavBar title="商品详情" :show-left="true" />
    </template>

    <template slot="content">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
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
  export default {
    name: "GoodsDetailPage",
    components:{
      NavBar,
    },
    props:{

    },
    data() {
      return {
        showNav:!utils.isWeChat()
      }
    },
    created() {

    },
    methods:{

    }
  }
</script>

<style scoped lang="less">

</style>