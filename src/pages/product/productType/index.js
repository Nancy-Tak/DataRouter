/**
 * Created by wuyq on 2016/11/1.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';
import {Router, History} from 'react-router';
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
    Tooltip
} from 'antd';
import {actionProduct} from 'ACTION';
import moment from 'moment';
import {ruleType} from 'UTILS';

class Product extends Component {
    static defaultProps = {
        productTypes: {}, //内部产品类型列表
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //获取内部资料列表
        this.props.action.fetchProductTypesList();
    }

    //新增
    handleAdd() {
        //console.log('adding..');
        this.props.action.fetchProductTypesAdding();
    }

    //保存- 新增保存|编辑保存
    handleSave() {
        this.props.form.validateFields((errors, values) => {
            if(!errors) {
                const {list} = this.props.productTypes;
                for(let i = 0; i < list.length; i++) {
                    if(list[i].isEditing) {
                        let typeName = this.props.form.getFieldValue(list[i]._operatingId)
                        list[i].typeName = typeName;
                        this.props.action.fetchProductTypesEditSave(list[i]);
                    } else if(list[i].isAdding) {
                        let typeName = this.props.form.getFieldValue(list[i]._operatingId)
                        list[i].typeName = typeName;
                        this.props.action.fetchProductTypesSave(list[i]);
                    }
                }
            }
        });
    }

    //取消
    handleCancel() {
        this.props.action.cancelStatusAddingOrEditing();
    }

    //删除
    handleDelete(id) {
        if(this.props.isOperating){
            this.props.action.cancelStatusAddingOrEditing();
        }
        if(!id) return;
        this.props.action.fetchProductTypesDelete(id);
    }

    //编辑
    handleEdit(id) {
        if(this.props.isOperating){
            this.props.action.cancelStatusAddingOrEditing();
        }
        if(!id) return;
        //console.log('执行了编辑..');
        this.props.action.fetchProductTypesEditing(id);
    }

    // 禁止/启用
    handleDisable(id, state) {
        if(this.props.isOperating){
            this.props.action.cancelStatusAddingOrEditing();
        }
        if(!id) return;
        this.props.action.fetchProductTypesUpdateState(id, state);
    }

    handleKeydowm(e){
        console.log(e.keyCode);
        if(e.keyCode == 9){
            e.preventDefault();
        }

    }

    renderOperations(record){
        const isAddingOrEditing = record.isAdding || record.isEditing;
        var renderHtml=null;
        if(record.state == '1'){
            if(isAddingOrEditing){
               renderHtml = <a disabled={true} href="javascript:void(0)">禁用</a>;
            }else{
                renderHtml=(
                    <Popconfirm placement="topLeft" title="禁用后该类型下的所有产品将从数据查询页中撤下，确定禁用？" onConfirm={this.handleDisable.bind(this, record.id, 0)}>
                        <a href="javascript:void(0)">禁用</a>
                    </Popconfirm>
                )
            }
        }else{
            if(isAddingOrEditing || record.num == 0){
                renderHtml=<a disabled={true} href="javascript:void(0)">开启</a>;
            }else{
                renderHtml=(
                    <Popconfirm placement="topLeft" title="启用后该类型下的所有产品将展示在数据查询页中，确定启用？" onConfirm={this.handleDisable.bind(this, record.id, 1)}>
                        <a href="javascript:void(0)">开启</a>
                    </Popconfirm>
                )
            }
        }
        console.log('renderHtml',renderHtml);
        return renderHtml;
    }

    render() {
        const {productTypes} = this.props;
        const {getFieldProps} = this.props.form;
        const columns = [
            //{
            //    title: '序号',
            //    className: 'text-align-center',
            //    dataIndex: 'id',
            //},
            {
                title: '类型编号',
                className: 'text-align-center',
                dataIndex: 'typeCode',
            },
            {
                title: '类型名称',
                className: 'text-align-center',
                dataIndex: 'typeName',
                width: 230,
                render: (typeName, record) => {
                    if(record.isAdding || record.isEditing) {
                        return (<Form.Item label=""><Input onKeyDown={this.handleKeydowm.bind(this)} {...getFieldProps(`${record._operatingId}`, {
                            initialValue: typeName,
                            rules: [{required: true, message: '类型名称不能为空'}, {
                                min: 1,
                                max: 10,
                                message: '仅支持输入1-10位'
                            }, ruleType('cn+en')]
                        })}  /></Form.Item>)
                    } else {
                        return (<span>{typeName}</span>)
                    }
                }
            },
            {
                title: '创建时间',
                className: 'text-align-center',
                dataIndex: 'createTime',
                render: (createTime) => {
                    if(createTime) {
                        return <div>{moment(createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                    } else {
                        return null;
                    }
                }
            },
            {
                title: '包含产品数量',
                className: 'text-align-center',
                dataIndex: 'num',
            },
            {
                title: '状态',
                dataIndex: 'state',
                className: 'text-align-center',
                width:"150px",
                render: (state, record) => {
                    if(record.isAdding || record.isEditing) {
                        return '';
                    } else {
                        return (<div>{state == "1" ? "开启" : "关闭"}</div>)
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'name',
                className: 'text-align-center',
                width:'150px',
                render: (text, record) => {
                    const isAddingOrEditing = record.isAdding || record.isEditing;
                    return (
                        <span>
                            <a disabled={isAddingOrEditing} onClick={this.handleEdit.bind(this, record.id)}
                               href="javascript:void(0)">编辑</a>

                            <span className="ant-divider"></span>

                            {/*
                                record.state == '1' ?
                                    <Popconfirm placement="topLeft" title="禁用后该类型下的所有产品将从数据查询页中撤下，确定禁用？" onConfirm={this.handleDisable.bind(this, record.id, 0)}>
                                        <a disabled={isAddingOrEditing} href="javascript:void(0)">禁用</a>
                                    </Popconfirm>
                                    :
                                    <Popconfirm placement="topLeft" title="启用后该类型下的所有产品将展示在数据查询页中，确定启用？" onConfirm={this.handleDisable.bind(this, record.id, 1)}>
                                        <a disabled={isAddingOrEditing || record.num == 0}
                                        href="javascript:void(0)">开启</a>
                                    </Popconfirm>

                             */}
                            {this.renderOperations(record)}

                            <span className="ant-divider"></span>

                            {(isAddingOrEditing || record.num > 0) ? <a disabled={true} href="javascript:void(0)">删除</a> : <Popconfirm placement="topLeft" title="确定要删除这个任务吗？" onConfirm={this.handleDelete.bind(this, record.id)}>
                                <a href="javascript:void(0)">删除</a>
                            </Popconfirm>}

                        </span>
                    )
                }
            }
        ];

        var buttonsHtml=null;
        if(this.props.isOperating){
            buttonsHtml=(<span>
                            <Button type="primary" className='fn-mr-10' onClick={this.handleSave.bind(this)}>保存</Button>
                            <Button type="default" className='fn-mr-10' onClick={this.handleCancel.bind(this)}>取消</Button>
                        </span>)
        }else {
            if (productTypes.list && productTypes.list.length >= 10) {
                buttonsHtml = (
                    <Tooltip placement="top" title="产品类型不可超过10个">
                        <Button type="primary" disabled className='fn-mr-10'
                                onClick={this.handleAdd.bind(this)}>新增内部产品类型</Button>
                    </Tooltip>
                );
            } else {
                buttonsHtml = (
                    <Button type="primary" className='fn-mr-10' onClick={this.handleAdd.bind(this)}>新增内部产品类型</Button>
                )
            }
        }
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <div className="fn-pa-10">
                        {buttonsHtml}
                    </div>
                    <div>
                        <Form>
                            <Table
                                columns={columns}
                                dataSource={productTypes.list}
                                pagination={false}
                            />
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    return {
        productTypes: state.productReducer.productTypes,
        isOperating: state.productReducer.isOperating
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionProduct, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Product));
