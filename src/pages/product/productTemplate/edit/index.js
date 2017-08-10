/**
 * Created by wuyq on 2016/11/1.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';
import { Link } from 'react-router';

import {
    Input,
    Row,
    Col,
    Tabs,
    Icon,
    Breadcrumb,
    Table,
    Button,
    Popconfirm,
    Form,
    Select,
    Collapse
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

import {actionProduct} from 'ACTION';
// 自定义验证
import {ruleType} from 'UTILS';

class ProductTplEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoadEstimatedFee: false
        }
    }

    componentDidMount() {
        let {id} = this.props.routeParams;
        if (id) {
            this.props.action.productTplsEdit(id);
        }
    }

    handleEditSave() {
        this.props.form.validateFields((errors, values)=> {
            if (!errors) {
                let data = {
                    id: this.props.routeParams.id,
                    typeId: values.innerProductType,
                    tempName: values.tempName,
                    prodDesc: values.prodDesc
                }
                this.props.action.productTplsEditSave(data, this.props.form);
            }
        });

    }

    handleGetEstimatedFeeList(id) {
        this.props.action.fetchProductTplsEstimatedFeeList(id);
        this.setState({
            hasLoadEstimatedFee: true
        })
    }

    handleEditCancel() {
        this.props.history.push('/product/productTemplate/home');
    }

    handleTabsChange(key) {
        console.log(key);
    }

    render() {
        var {productTplsEditObj,estimatedFeeList} = this.props;
        const {getFieldProps} = this.props.form;
        var baseInfo = productTplsEditObj.baseInfo || {};
        var feeInfo = productTplsEditObj.feeInfo || {};

        baseInfo.serviceType
        var text = '';
        if (baseInfo.serviceType == '0') {
            text = 'WEB'
        } else if (baseInfo.serviceType == '1') {
            text = 'API'
        } else {
            text = baseInfo.serviceType
        }

        // 表单布局
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 8},
        };
        const inputParamsColumns = [{
            title: '字段名称',
            className: 'text-align-center',
            dataIndex: 'name',
        }, {
            title: '必填项',
            className: 'text-align-center',
            dataIndex: 'paramsType',
            render: (paramsType)=> {
                return paramsType == '1' ? '是' : '否';
            }
        }];
        const outputParamsColumns = [{
            title: '数据来源',
            className: 'text-align-center',
            dataIndex: 'infraName',
        }, {
            title: '字段名称',
            className: 'text-align-center',
            dataIndex: 'name',
        }, {
            title: '源产品名称',
            className: 'text-align-center',
            dataIndex: 'productName',
        }];
        const estimatedFeeColumns = [{
            title: '数据来源',
            className: 'text-align-center',
            dataIndex: 'infraName',
        }, {
            title: '源产品名称',
            className: 'text-align-center',
            dataIndex: 'productName',
            render: (text, record)=> {
                return <Link to={`/source/products/detail/${record.productId}`}>{text}</Link>
            }
        }, {
            title: '更新周期',
            className: 'text-align-center',
            dataIndex: 'updateCycle',
            render:(text)=>{
                return `T+${text}`;
            }
        }, {
            title: '收费方式',
            className: 'text-align-center',
            dataIndex: 'feeTypeName',
        }, {
            title: '产品价格',
            className: 'text-align-center',
            dataIndex: 'fee',
            render: (fee)=> {
                if (!fee) {
                    return <span>未设置</span>
                } else {
                    return <span>{fee}</span>
                }
            }
        }];

        if (productTplsEditObj.baseInfo) {
            let innerprods = productTplsEditObj.baseInfo.innerTypes || [];
            var innerProductTypeHtml = innerprods.map((item, index)=> {
                return <Option key={index} value={item.id.toString()}>{item.typeName}</Option>
            })
        }

        var rules = {
            tempName: {
                rules: [
                    {required: true, message: '产品模板名称不能为空'},
                    {min: 1, max: 20, message: '仅支持输入1-20位字符'},
                    ruleType('cn+en')
                ]
            },
            prodDesc: {
                rules: [
                    {min: 0, max: 99, message: '最多只能输入99位字符'},
                    ruleType('cn+en')
                ]
            }
        }

        return (
            <div>
                <Tabs tabPosition='top' onChange={this.handleTabsChange.bind(this)}>
                    <TabPane tab="基本信息" key="1">
                        <Collapse defaultActiveKey={['1','2']}>
                            <Panel header="基本信息" key="1">
                                <Form horizontal>
                                    <Form.Item label="产品模板编号" {...formItemLayout}>
                                        <p>{baseInfo.tempCode}</p>
                                    </Form.Item>
                                </Form>
                                <Form horizontal>
                                    <Form.Item label="产品模板名称" {...formItemLayout} required>
                                        <Input {...getFieldProps('tempName', {
                                            initialValue: baseInfo.tempName,
                                            rules: rules.tempName.rules
                                        })} autoComplete="off"
                                            placeholder=""/>
                                    </Form.Item>
                                </Form>
                                <FormItem
                                    label="内部产品类型"
                                    {...formItemLayout}
                                    required
                                >
                                    <Select
                                        {...getFieldProps('innerProductType', {
                                            initialValue: `${baseInfo.innerProductType}`, rules: [
                                                {required: true, message: '内部产品类型不能为空'},
                                            ]
                                        })}
                                        style={{ width: '100%' }}
                                    >
                                        {innerProductTypeHtml}
                                    </Select>
                                </FormItem>
                                <Form horizontal>
                                    <Form.Item label="服务方式" {...formItemLayout}>
                                        <p>{text}</p>
                                    </Form.Item>
                                </Form>
                                <Form horizontal>
                                    <Form.Item label="产品说明" {...formItemLayout}>

                                        <Input type="textarea"
                                               autosize={{ minRows: 2, maxRows: 6 }} {...getFieldProps('prodDesc', {
                                            initialValue: baseInfo.prodDesc,
                                            rules: rules.prodDesc.rules
                                        })} autoComplete="off"
                                               placeholder=""/>
                                    </Form.Item>
                                </Form>
                            </Panel>
                            <Panel header="资费说明" key="2">
                                <Row>
                                    <Col span={8}>预估费用</Col>
                                    <Col
                                        span={8}>{feeInfo.estimatedFee == '-1' ? '无法估计    原因：有源产品的价格未设置' : `${feeInfo.estimatedFee}元/次`}</Col>
                                    <Col span={8}>{this.state.hasLoadEstimatedFee ? null : <a href='javascript:void(0)'
                                                                                              onClick={this.handleGetEstimatedFeeList.bind(this,feeInfo.id)}>展开</a>}  </Col>
                                </Row>
                                {
                                    this.state.hasLoadEstimatedFee ? <div className='fn-mt-20'>
                                        <Table columns={estimatedFeeColumns} dataSource={estimatedFeeList}
                                               pagination={false}/>
                                    </div> : null
                                }
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane tab="字段信息" key="2">
                        <Collapse defaultActiveKey={['1','2']}>
                            <Panel header="输入参数" key="1">
                                <Table columns={inputParamsColumns} dataSource={productTplsEditObj.inputParams}
                                       pagination={false}/>
                            </Panel>
                            <Panel header="返回结果参数" key="2">
                                <Table columns={outputParamsColumns} dataSource={productTplsEditObj.outputParams}
                                       pagination={false}/>
                            </Panel>
                        </Collapse>
                    </TabPane>
                </Tabs>
                <Form.Item wrapperCol={{span: 12, offset: 10}} className='fn-mt-40'>
                    <Button type="primary" onClick={this.handleEditSave.bind(this)}>保存</Button>
                    <Button className="fn-ml-20" onClick={this.handleEditCancel.bind(this)}>取消</Button>
                </Form.Item>
            </div>
        )
    }
}


//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("hhh", state)
    return {
        productTplsEditObj: state.productReducer.productTplsEditObj,
        estimatedFeeList: state.productReducer.estimatedFeeList
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionProduct, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProductTplEdit));
