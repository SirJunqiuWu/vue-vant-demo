import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

Vue.config.productionTip = false;

// 根实例
new Vue({
  // 将router注入根实例
  router,
  render: h => h(App),
}).$mount('#app')
