<template>
  <page :has-header="showNav">
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
            postalCode:'100000',
            name:'吴俊秋', // 姓名
            province:'浙江省', // 省份
            city:'杭州市', // 城市
            country:'西湖区', // 区县
            areaCode:'110105', // 地址code：ID
            addressDetail:'文三路 138 号东方通信大厦 7 楼 501 室',
            isDefault:true, // 是否选择默认
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号',
            postalCode:'100000',
            name:'吴俊秋', // 姓名
            province:'浙江省', // 省份
            city:'杭州市', // 城市
            country:'西湖区', // 区县
            areaCode:'110105', // 地址code：ID
            addressDetail:'文三路 138 号东方通信大厦 7 楼 501 室',
            isDefault:false, // 是否选择默认
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
        this.$router.push({
          path:'my-adress',
          query:{

          }
        })
      },
      onEdit(item, index) {
        window.console.log('编辑行数据:', item);
        this.$toast('当前点击第' + index + '行');
        this.$router.push({
          path:'my-adress',
          query:{
            param:item
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";

  .van-button {
    width: px2rem(300);
    height: px2rem(45);
    line-height: px2rem(45);
    border-radius: px2rem(22.5);
    position:fixed;
    margin:auto;
    right:0;
    bottom:px2rem(22.5);
    left:0;

  }

</style>