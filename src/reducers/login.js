/**
 * Created by Ethan on 2016/11/21.
 */
import {actionLogin} from 'ACTION';
export function loginReducer(state = {
    message: '',
    loading: false,
    isLogined: false, //是否登录
    auth: null,  //权限信息
    username: null,//用户名
    logoutMsg: null//提示信息
}, action) {
    switch(action.type) {
        case actionLogin.LOGIN_REQUEST: //登录请求
            return {
                ...state,
                loading: true,
                message: '',
                logoutMsg: false
            }
            break;
        case actionLogin.LOGIN_SUCCESS: //登录成功
            return {
                ...state,
                auth: action.payload.data,
                username: action.payload.username,
                loading: false,
                message: '',
                isLogined: true,
                logoutMsg: false
            }
            break;
        case actionLogin.LOGIN_FAILURE:  //登录失败
            return {
                ...state,
                loading: false,
                message: action.payload.status.message,
                isLogined: false,
                logoutMsg: false
            }
            break;
        case actionLogin.LOGOUT_REQUEST: //退出请求
            return {
                ...state,
                logoutMsg: false,
            };
            break;
        case actionLogin.LOGOUT_SUCCESS: //退出成功
            return {
                ...state,
                logoutMsg: true,
                auth: null,
                username: '',
                isLogined: false,
            }
            break;
        case actionLogin.LOGOUT_FAILURE: //退出失败
            return {
                ...state,
                logoutMsg: false
            }
            break;
        case actionLogin.CLEAR_MODAL: 
            return {
                ...state,
                logoutMsg: false
            }
            break;
        case actionLogin.NO_LOGIN:
            return {
                ...state,
                isLogined: false,
            }
            break;
        default:
            return state;
    }
}