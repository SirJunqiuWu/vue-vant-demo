import {utility} from "./utility";
import {Toast} from "vant";

export class ToastUtil {

  static msg(message,options) {
    if (utility.isEmptyString(message)) {
      return
    }
    options = options || {};
    Toast(message,{
      duration:options.duration || 2000
    });
  }

  //加载loading
  static loading(message = '请求中...') {
    return Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message
    });
  }

  //关闭loading
  static close(all){
    Toast.clear(all);
  }
}


