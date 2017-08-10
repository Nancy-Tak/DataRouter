//特殊规则列表
import {_fetch} from 'UTILS'
import {push} from 'react-router-redux';
/**************************************角色权限****************************************/
//获取角色权限列表
export const RECEIVE_ROLE_LIST = 'receiveRoleList'
//角色权限_add
export const RECEIVE_ROLE_ADD = 'receiveRoleAdd'
//角色权限_getInfoById
export const RECEIVE_ROLE_INFO = 'receiveRoleInfo'
//角色权限_updateInfoById
export const RECEIVE_ROLE_UPDATE = 'receiveRoleUpdate'
//角色权限_delete
export const RECEIVE_ROLE_DELETE = 'receiveRoleDelete'
//获取整个权限树列表
export const RECEIVE_PERMISSIONS_ALL = 'receivePermissionsAll'
//清掉 roleInfo state
export  const REMOVE_ROLE_INFO = 'removeRoleInfo';

//获取角色权限列表
export function fetchRoleList(data) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/roles/query', 'post', data).then((res)=> {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_ROLE_LIST,
                payload: res,
                meta: '获取角色权限列表'
            })
        });
    }
}
//end
//角色权限_add
export function addRole(data) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/roles', 'post', data).then((res)=> {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            if(res.status.code == '200'){
                dispatch(push('/account/roleManage/home'));
            }
            dispatch({
                type: RECEIVE_ROLE_ADD,
                payload: res,
                meta: '角色权限_add'
            })
        });
    }
}
//end

//清掉roleInfo state
export  function  removeRoleInfo(){
    return function(dispatch, getState) {
        dispatch({
            type: REMOVE_ROLE_INFO,
            meta: '清掉roleInfo state'
        })
    }
}

//角色权限_getInfoById
export function fetchRoleInfoById(id,operation) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/roles/${id}`, 'get').then((res)=> {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_ROLE_INFO,
                payload: res,
                operation:operation,
                meta: '角色权限_getInfoById'
            })
        });
    }
}
//end
//角色权限_updateInfoById
export function updateRoleInfo(data) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/roles', 'put', data).then((res)=> {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            if(res.status.code == '200') {
                dispatch(push('/account/roleManage/home'));
            }
            dispatch({
                type: RECEIVE_ROLE_UPDATE,
                payload:res,
                meta: '角色权限_updateInfoById'
            })
        });
    }
}
//end
// //角色权限_delete
export function deleteRole(id) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/roles/${id}`, 'delete').then((res)=> {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_ROLE_DELETE,
                payload: Object.assign({}, res, {deleteId: id}),
                meta: '角色权限_delete'
            })
        });
    }
}
//获取整个权限树列表
export function getPermissionsAll() {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch(`/shuyou/permissions`, 'get').then((res)=> {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_PERMISSIONS_ALL,
                payload: res,
                meta: '获取整个权限树列表'
            })
        });
    }
}
