/**
 * Created by Ethan on 2016/11/2.
 */
import '../style.less';
import React,{Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {Tag,Spin,Popconfirm, Tabs,Form,Input,Button,Collapse,Table,Icon,Row,Col,DatePicker,Select,notification,Alert} from 'antd';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import {DynamicSelect} from 'COM/dynamicSelect';
import {ModalOperation} from 'COM/modalOperation';
import {ModalHistory} from 'COM/modalHistory';
import { actionWarningSearch,actionBusinessInfoManage} from 'ACTION';
//
const MonthPicker = DatePicker.MonthPicker;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;
class WarningSearch extends Component {
    static defaultProps = {
        pieInfo: null, // 保存企业信息:
        businessInfoData: [],
        rsultsInfo: null,
        fIBnormal: [],
        showModal: false,
        reload: false,
    }
    static propTypes = {
        pieInfo: PropTypes.object,
        businessInfoData: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            companyId: null,
            defaultTab: '1',
            message: '',
            opDate: {
                visible: false,
            }
        }
    }

    componentWillMount() {
        let {obj} = this.props.routeParams; //是否传值进来，如果是则为跳入
        if(typeof(obj) != 'undefined') {
            let arr = obj.split(';');
            //跳转TAB
            this.setState({
                defaultTab: '2'
            }, function() {
                //企业名称 填入
                this.refs.dSelect.cValue = arr[1];
            })
            this.state.companyId = arr[0];
            this.props.history.push('warning/search');
            //请求
            this.getAllResults();
        }
    }

    componentDidUpdate() {
        let {errorMassage,reload } = this.props;
        if(!this.props.showModal) {
            this.refs.modalOperation.hideModal();
        }
        if(errorMassage) {
            notification.error({
                duration: 1,
                message: '消息',
                description: errorMassage,
            })
            this.props.action.clearErrorMassage();
        }
        if(reload) {
            this.getAllResults();
        }
    }

    componentDidMount() {
        //获取饼图数据
        this.props.action.fetchGetPieInfo();
        //获取企业信息
        this.getBusinessInfo();
    }

    componentWillUnmount() { //离开此页
        this.props.action.leave();
    }

    handleSelect(e) {//z
        this.setState({
            companyId: e,
        });
    }

    handlerTabOnChange(key) {
        this.setState({
            defaultTab: key
        })
    }

    handleShowSizeChange(current, pageSize) {
        this.getBusinessInfo(current, pageSize);
    }

    handleChange(current) {
        var pageSize = this.refs.table.state.pagination.pageSize;
        this.getBusinessInfo(current, pageSize);
    }

    handleEditItem(e) {
        this.props.history.push(`warning/source/edit/${e.id}`);
    }

    //点击历史
    handleShowHistoryModal(record) {
        //指标ID
        //record.indicatorId
        //let companyId = this.state.companyId;
        //获取历史数据
        this.props.action.fetchGetHistoryData({
            // companyId: companyId,
            indicatorId: record.indicatorId,
            companyIndicatorId: record.id
        });
        this.refs.modalHistory.showModal(record);
    }

    handleDeleteItem(e) {
        this.props.actionBusiness.actionDeleteItem(e.id);
    }

    handleSetQuotaItem(e) { //录入数据
        this.props.history.push(`warning/source/setQuota/${e.id};${e.companyName}`);
    }

    handleIndicatorItem(e) {//预警
        this.setState({
            defaultTab: '2'
        }, function() {
            //企业名称 填入
            this.refs.dSelect.cValue = e.companyName;
        })
        this.state.companyId = e.id;
        //请求
        this.getAllResults();
    }

    handleSubmit(e) { //搜索提交
        e.preventDefault();
        this.setState({
            message: ''
        })
        let companyId = this.state.companyId;
        this.props.form.validateFields((err, values) => {
            if(!companyId) {//企业名空
                this.setState({
                    message: '请输入企业名空'
                })
                return;
            } else if(!values.selectDate) { //查询时间空
                this.setState({
                    message: '请输入查询时间'
                })
                return;
            }
            this.getAllResults();
        });
    }

    handleShowModal(record) {
        this.props.action.showModal();
        this.refs.modalOperation.showModal(record);
    }

    handleModalOk(e, id, reason) {
        this.props.action.fetchSaveOperationState(id, {
            "operationReason": reason,
            "operationState": e.operationState,
            "comments": e.remark
        });
    }

    render() {
        let {pieInfo,businessInfoData,total,rsultsInfo } = this.props;
        let {getFieldProps}= this.props.form;
        var pagination = {
            total: total || 0,
            showSizeChanger: true,
            onShowSizeChange: this.handleShowSizeChange.bind(this),
            onChange: this.handleChange.bind(this),
            pageSizeOptions:['10','20','50','100']
        };
        const operations = (
            <span>说明：
                <i className="circle circle-red"></i><span className="fn-mr-10">红色预警</span>
                <i className="circle circle-yellow"></i><span className="fn-mr-10">黄色预警</span>
                <i className="circle circle-black"></i><span className="fn-mr-10">处理为风险事项</span>
                -- <span className="fn-mr-10">表示无数据</span>
            </span>
        );
        var self = this;
        return (
            <div className="card-container">
                <Tabs ref="tabComponent" defaultActiveKey="1" activeKey={this.state.defaultTab}
                      onChange={this.handlerTabOnChange.bind(this)}>
                    {/*预警概览*/}
                    <TabPane tab="预警概览" key="1">
                        <h4 style={{display: pieInfo?'block':'none'}}>
                            本月，同时出现红黄色预警指标的企业有
                            <span style={{margin:'0 5px'}}><Tag>{this.warningTitle.redAndYellowIndicators}</Tag></span>家，占
                            <span style={{margin:'0 5px'}}><Tag>{this.warningTitle.redAndYellowRates}%</Tag></span>，仅出现黄色预警指标的企业有
                            <span style={{margin:'0 5px'}}><Tag>{this.warningTitle.yellowIndicators}</Tag></span>家，占
                            <span style={{margin:'0 5px'}}><Tag>{this.warningTitle.yellowRates}%</Tag></span>，仅出现红色预警指标的企业有
                            <span style={{margin:'0 5px'}}><Tag>{this.warningTitle.redIndicators}</Tag></span>家 ，占
                            <span style={{margin:'0 5px'}}><Tag>{this.warningTitle.redRates}%</Tag></span>。
                        </h4>
                        <div className="fn-mt-30">
                            {
                                !pieInfo && <div className="pieLoading">
                                    <Spin />
                                </div>
                            }
                            <Row>
                                <Col span={15} offset={2}>
                                    { pieInfo && <ReactEcharts
                                        option={this.option}
                                        showLoading={false}/> }

                                </Col>
                            </Row>
                        </div>
                        <div className="fn-mt-20">
                            <Table ref="table"
                                   columns={this.columns}
                                   dataSource={businessInfoData}
                                   pagination={pagination}
                                   title={() => '详细列表'}/>
                        </div>
                    </TabPane>

                    {/*预警查询*/}
                    <TabPane tab="预警查询" key="2">
                        <Form inline onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="企业名称:">
                                <DynamicSelect
                                    {...getFieldProps('companyName', {
                                        valuePropName: 'value',
                                        trigger: 'onSelect',
                                        validateTrigger: 'onSelect',
                                    })}
                                    ref="dSelect"
                                    onSelect={this.handleSelect.bind(this)}
                                    style={{ width: 280 }}/>
                            </FormItem>
                            <FormItem label="查询时间:">
                                <MonthPicker
                                    {...getFieldProps('selectDate', {
                                        initialValue: new Date(),
                                        valuePropName: 'defaultValue',
                                    })}
                                />
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">查询</Button>
                            </FormItem>
                            <FormItem>
                                {this.message}
                            </FormItem>

                        </Form>
                        {/*查询结果*/}
                        <div className="fn-mt-20" style={{display: rsultsInfo?'block':'none'}}>
                            <h4 className="fn-mb-10">查询结果</h4>
                            <h5 style={{display: rsultsInfo?'block':'none'}}>
                                共 <Tag>{this.rsultsInfoTitle.total }</Tag>个指标，
                                其中 <Tag color="yellow"> {this.rsultsInfoTitle.yellow }</Tag>个指标出现黄色预警，
                                <Tag color="red">{this.rsultsInfoTitle.red }</Tag>个指标出现红色预警，
                                <Tag color="red">{this.rsultsInfoTitle.alarmState}</Tag>指标处理为风险事项。
                            </h5>

                        </div>
                        {/*指标*/}
                        <div className="fn-mt-20">
                            <Tabs defaultActiveKey="1"
                                  tabBarExtraContent={operations}>
                                {/*全部指标*/}
                                <TabPane tab="全部指标" key="1">
                                    <Collapse defaultActiveKey={['1','2','3','4','5','6','7']}
                                    >
                                        <Panel header="企业信息" key="1">
                                            <Table columns={this.getColumnsQuota()}
                                                   style={{display: rsultsInfo?'block':'none'}}
                                                   dataSource={this.props.fICompany}
                                                   pagination={false}/>
                                        </Panel>
                                        <Panel header="财务指标" key="2">
                                            <div style={{display: rsultsInfo?'block':'none'}}>
                                                <Table
                                                    pagination={false}
                                                    columns={this.getColumnsQuota('当季度指标值')}
                                                    dataSource={this.props.fIFinance}
                                                    title={() => '资产科目'}
                                                />
                                                <br/>
                                                <Table
                                                    pagination={false}
                                                    columns={this.getColumnsQuota('当季度指标值')}
                                                    dataSource={this.props.fIDebt}
                                                    title={() => '负债科目'}
                                                />
                                                <br/>
                                                <Table
                                                    pagination={false}
                                                    columns={this.getColumnsQuota('当季度指标值')}
                                                    dataSource={this.props.fIProfitAndLoss}
                                                    title={() => '损益科目'}
                                                />
                                                <br/>
                                                <Table
                                                    pagination={false}
                                                    columns={this.getColumnsQuota('当季度指标值')}
                                                    dataSource={this.props.fICash}
                                                    title={() => '现金流量科目'}
                                                />
                                                <br/>
                                                <Table
                                                    pagination={false}
                                                    columns={this.getColumnsQuota('当季度指标值')}
                                                    dataSource={this.props.fIRatio}
                                                    title={() => '比率指标'}
                                                />
                                            </div>
                                        </Panel>
                                        <Panel header="征信数据" key="3">
                                            <div style={{display: rsultsInfo?'block':'none'}}>
                                                <Table
                                                    pagination={false}
                                                    columns={this.getColumnsQuota('当月指标值')}
                                                    dataSource={this.props.fICorporateCredit}
                                                    title={() => '人行企业征信'}
                                                />
                                                <br/>
                                                <Table
                                                    pagination={false}
                                                    columns={this.getColumnsQuota('当月指标值')}
                                                    dataSource={this.props.fIPersonalCredit}
                                                    title={() => '人行个人征信'}
                                                />
                                            </div>
                                        </Panel>
                                        <Panel header="互联网征信数据" key="4">
                                            <Table pagination={false} columns={this.getColumnsQuota('当月指标值')}
                                                   dataSource={this.props.fIInternetCredit}
                                                   style={{display: rsultsInfo?'block':'none'}}
                                            />
                                        </Panel>
                                        <Panel header="经营数据" key="5">
                                            <Table pagination={false} columns={this.getColumnsQuota('当月指标值')}
                                                   dataSource={this.props.fIOperating}
                                                   style={{display: rsultsInfo?'block':'none'}}
                                            />
                                        </Panel>
                                        <Panel header="行政处罚记录" key="6">
                                            <Table pagination={false} columns={this.getColumnsQuota('当月指标值')}
                                                   dataSource={this.props.fIAdministrative}
                                                   style={{display: rsultsInfo?'block':'none'}}
                                            />
                                        </Panel>
                                        <Panel header="诉讼记录" key="7">
                                            <Table pagination={false} columns={this.getColumnsQuota('当月指标值')}
                                                   dataSource={this.props.fIRecord}
                                                   style={{display: rsultsInfo?'block':'none'}}
                                            />
                                        </Panel>
                                    </Collapse>
                                </TabPane>

                                {/*异常指标*/}
                                <TabPane tab="异常指标" key="2">
                                    <div
                                        style={{display: this.props.fIBnormal &&  this.props.fIBnormal.length>0?'block':'none'}}>
                                        <Collapse
                                            activeKey={this.defaultActiveKeys}>
                                            {this.props.fIBnormal && this.props.fIBnormal.map(function(value, index, array) {
                                                return (
                                                    (function(value, index) {
                                                        var paneTitle = '当月指标值';
                                                        if(value.categoryName == '财务指标')paneTitle = '当季度指标值'
                                                        return (
                                                            <Panel header={value.categoryName} key={index.toString()}>
                                                                {/*indicators*/}
                                                                {value.indicators &&
                                                                <Table columns={self.getColumnsQuota()}
                                                                       dataSource={value.indicators}
                                                                       pagination={false}/>  }

                                                                {/*subCategory*/}
                                                                {value.subCategory && value.subCategory.map(function(value, index, array) {
                                                                    let title = value.categoryName;
                                                                    return (
                                                                        <Table
                                                                            key={'table'+index.toString()}
                                                                            columns={self.getColumnsQuota(paneTitle)}
                                                                            dataSource={value.indicators}
                                                                            pagination={false}
                                                                            title={() => (title)}/>
                                                                    )
                                                                })
                                                                }
                                                            </Panel>)
                                                    })(value, index)
                                                )
                                            }) }
                                        </Collapse>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </TabPane>
                </Tabs>
                <ModalOperation form={this.props.form} ref="modalOperation" onClickOk={this.handleModalOk.bind(this)}/>
                <ModalHistory ref="modalHistory" dataSource={this.props.historyData}/>
            </div>
        );
    }

    getAllResults() {
        const obj = this.props.form.getFieldsValue();
        let companyId = this.state.companyId;
        let date = {};
        if(obj.selectDate) {
            date = {
                year: obj.selectDate.getFullYear(),
                month: obj.selectDate.getMonth() + 1
            }
        } else {
            var nowDate = new Date();
            date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1
            }
        }
        this.props.action.fetchGetAllResults(date, companyId);
    }

    getBusinessInfo(pageNum = 1, pageSize = 10) {
        this.props.action.fetchGetBusinessInfo(
            {
                "redIndicatorMax": null,
                "redIndicatorMin": null,
                "yellowIndicatorMax": null,
                "yellowIndicatorMin": null,
                "companyName": '',
                "companyNature": null,
                "companyScale": null,
                "pageNum": pageNum,
                "pageSize": pageSize
            });
    }

    get rsultsInfoTitle() {
        let {rsultsInfo} = this.props;
        if(!rsultsInfo)rsultsInfo = {};
        return {
            total: rsultsInfo.total || 0, //一个企业指标总数
            yellow: rsultsInfo.yellow || 0, //黄色预警指标数
            red: rsultsInfo.red || 0, //红色预警指标数
            alarmState: rsultsInfo.alarmState || 0,  //“处理为风险事件” 指标数
        };
    }

    get warningTitle() {
        let {pieInfo} = this.props;
        if(!pieInfo)pieInfo = {};
        return {
            redAndYellowIndicators: pieInfo.numbersOfCompaniesWithRedAndYellowIndicators || 0,
            redAndYellowRates: pieInfo.redAndYellowRates || 0,
            yellowIndicators: pieInfo.numbersOfCompaniesWithYellowIndicators || 0,
            yellowRates: pieInfo.yellowRates || 0,
            redIndicators: pieInfo.numbersOfCompaniesWithRedIndicators || 0,
            redRates: pieInfo.redRates || 0,
        };
    }

    get defaultActiveKeys() {
        let len = [];
        if(!this.props.fIBnormal)return len;
        for(var i = 0; i < this.props.fIBnormal.length; i++) {
            len.push(i.toString());
        }
        return len;
    }

    //初始化表格
    get columns() {
        var self = this;
        const columns = [
            {
                title: '企业ID',
                className: 'text-align-center',
                dataIndex: 'companyId',
            }, {
                title: '企业名称',
                className: 'text-align-center',
                dataIndex: 'companyName',
            }, {
                title: '企业性质',
                className: 'text-align-center',
                dataIndex: 'companyNatureDes',
            }, {
                title: '企业规模',
                className: 'text-align-center',
                dataIndex: 'companyScaleDes',
            }, {
                title: '营业执照号',
                className: 'text-align-center',
                dataIndex: 'certificateNumber',
            }, {
                title: '所属行业',
                className: 'text-align-center',
                dataIndex: 'industryDes',
            }, {
                title: '黄色预警指标数',
                className: 'text-align-center',
                dataIndex: 'yellowIndicator',
            }, {
                title: '红色预警指标数',
                className: 'text-align-center',
                dataIndex: 'redIndicator',
            }, {
                title: '操作',
                className: 'text-align-center',
                dataIndex: 'h',
                render: function(text, record) {
                    return (
                        <div>
                            <a href="javascript:void(0)"
                               onClick={self.handleIndicatorItem.bind(self, record)}>预警</a>
                            &nbsp;
                            <a href="javascript:void(0)"
                               onClick={self.handleEditItem.bind(self, record)}>修改</a>
                            &nbsp;
                            <Popconfirm title="确定删除?" onConfirm={self.handleDeleteItem.bind(self, record)}>
                                <a>删除</a>
                            </Popconfirm>
                            &nbsp;
                            <a href="javascript:void(0)"
                               onClick={self.handleSetQuotaItem.bind(self, record)}>录入数据</a>
                        </div>
                    )
                }
            }
        ];
        return columns;
    }

    get message() {
        let {message} = this.state;
        if(message && message != null && message != '') {
            return (<Alert showIcon message={message} type="error"/>)
        } else {
            return;
        }
    }

    get option() {
        let {pieInfo} = this.props;
        if(!pieInfo)return {}
        return {
            title: {
                text: '',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} :{d}%"
            },
            color: ['#FFB90F', '#CD2626', '#8B3A3A', '#9ACD32'],
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['仅出现黄色预警指标企业', '仅出现红色预警指标企业', '同时出现红黄色预警指标企业', '正常企业']
            },
            calculable: true,
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    data: [
                        {value: pieInfo.yellowRates, name: '仅出现黄色预警指标企业'},
                        {value: pieInfo.redRates, name: '仅出现红色预警指标企业'},
                        {value: pieInfo.redAndYellowRates, name: '同时出现红黄色预警指标企业'},
                        {value: pieInfo.normalRates, name: '正常企业'}
                    ]
                }
            ]
        };
    }

    getColumnsQuota(str = '当月指标值') {
        var self = this;
        const columns = [
            {
                title: '监控字段/监控频率',
                className: 'text-align-center',
                dataIndex: 'indicatorName',
            }, {
                title: '触发机制',
                className: 'text-align-center',
                dataIndex: 'description',
            }, {
                title: str,
                className: 'text-align-center',
                dataIndex: 'indicatorValue',
                render: function(text, record) {
                    if(text != null && text != '' && text != 'null') {
                        return text;
                    } else {
                        return (<span>--</span> );
                    }
                }
            }, {
                title: '预警级别',
                className: 'text-align-center',
                dataIndex: 'alarmLevel',  // 0/无，1/黄色预警，2/红色预警 3/黑色风险事项
                render: function(text, record) {
                    switch(text) {
                        case 0:
                            return (<span>无</span>);
                            break;
                        case 1:
                            return (<i className="circle circle-yellow"></i>);
                            break;
                        case 2:
                            return (<i className="circle circle-red"></i>);
                            break;
                        case 3:
                            return (<i className="circle circle-black"></i>);
                            break;
                    }
                    return (<span>无</span> );
                }
            }, {
                title: '操作',
                className: 'text-align-center',
                dataIndex: 'operationState',  //1/待处理，2/处理中，3/警报解除，4/处理为风险事项 可为空
                render: function(text, record) {
                    if(text != null && text != '' && text != 'null') {
                        var str = '';
                        switch(text.toString()) {
                            case '1':
                                str = '待处理';
                                break;
                            case '2':
                                str = '处理为处理中';
                                break;
                            case '3':
                                str = '警报解除';
                                break;
                            case '4':
                                str = '处理为风险事项';
                                break;
                            default:
                                str = '参数问题';
                                break;
                        }
                        return (
                            <div>
                                <Button type="ghost" size="small" onClick={self.handleShowModal.bind(self, record)}
                                        disabled={record.id==0?true:false}>
                                    {str}
                                </Button>
                            </div>
                        )
                    } else { //
                        return ( <div>
                            <Button type="ghost" size="small" onClick={self.handleShowModal.bind(self, record)}
                                    disabled={record.id==0?true:false}>
                                待处理
                            </Button>
                        </div>);
                    }
                }
            }, {
                title: '处理历史',
                className: 'text-align-center',
                dataIndex: 'h',
                render: function(text, record) {
                    return (
                        <div>
                            <a href="javascript:void(0)"
                               onClick={self.handleShowHistoryModal.bind(self, record)}>查看</a>
                        </div>
                    )
                }
            }
        ];
        return columns;
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    return {
        pieInfo: state.warningSearchReducer.pieInfo,
        businessInfoData: state.warningSearchReducer.businessInfoData,
        total: state.warningSearchReducer.total,
        //
        rsultsInfo: state.warningSearchReducer.rsultsInfo,
        fICompany: state.warningSearchReducer.fICompany,//企业信息
        fIFinance: state.warningSearchReducer.fIFinance,       //资产科目
        fIDebt: state.warningSearchReducer.fIDebt,          //负债科目
        fIProfitAndLoss: state.warningSearchReducer.fIProfitAndLoss, //损益科目
        fICash: state.warningSearchReducer.fICash,  //现金流量科目
        fIRatio: state.warningSearchReducer.fIRatio, //比率指标
        fICorporateCredit: state.warningSearchReducer.fICorporateCredit,  //人行企业征信
        fIPersonalCredit: state.warningSearchReducer.fIPersonalCredit,   //人行个人征信
        fIInternetCredit: state.warningSearchReducer.fIInternetCredit,   //互联网征信数据
        fIOperating: state.warningSearchReducer.fIOperating,       //经营数据
        fIAdministrative: state.warningSearchReducer.fIAdministrative,  //行政处罚记录
        fIRecord: state.warningSearchReducer.fIRecord,          //诉讼记录
        fIBnormal: state.warningSearchReducer.fIBnormal,  //异常
        historyData: state.warningSearchReducer.historyData,
        //
        showModal: state.warningSearchReducer.showModal,
        //
        errorMassage: state.warningSearchReducer.errorMassage,
        reload: state.warningSearchReducer.reload,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionWarningSearch, dispatch),
        actionBusiness: bindActionCreators(actionBusinessInfoManage, dispatch)
    }
}
export default connect(mapStateToProps,
    mapDispatchToProps)(Form.create()(WarningSearch));

