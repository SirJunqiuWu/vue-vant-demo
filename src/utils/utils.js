/* eslint-disable */
/*********************************************************************************
 * 作者：吴俊秋
 * 该文件是项目的工具类文件，常见方法，方便快速获取想要的结果 比如日期、时间戳、url参数的获取
 * 也可以做安全处理：数组安全取值 字符串安全判断  正则匹配等
*********************************************************************************/
import successLogo from '../assets/success.png'

  // 当前显示的hubBk，只能显示一个,showHud时先移除hud
let hudBk = null;

// 获取页面跳转时链接传值的信息字符串
export function getUrlAllParmInfo() {
    let result = window.location.search.substr(1);
    result = decodeURI(result);
    return result;
}

export function getParamWithObj(obj) {
  let result = null;
  let paramDic = {};
  if (obj.indexOf('&') == -1) {
    // 只有一个参数 数组元素为key=value
    result = obj.split('=');
    if (result && result.length >= 2) {
      let key= result[0];
      let value = result[1];
      paramDic[key] = value;
    }
  }  else {
    // 多个参数时 数组元素为key=value
    result = obj.split('&');
    for (let i = 0; i < result.length; i += 1) {
      let temp = result[i];
      temp = temp.split('=');
      if (temp && temp.length >= 2) {
          let key= temp[0];
          let value = temp[1];
          paramDic[key] = value;
      }
    }
  }
  return paramDic;
}


// 根据指定key和url后拼接的字符串信息获取对应key的值
export function getTargetParamWithKeyAndObj(key, obj) {
  let paramDic = getParamWithObj(obj);
  let result = paramDic[key];
  return result;
}


// 获取跳转连接中指定key对应的value
export function getUrlTargetKeyValueWithKey(key) {
  let obj = getUrlAllParmInfo();
  let paramDic = getParamWithObj(obj);
  let result = paramDic[key];
  return result;
}

// 根据时间戳和时间格式获取日期描述 eg：2019-11-26 11:37:30
const getDateByTimestampAndFormatter = (timestamp, formatter) => {
  let date = '';
  if (isNullStr(timestamp).length === 0) {
    date = new Date();
  } else {
    date = new Date(timestamp);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  if (formatter === 'yyyy-MM-dd') {
    return year + '-' + month + '-' + day;
  } else if (formatter === 'HH:mm') {
    return hour + ':' + minute;
  }
  return year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + second;
}

// 根据指定日期获取对应日期的时间戳
export function getTimestampByDate(date) {
  let result = new Date(date);
  return result.getTime();
}

// 获取时间最详细的描述
const getTimeDetailDes = (timestamp) => {
  const now = getDateByTimestampAndFormatter('', 'yyyy-MM-dd');
  const past = getDateByTimestampAndFormatter(timestamp, 'yyyy-MM-dd');
  let result = '';
  if (now == past) {
    // 当天的 返回HH:mm
    result = getDateByTimestampAndFormatter('', 'HH:mm');
  } else {
    // 非当天的 返回日期 yyyy-MM-dd
    result = past;
  }
  return result;
}

// 字符串安全处理 有问题的一律返回空字符串
export function isNullStr(str) {
  let result = '';
  if (!str || str === null || str === 'null'  || str === 'NULL') {
    result = '';
  } else {
    result = str;
  }
    return result;
}

/**
 * 隐藏目标字符串中一段字符, 以*替换(目标字符串必须大于1)
 * targetStr:目标字符串
 * startIdx: 替换段的第一个字符在目标字符中的索引
 * length: 需要替换的字符长度
 **/
export function maskStrWithStartIdxAndLength(targetStr, startIdx, length) {
  if (targetStr && targetStr.length == 1) {
    return '*';
  }
  if (targetStr  && targetStr.length >= startIdx + length) {
    // 字符串前面部分 + 替换部分 + 尾部部分
    return targetStr.substring(0, startIdx) + '****' + targetStr.substring(startIdx + length, targetStr.length);
  }
  return targetStr;
}


// 根据索引和数组源获取对应索引的元素
export function getObjectAtIndex(idx, datas) {
  if (idx >= datas.length) {
    return {};
  }
  return datas[idx];
}

// 手机号是否合法
export function isMobileLegal(mobile) {
  let reg = /^((13[0-9])|(14[5,7])|15([0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/;
  if (!reg.test(mobile)) {
    return false;
  }
  return true;
}

// 判断是否在微信中查看
const isWeChat = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (/MicroMessenger/i.test(ua)) return true;
  else return false;
};


// 判断是否是iOS设备
export let isIos = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) return true;
  else return false;
};

// 判断是否是QQ环境
export let isQQ = function() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/\sQQ/i) !== null) return true;
  else return false;

};

// 判断是否是Android环境
export let isAndroid = function() {
  const ua = navigator.userAgent.toLowerCase();
  if (/Android/i.test(ua)) return true;
  else return false;
};

// 根据存储key获取本地存储
export function getStoregeItem(name) {
  return JSON.parse(localStorage.getItem(name))
}

// 根据存储key和值进行本地存储(存储对象为字符)
const setStoregeItem = (name, val) => {
  localStorage.setItem(name, JSON.stringify(val))
}


/**
 * 判断字符是否是json字符串
 * @param str
 * @return {boolean}
 */
