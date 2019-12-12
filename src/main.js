import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Page from './components/page/page.js';

import './styles/index.less';
import './styles/override.less';
import './styles/vant.reset.less';
import './styles/base/common.less';

Vue.use(Page);

Vue.config.productionTip = false;

// designSize:设计图尺寸(传@1x倍图尺寸,例如设计图是750px,2倍图,那么传375),rootValue:比例,默认100
// vant-ui是按设计稿750来设计的
// vant-ui适配rem
function setHtml(designSize, rootValue) {
  let rootV = rootValue ? rootValue : 100;
  // 窗口宽度
  const winWidth = window.document.documentElement.clientWidth;
  // 如果窗口宽度超过1.5倍设计图了,则不再调整
  if (winWidth > 1.5 * designSize) {
    return;
  }
  window.console.log(winWidth);
  const htmlFontSize = winWidth * rootV / designSize / 3;
  window.document.documentElement.style.fontSize = htmlFontSize + 'px';
}
setHtml(375);


// 根实例
new Vue({
  // 将router注入根实例
  router,
  render: h => h(App),
}).$mount('#app')
