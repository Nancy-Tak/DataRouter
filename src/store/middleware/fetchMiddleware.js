/**
 * Created by Ethan on 2016/12/16.
 * fetch 中间件
 */
import fetch from 'isomorphic-fetch';
const fetchOptions = {
    method: 'post',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    credentials: "same-origin"
};
const loadingOptions = {
    show: false,
    tip: ''
};
const defaultSuffix = ['Request', 'Success', 'Failure'];
export default ({dispatch, getState}) => next => action => {
    if(!action || !action.fetchPayload || !action.fetchPayload.url) {
        return next(action);
    }
    let type = action.type;
    let payload = action.fetchPayload;
    let url = payload.url;
    let conditionFun = payload.condition; //条件
    let loading = {...loadingOptions, ...payload.loadingOptions};  //是否需要LOADING
    let options = payload.options;
    let opts = {...fetchOptions, ...options};
    let paulPayload = action.payload;
    loading.show && dispatch({type: "showLoading", payload: loading.tip, meta: '显示loading'});
    dispatch({type: type + defaultSuffix[0]});
    fetch(url, opts)
        .then(response => response.json())
        .then(json => {
                if(json.status && json.status.code == 401) {
                    dispatch(push('/userLogin/noLogin'));
                    return;
                }
                if(conditionFun) {
                    if(conditionFun(json)) {
                        dispatch({type: type + defaultSuffix[1], payload: {...json, ...paulPayload}, meta: '异步请求成功'});
                    } else {
                        dispatch({
                            type: type + defaultSuffix[2],
                            payload: {...json, ...paulPayload},
                            meta: '异步请求成功，但判断条件（condition）失败'
                        });

                    }
                } else {
                    dispatch({type: type + defaultSuffix[1], payload: {...json, ...paulPayload}, meta: '异步请求成功'});
                }
                loading.show && dispatch({type: "hideLoading", meta: '隐藏loading'});
            }
        ).catch(function(e) {
            loading.show && dispatch({type: "hideLoading", meta: '隐藏loading'});
        //dispatch({type: type + defaultSuffix[2], payload: {err: e}, meta: '异步请求失败'});
    });
}
