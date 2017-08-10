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
const FormItem = Form.Item;
const Option = Select.Option;
import {actionAccount} from 'ACTION';
class AccountManage extends Component {
    static defaultProps = {
        accountManage: {},
        selectRoleItems: [],
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.roleId = null;
        this.keyword = null;
        this.state = {
            isDisabled: true
        }
    }

    componentDidMount() {
        //获取内部资料列表
        let data = {
            roleId: null,
            keyword: null
        };
        this.props.action.fetchAccountList(data);
        this.props.action.fetchAllRoleList();
    }

    //查询
    handleSearch() {
        // console.log('searching..');
        var that = this;
        this.props.form.validateFields((errors, values) => {
            if(!errors) {
                // console.log('values', values)
                let data = {
                    roleId: values.roleId || null,
                    keyword: values.keyword || null,
                    pageNum: 1,
                    pageSize: 10
                };
                that.roleId = values.roleId || null;
                that.keyword = values.keyword || null;
                this.props.action.fetchAccountList(data);
            }
        })
    }

    //keyword onchange
    handleKeywordChange(e) {
        if(!e.target.value){
            setTimeout(()=>{
                this.handleSearch();
            });
        }
        this.setState({
            isDisabled: !!!e.target.value
        })
    }

    //添加账号
    handleAddAccount() {
        // console.log('添加账号..');
        this.context.router.push(`/account/accountManage/add`);
    }

    //重置密码
    handleResetPassword(id, accountName) {
        //console.log('重置密码..');
        this.context.router.push(`/account/accountManage/resetPassword/${id}/${accountName}`);
    }

    //编辑
    handleEdit(id) {
        // console.log('编辑..');
        this.context.router.push(`/account/accountManage/edit/${id}`);
    }

    // 禁止/启用
    handleDisable(id, state) {
        //console.log('update..');
        this.props.action.updateAccountState(id, state);
    }

    handleShowSizeChange(current, pageSize) {
        let data = {
            pageNum: current,
            pageSize: pageSize,
            roleId: this.roleId,
            keyword: this.keyword,
        }
        this.props.action.fetchAccountList(data);
    }

    handleChange(current) {
        // console.log(this.refs.table);
        var pageSize = this.refs.table.state.pagination.pageSize;
        let data = {
            pageNum: current,
            pageSize: pageSize,
            roleId: this.roleId,
            keyword: this.keyword
        }
        this.props.action.fetchAccountList(data);
    }

    render() {
        const {accountManage, selectRoleItems} = this.props;
        const {getFieldProps} = this.props.form;
        const columns = [
            {
                title: '序号',
                className: 'text-align-center',
                dataIndex: 'displayId',
            },
            {
                title: '账号',
                className: 'text-align-center',
                dataIndex: 'userName',
            },
            {
                title: '姓名',
                className: 'text-align-center',
                dataIndex: 'accountName'
            },
            {
                title: '角色',
                className: 'text-align-center',
                dataIndex: 'roleName'
            },
            {
                title: '手机号码',
                className: 'text-align-center',
                dataIndex: 'phone',
                width:'120px'
            },
            {
                title: '邮箱',
                className: 'text-align-center',
                dataIndex: 'email'
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
                title: '备注',
                className: 'text-align-center',
                dataIndex: 'description'
            },
            {
                title: '状态',
                className: 'text-align-center',
                dataIndex: 'state',
                width:'60px',
                render: (state, record) => {
                    return (<div>{state == "1" ? "开启" : "关闭"}</div>)
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

                            <a onClick={this.handleEdit.bind(this, record.id)} href="javascript:void(0)">编辑</a>
                            <span className="ant-divider"></span>
                            {record.state == '1' ? <Popconfirm title="禁用后，该账号将不可登录管理后台。确定禁用？"
                                                               onConfirm={this.handleDisable.bind(this, record.id, 0)}><a
                                    href="javascript:void(0)">禁用</a></Popconfirm>
                                : <Popconfirm title="启用后，该账号可登录管理后台进行操作。确定启用？"
                                              onConfirm={this.handleDisable.bind(this, record.id, 1)}><a
                                    href="javascript:void(0)">开启</a></Popconfirm>}
                            <span className="ant-divider"></span>
                            <a onClick={this.handleResetPassword.bind(this, record.id, record.userName)}
                               href="javascript:void(0)">重置密码</a>
                        </span>
                    )
                }
            }
        ];
        var pagination = {
            total: accountManage.total || 0,
            showSizeChanger: true,
            onShowSizeChange: this.handleShowSizeChange.bind(this),
            onChange: this.handleChange.bind(this),
            pageSizeOptions: ['10', '20', '50', '100']
        };
        if(selectRoleItems.length > 0) {
            var selectRoleItemsHtml = selectRoleItems.map((item, index) => {
                return <Option key={index} value={item.id.toString()}>{item.name}</Option>
            })
        }
        const accountRoleProps = getFieldProps('roleId', {
            initialValue: "",
            onChange: (value) => {
                //console.log('onChange...',value);
                var that = this;
                setTimeout(() => {
                    that.handleSearch();
                })
            }
        });
        // console.log('isDisabled:',this.state.isDisabled);
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <div className="fn-mb-15">
                        <Form inline className="ant-advanced-search-form">
                            <FormItem
                                label="账号角色"
                            >
                                <Select
                                    style={{width: 150}}
                                    {...accountRoleProps}
                                >
                                    {selectRoleItemsHtml}
                                </Select>
                            </FormItem>


                            <FormItem
                                label="关键字"
                            >
                                <Input style={{width: 250}} placeholder="账号/姓名/联系电话/邮箱 关键字"
                                       {...getFieldProps('keyword', {onChange: this.handleKeywordChange.bind(this)})}
                                />
                            </FormItem>

                            <Button type="primary" disabled={this.state.isDisabled}
                                    onClick={this.handleSearch.bind(this)}><Icon
                                type="search"/>查询</Button>
                            <Button type="primary" className='fn-ml-20' onClick={this.handleAddAccount.bind(this)}><Icon
                                type="plus"/>添加账号</Button>
                        </Form>
                    </div>
                    <div>
                        <Table
                            ref='table'
                            columns={columns}
                            dataSource={accountManage.list}
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
        accountManage: state.accountReducer.accountManage,
        selectRoleItems: state.accountReducer.selectRoleItems,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionAccount, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AccountManage));
