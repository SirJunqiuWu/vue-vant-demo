<template>
  <div class="content">
    <van-cell
      v-for="(item, index) in dataArray"
      :key="index"
      :title="item.title"
      :icon="item.icon"
      is-link
      @click="cellClick(item, index)"
    />
    <TabBar />
  </div>
</template>

<script>
  // 引入 Vue
  import Vue from 'vue';
  import TabBar from '../../components/TabBar.vue';
  import {Button, Cell, CellGroup} from 'vant';
  Vue.use(Button).use(Cell).use(CellGroup);
  export default {
    name: "MyPage",
    components:{
      TabBar,
    },
    props:{

    },
    data() {
      return {
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
    methods:{
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

<style scoped>
p {
  font-size: 30px;
}
</style>