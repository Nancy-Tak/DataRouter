/**
 * Created by Ethan on 2016/11/2.
 */
import '../style.less';
import React, {Component, PropTypes} from 'react';
import {
    Tabs,
    Form,
    Input,
    Button,
    Collapse,
    Table,
    Icon,
    Select,
    Row,
    Col,
    DatePicker,
    Switch,
    Message,
    Modal,
    notification
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;
const confirm = Modal.confirm;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionWarningRule} from 'ACTION';
import {DynamicSelect} from 'COM/dynamicSelect';
import {CATEGORY_ID_MAP} from '../source/setQuota';

notification.config({
  top: "80%",
  duration: 3,
});

class WarningRule extends Component {
    static defaultProps = {
        businessInfoData: [],
        companyNameJson: {},
        monitorFlag: 0,
        companysID:"", //缓存公司ID
        companyQuotaData:[],
        financeAssetQuota: [],
        corporateCreditQuota:[],
        operatingQuota:[],
        administrativeQuota:[],
        recordQuota:[],
        debtQuota:[],
        profitAndLossQuota:[],
        cashQuota:[],
        ratioQuota:[],
        personalCreditQuota:[],
        internetCreditQuota:[],

    }
    static propTypes = {
        businessInfoData: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props)
        this.state={
            handleSwitch:false,
        }
    }
    componentDidUpdate(){
        if(this.props.isSave){
            notification.success({
                message: '提示',
                description: '保存成功',
            });
            this.props.action.receriveSaveRuleCompanyIndicatorsTip(false)
        }
    }
    componentWillUnmount() { //离开此页
        this.props.action.leave();
    }
    //获取单个信息
    onChangeHandler(key) {
       // console.log("onChangeHandler",key);

        let isFinanceAssetQuota = this.props.financeAssetQuota.length<=0  && key==CATEGORY_ID_MAP["资产科目"]
        let isCorporateCreditQuota = this.props.corporateCreditQuota.length<=0  && key==CATEGORY_ID_MAP["人行企业征信"]
        let isOperatingQuota = this.props.operatingQuota.length<=0  && key==CATEGORY_ID_MAP["经营数据"]
        let isAdministrativeQuota = this.props.administrativeQuota.length<=0  && key==CATEGORY_ID_MAP["行政处罚记录"]
        let isRecordQuota = this.props.recordQuota.length<=0  && key==CATEGORY_ID_MAP["诉讼记录"]
        let isDebtQuota = this.props.debtQuota.length<=0  && key==CATEGORY_ID_MAP["负债科目"]
        let isProfitAndLossQuota = this.props.profitAndLossQuota.length<=0  && key==CATEGORY_ID_MAP["损益科目"]
        let isCashQuota = this.props.cashQuota.length<=0  && key==CATEGORY_ID_MAP["现金流量科目"]
        let isRatioQuota = this.props.ratioQuota.length<=0  && key==CATEGORY_ID_MAP["比率指标"]
        let isPersonalCreditQuota = this.props.personalCreditQuota.length<=0  && key==CATEGORY_ID_MAP["人行个人征信"]
        let isInternetCreditQuota = this.props.internetCreditQuota.length<=0  && key==CATEGORY_ID_MAP["互联网征信数据"]

        if(
            isFinanceAssetQuota
            ||
            isCorporateCreditQuota
            ||
            isOperatingQuota
            ||
            isAdministrativeQuota
            ||
            isRecordQuota
            ||
            isDebtQuota
            ||
            isProfitAndLossQuota
            ||
            isCashQuota
            ||
            isRatioQuota
            ||
            isPersonalCreditQuota
            ||
            isInternetCreditQuota
        )
        {
            this.props.action.fetchRuleCompanyIndicators({
                "companyId":this.state.companysID,
                "categoryId":key,
            })
        }
    }


    //获取公司信息
    handleSelect(key) {
        //key 公司ID
       // console.log("key",key)
        //获取公司列表
        this.props.action.fetchRuleCompanyNameIem(key)

        //企业信息
        this.props.action.fetchRuleCompanyIndicators({
            "companyId":key,
            "categoryId":CATEGORY_ID_MAP["企业信息"],
        })
        //默认加载信息
        this.props.action.fetchRuleCompanyIndicators({
            "companyId":key,
            "categoryId":CATEGORY_ID_MAP["资产科目"],
        })
        this.props.action.fetchRuleCompanyIndicators({
            "companyId":key,
            "categoryId":CATEGORY_ID_MAP["人行企业征信"],
        })
        this.props.action.fetchRuleCompanyIndicators({
            "companyId":key,
            "categoryId":CATEGORY_ID_MAP["经营数据"],
        })
        this.props.action.fetchRuleCompanyIndicators({
            "companyId":key,
            "categoryId":CATEGORY_ID_MAP["行政处罚记录"],
        })
        this.props.action.fetchRuleCompanyIndicators({
            "companyId":key,
            "categoryId":CATEGORY_ID_MAP["诉讼记录"],
        })
        this.setState({
            "companysID":key
        })

    }

    //资产科目
    columnsZhichanSwitch(text, record, index) {
        let paData;
        switch(record.categoryId.toString()) {
            case CATEGORY_ID_MAP["资产科目"]:
               // console.log("资产科目")
                paData = this.props.financeAssetQuota;
                break;
            case CATEGORY_ID_MAP["人行企业征信"]:
                paData = this.props.corporateCreditQuota;
                break;
            case CATEGORY_ID_MAP["经营数据"]:
                paData = this.props.operatingQuota;
                break;
            case CATEGORY_ID_MAP["行政处罚记录"]:
                paData = this.props.administrativeQuota;
                break;
            case CATEGORY_ID_MAP["诉讼记录"]:
                paData = this.props.recordQuota;
                break;
            case CATEGORY_ID_MAP["负债科目"]:
                paData = this.props.debtQuota;
                break;
            case CATEGORY_ID_MAP["损益科目"]:
                paData = this.props.profitAndLossQuota;
                break;
            case CATEGORY_ID_MAP["现金流量科目"]:
                paData = this.props.cashQuota;
                break;
            case CATEGORY_ID_MAP["比率指标"]:
                paData = this.props.ratioQuota;
                break;
            case CATEGORY_ID_MAP["人行个人征信"]:
                paData = this.props.personalCreditQuota;
                break;
            case CATEGORY_ID_MAP["互联网征信数据"]:
                paData = this.props.internetCreditQuota;
                break;
        }

        this.props.action.updataRuleCompanyIndicators(record, paData,record.categoryId.toString())

    }
    columnsZhichanInput(ZhichanData,indicatorRulesListId,e){
        let paData;
        //console.log(ZhichanData)
        //console.log( "record.categoryId.toString()",ZhichanData.record.categoryId.toString() )
        switch(ZhichanData.record.categoryId.toString()) {
            case CATEGORY_ID_MAP["资产科目"]:
                //console.log("资产科目")
                paData = this.props.financeAssetQuota;
                break;
            case CATEGORY_ID_MAP["人行企业征信"]:
                paData = this.props.corporateCreditQuota;
                break;
            case CATEGORY_ID_MAP["经营数据"]:
                paData = this.props.operatingQuota;
                break;
            case CATEGORY_ID_MAP["行政处罚记录"]:
                paData = this.props.administrativeQuota;
                break;
            case CATEGORY_ID_MAP["诉讼记录"]:
                paData = this.props.recordQuota;
                break;
            case CATEGORY_ID_MAP["负债科目"]:
                paData = this.props.debtQuota;
                break;
            case CATEGORY_ID_MAP["损益科目"]:
                paData = this.props.profitAndLossQuota;
                break;
            case CATEGORY_ID_MAP["现金流量科目"]:
                paData = this.props.cashQuota;
                break;
            case CATEGORY_ID_MAP["比率指标"]:
                paData = this.props.ratioQuota;
                break;
            case CATEGORY_ID_MAP["人行个人征信"]:
                paData = this.props.personalCreditQuota;
                break;
            case CATEGORY_ID_MAP["互联网征信数据"]:
                paData = this.props.internetCreditQuota;
                break;
        }
        let value = e.target.value

        ZhichanData.value = value
        ZhichanData.listId = indicatorRulesListId
        //console.log("listId",indicatorRulesListId)
        //修改信息
        //this.props.action.updataHandleDescriptionArr()
        this.props.action.updataRuleCompanyIndicatorsInput( ZhichanData,paData )
    }
    columnsZhichanDescription(ZhichanData) {
        let description = ZhichanData.record.description;
        let indicatorRules = ZhichanData.record.indicatorRules;

        //console.log(record)
        let items = null;
        //console.log(description)
        let descriptionArr = description.split("{}");
        //let descriptionArrSplit = descriptionArr.split("{}");


        items = descriptionArr.map((item,index)=>{
            ZhichanData.listIndex = index;
            //ZhichanData.listId = indicatorRules[index].id;

            let result;

                result=(
                        <span>
                            <span>{descriptionArr[index]}</span>
                            {
                                (descriptionArr.length-1)==index
                                ?
                                <span>&nbsp;</span>
                                :
                                <span>
                                    {
                                        indicatorRules[index].editType==1
                                        ?
                                        <Input
                                            value={indicatorRules[index].ruleValue}
                                            size="small"
                                            style={{"width":"100px"}}
                                            onChange={this.columnsZhichanInput.bind(this,ZhichanData,indicatorRules[index].id)}
                                            />
                                        :
                                        <Select defaultValue={indicatorRules[index].ruleValue}>
                                            <Option value={indicatorRules[index].ruleValue}>
                                                {indicatorRules[index].ruleValue}
                                            </Option>
                                        </Select>
                                    }

                                </span>

                            }
                        </span>
                )
            return result
        })
        return items
    }

    //资产科目 end
    //保存数据格式
    saveData(obj){

        let Data = [];
        obj.map((item,index)=>{
            let indicatorRulesData = [];
            item.indicatorRules.map((indicatorRulesItem,indicatorRulesIndex)=>{
                indicatorRulesItem && indicatorRulesData.push({
                    "id":indicatorRulesItem.id,
                    "ruleValue":indicatorRulesItem.ruleValue,
                })


            })
            Data.push({
                "indicatorId":item.indicatorId,
                "monitorFlag":item.monitorFlag,
                "rules":indicatorRulesData,
            })



        })


        return Data
    }
    saveDataConcat(){
        let saveDataConcatData = []

        let financeAssetQuotaData =  this.saveData(this.props.financeAssetQuota);//資產科目
        let debtQuotaData =  this.saveData(this.props.debtQuota);//負載科目
        let corporateCreditQuotaData =  this.saveData(this.props.corporateCreditQuota);//人行企业征信
        let operatingQuotaData =  this.saveData(this.props.operatingQuota);//经营数据
        let administrativeQuotaData =  this.saveData(this.props.administrativeQuota);//行政处罚记录
        let recordQuotaData =  this.saveData(this.props.recordQuota);//诉讼记录
        let profitAndLossQuotaData =  this.saveData(this.props.profitAndLossQuota);//损益科目
        let cashQuotaData =  this.saveData(this.props.cashQuota);//现金流量科目
        let ratioQuotaData =  this.saveData(this.props.ratioQuota);//比率指标
        let personalCreditQuotaData =  this.saveData(this.props.personalCreditQuota);//人行个人征信
        let internetCreditQuotaData =  this.saveData(this.props.internetCreditQuota);//互联网征信数据

        saveDataConcatData = saveDataConcatData.concat(
            financeAssetQuotaData,
            debtQuotaData,
            corporateCreditQuotaData,
            operatingQuotaData,
            administrativeQuotaData,
            recordQuotaData,
            profitAndLossQuotaData,
            cashQuotaData,
            ratioQuotaData,
            personalCreditQuotaData,
            internetCreditQuotaData
        )

        //saveDataConcatData = saveDataConcatData.concat(financeAssetQuotaData,debtQuotaData)


        return saveDataConcatData
    }

    //是否提交
    isSendSave(saveDataConcat){
        let isSendSave = true;
        saveDataConcat.map((item,index)=>{

            item.rules.map((rulesItem,rulesIndex)=>{
                if(rulesItem.ruleValue==""){
                    isSendSave = false;
                }
            })
        })
        return isSendSave
    }
    //是否保存
    handleSave(){
        let saveDataConcat = this.saveDataConcat()
        //console.log(saveDataConcat)
        if(saveDataConcat.length>0){
            if(this.isSendSave(saveDataConcat)){

                let handleSaveData = {
                    "indicators":saveDataConcat,
                    "companyId":this.state.companysID
                }
                this.props.action.fetchSaveRuleCompanyIndicators(handleSaveData,this.props.history)
            }else{
                Message.error("还有按钮没有填写完毕")
            }

        }else{
            Message.error("请选择公司")
        }
    }

    /**
     * shareholders 股东信息
     * legalMan 法定代表人
     */
    getCompanyQuotaData(obj,type){

        let companyQuotaData = obj || [];

        let companyQuotaDataINFO = {};

        let result;



        companyQuotaData.map( (item,index)=>{
            item.indicatorRules.map( (indicatorRulesItem,indicatorRulesIndex)=>{
                let description = item.description.split("{}");
                let ruleValue = indicatorRulesItem.ruleValue;

                description.map( (descriptionItem,descriptionIndex)=>{
                    if(item.indicatorName==type){
                        return result=(
                            <span>
                                <span>{descriptionItem}</span>
                                {ruleValue}
                            </span>
                        )
                    }

                } )

                // if(item.indicatorName=="股东信息"){
                //     companyQuotaDataINFO.shareholders=item.description
                // }else if(item.indicatorName=="法定代表人"){
                //     companyQuotaDataINFO.legalMan=item.description
                // }else if(item.indicatorName=="企业名称"){
                //     companyQuotaDataINFO.companyName=item.description
                // }
            } )
        } )
        //console.log("result",result)


        return result

    }

    render() {
        let {
            businessInfoData,
            companyNameJson,
            companyQuotaData, //企业法人，股东信息
            financeAssetQuota,//資產科目
            debtQuota,//負載科目
            corporateCreditQuota, //人行企业征信
            operatingQuota, //经营数据
            administrativeQuota, //行政处罚记录
            recordQuota, //诉讼记录
            profitAndLossQuota, //损益科目
            cashQuota, //现金流量科目
            ratioQuota, //比率指标
            personalCreditQuota, //人行个人征信
            internetCreditQuota, //互联网征信数据
        } = this.props;
        let _this = this;
        //资产科目
        var columnsZhichan = [
            {
                title: '指标',
                dataIndex: 'indicatorName'
            }, {
                title: '触发预警机制',
                className: 'column-money',
                dataIndex: 'description',
                render(text, record, index) {
                    let ZhichanData = {
                        text:text,
                        record:record,
                        index:index
                    }
                    return (
                        <div>{_this.columnsZhichanDescription(ZhichanData)}</div>
                    )
                }
            }, {
                title: '是否监控该指标',
                dataIndex: 'monitorFlag',
                width: 100,
                className: 'text-align-center',
                render(text, record, index) {
                    return (
                        <Switch
                        onChange={_this.columnsZhichanSwitch.bind(_this, text, record, index)}
                        checkedChildren="开"
                        unCheckedChildren="关"
                        checked={record.monitorFlag}
                        />
                    );
                }
            }
        ];
        //资产科目 end

        //负债科目
        var columnsDebtQuota = [
            {
                title: '指标',
                dataIndex: 'indicatorId'
            }, {
                title: '触发预警机制',
                className: 'column-money',
                dataIndex: 'description',
                render(text, record, index) {
                    //console.log(text,record,index)
                    let ZhichanData = {
                        text:text,
                        record:record,
                        index:index,
                    }
                    return (
                        <div>{_this.columnsDebtQuotaDescription(ZhichanData)}</div>
                    )
                }
            }, {
                title: '是否监控该指标',
                dataIndex: 'b',
                width: 100,
                className: 'text-align-center',
                render(text, record, index) {
                    // console.log("text,record=>")
                    //console.log(text,record)
                    // console.log(record.monitorFlag)
                    return (
                        <Switch
                        onChange={_this.columnsDebtQuotaSwitch.bind(_this, text, record, index)}
                        checkedChildren="开"
                        unCheckedChildren="关"
                        checked={record.monitorFlag}
                        />
                    );
                }
            }
        ];
        //负债科目 end
        //现金流
        var columnsCashQuota = [
            {
                title: '指标',
                dataIndex: 'indicatorId'
            }, {
                title: '触发预警机制',
                className: 'column-money',
                dataIndex: 'description',
                render(text, record, index) {
                    //console.log(text,record,index)
                    let ZhichanData = {
                        text:text,
                        record:record,
                        index:index,
                    }
                    return (
                        <div>{_this.columnsDebtQuotaDescription(ZhichanData)}</div>
                    )
                }
            }, {
                title: '是否监控该指标',
                dataIndex: 'b',
                width: 100,
                className: 'text-align-center',
                render(text, record, index) {
                    // console.log("text,record=>")
                    //console.log(text,record)
                    // console.log(record.monitorFlag)
                    return (
                        <Switch
                        onChange={_this.columnsDebtQuotaSwitch.bind(_this, text, record, index)}
                        checkedChildren="开"
                        unCheckedChildren="关"
                        checked={record.monitorFlag}
                        />
                    );
                }
            }
        ];
        //现金流 end

        return (
            <div>
                {/*<Switch checked={this.state.handleSwitch} onChange={this.handleSwitch.bind(this)} />,*/}
                <Tabs defaultActiveKey="1" onChange={this.onChangeHandler}>
                    <TabPane tab="预警规则设置" key="1">
                        <Row gutter={5}>
                            <Col sm={10}>
                                <span>企业名称：</span>

                                    <DynamicSelect
                                    onSelect={this.handleSelect.bind(this)}
                                    style={{ width: 280 }}/>
                            </Col>
                            <Col sm={4}>
                                <lable>企业性质：{companyNameJson.companyNatureDes}</lable>
                            </Col>
                            <Col sm={4}>
                                <lable>
                                    企业规模：{companyNameJson.companyScaleDes}
                                </lable>
                            </Col>
                            <Col sm={4}></Col>
                        </Row>

                        {/*企业信息 etc*/}

                        <div>
                            <div className="fn-mt-20">
                                <Collapse defaultActiveKey={[
                                        '1',
                                        '2',
                                        '3',
                                        '4',
                                        '5',
                                        '6',
                                        '7'
                                    ]}>
                                    <Panel header="企业信息" key="1">
                                        <Row gutter={5}>
                                            <Col sm={8}>
                                                <span>企业名称：</span>
                                                <span>{this.getCompanyQuotaData(companyQuotaData,"企业名称")}</span>
                                            </Col>
                                            <Col sm={8}>
                                                <span>法定代表人：</span>
                                                <span>
                                                    {this.getCompanyQuotaData(companyQuotaData,"法定代表人")}
                                                </span>
                                            </Col>
                                            <Col sm={8}>
                                                <span>股东信息：</span>
                                                <span>
                                                    {this.getCompanyQuotaData(companyQuotaData,"股东信息")}

                                                </span>
                                            </Col>
                                        </Row>
                                    </Panel>
                                    <Panel header="财务指标" key="2">
                                        <Tabs defaultActiveKey="1" onChange={this.onChangeHandler.bind(this)}>

                                            <TabPane tab="资产科目" key={CATEGORY_ID_MAP["资产科目"]}>
                                                <Table pagination={false} columns={columnsZhichan} dataSource={financeAssetQuota}/>
                                            </TabPane>

                                            <TabPane tab="负债科目" key={CATEGORY_ID_MAP["负债科目"]}>
                                                <Table pagination={false} columns={columnsZhichan} dataSource={debtQuota}/>
                                            </TabPane>
                                            <TabPane tab="损益科目" key={CATEGORY_ID_MAP["损益科目"]}>
                                                <Table pagination={false} columns={columnsZhichan} dataSource={profitAndLossQuota}/>
                                            </TabPane>
                                            <TabPane tab="现金流量科目" key={CATEGORY_ID_MAP["现金流量科目"]}>
                                                <Table pagination={false} columns={columnsZhichan} dataSource={cashQuota}/>
                                            </TabPane>
                                            <TabPane tab="比率指标" key={CATEGORY_ID_MAP["比率指标"]}>
                                                <Table pagination={false} columns={columnsZhichan} dataSource={ratioQuota}/>
                                            </TabPane>
                                        </Tabs>
                                    </Panel>
                                    <Panel header="征信数据" key="3">
                                        <Tabs defaultActiveKey="1" onChange={this.onChangeHandler.bind(this)}>
                                            <TabPane tab="人行企业征信" key={CATEGORY_ID_MAP["人行企业征信"]}>
                                                <Table pagination={false} columns={columnsZhichan} dataSource={corporateCreditQuota}/>
                                            </TabPane>
                                            <TabPane tab="人行个人征信" key={CATEGORY_ID_MAP["人行个人征信"]}>
                                                <Table pagination={false} columns={columnsZhichan} dataSource={personalCreditQuota}/>
                                            </TabPane>
                                            <TabPane tab="互联网征信数据" key={CATEGORY_ID_MAP["互联网征信数据"]}>
                                                <Table pagination={false} columns={columnsZhichan} dataSource={internetCreditQuota}/>
                                            </TabPane>
                                        </Tabs>
                                    </Panel>
                                    <Panel header="经营数据" key={CATEGORY_ID_MAP["经营数据"]} >
                                        <Table pagination={false} columns={columnsZhichan} dataSource={operatingQuota}/>
                                    </Panel>
                                    <Panel header="行政处罚记录" key={CATEGORY_ID_MAP["行政处罚记录"]}>
                                        <Table pagination={false} columns={columnsZhichan} dataSource={administrativeQuota}/>
                                    </Panel>
                                    <Panel header="诉讼记录" key={CATEGORY_ID_MAP["诉讼记录"]}>
                                        <Table pagination={false} columns={columnsZhichan} dataSource={recordQuota}/>
                                    </Panel>
                                </Collapse>
                            </div>
                            <h4 className="text-align-center">
                                <Button type="primary" onClick={this.handleSave.bind(this)}>保存</Button>
                            </h4>
                        </div>

                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
   // console.log("hhh", state)
    return {
        businessInfoData: state.warningRuleReducer.businessInfoData,
        //total: state.warningRuleReducer.total,
        companyNameJson: state.warningRuleReducer.companyNameJson,
        companyQuotaData: state.warningRuleReducer.companyQuotaData,//企业信息
        financeAssetQuota: state.warningRuleReducer.financeAssetQuota.concat(),//資產科目
        debtQuota: state.warningRuleReducer.debtQuota.concat(),//負載科目
        corporateCreditQuota: state.warningRuleReducer.corporateCreditQuota, //人行企业征信
        operatingQuota: state.warningRuleReducer.operatingQuota, //经营数据
        administrativeQuota: state.warningRuleReducer.administrativeQuota, //行政处罚记录
        recordQuota: state.warningRuleReducer.recordQuota, //诉讼记录
        profitAndLossQuota: state.warningRuleReducer.profitAndLossQuota, //损益科目
        cashQuota: state.warningRuleReducer.cashQuota, //现金流量科目
        ratioQuota: state.warningRuleReducer.ratioQuota, //比率指标
        personalCreditQuota: state.warningRuleReducer.personalCreditQuota, //人行个人征信
        internetCreditQuota: state.warningRuleReducer.internetCreditQuota, //互联网征信数据
        isSave: state.warningRuleReducer.isSave, //是否保存
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionWarningRule, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarningRule);
