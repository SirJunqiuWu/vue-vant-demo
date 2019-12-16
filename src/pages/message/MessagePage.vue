<template>
  <page :has-header="showNav" :has-footer="true">
    <template slot="header">
      <!-- 导航 -->
      <NavBar  title="消息" :show-left="false"></NavBar>
    </template>
    <template slot="content">
      <van-pull-refresh
        v-model="isLoading"
        pulling-text="下拉刷新"
        loosing-text="松手即可刷新"
        loading-text="正在努力的刷新"
        @refresh="onRefresh"
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
            icon="https://gd1.alicdn.com/imgextra/i1/11275593/TB2UujjawmTBuNjy1XbXXaMrVXa_!!11275593.jpg"
            @click="cellClicked(item, index)"
          />
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
      </van-pull-refresh>
    </template>
    <template slot="footer">
      <TabBar :index="3" />
    </template>
  </page>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  import NavBar from '../../components/NavBar.vue';
  import {utils} from "../../utils/utils";
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
        isLoading:false,
        dataArray:[
          {
            title:'张三',
            des:'你妈喊你回家吃饭了',
            time:utils.getTimeDetailDes(1576489875000)
          },
          {
            title:'张三',
            des:'我要下课了。明天再约吧。',
            time:utils.getTimeDetailDes(1576367475000)
          },
          {
            title:'张三',
            des:'你妈喊你回家吃饭了',
            time:utils.getTimeDetailDes(1576281075000)
          },
          {
            title:'张三',
            des:'你妈喊你回家吃饭了',
            time:utils.getTimeDetailDes(1573689075000)
          },
          {
            title:'张三',
            des:'你妈喊你回家吃饭了',
            time:utils.getTimeDetailDes(1573343475000)
          },
        ]
      }
    },
    methods: {
      deleteMsg(item, index) {
        window.console.log('当前删除的消息索引:', index, '消息内容:', item);
        this.$dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          window.console.log('确定');
          this.$toast.success('删除成功');
        }).catch(() => {
          window.console.log('取消');
        });
      },

      cellClicked(item, index) {
        window.console.log('当前点击cell索引:', index, '内容:', item);
      },

      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          for (let i = 0; i < 5; i += 1) {
            this.dataArray.push({
              title:'李四',
              des:'青青河边草 悠悠天不老',
              time:utils.getTimeDetailDes(1576489956000),
            })
          }
          this.isLoading = false;
        }, 1500);

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
    height: 2.64rem;
    align-items: center;
    line-height: 0.8rem;
  }

  // cell-title 标题
  .van-cell--large .van-cell__title {
    font-size: 0.5rem;
  }

  // cell-label 描述
  .van-cell--large .van-cell__label {
    font-size: 0.4rem;
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
    width: 2rem;
    height: 2rem;
  }


  // 滑动按钮
  .van-button {
    height: 2.64rem;
    line-height: 2.64rem;
  }


</style>