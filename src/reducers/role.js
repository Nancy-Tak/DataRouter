
/**
 * Created by wuyq on 2016/11/7.
 */
import {helper} from 'UTILS' ;
import {actionRole} from 'ACTION';
const _ = require('lodash');
import {
    message
} from 'antd';

export function roleReducer(state = {
    roleManage:{},
    roleInfo:{},
    permissionsArr:[],
    permissionsObj:{},
}, action) {
    switch(action.type) {
        case actionRole.RECEIVE_ROLE_LIST: //获取角色权限列表
            if(action.payload.status.code == '200'){
                const {list,pageNum,pageSize} = action.payload.data;
                helper.addDisplayId(list,pageNum,pageSize);
                return Object.assign({}, state,
                    {
                        roleManage:action.payload.data
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;

        case actionRole.RECEIVE_ROLE_ADD: //角色权限_add
            if(action.payload.status.code == '200'){
                message.success('添加角色成功！');
            }else{
                message.error(action.payload.status.message);
            }
            return state;
            break;
        case actionRole.REMOVE_ROLE_INFO:
            return Object.assign({}, state,
                {
                    roleInfo:[],
                    permissionsObj:[],
                },
                action);
        case actionRole.RECEIVE_ROLE_INFO://角色权限_getInfoById
            if(action.payload.status.code == '200'){
                if(action.operation=='edit'){
                    var permissionsObj = helper.formatListForTree(action.payload.data.permissions || [],true);
                }else if(action.operation=='viewInfo'){
                    var permissions=action.payload.data.permissions || [];
                    var newPermissions = _.filter(permissions,(item)=>{
                        return item.checkStatus
                    });
                    var permissionsObj = helper.formatListForTree(newPermissions);
                }else{
                    var permissionsObj = [];
                    console.log('is not edit or viewInfo..');
                }
                console.log('permissionsObj-reducer:',permissionsObj);
                return Object.assign({}, state,
                    {
                        roleInfo:action.payload.data,
                        permissionsObj:permissionsObj,
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;
        case actionRole.RECEIVE_ROLE_UPDATE: //角色权限_update
            if(action.payload.status.code == '200'){
               message.success('更新角色成功！');
            }else{
                message.error(action.payload.status.message);
            }
            return state;
            break;
        case actionRole.RECEIVE_ROLE_DELETE:
            if(action.payload.status.code == '200'){
                let {list,total} = state.roleManage;
                list = _.filter(list,(item)=>{
                    return item.id != action.payload.deleteId
                });
                total -= 1;
                return Object.assign({},state,{
                    roleManage:{
                        list,total
                    }
                });
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;
        case actionRole.RECEIVE_PERMISSIONS_ALL:
            if(action.payload.status.code == '200'){
                return Object.assign({},state,{
                    permissionsArr:helper.formatListForTree(action.payload.data)
                });
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;

        default:
            return state;
    }
}
