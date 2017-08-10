//特殊规则列表
import {_fetch} from 'UTILS'
import {push} from 'react-router-redux';
import {
    message
} from 'antd';
import {helper} from 'UTILS';
/************************************账户管理***************************************************/
//获取员工账号列表
export const RECEIVE_ACCOUNT_LIST = 'receiveAccountList'
//获取所有角色类型
export const RECEIVE_ALL_ROLE_LIST = 'receiveAllRoleList'
//员工账号_add
export const RECEIVE_ACCOUNT_ADD = 'receiveAccountAdd'
//员工账号_禁用/启用
export const RECEIVE_ACCOUNT_UPDATE_STATE = 'receiveAccountUpdateState'
//员工账号_edit（根据id获取员工信息）
export const RECEIVE_ACCOUNT_EDIT = 'receiveAccountEdit'
//员工账号_edit_save（更新员工信息）
export const RECEIVE_ACCOUNT_EDIT_SAVE = 'receiveAccountEditSave'
//员工账号_update_password（更新员工信息）
export const RECEIVE_ACCOUNT_UPDATE_PASSWORD = 'receiveAccountUpdatePassword'


//获取员工账号列表
export function fetchAccountList(data) {
    return function (dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/users/query', 'post', data).then((res)=> {
            dispatch({
                type: RECEIVE_ACCOUNT_LIST,
                payload: res,
                meta: '获取员工账号列表'
            })
            dispatch({type: "hideLoading", meta: '隐藏loading'});
        });
    }
}
//end
//获取所有角色类型
export function fetchAllRoleList() {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/api/roles', 'get').then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_ALL_ROLE_LIST,
                payload: res,
                meta: '获取所有角色类型'
            })
        });
    }
}
//end

//员工账号_add
export function addAccount(data, form) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/users', 'post', data).then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            if(res.status.code == '200') {
                dispatch(push('/account/accountManage/home'));
                message.success('员工账号新增成功！');
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
//员工账号_禁用/启用
export function updateAccountState(id, state) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/users/${id}/updateState/${state}`, 'get').then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_ACCOUNT_UPDATE_STATE,
                payload: Object.assign({}, res, {updateId: id, updateState: state}),
                meta: '员工账号_禁用/启用'
            })
        });
    }
}
//end
//员工账号_edit
export function fetchAccountInfoById(id) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/users/${id}`, 'get').then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_ACCOUNT_EDIT,
                payload: res,
                meta: '员工账号_edit'
            })
        });
    }
}
//end

//员工账号_edit_save（更新员工信息）
export function updateAccountInfo(data, form) {
    return function (dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/users', 'put', data).then((res)=> {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if (res.status.code == '200') {
                dispatch(push('/account/accountManage/home'));
                message.success('员工账号修改成功！');
            }else{
                if(res.status.code == '4001'){
                    helper.focusError(form,res.data);
                }else{
                    message.error(res.status.message);
                }
            }
            //dispatch({
            //    type: RECEIVE_ACCOUNT_EDIT_SAVE,
            //    payload: res,
            //    meta: '员工账号_edit_save'
            //})
        });
    }
}
//end

//员工账号_update_password

export function updateAccountPassword(data, form) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/users/${data.id}/password`, 'put', data).then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            if (res.status.code == '200') {
                message.success('重置密码成功！');
                dispatch(push('/account/accountManage/home'));
            }else{
                if(res.status.code == '4001'){
                    helper.focusError(form,res.data);
                }else{
                    message.error(res.status.message);
                }
            }
        });
    }
}
//end

//查询用户名是否重名
export function userExists(data, callback) {
    return function(dispatch, getState) {
        _fetch('/shuyou/api/checkUser', 'post', data).then((res) => {
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            if(res.status.code == '200') {
                if(res.data) {
                    callback(new Error('此账号名称已存在'));
                } else {
                    callback();
                }
            } else {
                if(res.status.code != '4001'){
                    message.error(`(${res.status.code})${res.status.message}`);
                }
            }
        })
    }
}
