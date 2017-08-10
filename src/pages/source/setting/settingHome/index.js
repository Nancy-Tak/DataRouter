/**
 * Created by Ethan on 2016/11/2.
 */
import {
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Table,
    Button,
    Tabs,
    Form,
    Modal,
    Select,
    Input,
    Message
} from 'antd';
import React, {Component} from 'react';
import {Router, History, Link} from 'react-router';
import './../../style.less';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
import ruleType from 'UTILS/ruleType';

const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
class Setting extends Component {
    static defaultProps = {
        updateCyclesCommonRule: {},
        UpdateCyclesSpecialRules: {},
        CyclesSpecialRulesProductTypes: [],
        CyclesSpecialRulesProductTypesId: []
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 'search',
            visibleAdd: false,
            visibleEditor: false,
            //緩存當前編輯內容
            visibleEditorJson: {},
            visibleEestore: false,
            //缓存恢复成通用规则
            visibleEestoreJson: {},
            params: ""
        };
    }

    //加载完成的时候
    componentDidMount() {
        this.loadData();
    }
    /**
     * 将要更新的时候
     * objectnextProps 新的objectnextProps.params.id
     * objectnextState 以前的objectnextState.params
     */
    componentWillUpdate(objectnextProps,objectnextState) {
        if(objectnextProps.params.id!=objectnextState.params){
            //更新的时候，只加载更新的，不穿就会加载2个
            this.loadData(objectnextProps.params.id);
        }
    }
    loadData(objectnextPropsId) {
        let params = objectnextPropsId || this.props.params.id;
        //let params = this.props.location.query.id;
        //获取源产品管理列表
        if (params) {
            //this.props.history.push('/source/setting/settingHome');
            this.setState({params: params})
            let data = {
                "pageNum": 1,
                "pageSize": 10
            }
            this.props.action.fetchUpdateCyclesCommonRule(params)
            this.props.action.fetchUpdateCyclesSpecialRules(params, data)
        }
    }
    //离开的时候就移除
    componentWillUnmount(){
        //alert("1")
    }
    handleDetails() {
        alert("详情")
    }

    handleTabs(key) {}

    handleAdd() {
        this.props.form.setFieldsValue({
            ["productTypeName"]:"",
            ["productName"]:"",
            ["updateCycle"]:"",
        })
        this.props.action.fetchUpdateCyclesSpecialRulesProductTypes(this.state.params)
        this.setState({visibleAdd: true});
    }

    handleAddOk(e) {
        //e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                //console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
            //源产品类型
            let getCyclesSpecialRulesProductTypes = this.getCyclesSpecialRulesProductTypes(values.productTypeName)
            //源产品名称
            let getCyclesSpecialRulesProductTypesId = this.getCyclesSpecialRulesProductTypesId(values.productName)
            //console.log("getCyclesSpecialRulesProductTypes",this.getCyclesSpecialRulesProductTypes(values.productTypeName))
            //console.log("getCyclesSpecialRulesProductTypesId",this.getCyclesSpecialRulesProductTypesId(values.productName))
            let saveData = {
                "productTypeName": getCyclesSpecialRulesProductTypes.name || null,
                "productName": getCyclesSpecialRulesProductTypesId.name || null,
                "updateCycle": values.updateCycle || null,
                "productCode": getCyclesSpecialRulesProductTypesId.productCode || null,
                "infraId": getCyclesSpecialRulesProductTypesId.infraId || null
            }
            console.log("saveData=>", saveData)
            this.props.action.fetchUpdateCyclesSpecialRulesSave(saveData, this.props.history)
            console.log('点击了确定');
            this.setState({visibleAdd: false});
        });
    }

    handleAddCancel(e) {
        console.log(e);
        this.setState({visibleAdd: false});
    }

    handleEditor(record) {
        console.log(record)
        this.setState({visibleEditor: true, visibleEditorJson: record})
    }

    handleEditorOk() {
        let saveData = {}
        console.log("sadasdasdasd", this.props.form.getFieldValue("updateCycle"))
        if (this.props.form.getFieldValue("updateCycle")) {
            saveData = {
                id: this.state.visibleEditorJson.id || null,
                updateCycle: this.props.form.getFieldValue("updateCycle") || null,
                productCode: this.state.visibleEditorJson.productCode || null
            }
            this.props.action.fetchUpdateCyclesSpecialRulesUpdate(saveData, this.props.history);
            console.log('点击了确定');
            this.setState({visibleEditor: false});
        } else {
            Message.error("数据更新周期不能为空")
        }
        //这里还有点问题，还要回来搞搞
    }

    handleEditorCancel() {
        this.setState({visibleEditor: false})
    }

    handleDisable(record) {
        this.setState({visibleEestore: true, visibleEestoreJson: record})
    }

    handleEestoreOk() {
        let dataId = this.state.visibleEestoreJson.id
        this.props.action.fetchUpdateCyclesSpecialRulesRestore(dataId, this.props.history)
        this.setState({visibleEestore: false})
    }

    handleEestoreCancel() {
        this.setState({visibleEestore: false})
    }
    handleCommonRuleEditor(){
        const { updateCyclesCommonRule } = this.props;

        this.props.history.push(`/source/setting/editor/${this.state.params}`)
    }

    render() {
        let {
            updateCyclesCommonRule,
            UpdateCyclesSpecialRules,
            CyclesSpecialRulesProductTypes,
            CyclesSpecialRulesProductTypesId
        } = this.props;
        //特殊规则列表
        let UpdateCyclesSpecialRulesList = UpdateCyclesSpecialRules && UpdateCyclesSpecialRules.list || []
        let _this = this;
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 12
            }
        };
        const productTypeNameProps = getFieldProps('productTypeName', {
            rules: [
                {
                    required: true,
                    message: '请选择您的源产品类型',
                    type: "string"
                }
            ],
            onChange: (value) => {
                //添加特殊规则 去掉源产品名称的值
                this.props.form.setFieldsValue({["productName"]: ""})
                /**
                 * value 獲取到的key
                 */
                this.props.action.fetchUpdateCyclesSpecialRulesProductTypesId(value)
            }
        });
        const productNameProps = getFieldProps('productName', {
            rules: [
                {
                    required: true,
                    message: '请选择您的源产品名称',
                    type: "string"
                }
            ],
            onChange: (value) => {
                console.log("value", value)
            }
        });
        const updateCycleProps = getFieldProps('updateCycle', {
            rules: [
                {
                    required: true,
                    message: '天数不能为空'
                },
                ruleType('number')
            ]
        });
        const pagination = {
            total: UpdateCyclesSpecialRules.total,
            showSizeChanger: true,
            pageSizeOptions: [
                "10", "20", "50", "100"
            ],
            // pageSizeOptions:["1"],
            // pageSize:1,
            onShowSizeChange(current, pageSize) {
                let data = {
                    "pageNum": current || null,
                    "pageSize": pageSize || null
                }
                _this.props.action.fetchUpdateCyclesSpecialRules(_this.state.params, data);
            },
            onChange(current) {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "pageNum": current || null,
                    "pageSize": pageSize || null
                }
                _this.props.action.fetchUpdateCyclesSpecialRules(_this.state.params, data);
            }
        };
        // if(CyclesSpecialRulesProductTypes){
        //     //recordUsersProducts.unshift({id:'',name:'全部'});
        //     var CyclesSpecialRulesProductTypesHtml = CyclesSpecialRulesProductTypes.map((item, index) => {
        //
        //             return (
        //                 <Option key={item.id.toString()} value={item.id.toString()}>{item.name}</Option>
        //             )
        //
        //     })
        // }

        //源产品类型 去掉全部
        if (CyclesSpecialRulesProductTypes) {
            var CyclesSpecialRulesProductTypesHtml = [];

            for (let i = 0; i < CyclesSpecialRulesProductTypes.length; i++) {
                let item = CyclesSpecialRulesProductTypes[i]
                if (item.id) {
                    CyclesSpecialRulesProductTypesHtml.push(
                        <Option key={item.id.toString()} value={item.id.toString()}>{item.name}</Option>
                    )
                }
            }
        }
        return (
            <div className="fn-pa-10">

                    <div className="panel">
                        {/*添加特殊规则*/}
                        <Modal title="添加特殊规则" visible={this.state.visibleAdd} onOk={this.handleAddOk.bind(this)} onCancel={this.handleAddCancel.bind(this)}>
                            <Form>
                                <div>

                                    <FormItem {...formItemLayout} label="源产品类型">
                                        <Select {...productTypeNameProps} placeholder="源产品类型" style={{
                                            width: '100%'
                                        }}>
                                            {CyclesSpecialRulesProductTypesHtml}

                                        </Select>
                                    </FormItem>
                                </div>
                                <div>
                                    <FormItem {...formItemLayout} label="源产品名称">
                                        <Select {...productNameProps} placeholder="源产品名称" style={{
                                            width: '100%'
                                        }}>
                                            {CyclesSpecialRulesProductTypesId.map((item, index) => {
                                                return (
                                                    <Option key={item.id.toString()} value={item.id.toString()}>{item.name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </FormItem>
                                </div>
                                <div>
                                    <FormItem {...formItemLayout} label="数据更新周期" hasFeedback>
                                        T +
                                        <Input style={{
                                            width: 100
                                        }} {...updateCycleProps} placeholder="数据更新周期"/>
                                        自然日
                                    </FormItem>
                                </div>
                            </Form>
                        </Modal>

                        {/*编辑特殊规则*/}
                        <Modal title="编辑特殊规则" visible={this.state.visibleEditor} onOk={this.handleEditorOk.bind(this)} onCancel={this.handleEditorCancel.bind(this)}>
                            <Form>
                                <div className="clearfix source-table">
                                    <div className="source-table-l">
                                        源产品类型：
                                    </div>
                                    <div className="source-table-r">
                                        {this.state.visibleEditorJson.productTypeName}
                                    </div>
                                </div>
                                <div className="clearfix source-table">
                                    <div className="source-table-l">
                                        源产品名称：
                                    </div>
                                    <div className="source-table-r">
                                        {this.state.visibleEditorJson.productName}
                                    </div>
                                </div>
                                <div className="clearfix source-table" style={{
                                    "border-bottom": "0"
                                }}>
                                    <FormItem {...formItemLayout} label="数据更新周期" hasFeedback>
                                        T +
                                        <Input style={{
                                            width: 100
                                        }} {...updateCycleProps} placeholder="数据更新周期"/>
                                        自然日
                                    </FormItem>
                                </div>
                            </Form>
                        </Modal>

                        {/*恢复成通用规则*/}
                        <Modal title="恢复成通用规则"
                            visible={this.state.visibleEestore}
                            onOk={this.handleEestoreOk.bind(this)}
                            onCancel={this.handleEestoreCancel.bind(this)}>
                            <div className="clearfix">
                                您确定将“<span style={{
                                    "color": "red"
                                }}>
                                {this.state.visibleEestoreJson.productName}
                            </span>”恢复成通用规则T +{updateCyclesCommonRule && updateCyclesCommonRule.updateCycle} 自然日吗？
                            </div>
                        </Modal>

                        <Tabs defaultActiveKey="1" onChange={this.handleTabs.bind(this)}>
                            <TabPane tab="通用规则" key="1">
                                {/*通用规则*/}
                                <div className="ant-spin-container fn-mt-20" style={{
                                    "width": "100%",
                                    "margin": "0 auto"
                                }}>
                                    <div className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">
                                        <div className="ant-table-content">
                                            <div className="ant-table-body">
                                                <table>
                                                    <thead className="ant-table-thead">
                                                        <tr>
                                                            <th colSpan={2}>
                                                                <div>
                                                                    通用规则
                                                                    <span style={{
                                                                        float: "right"
                                                                    }}>
                                                                        <a href="javascript:;" onClick={this.handleCommonRuleEditor.bind(this)} className="ant-btn ant-btn-primary" >
                                                                            修改
                                                                        </a>
                                                                    </span>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="ant-table-tbody">
                                                        <tr>
                                                            <td>数据更新周期</td>
                                                            <td>
                                                                T + {updateCyclesCommonRule && updateCyclesCommonRule.updateCycle}
                                                                自然日
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    "margin": "10px auto"
                                }}>
                                    说明：T指上一次从数据源中获取数据后保存在本地数据库中的时间。
                                </div>
                            </TabPane>
                            <TabPane tab="特殊规则" key="2">
                                <div className="fn-pa-10">
                                    <Button type="primary" onClick={this.handleAdd.bind(this)}>添加特殊规则</Button>
                                </div>
                                <Table columns={this.columns} dataSource={UpdateCyclesSpecialRules && UpdateCyclesSpecialRules.list} ref='table' pagination={pagination}/>
                            </TabPane>
                        </Tabs>

                    </div>


            </div>
        );
    }

    getCyclesSpecialRulesProductTypes(typeNum) {
        let CyclesSpecialRulesProductTypes = this.props.CyclesSpecialRulesProductTypes || [];
        let result = {}
        CyclesSpecialRulesProductTypes.map((item, index) => {
            if (item.id == typeNum) {
                result = {
                    "name": item.name
                }
            }
        })
        return result;
    }

    getCyclesSpecialRulesProductTypesId(typeNum) {
        let CyclesSpecialRulesProductTypesId = this.props.CyclesSpecialRulesProductTypesId || [];
        let result = {}
        CyclesSpecialRulesProductTypesId.map((item, index) => {
            if (item.id == typeNum) {
                result = {
                    "name": item.name,
                    "productCode": item.productCode,
                    "infraId": item.infraId
                }
            }
        })
        return result;
    }



    //初始化表格
    get columns() {
        var self = this;
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                className: 'text-align-center',
                render: (text, record, index) => {
                    let current = self.refs.table && self.refs.table.state.pagination.current || 1;
                    let pageSize = self.refs.table && self.refs.table.state.pagination.pageSize || 10;
                    return (
                        <div>{(current-1)*pageSize+index+1}</div>
                    )
                }
            }, {
                title: '源产品编号',
                className: 'text-align-center',
                dataIndex: 'productCode'
            }, {
                title: '源产品名称',
                className: 'text-align-center',
                dataIndex: 'productName'
            }, {
                title: '源产品类型',
                className: 'text-align-center',
                dataIndex: 'productTypeName'
            }, {
                title: '数据更新周期',
                className: 'text-align-center',
                dataIndex: 'updateCycle',
                render: (text, record, index) => {
                    return (
                        <div>
                            T + {record.updateCycle}
                            自然日
                        </div>
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                className: 'text-align-center',
                width:"150px",
                render: (text, record, index) => {
                    return (
                        <div>
                            <a onClick={self.handleEditor.bind(this, record)} href="javascript:void(0)">编辑</a>
                            <span className="ant-divider"></span>
                            <a onClick={self.handleDisable.bind(this, record)} href="javascript:void(0)">恢复成通用规则</a>

                            {/*
                             <Button onClick={self.handleEditor.bind(this,record)} style={{
                             "marginLeft": "20px"
                             }} type="primary">编辑</Button>
                             <Button onClick={self.handleDisable.bind(this,record)} style={{
                             "marginLeft": "20px"
                             }} type="primary">恢复成通用规则</Button>
                             */}

                        </div>
                    )
                }
            }
        ];
        return columns
    }

    get data() {
        const data = [
            {
                key: '1',
                organizationNum: "001",
                organizationName: "百融（北京）金融信息服务股份有限公司",
                service: "API",
                status: 0,
                buildTime: "2016-09-17 15:12:20"
            }, {
                key: '2',
                organizationNum: "002",
                organizationName: "百融（北京）金融信息服务股份有限公司2",
                service: "API2",
                status: 1,
                buildTime: "2016-09-17 15:12:222"
            }
        ];
        return data
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        updateCyclesCommonRule: state.sourceReducer.updateCyclesCommonRule,
        UpdateCyclesSpecialRules: state.sourceReducer.UpdateCyclesSpecialRules,
        CyclesSpecialRulesProductTypes: state.sourceReducer.CyclesSpecialRulesProductTypes,
        CyclesSpecialRulesProductTypesId: state.sourceReducer.CyclesSpecialRulesProductTypesId
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionSource, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Setting));
