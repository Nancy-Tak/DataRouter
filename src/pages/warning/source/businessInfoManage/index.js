/**
 * Created by Ethan on 2016/11/2.
 */
import '../../style.less';
import React,{Component,PropTypes} from 'react';
import ReactDom from 'react-dom';
import { Tabs,Form,Input,Button,Collapse,Table,Icon,DatePicker,Row,Col,Select,InputNumber,Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionBusinessInfoManage} from 'ACTION';
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;
class BusinessInfoManage extends Component {
    static defaultProps = {
        businessInfoData: []
    }
    static propTypes = {
        businessInfoData: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            businessName: null,
            yMin: '',
            yMinValue: '',
            rMin: '',
            rMinValue: '',
        }
    }

    componentDidMount() {
        this.getBusinessInfo();
    }

    handleBusinessNameInputChange(e) {
        this.setState({
            businessName: e.target.value,
        });
    }

    handleAddBusiness(e) {
        this.props.history.push("warning/source/add");
    }

    handleSearch(e) {  //模糊搜索
        e.preventDefault();
        const fv = this.props.form.getFieldsValue();
        const { yMin,yMinValue,rMin,rMinValue,businessName} = this.state;
        var pageSize = this.refs.table.state.pagination.pageSize;
        this.refs.table.state.pagination.current = 1;
        var obj =
        {
            "redIndicatorMax": rMinValue,
            "redIndicatorMin": rMin,
            "yellowIndicatorMax": yMinValue,
            "yellowIndicatorMin": yMin,
            "companyName": businessName,
            "companyNature": fv.companyNature || null,
            "companyScale": fv.companyScale || null,
        }
        this.getBusinessInfo(1, pageSize, obj);
    }

    //点击指标
    handlerOnChange(id, e) {
        if(id == 'inputNumberY' && typeof(e) != 'undefined') {
            this.setState({
                yMin: e,
                yMinValue: Math.max(e, this.state.yMinValue) || 0,
            })
        } else if(id == 'inputNumberR' && typeof(e) != 'undefined') {
            this.setState({
                rMin: e,
                rMinValue: Math.max(e, this.state.rMinValue) || 0,
            })
        } else if(id == 'inputNumberYV') {
            this.setState({
                yMinValue: e
            })
        } else if(id == 'inputNumberRV') {
            this.setState({
                rMinValue: e
            })
        }
    }

    handleSetQuotaItem(e) {
        this.props.history.push(`warning/source/setQuota/${e.id};${e.companyName}`);
    }

    handleEditItem(e) {
        this.props.history.push(`warning/source/edit/${e.id}`);
    }

    handleDeleteItem(e) {
        this.props.action.actionDeleteItem(e.id);
    }

    handleIndicatorItem(e) {
        this.props.history.push(`warning/search/${e.id};${e.companyName}`);
    }

    handleShowSizeChange(current, pageSize) {
        this.getBusinessInfo(current, pageSize);
    }

    handleChange(current) {
        const fv = this.props.form.getFieldsValue();
        const { yMin,yMinValue,rMin,rMinValue,businessName} = this.state;
        var pageSize = this.refs.table.state.pagination.pageSize;
        this.refs.table.state.pagination.current = 1;
        var obj =
        {
            "redIndicatorMax": rMinValue,
            "redIndicatorMin": rMin,
            "yellowIndicatorMax": yMinValue,
            "yellowIndicatorMin": yMin,
            "companyName": businessName,
            "companyNature": fv.companyNature || null,
            "companyScale": fv.companyScale || null,
        }
        var pageSize = this.refs.table.state.pagination.pageSize;
        this.getBusinessInfo(current, pageSize, obj);
    }

    render() {
        let {getFieldProps}= this.props.form;
        const { businessInfoData,total } = this.props;
        var pagination = {
            total: total || 0,
            showSizeChanger: true,
            onShowSizeChange: this.handleShowSizeChange.bind(this),
            onChange: this.handleChange.bind(this),
            pageSizeOptions:['10','20','50','100']
        };
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="企业信息管理" key="1">
                    <Form horizontal className="ant-advanced-search-form">
                        <Row gutter={12}>
                            <Col sm={8}>
                                <FormItem
                                    label="企业名称："
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}>
                                    {/*企业名称输入*/}
                                    <Input ref="businessNameInput" placeholder="请输入搜索企业名称"
                                           size="default"
                                           value={this.state.businessName}
                                           onChange={this.handleBusinessNameInputChange.bind(this)}/>
                                </FormItem>
                                <FormItem
                                    label="黄色预警指标："
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}>
                                    <div>
                                        <InputNumber style={{ width: 70 }}
                                                     defaultValue=""
                                                     min={0}
                                                     max={999}
                                                     onChange={this.handlerOnChange.bind(this,'inputNumberY')}/>
                                        至
                                        <InputNumber
                                            ref='inputNumberY'
                                            style={{ width: 70,marginLeft:10 }}
                                            min={this.state.yMin}
                                            max={999}
                                            value={this.state.yMinValue}
                                            onChange={this.handlerOnChange.bind(this,'inputNumberYV')}
                                        />
                                    </div>
                                </FormItem>
                            </Col>
                            <Col sm={8}>
                                <FormItem
                                    label="企业性质："
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}>
                                    <Select showSearch
                                        {...getFieldProps('companyNature')}
                                            size="default"
                                            style={{ width: 200 }}
                                            placeholder="请选择企业性质"
                                            optionFilterProp="children"
                                            notFoundContent="无法找到">
                                        <Option value="1">外资 （欧美）</Option>
                                        <Option value="2">外资 （非欧美）</Option>
                                        <Option value="3">合资</Option>
                                        <Option value="4">国企</Option>
                                        <Option value="5">民营企业</Option>
                                        <Option value="6">外企代表处</Option>
                                        <Option value="7">政府机构</Option>
                                        <Option value="8">事业单位</Option>
                                        <Option value="9">非盈利机构</Option>
                                        <Option value="10">上市公司</Option>
                                        <Option value="11">创业公司</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="红色预警指标："
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}>
                                    <div>
                                        <InputNumber style={{ width: 70 }}
                                                     defaultValue=""
                                                     min={0}
                                                     max={999}
                                                     onChange={this.handlerOnChange.bind(this,'inputNumberR')}/>
                                        至
                                        <InputNumber
                                            ref='inputNumberR'
                                            style={{ width: 70,marginLeft:10  }}
                                            min={this.state.rMin}
                                            max={999}
                                            value={this.state.rMinValue}
                                            onChange={this.handlerOnChange.bind(this,'inputNumberRV')}/>
                                    </div>
                                </FormItem>
                            </Col>
                            <Col sm={8}>
                                <FormItem
                                    label="企业规模："
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}>
                                    <Select showSearch
                                        {...getFieldProps('companyScale')}
                                            size="default"
                                            style={{ width: 140 }}
                                            placeholder="请选择企业规模"
                                            optionFilterProp="children"
                                            notFoundContent="无法找到"
                                    >
                                        <Option value="1">少于50人</Option>
                                        <Option value="2">50-150人</Option>
                                        <Option value="3">150-500人</Option>
                                        <Option value="4">500-1000人</Option>
                                        <Option value="5">1000-5000人</Option>
                                        <Option value="6">5000-10000人</Option>
                                        <Option value="7">10000人以上</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}>
                                    <div style={{  textAlign:'right' }}>
                                        <Button type="primary" size="default"
                                                onClick={this.handleSearch.bind(this)}>
                                            查询
                                        </Button>
                                        <Button style={{  margin:'0 0 0 10px' }}
                                                type="primary"
                                                onClick={this.handleAddBusiness.bind(this)}
                                                size="default">
                                            新增企业
                                        </Button>
                                    </div>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>

                    {/*搜索结果*/}
                    <div className="fn-mt-20">
                        <Table ref="table"
                               columns={this.columns}
                               dataSource={this.props.businessInfoData}
                               pagination={pagination}/>
                    </div>
                </TabPane>
            </Tabs>
        )
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
                               onClick={self.handleIndicatorItem.bind(self,record)}>预警</a>
                            &nbsp;
                            <a href="javascript:void(0)"
                               onClick={self.handleEditItem.bind(self,record)}>修改</a>
                            &nbsp;
                            <Popconfirm title="确定删除?" onConfirm={self.handleDeleteItem.bind(self,record)}>
                                <a>删除</a>
                            </Popconfirm>
                            &nbsp;
                            <a href="javascript:void(0)"
                               onClick={self.handleSetQuotaItem.bind(self,record)}>录入数据</a>
                        </div>
                    )
                }
            }
        ];
        return columns;
    }

    getBusinessInfo(pageNum = 1, pageSize = 10, obj) {
        let businessName = this.state;
        this.props.action.fetchGetBusinessInfo(
            Object.assign({
                    "redIndicatorMax": null,
                    "redIndicatorMin": null,
                    "yellowIndicatorMax": null,
                    "yellowIndicatorMin": null,
                    "companyName": '',
                    "companyNature": null,
                    "companyScale": null,
                    "pageNum": pageNum,
                    "pageSize": pageSize
                }, obj
            ));
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    return {
        businessInfoData: state.businessInfoManageReducer.businessInfoData,
        total: state.businessInfoManageReducer.total
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionBusinessInfoManage, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(BusinessInfoManage));
