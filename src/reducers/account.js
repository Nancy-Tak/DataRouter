/**
 * Created by wuyq on 2016/11/7.
 */
import {actionAccount} from 'ACTION';
const _ = require('lodash');
import {
    message
} from 'antd';

import {helper} from 'UTILS';

export function accountReducer(state = {
    accountManage:{},
    selectRoleItems:[],
    editAccountInfo:{}
}, action) {
    switch(action.type) {
        case actionAccount.RECEIVE_ACCOUNT_LIST: //员工账号列表
            if(action.payload.status.code == '200'){
                const {list,pageNum,pageSize} = action.payload.data;
                helper.addDisplayId(list,pageNum,pageSize);
                return Object.assign({}, state,
                    {
                        accountManage:action.payload.data
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;

        case actionAccount.RECEIVE_ALL_ROLE_LIST: //获取所有角色类型
            if(action.payload.status.code == '200'){
                action.payload.data.unshift({id:'',name:'全部'});
                return Object.assign({}, state,
                    {
                        selectRoleItems:action.payload.data
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;
        case actionAccount.RECEIVE_ACCOUNT_ADD: //员工账号_add_save
            if(action.payload.status.code == '200'){
                message.success('员工账号新增成功！');
            }else{
                message.error(action.payload.status.message);
            }
            return state;
            break;
        case actionAccount.RECEIVE_ACCOUNT_UPDATE_STATE: //员工账号_禁用/启用
            if(action.payload.status.code == '200'){
                return Object.assign({}, state,
                        {
                            accountManage:{
                                list:state.accountManage.list.map((item,index)=>{
                                    if(item.id == action.payload.updateId) {
                                        return Object.assign({},item,{
                                            state:action.payload.updateState
                                        })
                                    }
                                    return item;
                                })
                            }
                        },
                        action);
                }else{
                    message.error(action.payload.status.message);
                    return state;
                }
                break;
            case actionAccount.RECEIVE_ACCOUNT_EDIT://员工账号_edit（根据id获取员工信息）
                if(action.payload.status.code == '200'){
                    return Object.assign({}, state,
                        {
                            editAccountInfo:action.payload.data
                        },
                        action);
                }else{
                    message.error(action.payload.status.message);
                    return state;
                }
                break;
            case actionAccount.RECEIVE_ACCOUNT_EDIT_SAVE: //员工账号_edit_save
                if(action.payload.status.code == '200'){
                    //todo 成功后返回index页重新刷新
                    message.success('员工账号修改成功！');
                }else{
                    message.error(action.payload.status.message);
                }
                return state;
                break;
            case actionAccount.RECEIVE_ACCOUNT_UPDATE_PASSWORD:
                if(action.payload.status.code == '200'){
                    //todo 成功后返回index页重新刷新
                    message.success('重置密码成功！');
                }else{
                    message.error(action.payload.status.message);

                }
                return state;
                break;

        default:
            return state;
    }
}
