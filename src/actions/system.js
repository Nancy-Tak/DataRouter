//特殊规则列表
import {_fetch,helper} from 'UTILS'
import {push} from 'react-router-redux';

/************************************系统管理***************************************************/
//系统管理-账号信息
export const RECEIVE_SYSTEM_ACCOUNT_INFO = 'receiveSystemAccountInfo'
//系统管理-修改密码
export const RECEIVE_SYSTEM_RESETPASSWORD = 'receiveSystemResetPassword'
import {
    message
} from 'antd';
import {fetchLogout} from './login';
//系统管理-账号信息
export function fetchSystemAccountInfo() {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/account/info', 'get').then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            dispatch({
                type: RECEIVE_SYSTEM_ACCOUNT_INFO,
                payload: res,
                meta: '系统管理-账号信息'
            })
        });
    }
}
//end
//系统管理-修改密码
export function resetSystemAccountPassword(data,form) {
    return function(dispatch, getState) {
        dispatch({type: "showLoading", payload: '', meta: '显示loading'});
        _fetch('/shuyou/account/password', 'put', data).then((res) => {
            dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 401) {
                dispatch(push('/userLogin/noLogin'));
                return;
            }
            if(res.status.code == 200) {
                dispatch(fetchLogout())
            } else {
                if(res.status.code == '4001') {
                    helper.focusError(form, res.data);
                }else{
                    message.error(`(${res.status.code})${res.status.message}`);
                }
            }
        });
    }
}
//end

