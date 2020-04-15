<template>
  <page :has-header="showNav" :has-footer="true">

    <template slot="header">
      <!-- 导航 -->
      <NavBar  title="购物车" :show-left="false" />
    </template>

    <template slot="content">

      <van-submit-bar
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
        checked:false
      }
    },
    created() {
      // 网页标题更改
      document.title = '购物车';
    },
    methods: {
      onSubmit() {
        this.$toast.success('提交成功');
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";
  .van-submit-bar {
    margin-bottom: px2rem(30);
    border:0.02rem solid #EDEDED;
  }
  .van-checkbox {
    margin-left: 0.2rem;
  }

  .blue-title {
    color: #1966FF;
  }
</style>