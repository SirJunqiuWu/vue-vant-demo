/**
 *
 * @param str
 * @return {boolean}
 */
const isJSONString = (str) => {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str);
      if (str.indexOf('{') > -1) {
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
 * 根据key获取对象
 * @param {string}key
 * @return {any}
 */
const getLocalStorage = (key) => {
  let localStorage = window.localStorage;
  let valueObject = localStorage.getItem(key);
  if (typeof valueObject === 'string') {
    //尝试能否转成对象
    if (utility.isJSONString(valueObject)) {
      let parseObject = JSON.parse(valueObject);
      if (typeof parseObject === 'object') {
        return parseObject;
      }
    }
    return valueObject;
  } else {
    // window.console.log('localStorage:无key=' + key + '值可取');
    return null;
  }
};

/**
 * localStorage保存本地
 * @param {string}key
 * @param {string | number | object}valueObject
 */
const setLocalStorage = (key, valueObject) => {
  let localStorage = window.localStorage;
  if (typeof valueObject === 'string' || typeof valueObject === 'number') {
    localStorage.setItem(key, String(valueObject));
  } else if (typeof valueObject === 'boolean') {
    if (valueObject === true) {
      localStorage.setItem(key, 'true');
    } else {
      localStorage.setItem(key, 'false');
    }
  } else if (valueObject === null || typeof valueObject === 'undefined') {
    localStorage.removeItem(key);
    // window.console.log('LocalStorage:暂不支持存储:key=' + key + '\nvalueObject=' + JSON.stringify(valueObject));
  } else if (typeof valueObject === 'object') {
    localStorage.setItem(key, JSON.stringify(valueObject));
  } else {
    localStorage.removeItem(key);
    // window.console.log('LocalStorage:暂不支持存储:key=' + key + '\nvalueObject=' + JSON.stringify(valueObject));
  }
};

/**
 * 根据key获取对象
 * @param {string}key
 */
const getSessionStorage = (key) => {
  let sessionStorage = window.sessionStorage;
  let valueObject = sessionStorage.getItem(key);
  if (typeof valueObject === 'string') {
    //尝试能否转成对象
    if (utility.isJSONString(valueObject)) {
      let parseObject = JSON.parse(valueObject);
      if (typeof parseObject === 'object') {
        return parseObject;
      }
    }
    return valueObject;
  } else {
    // window.console.log('sessionStorage:无key=' + key + '值可取');
    return null;
  }
};

/**
 * sessionStorage保存本地
 * @param {string}key
 * @param {string | number | object}valueObject
 */
const setSessionStorage = (key, valueObject) => {
  let sessionStorage = window.sessionStorage;
  if (typeof valueObject === 'string' || typeof valueObject === 'number') {
    sessionStorage.setItem(key, String(valueObject));
  } else if (typeof valueObject === 'boolean') {
    if (valueObject === true) {
      sessionStorage.setItem(key, 'true');
    } else {
      sessionStorage.setItem(key, 'false');
    }
  } else if (valueObject === null || typeof valueObject === 'undefined') {
    sessionStorage.removeItem(key);
    // window.console.log('sessionStorage:暂不支持存储:key=' + key + '\nvalueObject=' + JSON.stringify(valueObject));
  } else if (typeof valueObject === 'object') {
    sessionStorage.setItem(key, JSON.stringify(valueObject));
  } else {
    sessionStorage.removeItem(key);
    // window.console.log('sessionStorage:暂不支持存储:key=' + key + '\nvalueObject=' + JSON.stringify(valueObject));
  }
};


/**
 * 是否是中文
 * @param {string} str
 * @return {boolean}
 */
const isChineseCode = (str) => {
  if (str.length !== 0) {
    const reg = /^[\u0391-\uFFE5]+$/;
    if (!reg.test(str)) {
      return false;
    }
  }
  return true;
};

/**
 * 是否是数组
 */
const isArray = (array) => {
  return Object.prototype.toString.call(array) == '[object Array]';
};

/**
 * 去除字符串首尾空格
 * @param {string|number} str
 * @return {string}
 */
const trimString = (str) => {
  if (typeof str === 'string') {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  }
  return String(str);
};

/**
 * 检测字符串是否为空,也不是undefined
 * @param {string} str
 * @return {boolean}
 */
const isEmptyString = (str) => {
  if (typeof str == 'number') {
    str = String(str);
  }
  if (typeof str == 'boolean') {
    str = String(str);
  }
  return (str === null || typeof str === 'undefined' || str == 'undefined' || str === '' || utility.trimString(str) === '');
};


/**
 * 检测一组字符串是否为空
 * @param {string[]} strs
 * @return {boolean}
 */
const isEmptyStrings = (...strs) => {
  let isEmpty = false;
  for (const str of strs) {
    if (utility.isEmptyString(str)) {
      isEmpty = true;
      break;
    }
  }
  return isEmpty;
};

/**
 * 检测一组字符串是否全部不为空
 * @param {string} strs
 * @return {boolean}
 */
const isNotEmptyStrings = (...strs) => {

  let isNotEmpty = true;
  for (const str of strs) {
    if (utility.isEmptyString(str)) {
      isNotEmpty = false;
      break;
    }
  }
  return isNotEmpty;
};

/**
 * 清楚null字符串
 * @param {string} str
 * @return {string}
 */
const clearNullString = (str) => {
  if (utility.isEmptyString(str)) {
    return '';
  }
  return utility.trimString(String(str));
};

/**
 * 清除对象中的空值属性
 * @param {Object} obj
 * @return {Object}
 */
const clearNullObject = (obj) => {
  let newObj = {};
  for (let p in obj) {
    let value = obj[p];
    if (!utility.isEmptyString(value)) {
      newObj[p] = value;
    }
  }
  return newObj;
};

/**
 /**
 * 对象是否为空
 * @param {Object} object
 * @return {boolean}
 */
const objectIsNull = (object) => {
  if (object == null || typeof object == 'undefined') {
    return true;
  }
  return false;
};


/**
 * 根据object对象拼接成&链接起来的参数，形式：a=1&b=2
 * @param {Object | string} param
 * @param { Boolean } encodeUrl
 * @return {string}
 */
const addQueryParamByObj = (param,encodeUrl) => {
  let paramStr = '';
  if (typeof param === 'object') {
    let firstIndex = true;
    for (const p in param) {
      if (param.hasOwnProperty(p) && p != 'stringArrayKeys') {
        if (utility.isArray(param[p])) {
          if (param['stringArrayKeys'] && param['stringArrayKeys'].indexOf(p) != -1) {
            paramStr += (firstIndex ? '' : '&') + String(p) + '=' + param[p].toString();
          } else {
            paramStr += (firstIndex ? '' : '&') + String(p) + '=' + JSON.stringify(param[p]);
          }
          firstIndex = false;
        } else {
          let pValue = typeof param[p] == 'undefined' ? '' : param[p];
          paramStr += (firstIndex ? '' : '&') + String(p) + '=' + String(pValue);
          firstIndex = false;
        }

      }
    }
  }
  if(encodeUrl == false){
    return  paramStr;
  }else {
    return encodeURI(paramStr);
  }
};

/**
 * 是否是固定电话
 * @param phone
 * @return {boolean}
 */
const isTelephone = (phone) => {
  const phone_reg = new RegExp(/^([+]{0,1}\d{3,4}|\d{3,4}-)?\d{7,8}$/);
  return phone_reg.test(phone);
};

/**
 * 是否是手机号码
 * @param mobile
 * @return {boolean}
 */
const isMobile = (mobile) => {
  const mobile_reg = new RegExp(/^0{0,1}1[0-9]{10}$/);
  return mobile_reg.test(mobile);
};


/**
 * 根据每条数据主键primaryKey，合并两组数据，并过滤掉重复数据
 * @param {any[]} value 当前值
 * @param {any[]} comparedValue 原先值
 * @param {string} primaryKey 每条数据的唯一标识，如id(可以取这条数据的id)
 * @return {any[]}
 */
const filterSame = (value, comparedValue, primaryKey) => {
  if (!utility.isArray(value) || !utility.isArray(comparedValue)) {
    return value;
  }
  if (value.length == 0) {
    return comparedValue;
  }
  let newValue = value.filter(item => {

    let newComItem = comparedValue.filter(comItem => {

      return comItem[primaryKey] == item[primaryKey];
    })[0];
    return !newComItem || item[primaryKey] != newComItem[primaryKey];
  });
  const combineValue = [
    ...newValue,
    ...comparedValue
  ];
  console.log(combineValue);
  return combineValue;
};

/**
 * 小数点转百分数
 * @param point
 * @return {string}
 */
const toPercent = (point) => {
  if (Number(point) == 0 || Number(point) == 1) {
    return (Number(point) * 100) + '%';
  }
  let str = (Number(point) * 100).toFixed(1);
  str += '%';
  if (Number(point)) {
    console.log(str);
  }
  return str;
};

/**
 * 处理数据
 * @param {Object | any[]} data
 * @param {Function} callback
 */
const handleDataBeforeRender = (data, callback) => {
  if (callback) {
    if (utility.isArray(data)) {
      data.forEach(item => {
        callback(item);
      });
    }
  }
  return data;
};

/**
 *
 * @param {any[]}data
 * @param {{ labelKey: string }}prop
 * @returns {string}
 */
const dicArrayToStrArray = (data, prop) => {
  if (!isArray(data)) {
    return '';
  }
  let array = [];
  data.forEach(item => {
    array.push(item[prop.labelKey]);
  });
  return array.toString();
};


/**
 * 格式化金额 例如10:00、12.25
 * @param {string|number} val 需要格式化的参数
 * @return {string|number}
 * */
const moneyAbs = (val) => {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  let str = (Number(val) / 100).toFixed(2) + '';
  //取到整数部分
  let intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',');
  //取到小数部分搜索
  let dot = str.substring(str.length, str.indexOf('.'));
  return intSum + dot;
};

