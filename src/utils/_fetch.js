// create by wuyq 12/5
import fetch from 'isomorphic-fetch'

export default (url,method,data)=>{
    if(!url || !method) return;

    let config={
                method:method,
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                // 设置同源cookies
                credentials: 'same-origin',
                // 跨域资源共享
                // credentials: 'include'
            }

    if(method=='post' || method=='put'){
        config = Object.assign({},config,{
            body: JSON.stringify(data),
        });
    }

    return fetch(url,config).then(response => response.json());
}

