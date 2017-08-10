/**
 * Created by wuyq on 2016/11/3.
 */
import {actionProduct} from 'ACTION';
import {helper} from 'UTILS';
const _ = require('lodash');
import {
    message
} from 'antd';

export function productReducer(state = {
    productTypes:{},
    productTpls:{},
    innerprods:[],
    productTplsEditObj:{},
    estimatedFeeList:[],
    isOperating:false
}, action) {
    switch(action.type) {
/************************************内部产品类型管理***************************************************/
        case actionProduct.RECEIVE_PRODUCTTYPES_LIST: //内部产品列表
            if(action.payload.status.code == '200'){
                return Object.assign({}, state,
                    {
                        productTypes:action.payload.data,
                        isOperating:false
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
            break;
        case actionProduct.RECEIVE_PRODUCTTYPES_DELETE:
            if(action.payload.status.code == "200") { //删除成功
                var list = state.productTypes.list;
                var total = state.productTypes.total;
                for(var i = 0; i < list.length; i++) {
                    var item = list[i];
                    if(item.id == action.payload.deleteId) {
                        list.splice(i, 1);
                        total--;
                        i--;
                    }
                }
                message.success('删除成功！');
                return Object.assign({}, state,
                {
                    productTypes: {
                        list,total
                    }
                },
                action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }

        case actionProduct.RECEIVE_PRODUCTTYPES_UPDATE_STATE:
            if(action.payload.status.code == "200") { //禁止/启动操作成功
                return Object.assign({}, state,
                {
                    productTypes:{
                        list:state.productTypes.list.map((item,index)=>{
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

        case actionProduct.RECEIVE_PRODUCTTYPES_SAVE:
            if(action.payload.status.code == "200") { //新增保存
                var list = state.productTypes.list;
                list = _.filter(list,(item)=>{
                    return !item.isAdding
                });
                list.push(action.payload.data);
                return Object.assign({}, state,
                {
                    productTypes:{
                        list
                    },
                    isOperating:false
                },
                action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
        case actionProduct.RECEIVE_PRODUCTTYPES_ADDING:
            return Object.assign({}, state,
                {
                    productTypes:{
                        list:[...state.productTypes.list,{"createTime":"","id":"","num":"","state":"","typeCode":"","typeName":"","isAdding":true,_operatingId:new Date() / 1}]
                    },
                    isOperating:true
                },
                action);
        case actionProduct.RECEIVE_PRODUCTTYPES_EDITING:  //编辑
            return Object.assign({},state,
                {
                    productTypes:{
                        list:state.productTypes.list.map((item,index)=>{
                            if(item.id == action.payload.id){
                                return Object.assign({},item,{
                                    isEditing:true,
                                    _operatingId:new Date() / 1
                                })
                            }
                            return item;
                        })
                    },
                    isOperating:true
                },
                action);
        case actionProduct.RECEIVE_PRODUCTTYPES_EDIT_SAVE:  //编辑保存
            if(action.payload.status.code == '200'){
                return Object.assign({},state,
                {
                    productTypes:{
                        list:state.productTypes.list.map((item,index)=>{
                            if(item.id == action.payload.updateId){
                                return Object.assign({},item,{
                                    typeName:action.payload.updateTypeName,
                                    isEditing:false
                                })
                            }
                            return item;
                        })
                    },
                    isOperating:false
                },
                action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
        case actionProduct.CANCEL_STATUS_ADDINGOREDITING: //取消 新增状态/编辑状态
            var list = state.productTypes.list;
            list = _.filter(list,(item)=>{
                return !item.isAdding
            });
            return Object.assign({},state,
                {
                    productTypes:{
                        list:list.map((item,index)=>{
                            if(item.isEditing){
                                return Object.assign({},item,{
                                    isEditing:false
                                })
                            }
                            return item;
                        })
                    },
                    isOperating:false
                },
                action);
/************************************内部产品模板管理***************************************************/
        case actionProduct.RECEIVE_PRODUCTTPLS_LIST:
            if(action.payload.status.code == '200'){ //内部产品模板列表
                console.log(action.payload.data);
                const {list,pageNum,pageSize} = action.payload.data;
                helper.addDisplayId(list,pageNum,pageSize);
                return Object.assign({}, state,
                    {
                        productTpls:action.payload.data
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
        case actionProduct.RECEIVE_INNERPRODS:  //获取所有内部产品类型
            if(action.payload.status.code == '200'){
                action.payload.data.unshift({id:'',typeName:'全部'});
                return Object.assign({}, state,
                    {
                        innerprods:action.payload.data
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
        case actionProduct.RECEIVE_PRODUCTTPLS_UPDATE_STATE: // 禁用/开启内部产品模板
            if(action.payload.status.code == '200'){
                return Object.assign({}, state,
                    {
                        productTpls:{
                            list:state.productTpls.list.map((item,index)=>{
                                if(item.id==action.payload.updateId){
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
        case actionProduct.RECEIVE_PRODUCTTPLS_EDIT:
            if(action.payload.status.code == '200'){
                return Object.assign({}, state,
                    {
                        productTplsEditObj:action.payload.data
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
        case actionProduct.RECEIVE_PRODUCTTPLS_EDIT_SAVE:
            if(action.payload.status.code == '200'){
                message.success('保存成功！');
            }else{
                message.error(action.payload.status.message);
            }
            return state;
            break;
        case actionProduct.RECEIVE_INNERPRODS_ESTIMATEDFEE_LIST://获取预估费用列表
            if(action.payload.status.code == '200'){
                return Object.assign({}, state,
                    {
                        estimatedFeeList:action.payload.data.list
                    },
                    action);
            }else{
                message.error(action.payload.status.message);
                return state;
            }
        default:
            return state;
    }
}