//拼接数组对象转为字符串
/**
 *
 * @param {object}formValue
 * @param {string[]}listKeys
 * @returns {object}
 */
const setObjectArrayToStr = (formValue, ...listKeys) => {
  if (objectIsNull(formValue) || !listKeys || listKeys.length == 0) {
    return {};
  }
  const param = {...formValue};
  for (let key of listKeys) {
    const list = param[key];
    if (isArray(list) && list.length > 0) {
      for (let listItem of list) {
        const index = list.indexOf(listItem);
        if (typeof listItem == 'object') {
          for (let listKey in listItem) {
            const listKeyValue = listItem[listKey];
            const targetKey = key + '[' + index + '].' + listKey;
            param[targetKey] = listKeyValue;
          }
        } else {
          const targetKey = key + '[' + index + ']';
          param[targetKey] = listItem;
        }
      }
    }
    delete param[key];
  }
  console.log(param);
  return param;
};

/**
 * 格式化秒杀的倒计时
 * @param time 倒计时秒数
 * @param fullTime 是否返回完整时间
 * @param {Function}callback
 * @return {{type:string,noDayHour:number,day:number,hour:number,min:number,sec:number,countDownText:string}}
 */
var formatMSCountTimes = function (time, fullTime, callback) {
  var countDown = Number(time) || 0;
  if (countDown === 0) {
    callback();
    return '0';
  }
  var day = parseInt((countDown / 3600) / 24);
  var hour = parseInt((countDown / 3600) % 24);
  var min = parseInt((countDown % 3600) / 60);
  var sec = parseInt((countDown % 3600) % 60);
  var noDayHour = day * 24 + hour;
  function formatT(t) {
    return ((Number(t) < 10 ? '0' + String(t) : t));
  }

  function formatFullTimeStr(times) {
    var day = times.day;
    var hour = times.hour;
    var min = times.min;
    var sec = times.sec;
    var countDownText = '';
    if (day > 0) {
      countDownText += (day + '天');
    }
    var hourMinSec = [];
    if (hour > 0) {hourMinSec.push(`${hour}时`);}
    if (min > 0) {hourMinSec.push(`${min}分`);}
    if (sec > 0) {hourMinSec.push(`${sec}秒`);}
    countDownText += (hourMinSec.join(''));
    return countDownText;
  }

  var times = {
    type:'',noDayHour:0,day:0,hour:0,min:0,sec:0,countDownText:''
  };
  if (fullTime) {
    times =  {
      type: 'full',
      noDayHour:noDayHour,
      day: formatT(day),
      hour: formatT(hour),
      min: formatT(min),
      sec: formatT(sec),
    }
  }else {
    if (day > 0) {
      times = {
        type: 'day',
        day: formatT(day),
        noDayHour:noDayHour,
        hour: formatT(hour),
        min: 0,
        sec: 0
      }
    } else {
      times = {
        type: 'hour',
        day: 0,
        noDayHour:noDayHour,
        hour: formatT(hour),
        min: formatT(min),
        sec: formatT(sec)
      }
    }
  }
  times.countDownText = formatFullTimeStr(times);
  return times;
};


