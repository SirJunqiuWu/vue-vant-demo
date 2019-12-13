<template>
  <page :has-header="showNav" :has-footer="true">
    <template slot="header">
      <NavBar  title="我的" :show-left="false"></NavBar>
    </template>

    <template slot="content">
      <van-pull-refresh
        v-model="isLoading"
        pulling-text="下拉刷新"
        loosing-text="松手即可刷新"
        loading-text="正在努力的刷新"
        @refresh="onRefresh"
      >
        <van-cell
          class="cell"
          v-for="(item, index) in dataArray"
          :key="index"
          :title="item.title"
          :icon="item.icon"
          size="large"
          is-link
          @click="cellClick(item, index)"
        />
        <div class="blank"></div>
      </van-pull-refresh>
    </template>


    <template slot="footer">
      <TabBar />
    </template>

  </page>
</template>

<script>
  // 引入 Vue
  import Vue from 'vue';
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import {utils} from "../../utils/utils";
  import {Button, Cell, CellGroup, PullRefresh} from 'vant';
  Vue.use(Button).use(Cell).use(CellGroup).use(PullRefresh);
  export default {
    name: "MyPage",
    components:{
      TabBar,
      NavBar
    },
    props:{

    },
    data() {
      return {
        showNav:!utils.isWeChat(),
        curHeight:0,
        isLoading:false,
        dataArray:[
          {
            title:'关于我们',
            icon:'question',
            to:'about-us'
          },
          {
            title:'系统设置',
            icon:'setting',
            to:''
          },
          {
            title:'客户服务',
            icon:'service',
            to:''
          }
        ]
      }
    },
    beforeMount(height) {
      let h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight = h - height; //减去页面上固定高度height
      window.console.log('height:', height, 'deviceHeight:', h);
    },
    methods:{
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.$toast('刷新成功');
        }, 2000);
      },
      cellClick(item, index) {
        if (index === 2) {
          // 通过协议调起系统拨打电话提示框
          window.location.href = 'tel://' + '4006069555';
        } else {
          this.$router.push(item.to);
        }
      }
    }
  }
</script>

<!-- 样式 -->
<style scoped lang="less">
  @import "../../styles/px2rem.less";

  .blank {
    height:px2rem(600);
  }

  .cell {
    align-items: center;
  }
</style>