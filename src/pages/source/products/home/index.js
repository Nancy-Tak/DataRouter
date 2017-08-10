/**
 * Created by xjc on 2016/11/2.
 */
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
    Modal,
    Popconfirm,
    Select,
    Form,
    Cascader,
} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
const SubMenu = Menu.SubMenu;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
import './../../style.less'
class Products extends Component {
    static defaultProps = {
        sourceproducts: {},
        sourceproductsInnerproducts: [],
        CyclesSpecialRulesProductTypes: [],
        curPage: {}
    }
    //observedProps = ["location.search"];
    constructor(props) {
        super(props);
        this.state = {
            current: 'search',
            visible: false,
            //緩存禁用數據
            handleDisable: {
                id: null,
                state: null
            }
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
    //加载数据
    loadData(objectnextPropsId) {
        let params = objectnextPropsId || this.props.params.id;
        //let params = this.props.location.query.id;
        //获取源产品管理列表
        //console.log(params);
        if(params) {
            this.setState({params: params})
            //this.props.history.push('/source/products/home/');
            let data = {
                "pageNum": 1,
                "pageSize": 10,
                "infraId": params || null
            }
            this.setState({curPage: data})
            this.props.action.fetchSourceproductsList(data);
            this.props.action.fetchUpdateCyclesSpecialRulesProductTypes(params);
        }
    }

    handleDetails() {
        alert("详情12")
    }

    handleEditor() {
        alert("编辑")
    }

    handleDisable(record, stateNum) {
        //console.log("record.state", record)
        if(record.state == 1) {
            //禁用
            this.setState({
                visible: true,
                handleDisable: {
                    id: record.id || null,
                    state: stateNum
                }
            });
            this.props.action.fetchSourceproductsInnerproducts(record.id)
        } else {
            //开启
            this.setState({
                handleDisable: {
                    id: record.id || null,
                    state: stateNum
                }
            });
            this.props.action.fetchSourceproductsState(record.id, stateNum);
        }
    }

    handleOk() {
        let {handleDisable} = this.state;
        console.log(handleDisable)
        let objId = handleDisable.id;
        let objState = handleDisable.state;
        // console.log(objId)
        // console.log(objState)
        //弹出层 禁用后将无法获取数据源提供的最新数据，确定禁用？
        this.props.action.fetchSourceproductsState(objId, objState);
        //console.log('点击了确定');
        this.setState({visible: false});
    }

    handleCancel(e) {
        // console.log(e);
        this.setState({visible: false});
    }

    render() {

        //console.log("this=>", this)
        let {
            sourceproducts, //源产品管理
            sourceproductsInnerproducts, //禁用返回的接口數組
            CyclesSpecialRulesProductTypes, //源产品类型
        } = this.props;
        let _this = this;
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 4
            }
        };
        const productTypeIdProps = getFieldProps('productTypeId', {
            initialValue: "",
            onChange: (vaule) => {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "pageNum": 1,
                    "pageSize": pageSize || 10,
                    "infraId": _this.state.params || null,
                    "productTypeId": vaule || null
                }
                _this.props.action.fetchSourceproductsList(data);
            }
        });
        const pagination = {
            total: sourceproducts.total,
            showSizeChanger: true,
            pageSizeOptions: [
                "10", "20", "50", "100"
            ],
            // pageSizeOptions:["1"],
            // pageSize:1,
            onShowSizeChange(current, pageSize) {
                let data = {
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "infraId": _this.state.params || null,
                    "productTypeId": _this.props.form.getFieldValue("productTypeId") || null
                }
                _this.props.action.fetchSourceproductsList(data);
            },
            onChange(current) {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "infraId": _this.state.params || null,
                    "productTypeId": _this.props.form.getFieldValue("productTypeId") || null
                }
                _this.props.action.fetchSourceproductsList(data);
                //console.log('Current: ', current);
            }
        };
        if(CyclesSpecialRulesProductTypes) {
            //CyclesSpecialRulesProductTypes.unshift({id: '', name: '全部'});
            var CyclesSpecialRulesProductTypesHtml = CyclesSpecialRulesProductTypes.map((item, index) => {
                return <Option key={index} value={item.id.toString()}>{item.name}</Option>
            })
        }
        return (
            <div className="fn-pa-10">
                {
                    CyclesSpecialRulesProductTypes.length > 0
                        ?
                        <div className="panel">

                            {/*彈出禁用*/}
                            <Modal title="提示" visible={this.state.visible} onOk={this.handleOk.bind(this)}
                                   onCancel={this.handleCancel.bind(this)}>
                                <h4>禁用后将无法获取数据源提供的最新数据，确定禁用？</h4>
                                <p>禁用后将会影响以下内部产品中的数据输出：</p>
                                <ul style={{
                                    "margin": "10px"
                                }}>
                                    {
                                        sourceproductsInnerproducts && sourceproductsInnerproducts.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link to={`/templatePreview/${item.tempCode}`}
                                                          target="_blank">{item.tempName && item.tempName}</Link>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </Modal>

                            <div>
                                <Form inline className="ant-advanced-search-form">
                                    <FormItem label="源产品类型">
                                        <Select {...productTypeIdProps} placeholder="源产品类型" style={{
                                            width: 150
                                        }}>
                                            {CyclesSpecialRulesProductTypesHtml}
                                        </Select>
                                    </FormItem>
                                </Form>
                                <Table ref='table' columns={this.columns}
                                       dataSource={sourceproducts && sourceproducts.list} pagination={pagination}/>
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
                dataIndex: 'key',
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
                dataIndex: 'name'
            }, {
                title: '源产品类型',
                dataIndex: 'productTypeName'
            }, {
                title: '服务方式',
                dataIndex: 'serviceName'
            }, {
                title: '数据覆盖范围',
                dataIndex: 'scope',
                render: (text, record, index) => {
                    return (
                        <div>
                            {record.scope == "1"
                                ? "全国"
                                : "地区"}
                        </div>
                    )
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render: (text) => {
                    return (
                        <div>
                            {text == "1"
                                ? "开启"
                                : "关闭"}
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

                            <Link to={`/source/products/detail/${record.id}`}>详情</Link>
                            <span className="ant-divider"></span>
                            <Link to={`/source/products/editor/${record.id}`}>编辑</Link>
                            <span className="ant-divider"></span>
                            {
                                record.state == '1'
                                    ?
                                    <a onClick={this.handleDisable.bind(this, record, 0)}
                                         href="javascript:void(0)">禁用</a>
                                    :
                                    <Popconfirm title="启用后可获取该数据机构提供的所有数据，确定启用？"
                                                onConfirm={this.handleDisable.bind(this, record, 1)}
                                                okText="确定"
                                                cancelText="取消">
                                                <a href="javascript:void(0)">开启</a>
                                    </Popconfirm>

                            }
                        </div>
                    )
                }
            }
        ];
        return columns
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        sourceproducts: state.sourceReducer.sourceproducts,
        sourceproductsInnerproducts: state.sourceReducer.sourceproductsInnerproducts,
        CyclesSpecialRulesProductTypes: state.sourceReducer.CyclesSpecialRulesProductTypes
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
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Products));
