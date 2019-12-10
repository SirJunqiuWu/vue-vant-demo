<template>
  <div id="app">

    <!-- 导航 -->
    <NavBar v-show="showNav" :title="title" :show-left="showLeft"></NavBar>

    <!-- 对应的组件内容渲染到router-view中 -->
    <div>
      <transition :name="transitionName">
        <router-view class="router"></router-view>
      </transition>
    </div>

  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import {isWeChat} from "./utils/utils";
import Vue from 'vue';
import {Toast} from 'vant';
Vue.use(Toast);

export default {
  name: 'app',
  components: {
    NavBar,
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
    this.showNav = !isWe;
    this.title = this.$route.name;
  },

  // 基于路由变化的动态 设置路由切换动画
  watch:{
    $route(to, from) {
      window.console.log('to:', to);
      window.console.log('from:', from);
      // 仅登录时导航不显示返回按钮 其他都显示
      this.showLeft = to.name !== '登录';
      this.title = to.name;

      // Tab界面都需要显示TabBar
      let tabBarTitiles = ['首页', '购物车', '商城', '我的'];
      if (tabBarTitiles.indexOf(to.name === -1)) {
        this.showTabBar = false;
        this.showLeft = false;
      } else {
        this.showTabBar = true;
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

.router {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  transition: all 500ms ease;
  box-shadow: -2px 0 30px rgba(0, 0, 0, 0.1);
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