/**
 * 更新我的文件list
 * @param {string}previews
 * @returns {Array}
 */
const updatePreviewFileList = (previews)=>{
  if(!previews){
    return [];
  }
  const urls = decodeURIComponent(previews).split(',');
  let imgArr = [];
  urls.forEach(url => {
    const hasFixedPar = url.indexOf('_o')>-1;
    imgArr.push({
      url: hasFixedPar?url:`${url}_o`,
      // url: url,
      isImage:true
    })
  });
  console.log(imgArr);
  return imgArr;
};

//隐藏手机号码中间的4位
const hiddenTel = (tel)=>{
  if(!tel || tel.length < 7){
    return  tel;
  }
  return tel.substring(0,3)+"****"+tel.substring(tel.length-4,tel.length)
};


//像数组中注入固定值
const injectObjectInArray = (array,constObject)=>{
  if(!constObject){
    return  array;
  }
  let arr = [];
  array.forEach(item=>{
    arr.push({
      ...item,
      ...constObject
    })
  });
  return arr;
};

//格式化商品规格
const formatGoodsSpecAttr = (str)=>{
  return str.replace(/{/g, '')
    .replace(/}/g, '')
    .replace(/\[/g, '')
    .replace(/]/g, '')
    .replace(/"/g, '')
};

//map值转到array
const mapKeyValueList = (map)=>{
  if(typeof map != 'object'){
    console.error('map is not object=>',map);
    return [];
  }
  let keyArray = [];
  let valueArray = [];
  for(let key in map){
    var value = map[key];
    keyArray.push(key);
    valueArray.push(value);
  }
  return {
    keys:keyArray,
    values:valueArray,
  }
};

/**
 * 获取固定长度的随机字母
 * @param length
 * @returns {string}
 */
const getRandomWord = function (length) {

  var chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var nums = "";
  for (var i = 0; i < length; i++) {
    var id = Math.abs(parseInt(Math.random()) % 26);
    nums += chars[id];
  }
  return nums;
};

/**
 * 获取固定长度的随机数字
 * @param length
 * @returns {string}
 */
const getRandomNumber = function (length) {

  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var nums = "";
  for (var i = 0; i < length; i++) {
    var id = Math.abs(parseInt(Math.random()) % 10);
    nums += chars[id];
  }
  return nums;
};

/**
 * 获取固定长度的随机字符串
 * @param length
 * @returns {string}
 */
const getRandomString = function (length) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var nums = "";
  for (var i = 0; i < length; i++) {
    var random = utility.getRandomWithRange(0,61);
    var id = Math.abs(parseInt(random) % 62);
    nums += chars[id];
  }
  return nums;
};

