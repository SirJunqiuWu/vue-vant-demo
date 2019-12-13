<template>
  <page :has-header="true">
    <template slot="header">
      <NavBar :show-left="true" :title="title" />
    </template>
    <template slot="content">
      <div>
        <iframe class="web-view" id="web" :src="url"  frameborder="0" scrolling="auto" title="testTitle"></iframe>
      </div>
    </template>
  </page>
</template>

<script>
  import NavBar from '../../components/NavBar.vue'
  export default {
    name: "WebPage",
    components:{
      NavBar
    },
    props:{

    },
    data(){
      return{
        title:'',
        url:'',
      }
    },
    mounted() {
      this.getParams();
      setTimeout(() => {
        this.uploadUI();
      }, 200)

    },
    methods:{
      // 获取传递过来的参数
      getParams() {
        // 用path来找到该路由的话 参数通过query获取
        // 用name来找路由的话 参数通过params获取
        window.console.log('webPage params:', this.$route.query);
        this.title = this.$route.query.title;
        this.url = this.$route.query.src;
      },
      uploadUI() {
        // 更改iframe的大小
        let web = document.getElementById("web");
        web.height = window.innerHeight;
        web.width = window.innerWidth;

        // 跨域不行 统一域名下可以
       // let str =  document.getElementById('web').contentDocument.title;
       // window.console.log('内嵌标题:', str);
      }
    },
    watch: {
      $route (to) {
        this.title = to.query.title;
      }
    }
  }
</script>

<style scoped>
  .web-view {
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*bottom: 0;*/
  }
</style>