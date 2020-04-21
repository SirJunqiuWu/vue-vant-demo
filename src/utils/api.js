/* eslint-disable */
import constants from "vant/lib/sku/constants";

/***************************************************************************
 * 作者：吴俊秋
 * 作用: 该文件作为网络请求文件，项目中所有的网络请求都可以直接调用该文件中的方法
****************************************************************************/
import axios from 'axios';

// 测试环境基地址
const base_url_dev = 'http://dev.formyself.com/honey-vem-member/';
// 生产环境地址
const base_url_prod = '';

// 请求配置参数
const reqConfig = {
    async: true, // 是否异步请求
    timeout: 60 * 1000, // 超时时间默认60s
    type: 'get', // 默认post请求
    withCredentials: true, // 允许跨域请求
    isTestEnv: true, // 是否测试环境(上线时更改该值为false切换到正式环境)
};


// 错误code值
const codeEnum = {
    // 未登录
    UNLOGIN: 100,
    // 请求成功
    SUCCESSED: 200,
};

/* 网络请求配置类 */
export class Http {
  static http = axios.create({
    baseURL: base_url_dev,
    timeout: 60000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  static jsonHttp = axios.create({
    baseURL: base_url_dev,
    timeout: 60000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // get
  static get(url, params = {}) {
    return Http.http.get(url, {
      params: params
    }).then(res => {
      window.console.log('请求结果:', res);
      return res;
    }).catch(error => {
      window.console.log('请求出错:', error);
      throw error;
    })
  }
}

const _url = 'http://member.formyself.com/honey-vem-member/member/level/all';
const token = 'ZpRtqNWsUcsKSVtbKOWFkjHCYlKNwnPK';
const _param = {
    appid:'formyself',
    nonce:'0581888548',
    sign:'7C7FB000E00C6F918FE0F2A3C65A6FD8',
    timestamp:1576755136
}


// 根据url 和 请求参数获取值
// success函数 和 faile函数用于回调请求结果
// xhr：用于创建 XMLHttpRequest 对象的函数。
// 和后台约定好返回数据解构(固定, 切记随意改变外层结构)
// 返回数据结构eg：result = {code:'0', msg:'', data:{(前端展示的数据都在里面，想给什么都可以随意扩充)}};
// 请求失败时 或者 请求有其他异常问题时才有failed函数回调, 前端只需要将回调的错误提示展示出来就可以
// 请求成功时, 回调函数successd直接将页面需要的数据源回调
// status: success failed
const getDataReq = (options = {}) => {
    console.log('options:', options);
    const { url, param, successd = () => 0, failed = () => 1} = options;
    let reqURL = getTotalURL(url);
    $.ajax({
        async: reqConfig.async,
        url: _url,
        data: _param,
        timeout: reqConfig.timeout,
        type: reqConfig.type,
        xhrFields: {
            // 跨域请求设置
            withCredentials: reqConfig.withCredentials,
        },
        beforeSend:function(request) {
            request.setRequestHeader('sso_token', token);
        },
        success: function(result, status, xhr) {
            // 请求成功
           window.console.log('请求成功结果:', result, '状态:', status, 'xhr:', xhr);
            // 请求头返回code === 100时 未登录
            let errorCode = xhr.getResponseHeader('error_code');
            if (errorCode === codeEnum.UNLOGIN) {
                // 未登录 调起登录界面
                window.console.log('未登录');
            } else {
                // 请求成功
                let msg = result.message;
                let data = result.data;
                let code = result.code;
                // 回调后 成功只管显示出局 failed直接弹出msg(后端将什么无权限数据库错误等异常代码直接转化返回msg,前端无需管代码对应问题)
                if (code == 0) {
                    successd(data);
                } else {
                    failed(msg);
                }
            }
        },
        error: (xhr, status, error) => {
            // 请求失败要运行的函数
            window.console.log('ajax-error:', xhr, status, error);
            xhr.abort();
            failed(error);
        },
        complete: (xhr, status) => {
            // 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。
            window.console.log('请求完成:', xhr, status);
            // 请求完成 可做请求task个数统计,并发个数控制用 可做加载框隐藏等处理

        }
    });
}

// get请求
const getReq = (options = {}) => {
  const { url, param, successd = () => 0, failed = () => 1} = options;
  let reqURL = getTotalURL(url);
  this.$axios.get(reqURL, {
    params:param,
    headers:{
      // 这里设置token等
    }
  }).then(function (response) {
      window.console.log('当前网络请求成功:', response);
      successd(response);
  }).catch(function (error) {
      window.console.log('当前网络请求失败:', error);
      failed(error);
  });
}

// post请求
const postReq = (options = {}) => {
  const { url, param, successd = () => 0, failed = () => 1} = options;
  let reqURL = getTotalURL(url);
  this.$axios.post(reqURL, {
    params:param
  }).then(function (response) {
    window.console.log('当前网络请求成功:', response);
    successd(response);
  }).catch(function (error) {
    window.console.log('当前网络请求失败:', error);
    failed(error);
  });
}

// 获取完整url
function getTotalURL(url) {
  let reqURL = '';
  if (reqConfig.isTestEnv) {
    reqURL = base_url_dev + url;
  } else {
    reqURL = base_url_prod + url;
  }
  return reqURL;
}

// 导出接口犯法
export const api = {
  getDataReq,
  getReq,
  postReq,
}