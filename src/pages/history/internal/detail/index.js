/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History} from 'react-router';
import {
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Table,
    Button,
    Form,
    Cascader,
    Input,
    Select
} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionHistory} from 'ACTION';
import moment from 'moment';
import ruleType from 'UTILS/ruleType';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
import './../../style.less'
class Detail extends Component {
    static defaultProps = {
        recordInternalProductsId: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 'search'
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        let params = this.props.params.obj
        // let loadJSON = {
        //     "all":1,
        //     "called":1,
        //     "keyword":"",
        //     "pageNum":1,
        //     "pageSize":10
        // }
        let loadJSON = {
            "all": 1,
            "pageNum": 1,
            "pageSize": 10
        }
        this.props.action.fetchInternalProductsId(params, loadJSON);
    }

    handleClick(e) {
        this.setState({current: e.key});
        //跳转
        let url = e.keyPath[1]
            ? "warning/" + e.keyPath[1] + "/" + e.key
            : "warning/" + e.key;
        this.props.history.push(url);
    }

    handleDetails() {
        alert("详情")
    }

    handleEditor() {
        alert("编辑")
    }

    handleDisable() {
        alert("禁用")
    }

    handleSubmit(e) {
        e.preventDefault();
        var _this = this;
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if(!!errors) {
                // console.log('Errors in form!!!');
                return;
            }
            //  console.log('Submit!!!');
            // console.log(values);
            let params = this.props.params.obj
            let data = {};
            var pageSize = _this.refs.table.state.pagination.pageSize;
            //如果calledInterfaceFlag存在，就条件返回，否则就全部返回
            data = {
                "all": 0,
                "calledInterfaceFlag": parseInt(values.calledInterfaceFlag[0], 10) || null,
                "keyword": values.keyword || null,
                "pageNum": 1,
                "pageSize": pageSize
            }
            this.props.action.fetchInternalProductsId(params, data);
        });
    }

    render() {
        let _this = this;
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const {recordInternalProductsId} = this.props;
        const keywordProps = getFieldProps('keyword', {
            rules: [
                {
                    required: false,
                },
                ruleType("cn+en+num"),
            ],
        });
        const calledInterfaceFlagProps = getFieldProps('calledInterfaceFlag', {
            rules: [
                {
                    required: false
                },
            ],
            onChange: (value) => {
                var current = _this.refs.table.state.pagination.current;
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all": 0,
                    "pageNum": 1,
                    "calledInterfaceFlag": parseInt(value, 10) || null,
                    "keyword": _this.props.form.getFieldValue("keyword") || null,
                    "pageSize": pageSize
                }
                _this.props.action.fetchInternalProductsId(params, data);
            },
            initialValue: ""
        });
        const formItemLayout = {
            labelCol: {
                span: 10
            },
            wrapperCol: {
                span: 14
            }
        };
        const calledInterfaceFlagList = [
            {
                id: '',
                name: '全部'
            }, {
                id: '1',
                name: '是'
            }, {
                id: '2',
                name: '否'
            }
        ];
        let params = _this.props.params.obj
        const pagination = {
            total: recordInternalProductsId.total,
            showSizeChanger: true,
            pageSizeOptions: [
                "10", "20", "50", "100"
            ],
            // pageSizeOptions:["1"],
            // pageSize:1,
            onShowSizeChange(current, pageSize) {
                let data = {
                    "all": 0,
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "keyword": _this.props.form.getFieldValue('keyword') || null,
                    "calledInterfaceFlag": _this.props.form.getFieldValue('calledInterfaceFlag') || null
                }
                _this.props.action.fetchInternalProductsId(params, data);
            },
            onChange(current) {

                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all": 0,
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "keyword": _this.props.form.getFieldValue('keyword') || null,
                    "calledInterfaceFlag": _this.props.form.getFieldValue('calledInterfaceFlag') || null
                }
                _this.props.action.fetchInternalProductsId(params, data);
                console.log('Current: ', current);
            }
        };
        if(calledInterfaceFlagList) {
            var calledInterfaceFlagListHtml = calledInterfaceFlagList.map((item, index) => {
                return <Option key={index} value={item.id.toString()}>{item.name}</Option>
            })
        }
        return (
            <div className="fn-pa-10">
                <div className="panel">

                    <div className="fn-pa-10">

                        <Form inline className="ant-advanced-search-form">
                            <FormItem label="是否有调用接口">
                                <Select style={{
                                    width: 150
                                }} {...calledInterfaceFlagProps}>
                                    {calledInterfaceFlagListHtml}
                                </Select>
                                {/*<Cascader style={{width:250}} {...productTypeIdProps} options={datasourcesData}/>*/}
                            </FormItem>
                            <FormItem label="关键字" hasFeedback>
                                <Input style={{
                                    width: 250
                                }} {...keywordProps} placeholder="查询编号/查询方/查询对象"/>
                            </FormItem>
                            <div className="ant-row ant-form-item" style={{
                                "verticalAlign": "top"
                            }}>
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>查询</Button>
                            </div>
                        </Form>

                    </div>
                    <div>
                        <h4 className="fn-pa-10">产品名称：{this.props.location.query.productName}</h4>
                        <Table ref='table' columns={this.columns} dataSource={recordInternalProductsId.list}
                               pagination={pagination}/> {/*
                     title={() => '页头'}
                     footer={() => '页脚'}
                     */}

                    </div>
                </div>
            </div>
        );
    }

    //初始化表格
    get columns() {
        var self = this;
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                render: (text, record, index) => {
                    let current = self.refs.table && self.refs.table.state.pagination.current || 1;
                    let pageSize = self.refs.table && self.refs.table.state.pagination.pageSize || 10;
                    return (
                        <div>{(current-1)*pageSize+index+1}</div>
                    )
                }
            }, {
                title: '查询编号',
                dataIndex: 'queryCode'
            }, {
                title: '查询方',
                dataIndex: 'operator'
            }, {
                title: '查询对象',
                dataIndex: 'queryObject',
                render: (text,resord,index) => {
                    let queryObject = JSON.parse(resord.queryObject) || {};
                    let queryObjectId = queryObject.id?queryObject.id.replace(/^(.{6}).*(.{2})$/,"$1**********$2"):"没有数据"
                    return (
                        <div>
                            {queryObject.name}
                            （{queryObjectId}）
                        </div>
                    )
                }
            }, {
                title: '查询时间',
                dataIndex: 'queryTime'
            }, {
                title: '是否有调用接口',
                dataIndex: 'calledInterfaceFlag',
                render: (text, record, index) => {
                    return (
                        <div>
                            {record.calledInterfaceFlag == 1
                                ? "是"
                                : "否"
                            }
                        </div>
                    )
                }
            }, {
                title: '是否调用成功',
                dataIndex: 'calledSucceeded',
                render: (text, record, index) => {
                    return (
                        <div>
                            {record.calledSucceeded == 1
                                ? "是"
                                : "否"
                            }
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
                ceshi1: '1',
                ceshi2: 'QT010001201609210003',
                ceshi3: 'admin',
                ceshi4: '北京大熊猫贸易有限公司',
                ceshi5: '2016-09-20 06：00：35',
                ceshi6: '否',
                ceshi7: '是'
            }
        ];
        return data
    }
}
//export default createForm()(Data);
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {recordInternalProductsId: state.historyReducer.recordInternalProductsId}
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionHistory, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Detail));
