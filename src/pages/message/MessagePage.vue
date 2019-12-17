<template>
  <page :has-header="showNav" :has-footer="true">
    <template slot="header">
      <!-- 导航 -->
      <NavBar  title="消息" :show-left="false"></NavBar>
    </template>
    <template slot="content">
      <van-pull-refresh
        v-model="isRefresh"
        pulling-text="下拉刷新"
        loosing-text="松手即可刷新"
        loading-text="正在努力的刷新"
        @refresh="onRefresh"
      >
        <van-list
          v-model="isLoading"
          :finished="finished"
          :offset="100"
          :immediate-check="false"
          finished-text="————— 我是有底线的 ——————"
          @load="onLoad"
        >
          <van-swipe-cell
            v-for="(item, index) in dataArray"
            :key="index">
            <van-cell
              size="large"
              :border="true"
              :title="item.title"
              :value="item.time"
              :label="item.des"
              @click="cellClicked(item, index)"
            >
              <van-icon
                slot="icon"
                :name="item.avatar"
                :dot="!item.hasRead"
              />
            </van-cell>
            <template slot="right">
              <van-button
                class="van-button"
                square
                type="danger"
                text="删除"
                @click="deleteMsg(item, index)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-pull-refresh>
    </template>
    <template slot="footer">
      <TabBar :index="3" :msg-count="msgCount" />
    </template>
  </page>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import {utils} from "../../utils/utils";
  const pageNum = 10;
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
        showNav:!utils.isWeChat(),
        avatars:[
          'https://gw.alicdn.com/bao/uploaded/i4/11628018709909080/T1DhkqXalaXXXXXXXX_!!0-item_pic.jpg_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i2/718533661/TB2QFK1aHaI.eBjy1XdXXcoqXXa_!!718533661.jpg_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i1/704298669/TB2KcY_ap95V1Bjy0FlXXaBbXXa_!!704298669.jpg_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i1/50454948/TB2c1zUXY1J.eBjSspnXXbUeXXa_!!50454948.jpg_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i4/TB1xqfaNFXXXXX7aXXXYXGcGpXX_M2.SS2_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i1/704298669/TB2IepAXkWM.eBjSZFhXXbdWpXa_!!704298669.jpg_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i1/39501878/TB2ZUWTbHVkpuFjSspcXXbSMVXa_!!39501878.jpg_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i1/TB1ovlkLpXXXXc8XpXXXXXXXXXX_!!0-item_pic.jpg_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i3/830504935/TB28oycaqm5V1BjSsppXXcMCVXa_!!830504935.jpg_400x400q90.jpg',
          'https://gw.alicdn.com/bao/uploaded/i2/704298669/TB2D08RXZsb61BjSszbXXcvMpXa_!!704298669.jpg_400x400q90.jpg'
        ],
        isRefresh:false,
        isLoading:false,
        // 列表控制符
        finished:false,
        dataArray:[],
        msgCount:0,
      }
    },
    created() {
      this.uploadDataReq();
    },
    methods: {
      deleteMsg(item, index) {
        window.console.log('当前删除的消息索引:', index, '消息内容:', item);
        this.$dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          window.console.log('确定');
          this.dataArray.splice(index, 1);
          this.$toast.success('删除成功');
        }).catch(() => {
          window.console.log('取消');
        });
      },

      cellClicked(item, index) {
        window.console.log('当前点击cell索引:', index, '内容:', item);
        // 更改item会直接更改源数组里面索引为index的数据
        item.hasRead = true;
        this.getUnReadMsgCount();
      },

      // 下拉刷新
      onRefresh() {
        this.finished = false;
        this.uploadDataReq(true);
      },

      // 获取更多
      onLoad() {
        this.uploadDataReq(false);
      },

      // 数据请求
      uploadDataReq(refresh) {
        if (this.dataArray.length === 0) {
          // 自定义加载图标
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner'
          });
        }
        setTimeout(() => {
          if (refresh) {
            this.dataArray = [];
          }
          for (let i = 0; i < 8; i += 1) {
            this.dataArray.push({
              title:'李四',
              des:'青青河边草 悠悠天不老',
              time:utils.getTimeDetailDes(1576489956000),
              avatar:this.avatars[utils.getRandom()],
              hasRead:false,
            })
          }
          if (refresh) {
            this.$toast.success('刷新成功');
            this.isRefresh = false;
          } else {
            this.isLoading = false;
            if (this.dataArray.length >= 20) {
              this.finished = true;
            }
          }
          this.getUnReadMsgCount();
        }, 1500);
      },

      getUnReadMsgCount() {
        let unReadMsgArr = this.dataArray.filter(item => !item.hasRead);
        this.msgCount = unReadMsgArr.length > 0 ? unReadMsgArr.length : 0;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";

  /* 消除内敛块元素之间因为是取文本间隔道闸按钮之间出现间隔 */
  .van-swipe-cell {
    font-size: 0;
  }

  // van-cell padding 0.32rem 0
  .van-cell {
    height: 2.44rem;
    align-items: center;
    line-height: 0.8rem;
  }

  .van-cell:hover {
    background: #EDEDED;
  }

  // cell-title 标题
  .van-cell--large .van-cell__title {
    font-size: 0.4rem;
    margin-left: 0.2rem;
  }

  // cell-label 描述
  .van-cell--large .van-cell__label {
    font-size: 0.3rem;
  }

  // cell-value 右侧值
  .van-cell__value {
    font-size: 0.4rem;
  }

  // cell-icon
  .van-cell__left-icon {
    height: 2rem;
  }

  .van-icon__image {
    width: 1.8rem;
    height: 1.8rem;
  }

  .van-icon {
    width: 1.8rem;
    height: 1.8rem;
  }


  // 滑动按钮
  .van-button {
    height: 2.64rem;
    line-height: 2.64rem;
  }


</style>