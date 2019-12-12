<template>
  <page :has-header="showNav" :has-footer="true">
    <template slot="header">
      <!-- 导航 -->
      <NavBar  title="消息" :show-left="false"></NavBar>
    </template>
    <template slot="content">
      <p>消息</p>
    </template>
    <template slot="footer">
      <TabBar />
    </template>
  </page>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import {isWeChat} from "../../utils/utils";

  export default {
    name: "MessagePage",
    components:{
      TabBar,
      NavBar
    },
    props: {

    },
    data() {
      return {
        showNav:!isWeChat()
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  p {
    font-size: 0.2rem;
  }
</style>