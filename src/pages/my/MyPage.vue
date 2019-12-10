<template>
  <div class="content">
    <p>aaa</p>
  </div>
</template>

<script>
  // 引入 Vue
  import Vue from 'vue';
  import {Button} from 'vant';
  Vue.use(Button);
  export default {
    name: "MyPage",
    methods:{
      onClickLeft() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
p {
  font-size: 30px;
}
</style>