//特殊规则列表
import fetch from 'isomorphic-fetch';
import {push} from 'react-router-redux';
import {Message} from 'antd';
import {actionGlobal} from 'ACTION';
/*this=>产品更新周期配置*/
//收到特殊规则列表
export const RECEIVE_UPDATECYCLES_COMMONRULE = 'receiveUpdateCyclesCommonRule'
//通用规则更新保存
export const RECEIVE_UPDATECYCLES_COMMONRULE_UPDATE = 'receiveUpdateCyclesCommonRuleUpdate'
//特殊规则列表
export const RECEIVE_UPDATECYCLES_SPECIALRULES = 'receiveUpdateCyclesSpecialRules'
//添加特殊规则
export const RECEIVE_UPDATECYCLES_SPECIALRULES_SAVE = 'receiveUpdateCyclesSpecialRulesSave'
//添加特殊规则-获取源产品类型
export const RECEIVE_UPDATECYCLES_SPECIALRULES_PRODUCTTYPES = 'receiveUpdateCyclesSpecialRulesProductTypes'
//添加特殊规则-根据源产品类型id获取该id下所有的源产品
export const RECEIVE_UPDATECYCLES_SPECIALRULES_PRODUCTTYPES_ID = 'receiveUpdateCyclesSpecialRulesProductTypesId'
//添加特殊规则-编辑并保存特殊规则
export const RECEIVE_UPDATECYCLES_SPECIALRULES_UPDATE = 'receiveUpdateCyclesSpecialRulesUpdate'
//添加特殊规则-恢复成通用规则
export const RECEIVE_UPDATECYCLES_SPECIALRULES_RESTORE = 'receiveUpdateCyclesSpecialRulesRestore'
/*this=>数据机构管理*/
//获取数据机构列表
export const RECEIVE_INSTITUTIONS_LIST = 'receiveInstitutionsList'
//根据主键id获取数据机构详情
export const RECEIVE_INSTITUTIONS_DETAIL = 'receiveInstitutionsDetail'
//根据id编辑数据机构记录
export const RECEIVE_INSTITUTIONS_EDIT = 'receiveInstitutionsEdit'
//编辑数据机构保存
export const RECEIVE_INSTITUTIONS_SAVE = 'receiveInstitutionsSave'
export const RECEIVE_INSTITUTIONS_SAVE_SUCCESS = 'receiveInstitutionsSaveSuccess'
export const RECEIVE_INSTITUTIONS_SAVE_FAILURE = 'receiveInstitutionsSaveFailure'
export const RECEIVE_INSTITUTIONS_SAVE_CLEAR = 'receiveInstitutionsSaveClear'
//数据机构管理 启用或禁用
export const RECEIVE_INSTITUTIONS_STATE = 'receiveInstitutionsState'
/*this=>源产品管理*/
//产品编辑
export const RECEIVE_SOURCEPRODUCTS_EDIT = 'receiveSourceproductsEdit'
//产品编辑保存
export const RECEIVE_SOURCEPRODUCTS_SAVE = 'receiveSourceproductsSave'
export const RECEIVE_SOURCEPRODUCTS_SAVE_FAILURE = 'receiveSourceproductsSaveFailure'
//产品详情
export const RECEIVE_SOURCEPRODUCTS_DETAIL = 'receiveSourceproductsDetail'
//源产品管理列表
export const RECEIVE_SOURCEPRODUCTS_LIST = 'receiveSourceproductsList'
//启用或禁用
export const RECEIVE_SOURCEPRODUCTS_STATE = 'receiveSourceproductsState'
//禁用时获取包含此源产品的所有内部产品
export const RECEIVE_SOURCEPRODUCTS_INNERPRODUCTS = 'receiveSourceproductsInnerproducts'
//获取所有数据机构-无分页
export const RECEIVE_SHUYOU_INSTITUTIONS_ALL = 'receiveShuyouInstitutionsAll'
/*this=>产品更新周期配置*/
//通用规则更新
export function fetchUpdateCyclesCommonRule(infraId) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/updateCycles/' + infraId + '/commonRule', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
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
                        dispatch(receiveUpdateCyclesCommonRule(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveUpdateCyclesCommonRule(json) {
    //console.log(json)
    return {
        type: RECEIVE_UPDATECYCLES_COMMONRULE,
        payload: json,
        meta: '通用规则更新'
    }
}
//end
export function fetchUpdateCyclesCommonRuleUpdate(save, params) {
    return (dispatch, getState) => {
        dispatch({
            type: RECEIVE_UPDATECYCLES_COMMONRULE_UPDATE,
            fetchPayload: {  //fetch传值
                url: '/shuyou/updateCycles/commonRule/update',
                options: {
                    method: "post",
                    body: JSON.stringify(save),
                },
                loadingOptions: { //是否显示LOADING
                    show: true
                },
                condition: function(json) {   //判断成功状态条件,如不输入,默认请求成功就返回成功
                    //return json.status.code == 200 ? true : false;
                    if(json.status.code == '200') {
                        dispatch(push('/source/setting/settingHome/' + params));
                        //dispatch(receiveInstitutionsSave(json,history))
                        Message.success("通用规则更新-编辑成功")
                        return true
                    } else {
                        Message.error(json.status.message)
                        return false
                    }
                }
            }
        })
    }
}
//end
//特殊规则列表
export function fetchUpdateCyclesSpecialRules(infraId, save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/updateCycles/' + infraId + '/specialRules', {
            method: "post",
            body: JSON.stringify(save),
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
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
                        dispatch(receiveUpdateCyclesSpecialRules(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveUpdateCyclesSpecialRules(json) {
    //console.log(json)
    return {
        type: RECEIVE_UPDATECYCLES_SPECIALRULES,
        payload: json,
        meta: '特殊规则列表'
    }
}
//end
//添加特殊规则
export function fetchUpdateCyclesSpecialRulesSave(save, history) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/updateCycles/specialRules/save', {
            method: "post",
            body: JSON.stringify(save),
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
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
                        dispatch(receiveUpdateCyclesSpecialRulesSave(json, history))
                    }else{
                        Message.error(json.status.message)
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveUpdateCyclesSpecialRulesSave(json, history) {
    //console.log(json)
    return {
        type: RECEIVE_UPDATECYCLES_SPECIALRULES_SAVE,
        payload: json,
        history: history,
        meta: '添加特殊规则'
    }
}
//end
//添加特殊规则-获取源产品类型
export function fetchUpdateCyclesSpecialRulesProductTypes(infraId) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/updateCycles/specialRules/' + infraId + '/productTypes', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
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
                        dispatch(receiveUpdateCyclesSpecialRulesProductTypes(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveUpdateCyclesSpecialRulesProductTypes(json) {
    //console.log(json)
    return {
        type: RECEIVE_UPDATECYCLES_SPECIALRULES_PRODUCTTYPES,
        payload: json,
        meta: '添加特殊规则-获取源产品类型'
    }
}
//end
//特殊规则列表
export function fetchUpdateCyclesSpecialRulesProductTypesId(id) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/updateCycles/specialRules/productTypes/' + id, {
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
                        dispatch(receiveUpdateCyclesSpecialRulesProductTypesId(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveUpdateCyclesSpecialRulesProductTypesId(json) {
    //console.log(json)
    return {
        type: RECEIVE_UPDATECYCLES_SPECIALRULES_PRODUCTTYPES_ID,
        payload: json,
        meta: '添加特殊规则-根据源产品类型id获取该id下所有的源产品'
    }
}
//end
//编辑并保存特殊规则
export function fetchUpdateCyclesSpecialRulesUpdate(save, history) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/updateCycles/specialRules/update', {
            method: "post",
            body: JSON.stringify(save),
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
                        dispatch(receiveUpdateCyclesSpecialRulesUpdate(json, history))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveUpdateCyclesSpecialRulesUpdate(json, history) {
    //console.log(json)
    return {
        type: RECEIVE_UPDATECYCLES_SPECIALRULES_UPDATE,
        payload: json,
        history: history,
        meta: '编辑并保存特殊规则'
    }
}
//end
//恢复成通用规则
export function fetchUpdateCyclesSpecialRulesRestore(id, history) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/updateCycles/specialRules/restore/' + id, {
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
                        dispatch(receiveUpdateCyclesSpecialRulesRestore(json, history, id))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveUpdateCyclesSpecialRulesRestore(json, history, id) {
    //console.log(json)
    return {
        type: RECEIVE_UPDATECYCLES_SPECIALRULES_RESTORE,
        payload: json,
        id: id,
        history: history,
        meta: '恢复成通用规则'
    }
}
//end
/*this=>数据机构管理*/
//获取数据机构列表
export function fetchInstitutionsList(save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/institutions/list', {
            method: "post",
            body: JSON.stringify(save),
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
                        dispatch(receiveInstitutionsList(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveInstitutionsList(json) {
    //console.log(json)
    return {
        type: RECEIVE_INSTITUTIONS_LIST,
        payload: json,
        meta: '获取数据机构列表'
    }
}
//end
//数据机构详情
export function fetchInstitutionsDetail(id) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/institutions/detail/' + id, {
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
                        dispatch(receiveInstitutionsDetail(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveInstitutionsDetail(json) {
    //console.log(json)
    return {
        type: RECEIVE_INSTITUTIONS_DETAIL,
        payload: json,
        meta: '数据机构详情'
    }
}
//end
//编辑数据机构
export function fetchInstitutionsEdit(id) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/institutions/edit/' + id, {
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
                        dispatch(receiveInstitutionsEdit(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveInstitutionsEdit(json) {
    //console.log(json)
    return {
        type: RECEIVE_INSTITUTIONS_EDIT,
        payload: json,
        meta: '编辑数据机构'
    }
}
//end
//编辑数据机构保存
export function fetchInstitutionsSave(save) {
    return (dispatch, getState) => {
        dispatch({
            type: RECEIVE_INSTITUTIONS_SAVE,
            fetchPayload: {  //fetch传值
                url: '/shuyou/institutions/update',
                options: {
                    method: "post",
                    body: JSON.stringify(save),
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                },
                loadingOptions: { //是否显示LOADING
                    show: true
                },
                condition: function(json) {   //判断成功状态条件,如不输入,默认请求成功就返回成功
                    //return json.status.code == 200 ? true : false;
                    if(json.status.code == '200') {
                        dispatch(push('/source/data'));
                        //dispatch(receiveInstitutionsSave(json,history))
                        Message.success("数据机构管理-编辑成功")
                        return true
                    } else {
                        //Message.error(json.status.message)
                        return false
                    }
                }
            }
        })
    }
}
//清除 编辑数据机构保存
export function fetchInstitutionsSaveClear() {
    return {
        type: RECEIVE_INSTITUTIONS_SAVE_CLEAR,
        payload: null,
        mate: '清除编辑数据机构保存focusError'
    }
}
//end
//编辑数据机构启用或禁用
export function fetchInstitutionsState(id, state) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/institutions/modify/' + id + '/' + state, {
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
                        dispatch(receiveInstitutionsState(json, id))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveInstitutionsState(json, id) {
    //console.log(json)
    return {
        type: RECEIVE_INSTITUTIONS_STATE,
        payload: {
            json,
            id
        },
        meta: '编辑数据机构启用或禁用'
    }
}
//end
/*this=>源产品管理*/
//产品编辑
export function fetchSourceproductsEdit(id) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch(' /shuyou/sourceproducts/edit/' + id, {
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
                        dispatch(receiveSourceproductsEdit(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveSourceproductsEdit(json) {
    //console.log(json)
    return {
        type: RECEIVE_SOURCEPRODUCTS_EDIT,
        payload: json,
        meta: '产品编辑'
    }
}
//end
export function fetchSourceproductsSave(save,infraId) {
    return (dispatch, getState) => {
        dispatch({
            type: RECEIVE_SOURCEPRODUCTS_SAVE,
            fetchPayload: {  //fetch传值
                url: '/shuyou/sourceproducts/update',
                options: {
                    method: "post",
                    body: JSON.stringify(save),
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                },
                loadingOptions: { //是否显示LOADING
                    show: true
                },
                condition: function(json) {   //判断成功状态条件,如不输入,默认请求成功就返回成功
                    //return json.status.code == 200 ? true : false;
                    if(json.status.code == '200') {
                        dispatch(push(`/source/products/home/${infraId}`));
                        //dispatch(receiveInstitutionsSave(json,history))
                        Message.success("源产品管理-编辑成功")
                        return true
                    } else {
                        Message.error(json.status.message)
                        return false
                    }
                }
            }
        })
    }
}
//end
//产品详情
export function fetchSourceproductsDetail(id) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch(' /shuyou/sourceproducts/detail/' + id, {
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
                        dispatch(receiveSourceproductsDetail(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveSourceproductsDetail(json) {
    //console.log(json)
    return {
        type: RECEIVE_SOURCEPRODUCTS_DETAIL,
        payload: json,
        meta: '产品详情'
    }
}
//end
//源产品管理列表
export function fetchSourceproductsList(save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/sourceproducts/list/', {
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
                        dispatch(receiveSourceproductsList(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveSourceproductsList(json) {
    //console.log(json)
    return {
        type: RECEIVE_SOURCEPRODUCTS_LIST,
        payload: json,
        meta: '源产品管理列表'
    }
}
//end
//源产品管理禁用啟用
export function fetchSourceproductsState(id, state) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/sourceproducts/modify/' + id + '/' + state, {
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
                        dispatch(receiveSourceproductsState(json, id))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveSourceproductsState(json, id) {
    //console.log(json)
    return {
        type: RECEIVE_SOURCEPRODUCTS_STATE,
        payload: {
            json,
            id
        },
        meta: '启用或禁用'
    }
}
//end
//源产品管理禁用啟用
export function fetchSourceproductsInnerproducts(id) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/sourceproducts/innerproducts/' + id, {
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
                        dispatch(receiveSourceproductsInnerproducts(json))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveSourceproductsInnerproducts(json) {
    //console.log(json)
    return {
        type: RECEIVE_SOURCEPRODUCTS_INNERPRODUCTS,
        payload: json,
        meta: '启用或禁用'
    }
}
//end
//获取所有数据机构-无分页
export function fetchShuyouInstitutionsAll(id) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading(''));
        fetch('/shuyou/institutions/all/' + id, {
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
                        dispatch(receiveShuyouInstitutionsAll(json, id))
                    }
                }
            )
            .catch(err => {
                dispatch(actionGlobal.hideLoading());
            })
    }
}
function receiveShuyouInstitutionsAll(json, id) {
    return {
        type: RECEIVE_SHUYOU_INSTITUTIONS_ALL,
        payload: {
            json,
            id
        },
        meta: '获取所有数据机构-无分页'
    }
}
//end
