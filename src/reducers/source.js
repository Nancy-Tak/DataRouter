import {actionSource} from 'ACTION';
import {
    Message,
    Modal
} from 'antd';
import MAP from 'STATIC';

export function sourceReducer(state = {
    //数据机构管理
    institutions: {},
    institutionsDetail: {},
    institutionsEditor: {},
    //源产品管理列表
    sourceproducts: {},
    sourceproductsDetail: {},
    sourceproductsEdit: {},
    sourceproductsSave: {},
    sourceproductsInnerproducts: [],
    //产品更新周期配置
    updateCyclesCommonRule: {},
    UpdateCyclesSpecialRules: {},
    CyclesSpecialRulesProductTypes: [],
    CyclesSpecialRulesProductTypesId: [],
    CyclesSpecialRulesSave: {},
    //获取所有数据机构-无分页
    receiveShuyouInstitutionsAll: [],
    //源产品权限控制
    //源产品管理
    institutionsSourceProduct: [],
    //源产品更新周期配置
    institutionsSourceSetting: [],
    //数据源查询记录
    institutionsHistoryData: [],

    failMassage:null,


}, action) {
    switch(action.type) {
        /*this=>数据机构*/
        //数据机构列表
        case actionSource.RECEIVE_INSTITUTIONS_LIST:
            let institutions = action.payload.data;
            //console.log("institutions",institutions)
            return Object.assign({}, state,
                {
                    institutions: institutions
                },
                action);
            break;
        //数据机构详情
        case actionSource.RECEIVE_INSTITUTIONS_DETAIL:
            let institutionsDetail = action.payload.data;
            return Object.assign({}, state, {
                institutionsDetail: institutionsDetail
            }, action)
            break;
        //数据机构编辑
        case actionSource.RECEIVE_INSTITUTIONS_EDIT:
            let institutionsEditor = action.payload.data;
            return Object.assign({}, state, {
                institutionsEditor: institutionsEditor
            }, action)
            break;
        //数据机构编辑
        // case actionSource.RECEIVE_INSTITUTIONS_SAVE:
        //     let institutionsSave = action.payload;
        //     console.log(institutionsSave)
        //     if(institutionsSave.status.code==200){
        //         Message.success("保存成功")
        //         action.history.push("/source/data")
        //     }else{
        //         Message.error("保存失败")
        //     }
        //
        //     // return Object.assign({},state,{
        //     //     institutionsEditor:institutionsEditor
        //     // },action)
        //     return state
        //     break;
        case actionSource.RECEIVE_INSTITUTIONS_SAVE_SUCCESS:
            //console.log("RECEIVE_INSTITUTIONS_SAVE_SUCCESS",action)
            return state
            break;
        case actionSource.RECEIVE_INSTITUTIONS_SAVE_FAILURE:
            return {
                ...state,
                failMassage:action.payload.data
            }
            break;
        case actionSource.RECEIVE_INSTITUTIONS_SAVE_CLEAR:
            return {
                ...state,
                failMassage:null
            }
            break;
        //数据机构管理 启用或禁用
        case actionSource.RECEIVE_INSTITUTIONS_STATE:
            //let institutionsState = action.payload;
            //console.log("RECEIVE_INSTITUTIONS_STATE",action)
            if(action.payload.json.status.code == 200) {
                state.institutions.list.map((item, index) => {
                    //这里还需要优化，这个rap有问题
                    if(item.id == action.payload.id) {
                        item.state == 1
                            ?
                            item.state = 0
                            :
                            item.state = 1
                    }
                })
            } else {
                Message.error("交互失败");
            }
            // console.log("state",state)
            // console.log("institutions",state.institutions)
            // console.log("institutionsState",institutionsState)
            return Object.assign({}, state,
                {
                    institutions: {
                        list: state.institutions.list.concat(),
                        total: state.institutions.total
                    }
                },
                action);
            break;

        /*this=>源产品管理*/
        //源产品管理
        case actionSource.RECEIVE_SOURCEPRODUCTS_LIST:
            let sourceproducts = action.payload.data;
            //console.log(sourceproducts)
            return Object.assign({}, state,
                {
                    sourceproducts: sourceproducts
                },
                action);
            break;
        //源产品管理详情
        case actionSource.RECEIVE_SOURCEPRODUCTS_DETAIL:
            let sourceproductsDetail = action.payload.data;
            //console.log(sourceproductsDetail)
            return Object.assign({}, state,
                {
                    sourceproductsDetail: sourceproductsDetail
                },
                action);
            break;
        //源产品管理编辑
        case actionSource.RECEIVE_SOURCEPRODUCTS_EDIT:
            let sourceproductsEdit = action.payload.data;
            // console.log(sourceproductsEdit)
            return Object.assign({}, state,
                {
                    sourceproductsEdit: sourceproductsEdit
                },
                action);
            break;
        //源产品管理保存
        case actionSource.RECEIVE_SOURCEPRODUCTS_SAVE:
            let sourceproductsSave = action.payload;
            if(sourceproductsSave.status.code == 200) {
                Message.success("保存成功")
                action.history.push("/source/products")
            } else {
                Message.error("保存失败")
            }
            return Object.assign({}, state,
                {
                    sourceproductsSave: sourceproductsSave.data
                },
                action);
            break;
        case actionSource.RECEIVE_SOURCEPRODUCTS_SAVE_FAILURE:
            return {
                ...state,
                failMassage:action.payload.data
            }
            break;
        //禁用时获取包含此源产品的所有内部产品
        case actionSource.RECEIVE_SOURCEPRODUCTS_INNERPRODUCTS:
            let sourceproductsInnerproducts = action.payload;
            //console.log("sourceproductsInnerproducts",sourceproductsInnerproducts)
            return Object.assign({}, state,
                {
                    sourceproductsInnerproducts: sourceproductsInnerproducts.data
                },
                action);
            break;
        //启用或禁用
        case actionSource.RECEIVE_SOURCEPRODUCTS_STATE:
            //let sourceproductsState = action.payload;
            // console.log("RECEIVE_SOURCEPRODUCTS_STATE",action)
            if(action.payload.json.status.code == 200) {
                state.sourceproducts.list.map((item, index) => {
                    //这里还需要优化，这个rap有问题
                    if(item.id == action.payload.id) {
                        item.state == 1
                            ?
                            item.state = 0
                            :
                            item.state = 1
                    }
                })
            } else {
                Message.error("交互失败");
            }
            return Object.assign({}, state,
                {
                    sourceproducts: {
                        list: state.sourceproducts.list.concat(),
                        total: state.sourceproducts.total
                    }
                },
                action);
            break;
        /*this=>产品更新周期配置*/
        //通用规则更新
        case actionSource.RECEIVE_UPDATECYCLES_COMMONRULE:
            let updateCyclesCommonRule = action.payload;
            // console.log("updateCyclesCommonRule",updateCyclesCommonRule)
            return Object.assign({}, state,
                {
                    updateCyclesCommonRule: updateCyclesCommonRule.data
                },
                action);
            break;
        //通用规则更新保存
        case actionSource.RECEIVE_UPDATECYCLES_COMMONRULE_UPDATE:
            let updateCyclesCommonRuleUpdateCode = action.payload.status.code;
            //console.log("updateCyclesCommonRuleUpdateCode", updateCyclesCommonRuleUpdateCode)
            if(updateCyclesCommonRuleUpdateCode == 200) {
                Message.success("保存成功")
                action.history.push("/source/setting")
            } else {
                Message.error("保存失败")
            }
            return state
            break;
        //通用规则更新保存
        case actionSource.RECEIVE_UPDATECYCLES_SPECIALRULES:
            let UpdateCyclesSpecialRules = action.payload.data;
            //console.log("UpdateCyclesSpecialRules", UpdateCyclesSpecialRules)
            return Object.assign({}, state,
                {
                    UpdateCyclesSpecialRules: UpdateCyclesSpecialRules
                },
                action);
            break;
        //添加特殊规则-获取源产品类型
        case actionSource.RECEIVE_UPDATECYCLES_SPECIALRULES_PRODUCTTYPES:
            if(action.payload.status.code == '200') {
                let CyclesSpecialRulesProductTypes = action.payload.data;
                CyclesSpecialRulesProductTypes.unshift({id: '', name: '全部'});
                return {
                    ...state,
                    CyclesSpecialRulesProductTypes: CyclesSpecialRulesProductTypes,
                }
            } else {
                Message.error(action.payload.status.message);
                return state;
            }
            break;
        //添加特殊规则-根据源产品类型id获取该id下所有的源产品
        case actionSource.RECEIVE_UPDATECYCLES_SPECIALRULES_PRODUCTTYPES_ID:
            let CyclesSpecialRulesProductTypesId = action.payload.data;
            //console.log("CyclesSpecialRulesProductTypesId", CyclesSpecialRulesProductTypesId)
            return Object.assign({}, state,
                {
                    CyclesSpecialRulesProductTypesId: CyclesSpecialRulesProductTypesId
                },
                action);
            break;
        //添加特殊规则-根据源产品类型id获取该id下所有的源产品
        case actionSource.RECEIVE_UPDATECYCLES_SPECIALRULES_SAVE:
            let CyclesSpecialRulesSaveCode = action.payload.status.code;
            if(CyclesSpecialRulesSaveCode == 200) {
                var list = state.UpdateCyclesSpecialRules.list;
                list.push(action.payload.data);
                return {
                    ...state,
                    UpdateCyclesSpecialRules: {
                        list: state.UpdateCyclesSpecialRules.list
                    }
                }
                Message.success("保存成功")
            } else {
                Message.error("提示：" + action.payload.status.message)
                return state
            }
            break;
        //添加特殊规则-恢复成通用规则
        case actionSource.RECEIVE_UPDATECYCLES_SPECIALRULES_RESTORE:
            let UpdateCyclesSpecialRulesRestore = action.payload.status.code;
            //这里还有bug action.payload.data.id 找不到啊亲
            if(UpdateCyclesSpecialRulesRestore == 200) {
                var list = state.UpdateCyclesSpecialRules.list;
                var total = state.UpdateCyclesSpecialRules.total;
                for(var i = 0; i < list.length; i++) {
                    var item = list[i];
                    if(item.id == action.id) {
                        list.splice(i, 1);
                        total--;
                        i--;
                        Message.success('恢复成通用规则成功！');
                    }
                }
                return {
                    ...state,
                    UpdateCyclesSpecialRules: {
                        list: list,
                        total: total,
                    }
                }
            } else {
                Message.error("提示：" + action.payload.status.message)
                return state
            }
            break;
        //特殊规则-编辑保存
        case actionSource.RECEIVE_UPDATECYCLES_SPECIALRULES_UPDATE:
            let UpdateCyclesSpecialRulesUpdata = action.payload.status.code;
            if(UpdateCyclesSpecialRulesUpdata == 200) {
                state.UpdateCyclesSpecialRules.list.map((item, index) => {
                    if(item.id == action.payload.data.id) {
                        item.updateCycle = action.payload.data.updateCycle
                    }
                })
                Message.success("保存成功")
            } else {
                Message.error("提示：" + action.payload.status.message)
            }
            return {
                ...state,
                UpdateCyclesSpecialRules: {
                    list: state.UpdateCyclesSpecialRules.list
                }
            }
            break;
        //获取所有数据机构-无分页
        case actionSource.RECEIVE_SHUYOU_INSTITUTIONS_ALL:
            //console.log("receiveShuyouInstitutionsAll",action)
            switch(action.payload.id) {
                //源产品管理 10
                case MAP.INSTITUTIONS_TYPE_MAP["源产品管理"]:
                    let institutionsSourceProduct = action.payload.json.data;
                    return {
                        ...state,
                        institutionsSourceProduct
                    }
                    break;
                //源产品更新周期配置 11
                case MAP.INSTITUTIONS_TYPE_MAP["源产品更新周期配置"]:
                //数据源查询记录 16
                    let institutionsSourceSetting = action.payload.json.data;
                    return {
                        ...state,
                        institutionsSourceSetting
                    }
                    break;
                case MAP.INSTITUTIONS_TYPE_MAP["数据源查询记录"]:

                    let institutionsHistoryData = action.payload.json.data;
                    return {
                        ...state,
                        institutionsHistoryData
                    }
                    break;
            }
            return state;
            break;

        default:
            return state;
    }
}
