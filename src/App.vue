<template>
  <!--<page-->
    <!--id="app"-->
    <!--:has-header="true"-->
    <!--:has-footer="true"-->
  <!--&gt;-->
    <!--<template slot="header">-->
      <!--&lt;!&ndash; 导航 &ndash;&gt;-->
      <!--<NavBar-->
        <!--v-show="showNav"-->
        <!--:title="title"-->
        <!--:show-left="showLeft"-->
      <!--/>-->
    <!--</template>-->

    <!--<template slot="content">-->
      <!--<transition :name="transitionName">-->
        <!--<router-view class="router"></router-view>-->
      <!--</transition>-->
    <!--</template>-->

    <!--<template slot="footer">-->
      <!--<TabBar />-->
    <!--</template>-->
  <!--</page>-->

  <div id="app">
    <!--&lt;!&ndash; 导航 &ndash;&gt;-->
    <!--<NavBar-->
      <!--v-show="showNav"-->
      <!--:title="title"-->
      <!--:show-left="showLeft"-->
    <!--/>-->

    <transition :name="transitionName">
      <router-view class="router"></router-view>
    </transition>

    <!--<TabBar />-->
  </div>
</template>

<script>
// import NavBar from './components/NavBar.vue';
// import TabBar from './components/TabBar.vue';
import {isWeChat, setStoregeItem} from "./utils/utils";
import {tabTitles} from './router/router'
import Vue from 'vue';
import {Toast, Dialog} from 'vant';
Vue.use(Toast).use(Dialog);

export default {
  name: 'app',
  components: {
    // NavBar,
    // TabBar
  },
  // 数据源 给组件分发数据用
  data() {
    return {
      // 导航栏控制符
      showNav:true,
      title:'登录',
      showLeft:false,
      transitionName:'fade',
    }
  },
  mounted() {
    //检测浏览器类型决定是否展示导航栏
    let isWe = isWeChat();
    isWe = true;
    this.showNav = isWe;
    this.title = this.$route.name;
  },

  // 基于路由变化的动态 设置路由切换动画
  watch:{
    $route(to, from) {
      window.console.log('to:', to);
      window.console.log('from:', from);
      // 仅登录时导航不显示返回按钮 其他都显示
      this.title = to.name;

      // 网页标题更改
      document.title = this.title;

      if (to.path === '/login') {
        setStoregeItem('tabIndex', 0);
      }

      // Tab界面不需要显示导航
      if (tabTitles.indexOf(this.title) == -1 && this.title !== '登录') {
        this.showLeft = true;
      } else {
        this.showLeft = false;
      }

      let toDepth = to.path.split("/").length;
      let fromDepth = from.path.split("/").length;
      // window.console.log('toPath:', to.path.split("/"));
      // window.console.log('fromPath:', from.path.split("/"));
      if (toDepth != fromDepth) {
        this.transitionName =
          toDepth < fromDepth ? "slide-right" : "slide-left";
      } else {
        // 如果是层级为1一级界面
        this.transitionName = "fade";
      }
    }
  },
  methods:{

  }
}
</script>

<style scoped lang="less">
  @import "./styles/px2rem.less";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*font-size: px2rem(20);*/
  width: 100%;
  height: 100%;
}

.router {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  transition: all 500ms ease;
  box-shadow: px2rem(-2)  0 px2rem(30) rgba(0, 0, 0, 0.1);
}

.slide-left-enter,
.slide-right-leave-active {
  transform: translate(100%, 0);
  z-index: 1000;
}

/*解决页面层级显示在滑动上层问题*/
.slide-left-leave-active,
.slide-left-leave-to {
  z-index: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
