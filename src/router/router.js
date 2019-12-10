import Vue from "vue";
import VueRouter from 'vue-router';
import LoginPage from '../components/MainList';
import HomePage from "../pages/home/HomePage";
import MyPage from "../pages/my/MyPage";
Vue.use(VueRouter);


// 一组路由
export const routes = [
  {
    path:'/login',
    name:'登录',
    component:LoginPage
  },
  {
    path:'/home',
    name:'首页',
    component:HomePage
  },
  {
    path:'/my',
    name:'我的',
    component:MyPage
  },
  {
    // 重定向：默认时
    path: '/',
    name:'登录',
    redirect: '/login'
  }
];


// 路由管理者
let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;

