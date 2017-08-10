/**
 * Created by Ethan on 2016/11/2.
 */

import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs,Form,Input,Button,Select} from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import {ruleType} from 'UTILS';
import {actionAccount} from 'ACTION';
const _ = require('lodash');

// import '../../style.less';

// 表单布局
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static contextTypes = {
        router:React.PropTypes.object.isRequired
    }

    componentWillMount() {
        this.props.action.fetchAllRoleList();
    }

    handleSubmit(e) {
        //console.log('add...');
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                this.props.action.addAccount(values, this.props.form);
            };
        });
    }

    userExists(rule, value, callback) {
        if(!value){
            callback();
            return;
        };
        if (!/^[\u4e00-\u9fa50-9a-zA-Z]{1,32}$/.test(value)) {
            callback([new Error('仅支持输入1-32位英文字母（区分大小写）、数字、中文字符')]);
        }else{
            this.props.action.userExists({userName:value},callback);
        }
    }

    handleClickCancel(e) {
        this.context.router.push("/account/accountManage/home");
    }

    render() {
        const {getFieldProps } = this.props.form; //用于和表单进行双向绑定
        var {selectRoleItems} = this.props;

        // 表单校验
        const rules = {
            userName: {
                rules: [
                    {required: true, message: '账号不能为空'},
                    //{min:1,max:32,message:'仅支持输入1-32位'},
                    //ruleType('cn+en+num'),
                    { validator: this.userExists.bind(this) }
                ]
            },
            accountName: {
                rules: [
                    {required: true, message: '姓名不能为空'},
                    {min:1,max:30,message:'仅支持输入1-30位'},
                    ruleType('cn+str')
                ]
            },
            phone: {
                rules: [
                    {required: true, message: '联系电话不能为空'},
                    ruleType('mobile')
                ]
            },
            email: {
                rules: [
                    {required: true, message: '邮箱不能为空'},
                    {min:1,max:99,message:'不能超过99位'},
                    ruleType('email')
                ]
            },
            roleId: {
                rules: [
                    {required: true, message: '请选择角色'},
                ]
            },
            description:{
                rules:[
                    {min:0,max:10,message:'最多只能输入10个字符'}
                ]
            }
        }

        if(selectRoleItems){
            selectRoleItems=_.filter(selectRoleItems,(item,index)=>{
                return item.id;
            });
            var selectRoleItemsHtml = selectRoleItems.map((item,index)=>{
                return  <Option key={index} value={item.id.toString()}>{item.name}</Option>
            })
        }
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="添加账号" key="1">
                    <div className="fn-mt-40">
                        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Item {...formItemLayout} label="账号" hasFeedback required>
                                <Input autoComplete="off"
                                    placeholder="账号.."
                                    {...getFieldProps('userName',rules.userName)}/>
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="姓名" hasFeedback required>
                                <Input autoComplete="off"
                                       placeholder="姓名.."
                                    {...getFieldProps('accountName',rules.accountName)}  />
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="联系电话" hasFeedback required>
                                <Input autoComplete="off"
                                       placeholder="联系电话.."
                                    {...getFieldProps('phone',rules.phone)}  />
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="邮箱" hasFeedback required>
                                <Input autoComplete="off"
                                       placeholder="邮箱.."
                                    {...getFieldProps('email',rules.email)}  />
                            </Form.Item>
                            <Form.Item
                            {...formItemLayout}
                            hasFeedback required
                            label="角色"
                            >
                                <Select
                                style={{ width: 150 }}
                                {...getFieldProps('roleId',rules.roleId)}
                                placeholder="请选择.."
                                >
                                    {selectRoleItemsHtml}
                                </Select>
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="备注">
                                <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} autoComplete="off"
                                       placeholder="备注.."
                                    {...getFieldProps('description',rules.description)}  />
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 12, offset: 10}}>
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button className="fn-ml-20" onClick={this.handleClickCancel.bind(this)}>取消</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    return {
        selectRoleItems:state.accountReducer.selectRoleItems,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionAccount, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddAccount));
