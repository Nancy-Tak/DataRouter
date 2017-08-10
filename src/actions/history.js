/**
 * Created by `double fuck more` on 2016/12/09.
 *
 */
import {actionGlobal} from 'ACTION';
import {push} from 'react-router-redux';
/*this=>内部产品查询记录*/
//获取内部产品列表
export const RECORD_INTERNAL_PRODUCTS = "recordInternalProducts";
//获取内部产品调用详情
export const RECORD_INTERNAL_PRODUCTS_ID = "recordInternalProductsId";
/*this=>数据源查询记录*/
//产品列表查询
export const RECORD_RECORD_DATASOURCES = "recordRecordDatasources";
//获取源产品列表
export const RECORD_RECORD_ORIGINAL_PRODUCTS = "recordOriginalProducts";
//获取源产品调用详情
export const RECORD_RECORD_ORIGINAL_PRODUCTS_ID = "recordOriginalProductsId";
/*this=>用户查询记录*/
//获取用户查询记录列表
export const RECORD_USERS = "recordUsers";
//获取用户查询记录详情
export const RECORD_USERS_ID = "recordUsersId";
//获取用户查询记录详情
export const RECORD_USERS_TEMPLATE = "recordUsersTemplate";
export const RECORD_USERS_TEMPLATE_CLEAR = "recordUsersTemplateClear";
/*this=>内部产品查询记录*/
//获取内部产品列表
export function fetchInternalProducts(save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/record/internal/products', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(save),
            // 设置同源cookies
            credentials: 'same-origin',
            // 跨域资源共享
            // credentials: 'include'
        })
            .then(response => response.json())
            .then(
                json => {
                    dispatch(actionGlobal.hideLoading());
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    if(json.status.code == 200) {
                        dispatch(recordInternalProducts(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function recordInternalProducts(json) {
    //console.log(json)
    return {
        type: RECORD_INTERNAL_PRODUCTS,
        payload: json,
        meta: '获取内部产品列表'
    }
}
//end
//获取内部产品调用详情
export function fetchInternalProductsId(id, save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/record/internal/product/' + id, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(save),
            // 设置同源cookies
            credentials: 'same-origin',
            // 跨域资源共享
            // credentials: 'include'
        })
            .then(response => response.json())
            .then(
                json => {
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    dispatch(actionGlobal.hideLoading());
                    if(json.status.code == 200) {
                        dispatch(recordInternalProductsId(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function recordInternalProductsId(json) {
    //console.log(json)
    return {
        type: RECORD_INTERNAL_PRODUCTS_ID,
        payload: json,
        meta: '获取内部产品调用详情'
    }
}
//end
/*this=>数据源查询记录*/
//产品列表查询
export function fetchRecordDatasources() {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/record/datasources', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(
                json => {
                    dispatch(actionGlobal.hideLoading());
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    if(json.status.code == 200) {
                        dispatch(recordRecordDatasources(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function recordRecordDatasources(json) {
    //console.log(json)
    return {
        type: RECORD_RECORD_DATASOURCES,
        payload: json,
        meta: '产品列表查询'
    }
}
//end
//获取源产品列表
export function fetchOriginalProducts(save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/record/original/products', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(save),
            // 设置同源cookies
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(
                json => {
                    dispatch(actionGlobal.hideLoading());
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    if(json.status.code == 200) {
                        dispatch(recordOriginalProducts(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function recordOriginalProducts(json) {
    //console.log(json)
    return {
        type: RECORD_RECORD_ORIGINAL_PRODUCTS,
        payload: json,
        meta: '获取源产品列表'
    }
}
//end
//获取源产品调用详情
export function fetchOriginalProductsId(id, save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/record/datasources/product/' + id, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(save),
            // 设置同源cookies
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(
                json => {
                    dispatch(actionGlobal.hideLoading());
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    if(json.status.code == 200) {
                        dispatch(recordOriginalProductsId(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function recordOriginalProductsId(json) {
    //console.log(json)
    return {
        type: RECORD_RECORD_ORIGINAL_PRODUCTS_ID,
        payload: json,
        meta: '获取源产品调用详情'
    }
}
//end
/*this=>用户查询记录*/
//获取用户查询记录列表
export function fetchrecordUsers(save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/record/users', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(save),
            // 设置同源cookies
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(
                json => {
                    dispatch(actionGlobal.hideLoading());
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    if(json.status.code == 200) {
                        dispatch(recordUsers(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function recordUsers(json) {
    //console.log(json)
    return {
        type: RECORD_USERS,
        payload: json,
        meta: '获取用户查询记录列表'
    }
}
//end
//获取用户查询记录列表
export function fetchrecordUsersId(id) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/record/user/' + id, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(save),
            // 设置同源cookies
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(
                json => {
                    dispatch(actionGlobal.hideLoading());
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    if(json.status.code == 200) {
                        dispatch(recordUsersId(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function recordUsersId(json) {
    //console.log(json)
    return {
        type: RECORD_USERS_ID,
        payload: json,
        meta: '获取用户查询记录列表'
    }
}
//end
//获取用户查询记录详情
export function fetchrecordUsersTemplate(templateId, productCode, queryCode) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/record/user/' + templateId + '/' + productCode + '/' + queryCode, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            // 设置同源cookies
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(
                json => {
                    dispatch(actionGlobal.hideLoading());
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    if(json.status.code == 200) {
                        dispatch(recordUsersTemplate(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function recordUsersTemplate(json) {
    //console.log(json)
    return {
        type: RECORD_USERS_TEMPLATE,
        payload: json,
        meta: '获取用户查询记录详情'
    }
}
export function recordUsersTemplateClear() {
    return {
        type: RECORD_USERS_TEMPLATE_CLEAR,
        payload: null,
        mate: '清除获取用户查询记录详情'
    }
}
//end
