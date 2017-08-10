/**
 * Created by Ethan on 2016/11/21.
 */
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
export const LOGIN = 'login';
export const LOGIN_REQUEST = 'loginRequest'; //命名要注意，（小驼峰）
export const LOGIN_FAILURE = 'loginFailure';
export const LOGIN_SUCCESS = 'loginSuccess';
export const LOGOUT = 'logout';
export const LOGOUT_REQUEST = 'logoutRequest';
export const LOGOUT_FAILURE = 'logoutFailure';
export const LOGOUT_SUCCESS = 'logoutSuccess';
export const SET_LOGIN_STATUS = 'setLoginStatus';
export const CLEAR_MODAL = 'clearModal';
export const NO_LOGIN = 'noLogin';
export function fetchLogin(username, password) {
    return (dispatch, getState) => {
        dispatch({
            type: LOGIN,
            payload: {     //真实的payload传值
                username
            },
            fetchPayload: {  //fetch传值
                url: '/shuyou/login',
                options: {
                    method: 'post',
                    body: JSON.stringify({
                        username: username,
                        password: password
                    }),
                },
                condition: function(json) {   //判断成功状态条件,如不输入,默认请求成功就返回成功
                    return json.status.code == 200 ? true : false;
                }
            }
        })
    }
}
export function fetchLogout() {
    return {
        type: LOGOUT,
        fetchPayload: {
            url: '/shuyou/logout',
        }
    }
}
export function clearModal() {
    cookie.remove('DRM_AUTH');
    cookie.remove('DRM_USERNAME');
    return {
        type: CLEAR_MODAL,
        payload: null,
        mate: '隐藏提示框'
    }
}
export function noLogin() {
    cookie.remove('DRM_AUTH');
    cookie.remove('DRM_USERNAME');
    return {
        type: NO_LOGIN,
        payload: null,
        mate: '没有登录'
    }
}
export function setLoginStatus() {
    return (dispatch, getState) => {
        let auth = getState().loginReducer.auth;
        let username;
        if(auth) return;
        auth = cookie.load('DRM_AUTH');
        username = cookie.load('DRM_USERNAME');
        if(auth) {
            let auths = auth.split("-");
            let authObj = [];
            for(var i = 0; i < auths.length; i++) {
                var obj = {};
                obj.key = auths[i];
                authObj.push(obj);
            }
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    data: authObj,
                    username: username
                },
                meta: '从cookies获取权限'
            })
        } else {
            return null
        }
    }
}