/**
 * 获取范围内的随机数
 * @param min
 * @param max
 */
const getRandomWithRange = function (min, max) {
  var num = parseInt(Math.random() * (max - min + 1) + min, 10);
  // var var2 = Math.floor(Math.random()*(max-min+1)+min);
  // console.log(val1,var2);
  return num;
};

const browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {         //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

const browserMobile =  ()=>{
  if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    return {
      wechat:ua.match(/MicroMessenger/i) == "micromessenger",//在微信中打开
      weibo:ua.match(/WeiBo/i) == "weibo",//在新浪微博客户端打开
      qq:ua.match(/QQ/i) == "qq",//在QQ空间打开
      ios:browser.versions.ios,//是否在IOS浏览器打开
      android:browser.versions.android,//是否在安卓浏览器打开,
      wechatDevelopTool:ua.match(/wechatdevtools/) == "wechatdevtools",//微信开发者工具
    };
  }
  return  {

  }
};

//格式化 数字 10000-》1万
const formatMoneyLength = function (value) {
  if(!value || value < 10000){
    return value;
  }else{
    const intVal = parseInt(String(value / 10000));
    const decimalVal = parseFloat(String(value % 10000),4);
    return `${intVal}${decimalVal>0?('.'+decimalVal):''}`
  }
};

