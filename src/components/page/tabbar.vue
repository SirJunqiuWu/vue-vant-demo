<template>
  <van-tabbar class="tabbar" v-model="active" @change="clickTabItem">
    <van-tabbar-item v-for="(icon,i) in icons" :key="i">
      <span>{{ icon.title}}</span>
      <img class="tab-icon"
           slot="icon"
           :src="active==i ? icon.active : icon.normal"
      >
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
    import {
        Page_Mall_GoodsClass,
        Page_Mall_ShoppingCart,
        Page_Mobile_Home,
        Page_Mobile_My,
        Page_Mobile_scanCode
    } from "../../core/url.config";
    import router, {RouterName, RouterPath} from '@/router/index'
    import {RouterUtil} from "../../utils/routerUtil";

    export default {
        name: "tabbar",
        props: {
            index: {
                type: Number,
                required: false,
                default:0,
                validator: (value) => {
                    return true;
                }
            },
        },
        data() {
            return {
                active:0,
                icons: [
                    {
                        title:'首页',
                        normal: '',
                        active: '',
                        url:Page_Mobile_Home
                    },
                    {
                        title: '购物车',
                        normal: '',
                        active: '',
                        url:Page_Mall_ShoppingCart,
                        // routerName: RouterName.shoppingCat
                    },
                    {
                        title:'订货商城',
                        normal: '',
                        active: '',
                        url:Page_Mall_GoodsClass,
                        // routerName: RouterName.goodsClass
                    },
                    {
                        title:'扫码',
                        normal: '',
                        active: '',
                        url:Page_Mobile_scanCode
                    },
                    {
                        title:'我的',
                        normal: '',
                        active: '',
                        url:Page_Mobile_My
                    },
                ]
            }
        },
        created(){
            console.log(Page_Mobile_Home);
        },
        methods:{
            clickTabItem(i){
                const icon = this.icons[i];
                // if(icon.url == Page_Mobile_My && !!UserInfo.getFirstFlag()){
                //   AlertUtil.alert({
                //     title:'提示',
                //     message:'请先完成首单任务！',
                //     confirmButtonText:'确定'
                //   });
                //   this.active = 1;
                //   return;
                // }
                console.log(i);
                // if(i==this.active){
                //     return;
                // }
                console.log(i,this.active);

                // this.active = i;
                this.$forceUpdate();
                if(icon.url){
                    window.location.href = icon.url;
                    return;
                }
                if(icon.routerName){

                    RouterUtil.pushQuery(icon.routerName);
                }

            }
        },
        watch:{
            index:{
                handler:function(val,oldval){
                    this.active = this.index;
                },
                immediate:true,
                deep:true

            }
        }
    }

</script>

<style lang="less">
  @import "../../styles/px2rem.less";

  .tabbar{
    position: relative !important;
    border: none !important;
    height: px2rem(56);
    /*height: 100% !important;*/
  }
  .tab-icon {
    width: px2rem(22) !important;
    height: px2rem(22) !important;
  }

  /*.van-tabbar-item:nth-child(3){*/
  /*  .van-tabbar-item__icon {*/
  /*    margin-top: px2rem(-17);*/
  /*    z-index: 5;*/
  /*  }*/
  /*  .tab-icon {*/
  /*    width: px2rem(50) !important;*/
  /*    height: px2rem(50) !important;*/
  /*  }*/
  /*}*/

  .van-tabbar-item--active{
    color: #7C83E3;
  }
</style>
