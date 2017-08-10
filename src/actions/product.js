//特殊规则列表
import fetch from 'isomorphic-fetch'
import {_fetch} from 'UTILS'
import {push} from 'react-router-redux';
import {
    message
} from 'antd';
import {helper} from 'UTILS';
/************************************内部产品类型管理***************************************************/
//获取内部产品类型列表
export const RECEIVE_PRODUCTTYPES_LIST = 'receiveProductTypesList'
//新增内部产品类型adding
export const RECEIVE_PRODUCTTYPES_ADDING = 'receiveProductTypesAdding'
//新增内部产品类型保存
export const RECEIVE_PRODUCTTYPES_SAVE = 'receiveProductTypesSave'
//根据id删除内部产品类型记录
export const RECEIVE_PRODUCTTYPES_DELETE = 'receiveProductTypesDelete'
//禁用/启用内部产品类型状态
export const RECEIVE_PRODUCTTYPES_UPDATE_STATE = 'receiveProductTypesUpdateState'
//编辑内部产品类型editing
export const RECEIVE_PRODUCTTYPES_EDITING = 'receiveProductTypesEditing'
//编辑内部产品类型保存
export const RECEIVE_PRODUCTTYPES_EDIT_SAVE = 'receiveProductTypesEditSave'
//取消 新增状态/编辑状态
export const CANCEL_STATUS_ADDINGOREDITING = 'cancelStatusAddingOrEditing'
/*this=>数据机构管理*/
//获取内部产品类型列表
export function fetchProductTypesList() {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        fetch('/shuyou/innerprods/types/list', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({type: "hideLoading", meta: '隐藏loading'});
                if(json.status && json.status.code == 401) {
                    dispatch(push('/userLogin/noLogin'));
                    return;
                }
                dispatch(receiveProductTypesList(json))
            })
    }
}
function receiveProductTypesList(json) {
    return {
        type: RECEIVE_PRODUCTTYPES_LIST,
        payload: json,
        meta: '获取内部产品列表'
    }
}
//end
//新增内部产品adding
export function fetchProductTypesAdding() {
    return function(dispatch, getState) {
        dispatch({
            type: RECEIVE_PRODUCTTYPES_ADDING,
            payload: null,
            meta: '新增内部产品adding'
        })
    }
}
//新增内部产品类型保存
export function fetchProductTypesSave(newObj) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        fetch('/shuyou/innerprods/types/save', {
            method: "post",
            body: JSON.stringify(newObj),
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({type: "hideLoading", meta: '隐藏loading'});
                if(json.status && json.status.code == 401) {
                    dispatch(push('/userLogin/noLogin'));
                    return;
                }
                dispatch(receiveProductTypesSave(json))
            })
    }
}
function receiveProductTypesSave(json) {
    return {
        type: RECEIVE_PRODUCTTYPES_SAVE,
        payload: json,
        meta: '新增内部产品保存'
    }
}
//end
//根据id编辑内部产品editing
export function fetchProductTypesEditing(id) {
    return function(dispatch, getState) {
        dispatch({
            type: RECEIVE_PRODUCTTYPES_EDITING,
            payload: {id},
            meta: '根据id编辑内部产品editing'
        })
    }
}
//编辑内部产品类型保存
export function fetchProductTypesEditSave(updateObj) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        fetch('/shuyou/innerprods/types/update', {
            method: "post",
            body: JSON.stringify(updateObj),
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then((json) => {
                dispatch({type: "hideLoading", meta: '隐藏loading'});
                if(json.status && json.status.code == 401) {
                    dispatch(push('/userLogin/noLogin'));
                    return;
                }
                json.updateId = updateObj.id;
                json.updateTypeName = updateObj.typeName;
                dispatch(receiveProductTypesEditSave(json))
            })
    }
}
function receiveProductTypesEditSave(json) {
    return {
        type: RECEIVE_PRODUCTTYPES_EDIT_SAVE,
        payload: json,
        meta: 'update内部产品保存'
    }
}
//end
//根据id删除内部产品类型
export function fetchProductTypesDelete(id) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        fetch(`/shuyou/innerprods/types/delete/${id}`, {
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
                (json) => {
                    dispatch({type: "hideLoading", meta: '隐藏loading'});
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    json.deleteId = id;//把删除的id带上
                    dispatch(receiveProductTypesDelete(json))
                }
            )
    }
}
function receiveProductTypesDelete(json) {
    return {
        type: RECEIVE_PRODUCTTYPES_DELETE,
        payload: json,
        meta: '删除内部产品'
    }
}
//end
//禁用/启用内部产品状态
export function fetchProductTypesUpdateState(id, state) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        fetch(`/shuyou/innerprods/types/modify/${id}/${state}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(
                (json) => {
                    dispatch({type: "hideLoading", meta: '隐藏loading'});
                    if(json.status && json.status.code == 401) {
                        dispatch(push('/userLogin/noLogin'));
                        return;
                    }
                    json.updateId = id;//with the update record id and state
                    json.updateState = state;
                    dispatch(receiveProductTypesUpdateState(json))
                }
            )
    }
}
function receiveProductTypesUpdateState(json) {
    return {
        type: RECEIVE_PRODUCTTYPES_UPDATE_STATE,
        payload: json,
        meta: '删除内部产品'
    }
}
//end
////取消 新增状态/编辑状态
export function cancelStatusAddingOrEditing() {
    return function(dispatch, getState) {
        dispatch({
            type: CANCEL_STATUS_ADDINGOREDITING,
            payload: null,
            meta: '取消 新增状态/编辑状态'
        })
    }
}
/************************************内部产品模板管理***************************************************/

//获取内部产品模板列表
export const RECEIVE_PRODUCTTPLS_LIST = 'receiveProductTplsList'
//获取所有的内部产品类型
export const RECEIVE_INNERPRODS = 'receiveInnerProds'
//禁用/启用内部产品模板状态
export const RECEIVE_PRODUCTTPLS_UPDATE_STATE = 'receiveProductTplsUpdateState'
//内部产品模板edit状态
export const RECEIVE_PRODUCTTPLS_EDIT = 'receiveProductTplsEdit'
//内部产品模板edit状态
export const RECEIVE_PRODUCTTPLS_EDIT_SAVE = 'receiveProductTplsEditSave'
//获取预估费用列表
export const RECEIVE_INNERPRODS_ESTIMATEDFEE_LIST = 'receiveInnerProdsEstimatedFeeList'
//获取内部产品模板列表
export function fetchProductTplsList(data) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/innerprods/templates', 'post', data).then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_PRODUCTTPLS_LIST,
                payload: res,
                meta: '获取内部产品模板列表'
            })
        });
    }
}
//end
//获取所有内部产品类型
export function fetchInnerProds() {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/innerprods/types/all', 'get').then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_INNERPRODS,
                payload: res,
                meta: '获取所有内部产品类型'
            })
        });
    }
}
//end
//禁用/启用内部产品模板状态
export function updateProductTplsStatus(id, state) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/innerprods/templates/modify/${id}/${state}`, 'get').then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_PRODUCTTPLS_UPDATE_STATE,
                payload: Object.assign({}, res, {updateId: id, updateState: state}),
                meta: '禁用/启用内部产品模板状态'
            })
        });
    }
}
//end
//内部产品模板edit状态
export function productTplsEdit(id) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/innerprods/templates/${id}`, 'get').then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_PRODUCTTPLS_EDIT,
                payload: res,
                meta: '内部产品模板edit状态'
            })
        });
    }
}
//end
//内部产品模板edit状态
export function productTplsEditSave(data, form) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/innerprods/templates/save`, 'post', data).then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            if(res.status.code == 200) {
                dispatch(push('/product/productTemplate/home'));
                message.success('保存成功！');
            } else {
                if(res.status.code == '4001') {
                    helper.focusError(form, res.data);
                }else{
                    message.error(res.status.message);
                }
            }
        });
    }
}
//end
//获取预估费用列表
export function fetchProductTplsEstimatedFeeList(id) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/innerprods/templates/fees/expand/${id}`, 'get').then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_INNERPRODS_ESTIMATEDFEE_LIST,
                payload: res,
                meta: '获取预估费用列表'
            })
        });
    }
}
//end