//过滤特殊字符
const regexSpecChars = function (s) {
  // var regex = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]|["',，.。/、\]【】\\n\s！!?？——_<>%;‘’；)《（）》(&+=`“”·*#@]){0,}$/g;
  // // var regex = /^([\p{Han}\p{P}A-Za-z0-9])*$/u;
  // return  value.replace(regex,'');
  var rs = "";
  var startIndex = 0;
  var maxIndex = s.length;
  while (startIndex < maxIndex){
    var str  = s.substr(startIndex, 1).replace(/－/,'-');  // 特殊字符的替换
    var charCode = str.charCodeAt(0);
    if (/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]|["',，.。/、\]\[【】\\n\s！!?？——_<>%;‘’；)《（）》(&+=`“”·*#@@$￥：:~]){0,}$/.test(str)) {
      if(charCode >=55296 && charCode <= 56319){
        startIndex = startIndex + 2;
      }else {
        rs += str;
        startIndex ++;
      }
    }else {
      startIndex ++;
    }
  }
  console.log(rs);
  return rs;
  // for (var i = 0; i < s.length; i++) {
  //   var str  = s.substr(i, 1);
  //
  //   if (/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]|["',，.。/、\]\[【】\\n\s！!?？——_<>%;‘’；)《（）》(&+=`“”·*#@@$￥：:~]){0,}$/.test(str)) {
  //     rs = rs + str
  //   }
  // }
  // //在过滤表情
  // return rs.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
  //   .replace(/\s+/g, "");
};


export const utility = {
  isChineseCode:isChineseCode,
  isArray:isArray,
  trimString:trimString,
  isEmptyString:isEmptyString,
  isEmptyStrings:isEmptyStrings,
  isNotEmptyStrings:isNotEmptyStrings,
  clearNullString:clearNullString,
  clearNullObject:clearNullObject,
  addQueryParamByObj:addQueryParamByObj,
  objectIsNull:objectIsNull,
  isTelephone:isTelephone,
  isMobile:isMobile,
  isJSONString:isJSONString,
  getSessionStorage:getSessionStorage,
  setSessionStorage:setSessionStorage,
  setLocalStorage:setLocalStorage,
  getLocalStorage:getLocalStorage,
  filterSame:filterSame,
  toPercent:toPercent,
  handleDataBeforeRender:handleDataBeforeRender,
  dicArrayToStrArray:dicArrayToStrArray,
  moneyAbs:moneyAbs,
  setObjectArrayToStr:setObjectArrayToStr,
  formatMSCountTimes:formatMSCountTimes,
  updatePreviewFileList:updatePreviewFileList,
  hiddenTel:hiddenTel,
  injectObjectInArray:injectObjectInArray,
  formatGoodsSpecAttr:formatGoodsSpecAttr,
  mapKeyValueList:mapKeyValueList,
  getRandomWord:getRandomWord,
  getRandomNumber:getRandomNumber,
  getRandomString:getRandomString,
  getRandomWithRange:getRandomWithRange,
  browser:browser,
  browserMobile:browserMobile,
  formatMoneyLength:formatMoneyLength,
  regexSpecChars:regexSpecChars
};
