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
        <div class="top-bk" @click="toPersonCenter">
          <div>
            <van-image
                    round
                    lazy-load
                    :src="avatar"
                    @click.stop="scanAvatar"
            />
            <div class="myName">Jack Wu</div>
          </div>
          <div>
            <van-icon class="top-right-icon" name="arrow" size="20" />
          </div>
        </div>
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
      <TabBar :index="4" />
    </template>

  </page>
</template>

<script>
  // 引入 Vue
  import { ImagePreview } from 'vant';
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import {utils} from "../../utils/utils";
  import {Http} from "../../utils/api";
  import {getCurrentUser, updateUserInfoByKey, updateUserInfoByObj, User} from '../my/Model/User'
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
            to:'system-setting'
          },
          {
            title:'客户服务',
            icon:'service',
            to:''
          },
          {
            title:'收获地址',
            icon:'location',
            to:'my-adress-list',
          }
        ],
        avatar:'https://img.yzcdn.cn/vant/cat.jpeg',
        isScanAvatar:false,
      }
    },
    created() {
      // 网页标题更改
      document.title = '我的';
      const user = new User({userName:'JackWu'});
      updateUserInfoByKey('sex', '女');
      updateUserInfoByObj({userName:'吴俊秋', userId:'6', userAvatar:'www.baidu.com', 'nickName':'小甜甜', mobile:'18321567392'});
      window.console.log('created user:', getCurrentUser());
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
          Http.post('sysConfig/getSysConfigValue', {configKey: 1}).then(res => {

          }).catch(err => {
            this.$toast(err);
          });
        }, 2000);
      },
      cellClick(item, index) {
        if (index === 2) {
          // 通过协议调起系统拨打电话提示框
          window.location.href = 'tel://' + '4006069555';
        } else {
          this.$router.push({
            path:item.to,
            query:{
              adressDetail:'上海市浦东新区张江镇青春里2期6#1127室'
            }
          });
        }
      },
      scanAvatar() {
        this.isScanAvatar = true;
        ImagePreview([this.avatar]);
      },
      toPersonCenter() {
        this.$toast('个人中心');
        this.$router.push('person-center');
      }
    }
  }
</script>

<!-- 样式 -->
<style scoped lang="less">
  @import "../../styles/px2rem.less";
  .top-bk {
    width:100%;
    height: px2rem(200);
    background: #7279d5;
    padding: px2rem(25) px2rem(25);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .myName {
    text-align: center;
    font-size: px2rem(28);
    color: white;
  }

  .van-image {
    display: block;
    margin:auto;
    height: px2rem(100);
    width: px2rem(100);
  }

  .top-right-icon {
    display: block;
    margin:auto;
  }


  .blank {
    height:px2rem(600);
  }

  .cell {
    align-items: center;
  }
</style>