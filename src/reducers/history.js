/**
 * Created by Ethan on 2016/11/21.
 */
import {actionHistory} from 'ACTION';
import {helper} from 'UTILS';
export function historyReducer(state = {
    recordRecordDatasources:[],
    recordOriginalProducts:{},
    recordOriginalProductsProducts:[],
    recordOriginalProductsId:{},
    recordInternalProducts:{},
    recordInternalProductsProducts:[],
    recordInternalProductsId:{},
    recordUsers:{},
    recordUsersProducts:[],
    recordUsersTemplate:{},
    recordUsersTemplateStatus:{}
}, action) {
    switch(action.type) {
        //数据源查询记录
        case actionHistory.RECORD_RECORD_DATASOURCES:
            let recordRecordDatasources = action.payload.data
            //recordRecordDatasources.unshift({id:'',name:'全部'})
            return {
                ...state,
                recordRecordDatasources,
                action
            }
            //数据源查询记录
        case actionHistory.RECORD_RECORD_ORIGINAL_PRODUCTS:
            if(action.payload.status.code == '200'){

                let recordOriginalProducts = action.payload.data
                let recordOriginalProductsProducts = action.payload.products
                recordOriginalProductsProducts.unshift({id:'',name:'全部'})

                return {
                    ...state,
                    recordOriginalProducts,
                    recordOriginalProductsProducts,
                }
            }else{
                Message.error(action.payload.status.message);
                return state;
            }
        case actionHistory.RECORD_RECORD_ORIGINAL_PRODUCTS_ID:
            let recordOriginalProductsId = action.payload.data

            return {
                ...state,
                recordOriginalProductsId,
                action
            }
        case actionHistory.RECORD_INTERNAL_PRODUCTS:
            if(action.payload.status.code == '200'){
                let recordInternalProducts = action.payload.data
                let recordInternalProductsProducts = action.payload.products
                recordInternalProductsProducts.unshift({id:'',name:'全部'})

                return {
                    ...state,
                    recordInternalProducts,
                    recordInternalProductsProducts,
                    action
                }
            }else{
                Message.error(action.payload.status.message);
                return state;
            }
        case actionHistory.RECORD_INTERNAL_PRODUCTS_ID:
            let recordInternalProductsId = action.payload.data

            return {
                ...state,
                recordInternalProductsId,
                action
            }
        case actionHistory.RECORD_USERS:
            if(action.payload.status.code == '200'){
                const {list,pageNum,pageSize} = action.payload.data;
                helper.addDisplayId(list,pageNum,pageSize);
                let recordUsers = action.payload.data;
                let recordUsersProducts = action.payload.products;
                recordUsersProducts.unshift({id:'',name:'全部'})


                return {
                    ...state,
                    recordUsers,
                    recordUsersProducts,
                    action
                }
            }else{
                Message.error(action.payload.status.message);
                return state;
            }
        case actionHistory.RECORD_USERS_TEMPLATE:
            let recordUsersTemplate =JSON.parse(action.payload.data);
            let recordUsersTemplateStatus =action.payload.status
            return {
                ...state,
                recordUsersTemplate,
                recordUsersTemplateStatus
            }
        case actionHistory.RECORD_USERS_TEMPLATE_CLEAR:
            return {
                ...state,
                recordUsersTemplate:null,
                recordUsersTemplateStatus:null
            }
        default:
            return state;
    }
}