const isJSONString = (str) => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      if (str.indexOf('{') > -1 && obj) {
        return true;
      } else {
        return false;
      }

    } catch (e) {
      return false;
    }
  }
  return false;
};

/**
 * localStorage 数据保存本地
 * @param {string}key
 * @param {string | number | object}valueObject
 */
const setLocalStorage = (key, valueObject) => {
  let localStorage = window.localStorage;
  if (typeof valueObject === 'string' || typeof valueObject === 'number') {
    // 存值为json
    localStorage.setItem(key, valueObject);
  } else if (typeof valueObject === 'boolean') {
    if (valueObject) {
      localStorage.setItem(key, 'true');
    } else {
      localStorage.setItem(key, 'false');
    }
  } else if (valueObject === null || typeof valueObject === 'undefined') {
    localStorage.removeItem(key);
    window.console.log('LocalStorage:暂不支持存储:key=' + key + '\nvalueObject=' + JSON.stringify(valueObject));
  } else if (typeof valueObject === 'object') {
    localStorage.setItem(key, JSON.stringify(valueObject));
  } else {
    localStorage.removeItem(key);
    window.console.log('LocalStorage:暂不支持存储:key=' + key + '\nvalueObject=' + JSON.stringify(valueObject));
  }
};

/**
 * 根据key获取对象
 * @param {string}key
 * @return {any}
 */
const getLocalStorage = (key) => {
  let localStorage = window.localStorage;
  let valueObject = localStorage.getItem(key);
  if (typeof valueObject === 'string') {
    // valueObject = JSON.parse(valueObject);
    //尝试能否转成对象
    if (utils.isJSONString(valueObject)) {
      let parseObject = JSON.parse(valueObject);
      if (typeof parseObject === 'object') {
        return parseObject;
      }
    }
    return valueObject;
  } else {
    window.console.log('localStorage:无key=' + key + '值可取');
    return null;
  }
};

/**
 * 根据 标题 和 提示文本 控制台输出
 * @param {string}title 打印标题
 * * @param {string}text 打印出来的值
 * @return {window.console.log}
 */
const log = (title, value) => {
  const result = title + ':' + value;
  window.console.log(result);
}


// 页面交互toast提示
const showToast = (msg, duration, minWidth) => {
  // 显示时长 默认为2s
  duration = isNaN(duration) ? 2 : duration;

  // toast最小宽度 默认0.6
  minWidth = isNaN(minWidth) ? 60 : minWidth;

  // 创建div
  let m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "max-width:60%;padding:0 12px;height:40px;line-height:40px;color: rgb(255, 255, 255);text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;" + "min-width:" + minWidth + "px";

  document.body.appendChild(m);

  setTimeout(function() {
    // 定义消失的时间
    let d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function() {
      // 移除该标签
      document.body.removeChild(m)
    }, d * 1000);
  }, duration * 1000);
}


// 页面交互Hud提示
export function showHud(msg, image, duration) {
  // 先移除
  if (hudBk) {
    // 移除该标签
    document.body.removeChild(hudBk)
    hudBk = null;
  }
  // 显示时长 默认为2s
  duration = isNaN(duration) ? 2 : duration;

  // 图标
  if (!image) {
    if (msg.indexOf('成功') != -1 )  {
      image = successLogo;
    } else if(msg.indexOf('失败') != -1) {
      image = '../../img/failed.png';
    } else {
      image = '../../img/loading.svg';
    }
  }

  // 该段完整代码web段可以用
  // bk.style.cssText = "max-width:60%;width:136px;height:136px;color: rgb(255, 255, 255);text-align: center;border-radius:6px;position: fixed;top: 50%;left: 50%;margin-top: -68px;margin-left: -68px;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0, 0.7);font-size: 16px;";


  // 创建父div
  let bk = document.createElement('div');
  bk.style.cssText = "width:120px;height:120px;color: rgb(255, 255, 255);text-align: center;border-radius:6px;position: fixed;top: 50%;left: 50%;margin-top: -60px;margin-left: -60px;z-index: 999999;background: rgba(0, 0, 0, 0.7);font-size: 16px;";
  document.body.appendChild(bk);
  hudBk = bk;


  // 图标
  let img = document.createElement('img');
  img.src = image;
  img.style.cssText = 'width:50px;height:35px;display:block;margin:16px auto 0';
  bk.appendChild(img);

  // 提示文本
  let text = document.createElement('div');
  text.style.cssText = "margin:25px 0 25px";
  text.innerHTML = msg;
  bk.appendChild(text);

  setTimeout(function() {
    // 定义淡入的时间
    let d = 0.5;
    bk.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    bk.style.opacity = '0';
    if (msg.indexOf('成功') != -1) {
      // 提示为成功的情况 自己移除
      hideHud();
    }
  }, duration * 1000);
}


// 隐藏hud
function hideHud() {
  // 移除该标签
  if (hudBk) {
    setTimeout(function () {
      document.body.removeChild(hudBk)
      hudBk = null;
    }, 0.5 * 1000)
  }
}

// 导出
export const utils = {
  isWeChat,
  isJSONString,
  getLocalStorage,
  setLocalStorage,
  setStoregeItem,
  showToast,
  getDateByTimestampAndFormatter,
  getTimeDetailDes,
  log,
};