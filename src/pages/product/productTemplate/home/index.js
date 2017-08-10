/**
 * Created by wuyq on 2016/11/1.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';

import {
    Input,
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Table,
    Button,
    Popconfirm,
    Form,
    Select
} from 'antd';

import ruleType from 'UTILS/ruleType';
const FormItem=Form.Item;
const Option = Select.Option;

import {actionProduct} from 'ACTION';
class ProductTemplate extends Component {
    static defaultProps = {
        productTpls:{}, //内部产品模板列表
    }
    constructor(props) {
        super(props);
        this.innerProductTypeId=null;
        this.stateStatus=null;
        this.keyWord=null;
        this.state={
            isDisabled:true
        }
    }

    componentDidMount(){
        //获取内部资料列表
        let data={
            innerProductTypeId:null,
            keyword:null,
            state:null,
            pageNum:1,
            pageSize:10
        };
        this.props.action.fetchProductTplsList(data);
        this.props.action.fetchInnerProds();
    }

    //保存
    handleSearch(){
        //console.log('searching..');
        var that=this;
        this.props.form.validateFields((errors,values)=>{
            if(!errors){
                console.log('values',values)
                let data={
                    innerProductTypeId:values.innerProductTypeId,
                    state:values.state || null,
                    keyword:values.keyWord || null,
                    pageNum:1,
                    pageSize:10
                };
                that.innerProductTypeId=values.innerProductTypeId;
                that.stateStatus=values.state;
                that.keyWord=values.keyWord;
                this.props.action.fetchProductTplsList(data);
            }
        })
    }

    //预览模板
    handlePrev(id){
        console.log('预览模板..');
        this.props.history.push(`/product/productTemplate/preView/${id}`);
    }
    //编辑
    handleEdit(id){
        console.log('编辑..');
        this.props.history.push(`/product/productTemplate/edit/${id}`);
    }
    // 禁止/启用
    handleDisable(id,state){
        console.log('update..');
        this.props.action.updateProductTplsStatus(id,state);
    }

    handleShowSizeChange(current, pageSize) {
        let data={
            innerProductTypeId:this.innerProductTypeId || null,
            state:this.stateStatus || null,
            keyword:this.keyWord || null,
            pageNum:current,
            pageSize:pageSize
        };
        this.props.action.fetchProductTplsList(data);
    }

    handleChange(current) {
        // console.log(this.refs.table);
        var pageSize = this.refs.table.state.pagination.pageSize;
        let data={
            innerProductTypeId:this.innerProductTypeId || null,
            state:this.stateStatus || null,
            keyword:this.keyWord || null,
            pageNum:current,
            pageSize:pageSize
        };
        this.props.action.fetchProductTplsList(data);
    }

    handleInnerProductTypeChange(value){
        console.log(value);
        setTimeout(()=>{
            this.handleSearch();
        })
    }

    handleStateChange(value){
        console.log(value);
        setTimeout(()=>{
            this.handleSearch();
        })
    }

    handleKeywordChange(e){
        if(!e.target.value){
            setTimeout(()=>{
                this.handleSearch();
            });
        }
        this.setState({
            isDisabled:!!!e.target.value
        })
    }

    render() {
        const {productTpls,innerprods} = this.props;
        const { getFieldProps } = this.props.form;

        const columns = [
            {
                title: '序号',
                className: 'text-align-center',
                dataIndex: 'displayId',
            },
            {
                title: '内部产品编号',
                className: 'text-align-center',
                dataIndex: 'tempCode',
            },
            {
                title:'内部产品名称',
                className: 'text-align-center',
                dataIndex:'tempName'
            },
            {
                title:'内部产品类型',
                className: 'text-align-center',
                dataIndex:'typeName'
            },
            {
                title:'服务方式',
                className: 'text-align-center',
                dataIndex:'serviceType',
                render: (serviceType,record) => {
                    var text = ''
                    if(serviceType == '0'){
                        text='WEB'
                    }else if(serviceType == '1'){
                        text='API'
                    }else{
                        text=serviceType
                    }
                    return <div>{text}</div>
                }
            },
            {
                title: '状态',
                className: 'text-align-center',
                dataIndex: 'state',
                render: (state,record) => {
                    return (<div>{state=="1" ? "开启" : "关闭"}</div>)
                }
            },
            {
                title: '操作',
                dataIndex: 'name',
                className: 'text-align-center',
                width:"150px",
                render: (text,record) => {
                    const isAddingOrEditing = record.isAdding || record.isEditing;
                    return (
                        <span>
                            <a  target="_blank" href={`/templatePreview/${record.tempCode}`}>预览模板</a>
                            <span className="ant-divider"></span>
                            <a onClick={this.handleEdit.bind(this,record.id)} href="javascript:void(0)">编辑</a>
                            <span className="ant-divider"></span>
                            {record.state=='1' ? <Popconfirm title="禁用后该产品将从数据查询页中撤下，确定禁用？" onConfirm={this.handleDisable.bind(this,record.id,0)}><a href="javascript:void(0)">禁用</a></Popconfirm> : <Popconfirm title="启用后该产品将展示在数据查询页中，确定启用？" onConfirm={this.handleDisable.bind(this,record.id,1)}><a href="javascript:void(0)">开启</a></Popconfirm>}
                        </span>
                    )
                }
            }
        ];


        if(innerprods){
            var innerProductTypeHtml = innerprods.map((item,index)=>{
                return  <Option key={index} value={item.id.toString()}>{item.typeName}</Option>
            })
        }

        var pagination = {
            total: productTpls.total || 0,
            showSizeChanger: true,
            onShowSizeChange: this.handleShowSizeChange.bind(this),
            onChange: this.handleChange.bind(this),
            pageSizeOptions:['10','20','50','100']
        };
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <div className="fn-mb-15">
                        <Form inline className="ant-advanced-search-form">
                            <FormItem
                            label="内部产品类型"
                            >
                                <Select
                                style={{ width: 150 }}
                                {...getFieldProps('innerProductTypeId',{initialValue:'',onChange:(value)=>{this.handleInnerProductTypeChange(value)} })}
                                >
                                    {innerProductTypeHtml}
                                </Select>
                            </FormItem>
                            <FormItem
                            label="状态"
                            >
                                <Select
                                style={{ width: 150 }}
                                {...getFieldProps('state',{initialValue:'',onChange:(value)=>{this.handleStateChange(value)}})}
                                >
                                    <Option value="">全部</Option>
                                    <Option value="1">启用</Option>
                                    <Option value="0">禁用</Option>
                                </Select>
                            </FormItem>

                            <FormItem
                            label="关键字"
                            >
                                <Input style={{ width: 250 }} placeholder="内部产品名称/内部产品编号 关键字"
                                    {...getFieldProps('keyWord',{
                                        initialValue:'',
                                        rules: [
                                            {
                                                required: false,
                                            },
                                            ruleType("cn+en+num"),
                                        ],
                                        onChange:this.handleKeywordChange.bind(this)})
                                    }
                                />
                            </FormItem>

                            <Button type="primary" disabled={this.state.isDisabled} onClick={this.handleSearch.bind(this)}><Icon type="search" />查询</Button>
                        </Form>
                    </div>
                    <div>
                        <Table
                            ref='table'
                            columns={columns}
                            dataSource={productTpls.list}
                            pagination={pagination}
                        />
                    </div>
                </div>
            </div>
        );
    }

}




//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("hhh", state)
    return {
        productTpls:state.productReducer.productTpls,
        innerprods:state.productReducer.innerprods
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionProduct, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProductTemplate));
