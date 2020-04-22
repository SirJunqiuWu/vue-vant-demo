import axios from 'axios';
import * as urlConfig from '../core/url.config';
import router from '../router'
import {
  ToastUtil
} from "../utils/toastUtil";
import {
  RouterUtil as StoreAndRouterUtil
} from "../utils/routerUtil";
import {
  utility
} from "../utils/utility";
import {
  Toast
} from 'vant'
import * as md5 from "md5";
import {UserInfo} from "./user-info-ids";
import {AlertUtil} from "../utils/alertUtil";
import lrz from "lrz"
import Axios from "../utils/agent-utils/Axios";

function loading(message = '请求中...') {
  return Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message
  });
}

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
  reason => P.resolve(callback()).then(() => {
    throw reason
  })
)
};


export class Http {
  static http = axios.create({
    baseURL: urlConfig.BASE_URL,
    timeout: 60000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  static jsonHttp = axios.create({
    baseURL: urlConfig.BASE_URL,
    timeout: 60000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  static uploadHttp = axios.create({
    baseURL: urlConfig.BASE_URL,
    timeout: 60000,
    withCredentials: true,
    headers: {}
  });

  // axios.interceptors
  static localHttp = axios.create({
    baseURL: '',
    timeout: 60000
  });

  //get
  static get(url, params = {}, showLoading) {
    const load = showLoading ? ToastUtil.loading() : null;
    return Http.http.get(url, {
      params: injectParams(params)
    }).then(res => {
      load && load.clear();
    const data = Http.AgentDataToMallData(res.data);
    Http.publicVerify(data);
    return data;
  }).catch(error => {
      load && load.clear();
    Http.catchErrors(error);
    throw error;
  })
  }

  //post
  static post(url, data, showLoading,encodeUri) {
    const load = showLoading ? ToastUtil.loading() : null;
    let params = utility.addQueryParamByObj(utility.clearNullObject(injectParams(data)),encodeUri);
    return Http.http.post(url, params).then(res => {
      load && load.clear();
    const data = Http.AgentDataToMallData(res.data);
    Http.publicVerify(data);
    return data;
  }).catch(error => {
      load && load.clear();
    Http.catchErrors(error);
    throw error;
  })
  }



  //post json
  static postJson(url, data, showLoading) {
    const load = showLoading ? ToastUtil.loading() : null;
    const params = JSON.stringify(injectParams(data));
    return Http.jsonHttp.post(url, params).then(res => {
      load && load.clear();
    const data = Http.AgentDataToMallData(res.data);
    Http.publicVerify(data);
    return data;
  }).catch(error => {
      load && load.clear();
    Http.catchErrors(error);
    throw error;
  })
  }

  // uploadFile
  static uploadFile(file) {
    const load = ToastUtil.loading();

    return new Promise((resolve,reject)=>{
      lrz(file,{width:600}).then(res=> {
        console.log(file,res);
    var newFile;
    if(res.file instanceof File){
      newFile = res.file;
    }else {
      newFile = new File([res.file],
        file.name,{
          lastModified:file.lastModified,
          type:file.type,
        });
      newFile.exifdata = file.exifdata
    }

    console.log('新图：',newFile.size,'原图：',file.size);
    const minSize = 1024 * 200;
    var params = new FormData();
    params.append('file', newFile.size<minSize?file:newFile);
    Http.uploadHttp.post('/bizworks-srv-sys/aliyunFile/upload', params).then(res => {
      load && load.clear();
    const data = Http.AgentDataToMallData(res.data);
    Http.publicVerify(data);
    resolve(data);
  }).catch(error => {
      load && load.clear();
    Http.catchErrors(error);
    reject();
  })
  }).catch(error=>{
      load && load.clear();
    ToastUtil.msg('压缩文件失败！');
    reject();
  });
  });

  }

  static AgentDataToMallData(data){
    //表示这个是经销商系统
    if(data.succ == false && typeof data.code != "undefined"){
      return {
        status:data.code,
        // detail:data.msg,
        detail:'',//经销商的错误信息给空
        data:null
      }
    }
    return  data;
  }

  static publicVerify( data) {
    data = data || {};
    var code = data.status || (data.succ==true?1:0);
    // console.log(data);

    //非1 抛出异常错误信息
    if (code != 1 && code != -9) {
      throw data.detail
    }
  }

  static catchErrors(error) {
    console.log('123123213123',error.response);
    if (typeof error == 'object') {
      error = '';
    }
    error =  typeof error == 'string'?error:`网络异常，请稍后重试`;
    ToastUtil.msg(error);
  }

  //读取本地文件
  static readLocalFile(url) {
    return Http.localHttp.get(url, {}).then(res => {
      if (res.status == 200) {
      return res.data;
    }
    throw res.statusText;
  });
  }
}

////拦截
Axios.interceptorsRequest(Http.http,false);
Axios.interceptorsResponse(Http.http);

Axios.interceptorsRequest(Http.jsonHttp,false);
Axios.interceptorsResponse(Http.jsonHttp);

Axios.interceptorsRequest(Http.uploadHttp,false);
Axios.interceptorsResponse(Http.uploadHttp);


//注入配置
// Axios.init();

//注入header
const injectHeader = (config) => {
  const userInfo = utility.getLocalStorage('UserInfo') || {};
  // const userInfo = {accountsUsers:{
  //     loginAppId:'0890489a-1df2-4c0f-b8ce-8b6efec6eb8e',loginSecret:'87965646-ebc2-426e-890e-a7477247b17f'
  //   }};
  const accountsUsers = userInfo.accountsUsers;
  if (userInfo && accountsUsers) {
    const appId = accountsUsers.loginAppId;
    const secret = accountsUsers.loginSecret;
    // let s = Math.floor(Math.random() * (99999999 - 10000000)) + 1000000000;
    // config.headers['sign'] = md5('loginAppId=' + appId + '&nonce=' + s + '&secret=' + secret);
    // config.headers['nonce'] = s;
    // config.headers['loginAppId'] = appId;
    config.headers.Authorization = JSON.parse(localStorage.getItem('Authorization')).token_type + ' ' + JSON.parse(localStorage.getItem('Authorization')).access_token
  }
  if (isLocalhost()) {
    config.headers['debug'] = 1;
    config.headers['agentId'] = UserInfo.getAgentId();
  }
  //添加APP标识
  config.headers['Authorization-App-Id'] = 'olP96opfyAUlXDPX';

  return config;
};

//注入参数
export const injectParams = (param) => {
  param = param || {};

  if (isLocalhost()) {
    // param.agentId = UserInfo.getAgentId();
    // param.agentId = 226;

    // if(param['notInjectAgentId']==true){
    // }else {
    //   param.agentId = 226;
    // }
  } else {
    delete param['agentId']
  }
  return param;
};

export const isLocalhost = ()=>{
  return location.hostname == 'localhost'
};

//自己发一个垃圾请求 来查看一些参数
export const post404Error = ({title,content})=>{

  let xhr = new XMLHttpRequest();
  let xhrType = 'post';
  xhr.withCredentials = true;
  xhr.open(xhrType, urlConfig.BASE_URL + 'index/error', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  // 声明请求源
  xhr.onreadystatechange = () => {
    let responseText = xhr.responseText;
    if (xhr.readyState === 4 && xhr.status === 200) {
    }
  };
  // xhr.send(JSON.stringify({title,content}));
};
