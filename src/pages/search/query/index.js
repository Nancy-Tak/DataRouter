/**
 * Created by Ethan on 2016/11/2.
 */
import React,{Component} from 'react';
import { Router,History } from 'react-router';
import { Row,Col,Menu,Icon,Breadcrumb,Form,Input,Button,Alert } from 'antd';
import {Report} from 'COM/template';
import {helper} from 'UTILS' ;
import ruleType from 'UTILS/ruleType';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSearch} from 'ACTION';
import MAP from 'STATIC';
const createForm = Form.create;
const FormItem = Form.Item;
class Query extends Component {
    static defaultProps = {
        templateData: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick(e) {
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            /* if(!!errors) {
             console.log('Errors in form!!!');
             return;
             }*/
            //   console.log('Submit!!!');
            //   console.log(values)
            //测试
            values = {
                cell: "13570958632",
                id: "440104198205160011",
                name: "审核报表"
            }
            this.props.action.fetchTemplateDataSearch(MAP.SEARCHSELECT_ID_MAP.PERSONAL['消费及月度收支等级评估'], values);
        });
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                {required: true, message: '用户名不能为空'},
            ],
        });
        const idCardProps = getFieldProps('id', {
            rules: [
                {required: true, min: 18, max: 18, message: '身份证必须18位'},
                ruleType("id-card")
            ],
        });
        const phoneProps = getFieldProps('cell', {
            rules: [
                {required: true, min: 11, max: 11, message: '手机号码格式不正确'},
                ruleType("mobile")
            ],
        });
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };
        let { templateData } = this.props;
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    {/*Frame*/}

                    <h3>个人风险信息查询</h3>
                    <div style={{padding:"20px"}}>
                        {/*Form*/}
                        <Form inline>
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    label="用户名"
                                    hasFeedback
                                >
                                    <Input {...nameProps} placeholder="用户名"/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                    hasFeedback
                                >
                                    <Input {...idCardProps} placeholder="身份证号"/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="手机号"
                                    hasFeedback
                                >
                                    <Input {...phoneProps} placeholder="手机号"/>
                                </FormItem>
                                {/*查询*/}
                                <div className="ant-row ant-form-item" style={{"float":"right","lineHeight":"32px"}}>
                                    <div>
                                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                                            <Icon type="search"/>
                                            查询
                                        </Button>
                                    </div>
                                    <div>
                                        <a href="javascript:;" style={{"marginLeft":10,"padding":"10px"}}>
                                            重置
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </Form>
                    </div>

                    <div style={{padding:"20px"}}>
                        <Alert message="提示"
                               description="数据查询中，请稍后..."
                               type="info"
                               showIcon
                        />
                        <Alert message="提示"
                               description="查询失败,原因：账户余额不足！"
                               type="error"
                               showIcon
                        />
                        <div>
                            {this.report}
                        </div>
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
        if(!templateData)return;
        return (
           /* <Report.personalCredit dataSource={{...templateData,...{base:{
                    cell: "13570958632",
                    id: "440104198205160011",
                    name: "无敌超"
                 }}}}/>*/
           /* <Report.personalStability dataSource={{...templateData.data,...{base:{
                    cell: "13570958632",
                    id: "440104198205160011",
                    name: "无敌超",
                    email:"xxxx@164.com",
                    homeCell:'817777520',
                    companyCell:'817777520'
                 }}}}/>*/
            <Report.consumerBehaviors dataSource={{...templateData.data,...{base:{
                    cell: "13570958632",
                    id: "440104198205160011",
                    name: "无敌超",
                    email:"xxxx@164.com",
                 }}}}/>

        );
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    return {
        templateData: state.searchReducer.templateData,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionSearch, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Query));
