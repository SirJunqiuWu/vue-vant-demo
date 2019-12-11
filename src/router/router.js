import Vue from "vue";
import VueRouter from 'vue-router';
import {getStoregeItem} from "../utils/utils";

import LoginPage from '../components/MainList';
import HomePage from "../pages/home/HomePage";
import ShoppingMallPage from '../pages/shopping-mall/ShoppingMallPage';
import Cartpage from '../pages/cart/CartPage';
import MessagePage from '../pages/message/MessagePage';
import MyPage from "../pages/my/MyPage";
import AboutUsPage from '../pages/my/AboutUsPage';

Vue.use(VueRouter);

export const tabPages = [HomePage, ShoppingMallPage, Cartpage, MessagePage, MyPage];
export const tabTitles = ['首页', '商城', '购物车', '消息', '我的'];

// 是否登录
const isLogined = getStoregeItem('token') ? true : false;

// 一组路由
export const routes = [
  {
    path:'/login',
    name:'登录',
    component:LoginPage
  },
  {
    path:'/home',
    name:tabTitles[0],
    component:tabPages[0]
  },
  {
    path:'/shopping-mall',
    name:tabTitles[1],
    component:tabPages[1]
  },
  {
    path:'/cart',
    name:tabTitles[2],
    meta:{
      // 需要登录
      requireAuth:true,
    },
    component:tabPages[2]
  },
  {
    path:'/message',
    name:tabTitles[3],
    meta:{
      // 需要登录
      requireAuth:true,
    },
    component:tabPages[3]
  },
  {
    path:'/my',
    name:tabTitles[4],
    meta:{
      // 需要登录
      requireAuth:true,
    },
    component:tabPages[4],
  },
  {
    path:'/about-us',
    name:'关于我们',
    component:AboutUsPage
  },
  {
    // 重定向：默认时
    path: '/',
    name: isLogined ? tabTitles[0] : '登录',
    redirect: isLogined ? '/home' : '/login'
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
};

// 路由守卫: 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 需要登录
    const token = getStoregeItem('token');
    if (token) {
      // 判断当前的token是否存在(登录存入的token) 若存在则直接跳转
      next();
    } else {
      // 未登录
      next({
        path: '/',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

export default router;

