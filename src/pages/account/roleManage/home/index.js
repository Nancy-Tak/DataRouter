/**
 * Created by wuyq on 2016/11/1.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';
import moment from 'moment';

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
const FormItem=Form.Item;
const Option = Select.Option;

import {actionRole,actionAccouont} from 'ACTION';
class RoleManage extends Component {
    static defaultProps = {
        roleManage:{},
    }
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let data={
            pageNum:1,
            pageSize:10
        }
        this.props.action.fetchRoleList(data);
    }


    //添加账号
    handleAddRole(){
       // console.log('添加角色..');
        this.props.history.push(`/account/roleManage/add`);
    }

    //编辑
    handleEdit(id){
       // console.log('编辑..');
        this.props.history.push(`/account/roleManage/edit/${id}`);
    }
    // 删除
    handleDelete(id){
       // console.log('删除..');
        this.props.action.deleteRole(id);
    }
    //查看
    handleViewInfo(id){
       // console.log('查看..');
        this.props.history.push(`/account/roleManage/viewInfo/${id}`);
    }

    handleShowSizeChange(current, pageSize) {
        let data={
            pageNum:current,
            pageSize:pageSize
        }
        this.props.action.fetchRoleList(data);
    }

    handleChange(current) {
        // console.log(this.refs.table);
        var pageSize = this.refs.table.state.pagination.pageSize;
        let data={
            pageNum:current,
            pageSize:pageSize
        }
        this.props.action.fetchRoleList(data);
    }

    render() {
        const {roleManage} = this.props;
        const { getFieldProps } = this.props.form;

        //console.log('routing~~~~',this.props.routing);

        const columns = [
            {
                title: '序号',
                className: 'text-align-center',
                dataIndex: 'displayId',
            },
            {
                title: '角色名称',
                className: 'text-align-center',
                dataIndex: 'name',
            },
            {
                title:'角色描述',
                className: 'text-align-center',
                dataIndex:'description'
            },
            {
                title:'创建时间',
                className: 'text-align-center',
                dataIndex:'createTime',
                render:(createTime)=>{
                    if(createTime){
                        return <div>{moment(createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                    }else{
                        return null;
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'name1',
                className: 'text-align-center',
                width:'150px',
                render: (text,record) => {
                    return (
                        <span>
                            <a onClick={this.handleEdit.bind(this,record.id)} href="javascript:void(0)">编辑</a>
                            <span className="ant-divider"></span>
                            <a onClick={this.handleViewInfo.bind(this,record.id)} href="javascript:void(0)">查看</a>
                            <span className="ant-divider"></span>
                            <Popconfirm title="确定删除？" onConfirm={this.handleDelete.bind(this,record.id)}><a href="javascript:void(0)">删除</a></Popconfirm>
                        </span>
                    )
                }
            }
        ];
        var pagination = {
            total: roleManage.total || 0,
            showSizeChanger: true,
            onShowSizeChange: this.handleShowSizeChange.bind(this),
            onChange: this.handleChange.bind(this),
            pageSizeOptions:['10','20','50','100']
        };

        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <div className="fn-mb-15">
                       <Button type="primary" className='fn-ml-20' onClick={this.handleAddRole.bind(this)}><Icon type="plus" />添加角色</Button>
                    </div>
                    <div>
                        <Table
                            ref="table"
                            columns={columns}
                            dataSource={roleManage.list}
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
    return {
        roleManage:state.roleReducer.roleManage,
        routing:state.routing
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionRole, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RoleManage));
