<template>
  <page :has-header="showNav" :has-footer="true">
    <template slot="header">
      <!-- 导航 -->
      <NavBar  title="购物车" :show-left="false"></NavBar>
    </template>
    <template slot="content">
      <p>home</p>
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
        showNav:!utils.isWeChat()
      }
    },
    created() {
      // 网页标题更改
      document.title = '购物车';
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>