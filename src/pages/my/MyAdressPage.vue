<template>
  <page :has-header="showNav">
    <template slot="header">
      <NavBar title="我的地址" :showLeft="true" />
    </template>
    <template slot="content">
      <van-address-edit
        :area-list="areaList"
        :show-postal="true"
        show-delete
        show-set-default
        :show-search-result="false"
        :is-saving="isSaving"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :address-info="AddressInfo"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </template>
  </page>
</template>

<script>
  import NavBar from '../../components/NavBar';
  import {utils} from "../../utils/utils";
  export default {
    name: "MyAdressPage",
    components:{
      NavBar,
    },
    props:{

    },
    data(){
      return {
        showNav:!utils.isWeChat(),
        isSaving:false, // 是否保存中
        searchResult:[], // 详细地址搜索结果
        areaList:
          {
            // 前两位省份 中间两位市 后两位区县
            province_list: {
              110000: '北京市',
              120000: '天津市'
            },
            city_list: {
              110100: '北京市',
              110200: '县',
              120100: '天津市',
              120200: '县'
            },
            county_list: {
              110101: '东城区',
              110102: '西城区',
              110105: '朝阳区',
              110106: '丰台区',
              120101: '和平区',
              120102: '河东区',
              120103: '河西区',
              120104: '南开区',
              120105: '河北区',
              // ....
            }
          },

        // 收货人信息初始值
        AddressInfo: {
          name:'吴俊秋', // 姓名
          tel:'18321567392', // 电话
          province:'北京市', // 省份
          city:'北京市', // 城市
          country:'朝阳区', // 区县
          areaCode:'110105', // 地址code：ID
          addressDetail:'北京东路123号', // 详细地址
          isDefault:true, // 是否选择默认
        },
      }
    },
    mounted() {
      const query = this.$route.query;
      utils.log('页面获取的参数集合:', query);
      this.AddressInfo = query.param;
    },
    created(){

    },
    methods:{
      onSave(val){
        this.isSaving = true;
        window.console.log('保存:', val);
        setTimeout(() => {
          this.isSaving = false;
        }, 2000);
      },
      onDelete(val) {
        utils.log('删除', val);
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [
            {
              name: '黄龙万科中心',
              address: '杭州市西湖区',
            },
          ];
        } else {
          this.searchResult = [];
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";
</style>