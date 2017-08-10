import React, {Component} from 'react';
import {Router, History, Link} from 'react-router';
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
import './../../style.less';
const createForm = Form.create;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
class Data extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            current: 'search'
        };
    }

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
        if(params){
            this.setState({
                params:params
            })
           //this.props.history.push('/history/data/home/');
           let data = {
               "all": 0,
               "pageNum": 1,
               "pageSize": 10,
               "infraId": parseInt(params,10)
           }
           this.props.action.fetchRecordDatasources()
           this.props.action.fetchOriginalProducts(data)
        }

    }

    handleClick(e) {
        this.setState({current: e.key});
        //跳转
        let url = e.keyPath[1]
            ? "warning/" + e.keyPath[1] + "/" + e.key
            : "warning/" + e.key;
        this.props.history.push(url);
    }

    handleDetails(record) {
        this.context.router.push({
          pathname: `/history/data/detail/${record.id}`,
          query: {
              productName: record.productName,
              callTimes: record.callTimes,
              succeededTimes: record.succeededTimes,
              failedTimes: record.failedTimes,
          },
        });
    }

    handleEditor() {
        alert("编辑")
    }

    handleDisable() {
        alert("禁用")
    }

    handleSubmit(e) {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if(!!errors) {
                // console.log('Errors in form!!!');
                return;
            }
            //console.log('Submit!!!');
            //console.log(values);
            let data = {};
            var pageSize = _this.refs.table.state.pagination.pageSize;
            data = {
                "all": 0,
                "pageNum": 1,
                "pageSize": pageSize,
                "keyword": (values.keyword || null),
                "productTypeId": (values.productTypeId || null),
                "infraId": (_this.state.params || null)
            }
            _this.props.action.fetchOriginalProducts(data)
        });
    }

    datasourcesData() {
        const {recordRecordDatasources} = this.props;
        let recordRecordDatasourcesProducts = recordRecordDatasources || [];
        let result = []
        recordRecordDatasourcesProducts.map((item, index) => {
            result.push({
                "value": item.id,
                "label": item.name,
            })
        })
        return result;
    }

    render() {
        let _this = this;
        const {
            recordRecordDatasources,
            recordOriginalProducts,
            recordOriginalProductsProducts
        } = this.props;
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const productTypeIdProps = getFieldProps('productTypeId', {
            rules: [
                {
                    required: false,
                }
            ],
            onChange: (value) => {
                var current = _this.refs.table.state.pagination.current;
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all": 0,
                    "keyword": _this.props.form.getFieldValue("keyword") || null,
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "productTypeId": value || null,
                    "infraId": _this.state.params || null
                }
                _this.props.action.fetchOriginalProducts(data)
            },
            initialValue: ""
        });
        const keywordProps = getFieldProps('keyword', {
            rules: [
                {
                    required: false,
                },
                ruleType("cn+en+num"),
            ],
            onChange: (e) => {
                if(e.target.value == "") {
                    var current = _this.refs.table.state.pagination.current;
                    var pageSize = _this.refs.table.state.pagination.pageSize;
                    let data = {
                        "all": 0,
                        "keyword": null,
                        "pageNum": current || null,
                        "pageSize": pageSize || null,
                        "productTypeId": _this.props.form.getFieldValue("productTypeId") || null,
                        "infraId": _this.state.params || null
                    }
                    _this.props.action.fetchOriginalProducts(data)
                }
            }
        });
        const formItemLayout = {
            labelCol: {
                span: 10
            },
            wrapperCol: {
                span: 14
            }
        };
        const address = [
            {
                value: 'zhejiang',
                label: '个人'
            }, {
                value: 'qiye',
                label: '企业'
            }
        ];
        let datasourcesData = this.datasourcesData()
        const pagination = {
            total: recordOriginalProducts.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onShowSizeChange(current, pageSize) {
                let data = {
                    "all": 0,
                    "keyword": _this.props.form.getFieldValue("keyword") || null,
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "productTypeId": _this.props.form.getFieldValue("productTypeId") || null,
                    "infraId": _this.state.params || null
                }
                _this.props.action.fetchOriginalProducts(data)
            },
            onChange(current) {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all": 0,
                    "keyword": _this.props.form.getFieldValue("keyword") || null,
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "productTypeId": _this.props.form.getFieldValue("productTypeId") || null,
                    "infraId": _this.state.params || null
                }
                _this.props.action.fetchOriginalProducts(data)
                // console.log('Current: ', current);
            },
        };
        if(recordRecordDatasources) {
            var recordRecordDatasourcesHtml = recordOriginalProductsProducts.map((item, index) => {
                return (<Option key={index} value={item.id.toString()}>{item.name}</Option>)
            })
        }
        return (
            <div className="fn-pa-10">
                {
                    recordOriginalProductsProducts.length > 0
                        ?
                        <div className="panel">
                            <div className="fn-pa-10">
                                <Form inline className="ant-advanced-search-form">
                                    <FormItem label="源产品类型">
                                        <Select
                                            notFoundContent="没找到源产品类型"
                                            style={{
                                                width: 150
                                            }} {...productTypeIdProps}>
                                            {recordRecordDatasourcesHtml}
                                        </Select>
                                    </FormItem>
                                    <FormItem label="关键字" hasFeedback>
                                        <Input style={{width: 250}} {...keywordProps} placeholder="源产品名称/源产品编号 关键字"/>
                                    </FormItem>
                                    <div className="ant-row ant-form-item" style={{
                                        "verticalAlign": "top"
                                    }}>
                                        <Button disabled={
                                            _this.props.form.getFieldValue("keyword")
                                                ?
                                                false
                                                :
                                                true
                                        } type="primary" onClick={this.handleSubmit.bind(this)}>查询</Button>
                                    </div>
                                </Form>

                            </div>
                            <div>
                                <Table
                                    ref='table'
                                    columns={this.columns}
                                    dataSource={recordOriginalProducts.list}
                                    pagination={pagination}
                                />
                            </div>
                        </div>
                        :
                        null
                }

            </div>
        );
    }

    //初始化表格
    get columns() {
        var self = this;
        const columns = [
            {
                title: '序号',
                dataIndex: 'ceshi1',
                render: (text, record, index) => {
                    let current = self.refs.table && self.refs.table.state.pagination.current || 1;
                    let pageSize = self.refs.table && self.refs.table.state.pagination.pageSize || 10;
                    return (
                        <div>{(current-1)*pageSize+index+1}</div>
                    )
                }
            }, {
                title: '源产品编号',
                dataIndex: 'productCode'
            }, {
                title: '源产品名称',
                dataIndex: 'productName',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Link to={`/source/products/detail/${record.productId}`}>{record.productName}</Link>
                        </div>
                    )
                }
            }, {
                title: '源产品类型',
                dataIndex: 'productType'
            }, {
                title: '调用接口次数',
                dataIndex: 'callTimes'
            }, {
                title: '调用成功次数',
                dataIndex: 'succeededTimes'
            }, {
                title: '调用失败次数',
                dataIndex: 'failedTimes'
            }, {
                title: '最近一次调用时间',
                dataIndex: 'lastCallTime'
            }, {
                title: '最近一次返回时间',
                dataIndex: 'lastReturnTime'
            }, {
                title: '操作',
                dataIndex: 'id',
                className: 'text-align-center',
                width:"150px",
                render: (text, record, index) => {
                    return (
                        <div>
                            <a href="javascript:;" onClick={self.handleDetails.bind(this, record)}>详情</a>
                        </div>
                    )
                }
            }
        ];
        return columns
    }
}
function mapStateToProps(state, props) {
    return {
        recordRecordDatasources: state.historyReducer.recordRecordDatasources,
        recordOriginalProducts: state.historyReducer.recordOriginalProducts,
        recordOriginalProductsProducts: state.historyReducer.recordOriginalProductsProducts,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionHistory, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Data));
