/* eslint-disable */
/***************************************************************************
 * 作者：吴俊秋
 * 作用: 该文件作为网络请求文件，项目中所有的网络请求都可以直接调用该文件中的方法
****************************************************************************/

// 请求配置参数
const reqConfig = {
    async: true, // 是否异步请求
    timeout: 60 * 1000, // 超时时间默认60s
    type: 'post', // 默认post请求
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


// 根据url 和 请求参数获取值
// success函数 和 faile函数用于回调请求结果
// xhr：用于创建 XMLHttpRequest 对象的函数。
// 和后台约定好返回数据解构(固定, 切记随意改变外层结构)
// 返回数据结构eg：result = {code:'0', msg:'', data:{(前端展示的数据都在里面，想给什么都可以随意扩充)}};
// 请求失败时 或者 请求有其他异常问题时才有failed函数回调, 前端只需要将回调的错误提示展示出来就可以
// 请求成功时, 回调函数successd直接将页面需要的数据源回调
// status: success failed
function getDataReq(options = {}) {
    console.log('options:', options);
    const { url, param, successd = () => 0, failed = () => 1} = options;
    let reqURL = getTotalURL(url);
    if (url === 'getUserInfo') {
        console.log('获取个人信息');
        let result = mockMyInfoData('web');
        successd(result);
        return;
    }
    if (url === 'getUserInfoForMobile') {
      console.log('移动端');
      let result = mockMyInfoData('mobile');
      successd(result);
      return;
    }

    if (url == getHomeDataReqURL) {
      console.log('首页数据');
      return;
    }

    $.ajax({
        async: reqConfig.async,
        url: reqURL,
        data: param,
        timeout: reqConfig.timeout,
        type: reqConfig.type,
        xhrFields: {
            // 跨域请求设置
            withCredentials: reqConfig.withCredentials,
        },
        success: function(result, status, xhr) {
            // 请求成功
            console.log('请求成功结果:', result, '状态:', status, 'xhr:', xhr);
            // 请求头返回code === 100时 未登录
            let errorCode = xhr.getResponseHeader('error_code');
            if (errorCode === codeEnum.UNLOGIN) {
                // 未登录 调起登录界面
                console.log('未登录');
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
            console.log('ajax-error:', xhr, status, error);
            xhr.abort();
            failed(error);
        },
        complete: (xhr, status) => {
            // 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。
            console.log('请求完成:', xhr, status);
            // 请求完成 可做请求task个数统计,并发个数控制用 可做加载框隐藏等处理

        }
    });
}

// 获取完整url
function getTotalURL(url) {
    let reqURL = '';
    if (reqConfig.isTestEnv) {
        reqURL = baseURL_test + url;
    } else {
        reqURL = baseURL_product + url;
    }
    return reqURL;
}


function mockMyInfoData(type) {
    let datas = []
    let titleArr = ['邀请得杯', '常见问题', '客户服务', '设备申请', '关于我们', '个人资料'];
    for (let i = 0; i < titleArr.length; i += 1) {
        let temp = {};
        let nameIndex = i + 1;
        temp.title = titleArr[i];
        if (type === 'web') {
          temp.image = '../../img/my-info-img/p' + nameIndex + '.png';
          temp.rightIcon = '../../img/my-info-img/arrow_right.png';
        } else if (type === 'mobile') {
          temp.image = '../../../public/img/my-info-img/p' + nameIndex + '.png';
          temp.rightIcon = '../../../public/img/my-info-img/arrow_right.png';
        }
        temp.name = '吴俊秋';
        datas.push(temp);
    }
    let result = {code:0, message:'success', data:{data:datas}};
    return result;
}

function mockHomeTabData() {
  let datas = []
  for (let i = 0; i < 10; i += 1) {
    let temp = {};
    datas.push(temp);
  }
  let result = {code:0, message:'success', data:{data:datas}};
  return result;
}