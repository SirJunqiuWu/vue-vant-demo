<template>
  <page :has-header="true">
    <template slot="header">
      <NavBar title="收货列表" :showLeft="true" />
    </template>
    <template slot="content">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </template>
  </page>
</template>

<script>
  // 我的收获地址列表界面
  import NavBar from '../../components/NavBar.vue';
  import {utils} from "../../utils/utils";
  export default {
    name: "MyAdressListPage",
    components:{
      NavBar
    },
    props:{

    },
    data(){
      return {
        showNav:!utils.isWeChat(),
        // 默认选择的收获地址
        chosenAddressId: '1',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号',
          },
        ],
        // 当前位置不能用的收获地址
        disabledList: [
          {
            id: '3',
            name: '王五',
            tel: '1320000000',
            address: '浙江省杭州市滨江区江南大道 15 号',
          },
        ],
      }
    },
    mounted(){

    },
    created(){

    },
    methods:{
      onAdd() {
        window.console.log('添加');
      },
      onEdit() {
        window.console.log('编辑');
      }
    }
  }
</script>

<style scoped>

</style>