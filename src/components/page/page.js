
import Page from './page.vue'

function plugin(Vue){
  if(Vue.installed){
    return;
  }
  Vue.component('page',Page);
}

export default plugin;
