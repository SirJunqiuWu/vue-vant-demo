<template>
    <div id="app">
      <!-- Logo -->
      <van-image
        class="logo"
        width="90"
        height="90"
        :src="logo"
      />
      <h3>智慧安防</h3>
      <!-- 输入框 -->
      <van-cell-group>
        <van-field
          v-model="username"
          large
          type="number"
          label="手机号"
          placeholder="请输入手机号"
          left-icon="phone-circle"
          clearable
          maxlength="11"
          :error-message="mobileError"
          :value="username"
          @input="changeValue(0)"
        />
        <van-field
          v-model="password"
          large
          :type="pwdFiledType"
          label="密码"
          placeholder="请输入密码"
          left-icon="lock"
          right-icon="eye"
          clearable
          @click-right-icon="showPassword"
          @input="changeValue(1)"
        />
        <van-field
          v-model="sms"
          large
          type="tel"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          left-icon="lock"
          @input="changeValue(2)"
        >
          <van-button slot="button" size="small" type="info" @click="sendSmsCode">{{sendCodeBtnTitle}}</van-button>
        </van-field>
      </van-cell-group>

      <!-- 登录按钮 -->
      <van-button class="login-btn" :loading="loading" :disabled="loginDisable" type="info" loading-text="登录中..." @click="login">登录</van-button>
    </div>
</template>

<script>
  // 引入 Vue
  import Vue from 'vue';
  // 引入需要的组件
  import { Field, CellGroup, Button, Toast, NavBar, Loading, Image} from 'vant';
  // 引入全部样式
  import 'vant/lib/index.css';
  // 本地图标引入
  import appLogo from '../assets/app-logo.png'
  // 工具类方法
  import {isMobileLegal, showHud, utils} from '../utils/utils'
  // 使控件作用
  Vue.use(Field).use(CellGroup).use(Button).use(Toast).use(NavBar).use(Loading).use(Image);

  export default {
    // 控件导出名字, 作为父视图引入该组件的名字
    name: "MainList",
    // 控件参数 和父视图解耦用 定义了参数名和类型,供父视图给自己传值
    props:{

    },
    // 组件内部数据源 可在内部更改 并传到父视图(不能和pros属性值重名)
    data() {
      return {
        username:'18321567392', // 绑定为手机号输入框值
        password:'', // 绑定为密码输入框值
        sms:'', // 绑定为验证码输入框值
        sendCodeBtnTitle:'发送验证码',
        duration:60, // 倒计时时长60s
        loginDisable: false, // 登录按钮是否可点 true不能点 反之可以
        mobileError:'', // 手机错误提示信息 直接在输入框下方提示
        pwdFiledType:'password', // 显示或者隐藏密码 隐藏密码时为password 反之tel
        loading:false,
        zIndex:888,
        logo:appLogo,
        timer:null, // 定时器
      }
    },
    // 组件内部方法,可通过$emit方法向父视图传递方法名和参数,父视图实现该方法名对应的方法,即为传递事件
    methods:{
      // 组件里面的方法 可向父视图传递
      // 显示或者隐藏密码
      showPassword() {
        if (this.pwdFiledType === 'password') {
          // 显示密码
          this.pwdFiledType = 'tel';
        } else {
          // 隐藏密码
          this.pwdFiledType = 'password';
        }
      },

      // 文本框值改变事件
      changeValue(type) {
        window.console.log('type:', type);
        if (this.username.length > 0 && this.password.length > 0 && this.sms.length > 0) {
          this.loginDisable = false;
        } else {
          this.loginDisable = false;
        }

        // 更改手机号 错误消息
        if (type === 0) {
          this.mobileError = '';
        }
      },

      sendSmsCode() {
        Toast('发送验证码成功');
        this.timer = setInterval(() => {
          // 定时器里的箭头函数 指向最外层
          this.duration --;
          window.console.log('duration:', this.duration);
          if (this.duration === 0) {
            this.sendCodeBtnTitle = '发送验证码';
            this.duration = 10;
            clearInterval(this.timer);
          } else {
            this.sendCodeBtnTitle = this.duration + 's';
          }
        }, 1000);
      },

      // 登录
      login() {
        if (this.username.length === 0) {
          Toast('请填写手机号');
          return;
        }
        if (this.username.length > 11 || !isMobileLegal(this.username)) {
          this.mobileError = '请输入正确的手机号';
          return;
        }

        if (this.password.length === 0) {
          Toast('请填写密码');
          return;
        }

        if (this.sms.length === 0) {
          Toast('请输入验证码');
          return;
        }
        // 向父视图传递名为login的事件并传参  父视图实现该login对应的方法即可
        window.console.log('登录:', this.username, this.password, this.sms);
        this.$emit('login', this.username, this.password, this.sms);

        this.loading = true;
        setTimeout(() => {
          showHud('登录成功');
          utils.setLocalStorage('username', this.username);
          utils.setLocalStorage('token', this.username);
          this.loading = false;
          this.$router.push("home");
          // 销毁定时器
          if (this.timer) {
            clearInterval(this.timer);
          }
        }, 1500);
      }
    }
  }
</script>

<!-- 该组件内部文件样式, scoped限定修改作用范围只在本组件, 不影响外部公共标签 -->
<style scoped>
  body, html {
    width: 100%;
  }

  .van-cell {
    text-align: left;
  }

  .logo {
    display: block;
    margin:20px auto 0;
  }

  .login-btn {
    display: block;
    margin:50px auto 0;
    width: 290px;
  }

  h3 {
    text-align: center;
    margin: 0 auto 50px;
  }
</style>