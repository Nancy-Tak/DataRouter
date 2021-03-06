/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History} from 'react-router';
import {
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Form,
    Input,
    Button,
    Alert
} from 'antd';
import {Report} from 'COM/template';
import {helper} from 'UTILS';
//import { ruleType } from 'COM/UTILS';
import ruleType from 'UTILS/ruleType';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSearch} from 'ACTION';
import MAP from 'STATIC';
const createForm = Form.create;
const FormItem = Form.Item;
class ConsumerBehaviors extends Component {
    static defaultProps = {
        templateData: null,
        templateValus: {
            cell: "",
            id: "",
            name: "",
            mail: "",
            homeCell: "",
            companyCell: ""
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            templateValus: {
                cell: "",
                id: "",
                name: "",
                mail: "",
                homeCell: "",
                companyCell: ""
            }
        };
    }
    componentWillUnmount() {
        this.props.action.clearMessage();
        this.props.action.clearTemplateData();
    }

    handleClick(e) {}

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                //console.log('Errors in form!!!');
                return;
            }
            //   console.log('Submit!!!');
            //   console.log(values)
            //测试
            // values = {
            //     cell: "13570958632",
            //     id: "440104198205160011",
            //     name: "审核报表"
            // }
            this.setState({templateValus: values})
            this.props.action.fetchTemplateDataSearch(MAP.SEARCHSELECT_ID_MAP.PERSONAL['消费及月度收支等级评估'], values);
        });
    }
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    render() {
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                {
                    required: true,
                    message: '姓名不能为空'
                }, {
                    min: 1,
                    max: 30,
                    message: '1-30位中英文字符、半角标点符号•.,-_~ *()'
                },
                ruleType('cn+en+str')
            ]
        });
        const idCardProps = getFieldProps('id', {
            rules: [
                {
                    required: true,
                    message: '身份证号码不能为空'
                },
                ruleType('id-card')
            ]
        });
        const phoneProps = getFieldProps('cell', {
            rules: [
                {
                    required: true,
                    message: '手机号码不能为空'
                },
                ruleType('mobile')
            ]
        });
        const mailProps = getFieldProps('mail', {
            rules: [
                {
                    required: false
                },
                ruleType('email')
            ]
        });
        const homeCellProps = getFieldProps('homeCell', {
            rules: [
                {
                    required: false
                },
                ruleType('telephone')
            ]
        });
        const companyCellProps = getFieldProps('companyCell', {
            rules: [
                {
                    required: false
                },
                ruleType('telephone')
            ]
        });
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        };
        let {templateData, templateDataError} = this.props;
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    {/*Frame*/}

                    <h3>
                        消费及月度收支等级评估
                        <span
                            style={{
                                "color":"#b7b7b7",
                                "font-size":"14px",
                                "font-weight":"normal",
                            }}
                        >
                        （主要查询个人用户商品消费行为统计评估及银行收支等级评估）
                        </span>
                    </h3>
                    <div style={{
                        padding: "20px"
                    }}>
                        {/*Form*/}
                        <Form inline className="ant-advanced-search-form">
                            <div>
                                <FormItem label="姓名" hasFeedback>
                                    <Input style={{
                                        width: 250
                                    }} {...nameProps} placeholder="姓名"/>
                                </FormItem>
                                <FormItem label="身份证号" hasFeedback>
                                    <Input style={{
                                        width: 250
                                    }} {...idCardProps} placeholder="身份证号"/>
                                </FormItem>
                                <FormItem label="手机号" hasFeedback>
                                    <Input style={{
                                        width: 250
                                    }} {...phoneProps} placeholder="手机号"/>
                                </FormItem>

                                <FormItem label="邮箱" hasFeedback>
                                    <Input style={{
                                        width: 250
                                    }} {...mailProps} placeholder="邮箱"/>
                                </FormItem>
                                {/*查询*/}

                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                                    <Icon type="search"/>
                                    查询
                                </Button>

                                <Button type="ghost" onClick={this.handleReset.bind(this)} style={{
                                    "marginLeft": 10
                                }}>
                                    重置
                                </Button>

                            </div>
                        </Form>
                    </div>

                    <div style={{
                        padding: "20px"
                    }}>
                        {
                            templateDataError
                            ? <Alert message="查询失败" description={"错误原因：" + templateDataError.status.message} type="error" showIcon/>
                            : null
                        }
                        {
                            templateData && templateData.data.code != '200'
                            ? <Alert message="提示" description={templateData.data.message} type="error" showIcon/>
                            : <div>
                                {this.report}
                            </div>
                        }
                    </div>

                </div>

                {/*
                 <Report.personalStability dataSource={templateData} />
                 <Report.consumerBehaviors dataSource={templateData} />
                 <Report.personalCredit dataSource={templateData} />
                 <Report.personalRiskInfo dataSource={templateData} />
                 */}
                {/*<Report.personalStability />
                 <Report.consumerBehaviors disabled/>
                 <Report.personalCredit disabled/>
                 <Report.personalRiskInfo/>
                 */}
            </div>
        );
    }

    get report() {
        const {templateData} = this.props;
        //console.log("templateData", templateData)
        if (!templateData)
            return;
        return (<Report.consumerBehaviors dataSource={{
            ...templateData.data,
            ...{
                base: {
                    cell: this.state.templateValus.cell,
                    id: this.state.templateValus.id,
                    name: this.state.templateValus.name,
                    email: this.state.templateValus.mail
                }
            }
        }}/>);
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    return {templateData: state.searchReducer.templateData, templateDataError: state.searchReducer.templateDataError}
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionSearch, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(ConsumerBehaviors));
