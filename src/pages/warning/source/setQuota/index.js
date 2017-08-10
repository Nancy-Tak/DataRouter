/**
 * Created by Ethan on 2016/11/2.
 */
import '../../style.less';
import React,{Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { Tabs,Form,Input,Button,Collapse,Table,Icon,Select,Row,Col,DatePicker } from 'antd';
import { connect } from 'react-redux';
import {EditTable} from 'COM/editTable';
import {DynamicSelect} from 'COM/dynamicSelect';
import {actionQuota} from 'ACTION';
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const Option = Select.Option;
//不要乱改,否则枪毙
export const CATEGORY_ID_MAP = {
    '企业信息': '1',
    '财务指标': '2',
    '资产科目': '3',
    '负债科目': '4',
    '损益科目': '5',
    '现金流量科目': '6',
    '比率指标': '7',
    '征信数据': '8',
    '人行企业征信': '9',
    '人行个人征信': '10',
    '互联网征信数据': '11',
    '经营数据': '12',
    '行政处罚记录': '13',
    '诉讼记录': '14'
}
class SetQuota extends Component {
    static defaultProps = {
        companyInfo: null // 保存企业信息:
    }
    static propTypes = {
        companyInfo: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            editstate: false,
        }
    }

    componentDidMount() {
        let {obj} = this.props.routeParams; //是否传值进来，如果是则为跳入
        if(typeof(obj) != 'undefined') {
            let arr = obj.split(';');
            this.props.history.push('warning/source/setQuota');
            //请求
            this.getCompanysInfo(arr[0]); //请求企业信息
            this.refs.dSelect.cValue = arr[1];
        }
    }

    componentWillUnmount() { //离开此页
        this.props.action.leave();
    }

    handleSelect(value) { //选择公司
        this.getCompanysInfo(value); //请求企业信息
    }

    handleClickSave(categoryId, e) { //保存 categoryId 分类ID
        const {companyInfo} = this.props;
        let arr = e;
        if(!arr.length)return;
        if(companyInfo && companyInfo.id) {
            for(var i = 0; i < arr.length; i++) {
                var item = arr[i];
                Object.assign(item,
                    {
                        "companyId": companyInfo.id,
                        "categoryId": categoryId,
                    });
            }
            this.props.action.fetchSaveOrUpdateIndicators(arr);
        }
    }

    handleYearChange(categoryId, year) {
        // console.log(year,categoryId)
        const {companyInfo} = this.props;
        if(companyInfo && companyInfo.id) {
            this.props.action.fetchGetIndicatorsInfo(companyInfo.id, categoryId, year);
        }
    }

    render() {
        let {editstate}= this.state;
        const {companyInfo} = this.props;
        let info = ()=> {
            editstate = false;
            if(companyInfo && companyInfo.id) {
                editstate = true;
                return (
                    <span>
                        <lable className="fn-ml-20">
                            企业性质：{ this.getCompanyNatureByType(companyInfo.companyNature) }</lable>
                        <lable className="fn-ml-20">
                            企业规模：{ this.getCompanyScaleByType(companyInfo.companyScale)}</lable>
                    </span>
                )
            }
        }
        let companyQuota = ()=> { //请求企业信息指标
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["企业信息"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["企业信息"])}
                               dataSource={this.props.companyQuotaData}/>
                )
            }
        }
        let financeAssetQuota = ()=> { //资产科目
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["资产科目"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["资产科目"])}
                               dataSource={this.props.financeAssetQuota}/>
                )
            }
        }
        let debtQuota = ()=> { //负债科目
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["负债科目"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["负债科目"])}
                               dataSource={this.props.debtQuota}/>
                )
            }
        }
        let profitAndLossQuota = ()=> { //损益科目
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["损益科目"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["损益科目"])}
                               dataSource={this.props.profitAndLossQuota}/>
                )
            }
        }
        let cashQuota = ()=> { //现金流量科目
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["现金流量科目"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["现金流量科目"])}
                               dataSource={this.props.cashQuota}/>
                )
            }
        }
        let ratioQuota = ()=> { //比率指标
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["比率指标"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["比率指标"])}
                               dataSource={this.props.ratioQuota}/>
                )
            }
        }
        let corporateCreditQuota = ()=> { //人行企业征信
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["人行企业征信"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["人行企业征信"])}
                               dataSource={this.props.corporateCreditQuota}/>
                )
            }
        }
        let personalCreditQuota = ()=> { //人行个人征信
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["人行个人征信"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["人行个人征信"])}
                               dataSource={this.props.personalCreditQuota}/>
                )
            }
        }
        let internetCreditQuota = ()=> { //互联网征信数据
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["互联网征信数据"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["互联网征信数据"])}
                               dataSource={this.props.internetCreditQuota}/>
                )
            }
        }
        let operatingQuota = ()=> { //经营数据指标
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["经营数据"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["经营数据"])}
                               dataSource={this.props.operatingQuota}/>
                )
            }
        }
        let administrativeQuota = ()=> { //行政处罚记录
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["行政处罚记录"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["行政处罚记录"])}
                               dataSource={this.props.administrativeQuota}/>
                )
            }
        }
        let recordQuota = ()=> { //诉讼记录
            if(companyInfo && companyInfo.id) {
                return (
                    <EditTable defYear={'2016'}
                               onSaveHandler={this.handleClickSave.bind(this,CATEGORY_ID_MAP["诉讼记录"])}
                               onYearChange={this.handleYearChange.bind(this,CATEGORY_ID_MAP["诉讼记录"])}
                               dataSource={this.props.recordQuota}/>
                )
            }
        }
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="指标数据录入" key="1">
                    <Row type="flex" justify="space-around" align="bottom">
                        <Col sm={20}>
                            <div className="fn-mt-10">
                                <span>企业名称：</span>
                                <DynamicSelect
                                    ref="dSelect"
                                    onSelect={this.handleSelect.bind(this)}
                                    style={{ width: 280 }}/>
                                {info()}
                            </div>
                        </Col>
                        <Col sm={4}>
                        </Col>
                    </Row>
                    <div className="fn-mt-30">
                        <Collapse defaultActiveKey={['1','2','3','4','5','6','7'] }>
                            <Panel header="企业信息" key="1">
                                {companyQuota()}
                            </Panel>
                            <Panel header="财务指标" key="2">
                                <Tabs defaultActiveKey="1" style={{display: editstate?'block':'none'}}>
                                    <TabPane tab="资产科目" key="1">
                                        {financeAssetQuota()}
                                    </TabPane>
                                    <TabPane tab="负债科目" key="2">
                                        {debtQuota()}
                                    </TabPane>
                                    <TabPane tab="损益科目" key="3">
                                        {profitAndLossQuota()}
                                    </TabPane>
                                    <TabPane tab="现金流量科目" key="4">
                                        {cashQuota()}
                                    </TabPane>
                                    <TabPane tab="比率指标" key="5">
                                        {ratioQuota()}
                                    </TabPane>
                                </Tabs>
                            </Panel>
                            <Panel header="征信数据" key="3">
                                <Tabs defaultActiveKey="1" style={{display: editstate?'block':'none'}}>
                                    <TabPane tab="人行企业征信" key="1">
                                        {corporateCreditQuota()}
                                    </TabPane>
                                    <TabPane tab="人行个人征信" key="2">
                                        {personalCreditQuota()}
                                    </TabPane>
                                    <TabPane tab="互联网征信数据" key="3">
                                        {internetCreditQuota()}
                                    </TabPane>
                                </Tabs>
                            </Panel>
                            <Panel header="经营数据" key="5">
                                {operatingQuota()}
                            </Panel>
                            <Panel header="行政处罚记录" key="6">
                                {administrativeQuota()}
                            </Panel>
                            <Panel header="诉讼记录" key="7">
                                {recordQuota()}
                            </Panel>
                        </Collapse>
                    </div>
                </TabPane>
            </Tabs>
        )
    }

    //公司性质
    getCompanyNatureByType(type) {
        switch(type.toString()) {
            case '1':
                return '外资 （欧美)';
                break;
            case '2':
                return '外资 （非欧美)';
                break;
            case '3':
                return '合资';
                break;
            case '4':
                return '国企';
                break;
            case '5':
                return '民营企业';
                break;
            case '6':
                return '外企代表处';
                break;
            case '7':
                return '政府机构';
                break;
            case '8':
                return '事业单位';
                break;
            case '9':
                return '非盈利机构';
                break;
            case '10':
                return '上市公司';
                break;
            case '11':
                return '创业公司';
                break;
        }
        return "没有此类型";
    }

    //公司规模
    getCompanyScaleByType(type) {
        switch(type.toString()) {
            case '1':
                return '少于50人';
                break;
            case '2':
                return '50-150人';
                break;
            case '3':
                return '150-500人';
                break;
            case '4':
                return '500-1000人';
                break;
            case '5':
                return '1000-5000人';
                break;
            case '6':
                return '5000-10000人';
                break;
            case '7':
                return '10000人以上';
                break;
        }
        return "没有此类型";
    }

    getCompanysInfo(id) {
        this.props.action.fetchGetCompanysInfo(id);
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    return {
        companyInfo: state.quotaReducer.companyInfo,
        companyQuotaData: state.quotaReducer.companyQuotaData,
        financeAssetQuota: state.quotaReducer.financeAssetQuota,
        corporateCreditQuota: state.quotaReducer.corporateCreditQuota, //人行企业征信
        operatingQuota: state.quotaReducer.operatingQuota, //经营数据
        administrativeQuota: state.quotaReducer.administrativeQuota, //行政处罚记录
        recordQuota: state.quotaReducer.recordQuota, //诉讼记录
        debtQuota: state.quotaReducer.debtQuota, //负债科目
        profitAndLossQuota: state.quotaReducer.profitAndLossQuota, //损益科目
        cashQuota: state.quotaReducer.cashQuota, //现金流量科目
        ratioQuota: state.quotaReducer.ratioQuota, //比率指标
        personalCreditQuota: state.quotaReducer.personalCreditQuota, //人行个人征信
        internetCreditQuota: state.quotaReducer.internetCreditQuota, //互联网征信数据
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionQuota, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetQuota);
