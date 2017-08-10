/**
 * Created by Ethan on 2016/11/2.
 */

import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs,Form,Input,Button,Select} from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import ruleType from 'UTILS/ruleType';
import {actionAccount} from 'ACTION';

// import '../../style.less';

// 表单布局
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

class ResetAccountPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        // let {id,accountName} = this.props.routeParams;
    }

    static contextTypes = {
        router:React.PropTypes.object.isRequired
    }

    handleSubmit(e) {
        e.preventDefault();
        var that=this;
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                let data={
                    password:values.password,
                    retryPassword:values.rePassword,
                    id:that.props.routeParams.id
                }
                this.props.action.updateAccountPassword(data, this.props.history);
            };
        });
    }

    handleClickCancel(e) {
        this.context.router.push("/account/accountManage/home");
    }

    noop(event) {
        return event.preventDefault();
    }

    checkPassWordAgain(rule, value, callback) {
        const {
            getFieldValue
        } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次所填写的密码不一致，请重新输入');
        } else {
            callback();
        }
    }

    onPassWordBlur(e) {
        const value = e.target.value;
        const {
            validateFields,
            getFieldError
        } = this.props.form;
        //console.log('pwd:', getFieldError('password'));
        if (value && !getFieldError('password')) {
            validateFields(['rePassword'], {
                force: true
            });
        }
    }

    render() {
        const {getFieldProps } = this.props.form; //用于和表单进行双向绑定

        // 表单校验
        const rules = {
            password: {
                rules: [{
                        required: true,
                        message: '密码不能为空'
                    }, {
                        min: 8,
                        max: 16,
                        message: '仅支持输入8-16位字符'
                    },
                    ruleType('password')
                ]
            },
            rePassword: {
                rules: [{
                    required: true,
                    message: '请再次输入密码'
                }, {
                    validator: this.checkPassWordAgain.bind(this)
                }]
            },
        }

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="重置密码" key="1">
                    <div className="fn-mt-40">
                        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Item {...formItemLayout} label="账号">
                                <Input autoComplete="off"
                                    placeholder="账号.."
                                    disabled
                                    {...getFieldProps('accountName',{initialValue:this.props.routeParams.accountName})}/>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="新密码"
                                required
                            >
                                <Input type="password" {...getFieldProps('password', rules.password)} onBlur={this.onPassWordBlur.bind(this)} autoComplete="off"  onPaste={this.noop.bind(this)} onCopy={this.noop.bind(this)} onCut={this.noop.bind(this)} placeholder="仅支持输入8-16个字符，区分大小" />
                            </Form.Item>

                            <Form.Item
                                {...formItemLayout}
                                label="确认新密码"
                                required
                            >
                                <Input {...getFieldProps('rePassword', rules.rePassword)} type="password" autoComplete="off"  onPaste={this.noop.bind(this)} onCopy={this.noop.bind(this)} onCut={this.noop.bind(this)} placeholder="再次确认新密码" />
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
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionAccount, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ResetAccountPassword));
