<template>
  <page :has-header="showNav" :has-footer="true">
    <template slot="header">
      <!-- 导航 -->
      <NavBar  title="消息" :show-left="false"></NavBar>
    </template>
    <template slot="content">
      <van-tabs
              v-model="selectIndex"
              animated
              sticky
              background="#e8e8e8"
              type="card"
              @click="changeMenue"
      >
        <van-tab v-for="(item, index) in menueArr" :key="index" :title="item" />
      </van-tabs>
      <van-pull-refresh
        v-model="isRefresh"
        pulling-text="下拉刷新"
        loosing-text="松手即可刷新"
        loading-text="正在努力的刷新"
        @refresh="onRefresh"
      >
<!--   消息列表     -->
        <van-list

                v-model="isLoading"
                :finished="finished"
                :offset="100"
                :immediate-check="false"
                finished-text="————— 我是有底线的 ——————"
                @load="onLoad"
        >
          <van-swipe-cell
                  v-show="selectIndex === 0"
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
                      class="delete-btn"
                      square
                      type="danger"
                      text="删除"
                      @click="deleteMsg(item, index)"
              />
            </template>
          </van-swipe-cell>
          <!--    申请列表    -->
          <van-panel
                  v-show="selectIndex === 1"
                  v-for="(item, index) in dataArray"
                  :key="index"
                  title="Lucy"
                  desc="快加我吧,我是你的粉丝"
                  status="待通过"
          >
            <div class="apply-content">我们都有一个家 名字叫中国 家里盘着两条龙  是长江和黄河  还有那珠穆朗玛峰 是世界最高坡</div>
            <template #footer>
              <div class="apply-btn">
                <div />
                <div>
                  <van-button size="small" @click="applyBtnPressed(0, item)">拒绝</van-button>
                  <van-button size="small" type="danger" @click="applyBtnPressed(1, item)">同意</van-button>
                </div>
              </div>

            </template>
          </van-panel>
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
  import {api} from "../../utils/api";

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
        selectIndex:0,
        showNav:!utils.isWeChat(),
        menueArr:['消息', '申请'],
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
        applyArray:[],
        msgCount:0,
      }
    },
    created() {
      // 网页标题更改
      document.title = '消息';
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

      /**
       * 下拉刷新
       */
      onRefresh() {
        this.finished = false;
        this.uploadDataReq(true);
       },

      /**
       * 加载更多
       */
      onLoad() {
        this.uploadDataReq(false);
      },

      /**
       * 获取数据
       * @param refresh 是否是刷新 ture是 反之为加载更多
       */
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
              id: i,
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
        }, 1000);
      },

      /**
       * 获取未读消息数目
       */
      getUnReadMsgCount() {
        // 数组根据元素字段过滤拿到新数组
        let unReadMsgArr = this.dataArray.filter(item => !item.hasRead);
        this.msgCount = unReadMsgArr.length;
      },

      changeMenue(name, title) {
        this.selectIndex = name;
        this.dataArray = [];
        utils.log('name', name);
        utils.log('title', title);
        this.onRefresh();
      },

      /**
       * 申请按钮点击事件
       * @param idx 0拒绝 1同意
       * @param item 当前点击行数据
       */
      applyBtnPressed(idx, item) {
        if (idx === 0) {
          this.$toast.success(`已拒绝${item.id}`);
        } else {
          this.$toast.success(`已同意${item.id}`);
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/px2rem.less";

  /* 消除内敛块元素之间因为是取文本间隔导致按钮之间出现间隔 */
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
  .delete-btn {
    height: 2.64rem;
    line-height: 2.64rem;
  }

  .van-tabs.van-tabs--card {
    padding: px2rem(12);
  }

  .apply-content {
    padding: px2rem(12);
    font-size: px2rem(15);
    color: #383838;
  }

  .apply-btn {
    display: flex;
    justify-content: space-between;
  }

</style>