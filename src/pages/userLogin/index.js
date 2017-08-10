/*
 用户登录
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Form, Input, Checkbox, Alert} from 'antd';
import {actionLogin} from 'ACTION';
import AUTH from 'COM/authorization';
import MAP from 'STATIC';
import cookie from 'react-cookie';
const createForm = Form.create;
const FormItem = Form.Item;
// 自定义验证
import {ruleType} from 'UTILS';

class UserLogin extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    static defaultProps = {}
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            username: cookie.load('DRM_REMEMBER'),
        }
    }

    componentDidUpdate() {
        let {isLogined, auth, username} = this.props;
        let {status} = this.props.routeParams;
        if(this.props.routeParams && status) {
            if(status == 'noLogin') {
                this.props.noLogin();
                this.context.router.push("/userLogin");
                return;
            }
        }
        if(isLogined) {
            //保存权限到COOKIS
            let auths = [];
            for(var i = 0; i < auth.length; i++) {
                var obj = auth[i];
                auths.push(obj.key);
            }
            cookie.save('DRM_AUTH', auths.join("-"), {path: '/', maxAge: .25 * 24 * 3600});
            cookie.save('DRM_USERNAME', username, {path: '/', maxAge: .25 * 24 * 3600});
            let url = '/search/select';
            //判断跳转首页
            url = AUTH.js(MAP.AUTH_MAP['系统管理']) ? "/system" : url;
            url = AUTH.js(MAP.AUTH_MAP['子账号管理']) ? "/account" : url;
            url = AUTH.js(MAP.AUTH_MAP['查询记录']) ? "/history" : url;
            url = AUTH.js(MAP.AUTH_MAP['内部产品管理']) ? "/product" : url;
            url = AUTH.js(MAP.AUTH_MAP['数据源管理']) ? "/source" : url;
            url = AUTH.js(MAP.AUTH_MAP['数据查询']) ? "/search" : url;
            this.context.router.push(url);
        } else {
            if(!this.props.location.pathname.includes('userLogin')) {
                this.context.router.push("/userLogin");
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if(!!errors) {
                return;
            }
            if(values) {
                if(values.agreement) {
                    cookie.save('DRM_REMEMBER', values.username, {path: '/', maxAge: 7 * 24 * 3600});
                } else {
                    cookie.remove('DRM_REMEMBER');
                }
                //发送请求
                this.props.fetchLogin(values.username,values.password);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {message, loading} = this.props;
        const usernameProps = getFieldDecorator('username', {
            initialValue: this.state.username,
            rules: [
                {
                    required: true,
                    message: '请输入账户名'
                },
                ruleType('cn+en+num')
            ]
        });
        const passwordProps = getFieldDecorator('password', {
            rules: [
                {
                    required: true,
                    message: '请输入密码'
                },
                ruleType('password')
            ]
        });
        const agreementProps = getFieldDecorator('agreement', {
            valuePropName: 'checked',
            initialValue: this.state.username ? true : false
        });
        return (
            <div style={{overflow: 'hidden'}}>
                <div className="login-main">
                    <div className="login-title">
                        <h3>数由管理后台</h3>
                    </div>
                    <div className="login-cnt">
                        <div>
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                {this.message}
                                <FormItem label="">
                                    {usernameProps(<Input placeholder="请输入账户名"/>)}
                                </FormItem>
                                <FormItem label="">
                                    {passwordProps(<Input type="password" placeholder="请输入密码"/>)}
                                </FormItem>
                                <FormItem>
                                    {agreementProps(<Checkbox >记住账号</Checkbox>)}
                                </FormItem>
                                <FormItem wrapperCol={{span: 17, offset: 7}}>
                                    <Button style={{width: 165}}
                                            loading={loading}
                                            type="primary"
                                            htmlType="submit">
                                        登录
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    get message() {
        let {message, loading} = this.props;
        if(message && message != null && message != '') {
            return (<Alert showIcon message={this.props.message} type="error"/>)
        } else {
            return;
        }
    }
}
export default connect(
    (state, props) => ({ //StateToProps
        username: state.loginReducer.username,
        auth: state.loginReducer.auth,
        message: state.loginReducer.message,
        loading: state.loginReducer.loading,
        isLogined: state.loginReducer.isLogined
    }),
    dispatch => bindActionCreators({//DispatchToProps
            actionLogin: actionLogin,
            fetchLogin: actionLogin.fetchLogin,
            noLogin: actionLogin.noLogin
        },
        dispatch)
)(createForm()(UserLogin))
