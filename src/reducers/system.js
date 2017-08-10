/**
 * Created by wuyq on 2016/12/12.
 */
import {actionSystem} from 'ACTION';
const _ = require('lodash');
import {
    message
} from 'antd';

export function systemReducer(state = {
    systemAccountInfo:{}
}, action) {
    switch(action.type) {
        case actionSystem.RECEIVE_SYSTEM_ACCOUNT_INFO: //系统管理-账号信息
            if(action.payload.status.code == '200'){
                return Object.assign({}, state,
                    {
                        systemAccountInfo:action.payload.data
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;
        case actionSystem.RECEIVE_SYSTEM_RESETPASSWORD: //系统管理-修改密码
            if(action.payload.status.code == '200'){
                message.success(`密码修改成功！`);
                return state;
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;
        default:
            return state;
    }
}
