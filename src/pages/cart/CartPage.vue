<template>
  <div class="content">
    <p>cart</p>
    <TabBar id="2" />
  </div>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  export default {
    name: "CartPage",
    components: {
      TabBar,
    },
    props: {

    },
    data() {
      return {
        resultDic:{},
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>