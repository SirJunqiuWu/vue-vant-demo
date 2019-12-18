<template>
  <page :has-header="true" :has-footer="false">
    <template slot="header">
      <NavBar title="商品详情" :show-left="true" />
    </template>

    <template slot="content">

    </template>

  </page>
</template>

<script>
  import NavBar from '../../components/NavBar.vue';
  export default {
    name: "GoodsDetailPage",
    components:{
      NavBar,
    },
    props:{

    },
    data() {
      return {

      }
    },
    created() {

    },
    methods:{

    }
  }
</script>

<style scoped>

</style>