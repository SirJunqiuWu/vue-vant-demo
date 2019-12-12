<template>
  <page :has-header="true">
    <template slot="header">
      <NavBar  title="关于我们" :show-left="true"></NavBar>
    </template>
    <template slot="content">
      <p>aaa</p>
    </template>
  </page>
</template>

<script>
  import NavBar from '../../components/NavBar.vue';
  export default {
    name: "AboutUsPage",
    components:{
      NavBar
    }
  }
</script>

<style scoped>

</style>