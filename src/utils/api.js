/* eslint-disable */
import constants from "vant/lib/sku/constants";

/***************************************************************************
 * 作者：吴俊秋
 * 作用: 该文件作为网络请求文件，项目中所有的网络请求都可以直接调用该文件中的静态类方法
****************************************************************************/

// 引入网络请求类
import axios from 'axios';
import {utils} from "./utils";

// 测试环境基地址
const base_url_dev = 'http://dev.formyself.com/honey-vem-member/';
// 生产环境基地址
const base_url_prod = '';

// 请求配置参数
const reqConfig = {
    async: true, // 是否异步请求
    timeout: 6000, // 超时时间默认60s
    type: 'get', // 默认post请求
    withCredentials: true, // 允许跨域请求
    isTestEnv: true, // 是否测试环境(上线时更改该值为false切换到正式环境)
};


// 请求返回错误code值
const codeEnum = {
    // 未登录
    UNLOGIN: 99,
    // 请求成功
    SUCCESSED: 1,
};

/* 网络请求配置静态类 */
export class Http {
  //  直接传obj
  static http = axios.create({
      baseURL: Http.getBaseUrl(),
      timeout: reqConfig.timeout,
      withCredentials: reqConfig.withCredentials,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  });

  // 传json字符串
  static jsonHttp = axios.create({
      baseURL: Http.getBaseUrl(),
      timeout: reqConfig.timeout,
      withCredentials: reqConfig.withCredentials,
      headers: {
          'Content-Type': 'application/json'
      }
  });

  static uploadHttp = axios.create({
      baseURL: Http.getBaseUrl(),
      timeout: reqConfig.timeout,
      withCredentials: reqConfig.withCredentials,
      headers: {}
  });

    /**
     * get请求
     * @param url 请求url
     * @param params 请求参数字典
     * @returns {Promise<AxiosResponse<any>>} 回调
     */
  static get(url, data = {}) {
      window.console.log(isLocalhost());
      return Http.http.get(url, {
          params: injectParam(data)
      }).then(res => {
          window.console.log('get请求结果:', res);
          // 转化下res
          const data = Http.dealDataWithResult(res.data);
          // 校验是否条件符合
          Http.publicVerify(data);
          return data;
      }).catch(error => {
          window.console.log('get请求出错:', error);
          if (error) {
              const err = Http.catchError(error);
              throw err;
          }
      })
  }

    /** post请求
     *
     * @param url 请求链接
     * @param param 请求参数
     * @param isEncodeUrl 是否需要对参数拼接字符串编码 ture为需要
     * @returns {Promise<AxiosResponse<any>>} 回调
     */
  static post(url, data = {}, isEncodeUrl) {
      let params = utils.addQueryParamByObj(utils.clearNullObject(injectParam(data)), isEncodeUrl);
      window.console.log("params:", params);
      return Http.http.post(url, params).then(res => {
          window.console.log('post请求结果:', res);
          const data = Http.dealDataWithResult(res.data);
          Http.publicVerify(data);
          return data;
      }).catch(error => {
          window.console.log('post请求出错:', error);
          if (error) {
              const err = Http.catchError(error);
              throw err;
          }
      });
  }

  static uploadFile() {
      return new Promise((resolve, reject) => {

      }).catch(error => {

      })
  }

    /**
     * 请求参数为json字符串
     * @param url 请求url
     * @param data 请求参数字典
     * @returns {Promise<AxiosResponse<any>>} 回调
     */
  static postJson(url, data = {}) {
      const params = JSON.stringify(injectParam(data));
      return Http.jsonHttp.post(url, params).then(res => {
          const data = Http.dealDataWithResult(res.data);
          Http.publicVerify(data);
          return data;
      }).catch(error => {
          window.console.log('postJson请求出错:', error);
          if (error) {
              const err = Http.catchError(error);
              throw err;
          }
      });
  }


    /**
     * 获取完整的请求url
     * @param url 方法部分的url
     * @returns {string}
     */
  static getTotalUrl(url) {
      let reqURL = '';
      if (reqConfig.isTestEnv) {
          reqURL = base_url_dev + url;
      } else {
          reqURL = base_url_prod + url;
      }
      return reqURL
  }

    /**
     *  是否是测试环境
     * @returns {boolean} true是 反之不是
     */
  static isTestEnv () {
      return reqConfig.isTestEnv;
  }

    /**
     * 获取请求基地址
     * @returns {string}
     */
  static getBaseUrl () {
      return reqConfig.isTestEnv ? base_url_dev : base_url_prod;
  }

    /**
     * 请求成功时做校验是否是目标成功 可能有条件不符合
     * @param data 请求返回的数据
     */
  static publicVerify (data) {
      data = data ? data : {};
      const code = data.status || (data.success ? 1 : 0);
      // code不为1 抛出异常消息
      if (code != codeEnum.SUCCESSED) {
          throw data.detail ? data.detail : '网络异常，请稍后重试';
      }
  }


    /**
     * 请求失败错误处理
     * @param error 请求出错error
     * @returns {string}
     */
   static catchError (error) {
      if (typeof error === 'object') {
          error = '';
      }
      error = typeof error == 'string' ? error : '网络异常，请稍后重试';
      return error;
   }

    /**
     * 将请求返回的数据作处理
     * @param res 请求成功返回的数据
     * @returns {*}
     */
  static dealDataWithResult = (res) => {
      const data = res;
      return data;
  }
}

/**
 * 注入请求参数字典:可做安全处理等
 * @param param
 * @returns {{}}
 */
export const injectParam = (param) => {
    param = param ? param : {};
    return param;
}


/**
 * 网页链接域名是否是localhost：
 * @returns {boolean}
 */
export const isLocalhost = () => {
    return location.hostname === 'localhost'
};



// 导出方法
export const api = {

}