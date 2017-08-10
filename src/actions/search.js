import fetch from 'isomorphic-fetch';
import {actionGlobal} from 'ACTION';
import {push} from 'react-router-redux';
//查询个人消费和收支数据
export const RECEIVE_TEMPLATE_DATASEARCH = 'receiveTemplateDataSearch';
export const RECEIVE_TEMPLATE_DATASEARCH_ERROR = 'receiveTemplateDataSearchError';
export const CLEAR_MESSAGE = 'clearMessage';
export const CLEAR_TEMPLATEDATA = 'clearTemplateData';
export const GET_TYPESANDTEMPLATES = 'getTypesAndTemplates';
export const GET_TYPESANDTEMPLATES_SUCCESS = 'getTypesAndTemplatesSuccess';
export const GET_TYPESANDTEMPLATES_FAILURE = 'getTypesAndTemplatesFailure';
export const SEARCH_SELECT_LEAVE = 'searchSelectLeave';
export function leave() {
    return {
        type: SEARCH_SELECT_LEAVE,
        payload: null,
        meta: '离开数据查询页'
    }
}
export function fetchTemplatesType() {
    return {
        type: GET_TYPESANDTEMPLATES,
        fetchPayload: {
            url: '/shuyou/innerprods/typesAndTemplates/enabled',
            options: {
                method: "get",
            },
            loadingOptions: { //是否显示LOADING
                show: true
            },
            condition: function(json) {   //判断成功状态条件,如不输入,默认请求成功就返回成功
                return json.status.code == 200 ? true : false;
            }
        }
    }
}
//查询个人消费和收支数据
export function fetchTemplateDataSearch(id, save) {
    return function(dispatch, getState) {
        dispatch(actionGlobal.showLoading('数据查询中，请稍后...'));
        dispatch(clearMessage());
        fetch('/shuyou/template/dataSearch/' + id, {
            method: "post",
            body: JSON.stringify(save),
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
                        dispatch(receiveTemplateDataSearch(json))
                    } else {
                        dispatch(receiveTemplateDataSearchError(json))
                    }
                }
            ).catch(err => {
            dispatch(actionGlobal.hideLoading());
        })
    }
}
function receiveTemplateDataSearch(json) {
    return {
        type: RECEIVE_TEMPLATE_DATASEARCH,
        payload: json,
        meta: '查询个人消费和收支数据'
    }
}
function receiveTemplateDataSearchError(err) {
    return {
        type: RECEIVE_TEMPLATE_DATASEARCH_ERROR,
        payload: err,
        meta: '查询失败'
    }
}
export function clearMessage() {
    return {
        type: CLEAR_MESSAGE,
        payload: null,
        meta: '清除消息'
    }
}
export function clearTemplateData() {
    return {
        type: CLEAR_TEMPLATEDATA,
        payload: null,
        meta: '清除数据'
    }
}
