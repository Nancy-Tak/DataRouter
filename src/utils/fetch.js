/**
 * fetch wrapper
 */

// 同构 fetch 库
// import fetch from 'isomorphic-fetch';
// 全局 loading 状态
import State from 'PAGES/layouts/state';
/**
 * @param { String } url 异步请求地址，默认为 get 方法
 * @param { PlainObject } data 异步配置参数 [可选]
 * @param { Boolean } showLoading 判断是否显示 Loading [可选]
 * @param { Function } pending 异步请求持续过程函数 [可选]
 */
export default (url, data, showLoading, pending) => {

    // 请求统一自动加上 /api，以便使用 webpack-dev-server 代理
    // 代理会去掉 /api 获取数据
    url = __DEV__ ? `/api${url}` : url;
    // 兼容 showLoading 在第二个参数位置设置
    if(showLoading === undefined && typeof data === 'boolean') {
        showLoading = data;
        data = {};
    }
    // fetch 规范中只有 post 才能设置 body 属性
    // 当为 get 方法时需拼接在 url 上
    if(data && data.body) {

        // 当有body传递时，强制设置为 post 方法
        data.method = 'post';
        // 统一JSON字符串化
        data.body = JSON.stringify(data.body)
    }
    // 合并配置
    data = Object.assign({}, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        // 设置同源cookies
        credentials: 'same-origin',
        // 跨域资源共享
        // credentials: 'include'
    }, data);
    // 显示loading图标
    showLoading && State.showLoading();
    return new Promise(function(resolve, reject) {
        fetch(url, data)
            .then(res => res.json())  // 数据接口统一为 json
            .then(res => {
                // 隐藏loading图标
                showLoading && State.hideLoading();
                // 业务code特定处理
                if(res.code == 200) {
                    console.log('代码:', res.message);
                    resolve(res);
                } else {
                    //alert(`错误代码：${res.ResultCode}, 原因：${res.Message}`)
                    // 处理错误
                    reject(res);
                    // 代码提示错误
                    if(res.code == 500) {
                        throw new Error(`错误代码：${res.code}, 原因：${res.message}`);
                    }
                    if(res.code == 401) {
                        console.log('错误代码:', res.message);
                    }
                }
            })
            .catch(err => {
                alert(`错误代码：${ err }`);
                console.error('Fetch Error: %s', err);
            })
    })
}
