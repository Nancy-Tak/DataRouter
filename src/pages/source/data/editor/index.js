/**
 * Created by xjc on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History, Link} from 'react-router';
import {
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Form,
    Input,
    Button,
    Collapse
} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
import ruleType from 'UTILS/ruleType';
import {helper} from 'UTILS';
const SubMenu = Menu.SubMenu;
const createForm = Form.create;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
class Editor extends Component {
    static defaultProps = {
        institutionsEditor: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 'search'
        };
    }

    componentDidMount() {
        this.loadData()
    }
    componentDidUpdate() {
        const {getFieldValue,setFields} = this.props.form; //用于和表单进行双向绑定
        const {failMassage}= this.props;
        if(failMassage){
            helper.focusError(this.props.form, failMassage);
            this.props.action.fetchInstitutionsSaveClear();
        }
        // const {failMassage}= this.props;
        // if(failMassage) {
        //     setFields({
        //         shortName: {
        //             value: getFieldValue('shortName'),
        //             errors: [new Error(failMassage)]
        //         },
        //     });
        // }
    }

    loadData() {
        //获取URL参数 /source/data/detail/1 => 1
        let paramsObj = this.props.params.obj;
        /**
         * 如果url存在就跳转到详情，否则就跳走了。
         */
        if(paramsObj) {
            //获取数据机构编辑列表
            console.log("paramsObj", paramsObj)
            this.props.action.fetchInstitutionsEdit(paramsObj);
        } else {
            this.props.history.push("/source/data")
        }
    }

    handleSubmit(e) {
        let paramsObj = this.props.params.obj;
        let paramsId = {
            "id": paramsObj
        }
        let objSave;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if(!!errors) {
                // console.log('Errors in form!!!');
                return;
            }
            // console.log('Submit!!!');
            //console.log("values", values);
            objSave = Object.assign({}, values, paramsId);
            //console.log("objSave", objSave)
            //保存
            this.props.action.fetchInstitutionsSave(objSave)
        });
    }

    callback(key) {
        console.log(key);
    }

    render() {
        let {institutionsEditor} = this.props
        let institutionsEditorServiceMethods = institutionsEditor.serviceMethods || []
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const shortNameProps = getFieldProps('shortName', {
            rules: [
                {required: true, message: '机构简称不能为空'},
                {min: 1, max: 10, message: '仅支持输入1-10位'},
                ruleType('cn+en')
            ],
            initialValue: institutionsEditor.shortName
        });
        const contactNameProps = getFieldProps('contactName', {
            rules: [
                {required: false, message: '联系人不能为空'},
                {min: 1, max: 30, message: '仅支持输入1-30位'},
                ruleType('cn+en+str')
            ],
            initialValue: institutionsEditor.contactName
        });
        const cellPhoneProps = getFieldProps('cellPhone', {
            rules: [
                {
                    required: false,
                    message: '手机号码格式不正确'
                },
                ruleType('mobile')
            ],
            initialValue: institutionsEditor.cellPhone
        });
        const contactProps = getFieldProps('contact', {
            rules: [
                {
                    required: false,
                    message: '座机号码不能为空'
                },
                {min: 1, max: 30, message: '仅支持输入1-30位'},
                ruleType('telephone')
            ],
            initialValue: institutionsEditor.contact
        });
        const emailProps = getFieldProps('email', {
            rules: [
                {
                    required: false,
                    message: '邮箱不能为空'
                },
                {min: 1, max: 99, message: '仅支持输入1-99位'},
                ruleType('email')
            ],
            initialValue: institutionsEditor.email
        });
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 12
            }
        };
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <div className="fn-pa-10">
                        <div className="panel">
                            {/*数据机构编辑*/}
                            <Collapse defaultActiveKey={['1']} onChange={this.callback.bind(this)}>
                                <Panel header="数据机构管理编辑" key="1">

                                    <div className="fn-pa-20">
                                        <div className="ant-spin-container" style={{
                                            "width": "1200px",
                                            "margin": "0 auto",
                                            "background": "#fff"
                                        }}>
                                            <div
                                                className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">
                                                <div>
                                                    <div className="clearfix source-table">
                                                        <div className="source-table-l">
                                                            创建时间：
                                                        </div>
                                                        <div className="source-table-r">
                                                            {moment(institutionsEditor.createTime).format("YYYY-MM-DD HH:mm:ss")}
                                                        </div>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <div className="source-table-l">
                                                            机构编码：
                                                        </div>
                                                        <div className="source-table-r">
                                                            {institutionsEditor.infraCode}
                                                        </div>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <div className="source-table-l">
                                                            机构名称：
                                                        </div>
                                                        <div className="source-table-r">
                                                            {institutionsEditor.name}
                                                        </div>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        {/*
                                                         <div className="source-table-l">
                                                         机构简称
                                                         </div>
                                                         <div className="source-table-r">
                                                         鹏元征信
                                                         </div>
                                                         */}
                                                        <FormItem {...formItemLayout} label="机构简称" hasFeedback>
                                                            <Input {...shortNameProps} placeholder="机构简称"/>
                                                        </FormItem>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <div className="source-table-l">
                                                            服务方式：
                                                        </div>
                                                        <div className="source-table-r">
                                                            {
                                                                institutionsEditorServiceMethods.map((item, index) => {
                                                                    return (
                                                                        <span key={index}>{item.serviceName}</span>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <div className="source-table-l">
                                                            状态：
                                                        </div>
                                                        <div className="source-table-r">
                                                            {institutionsEditor.state == 1
                                                                ? "开启"
                                                                : "关闭"}
                                                        </div>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <FormItem {...formItemLayout} label="联系人" hasFeedback>
                                                            <Input {...contactNameProps} placeholder="联系人"/>
                                                        </FormItem>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <FormItem {...formItemLayout} label="手机号码" hasFeedback>
                                                            <Input {...cellPhoneProps} placeholder="手机号码"/>
                                                        </FormItem>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <FormItem {...formItemLayout} label="座机号码" hasFeedback>
                                                            <Input {...contactProps} placeholder="座机号码"/>
                                                        </FormItem>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                                                            <Input {...emailProps} placeholder="邮箱"/>
                                                        </FormItem>
                                                    </div>
                                                    <div className="clearfix source-table">
                                                        <div style={{
                                                            "text-align": "center"
                                                        }}>
                                                            <Button
                                                                    type="primary"
                                                                    size="large"
                                                                    onClick={this.handleSubmit.bind(this)}
                                                                >
                                                                保存
                                                            </Button>
                                                            <Link to="/source/data" className="ant-btn ant-btn-lg fn-ml-20">
                                                                返回
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        institutionsEditor: state.sourceReducer.institutionsEditor,
        failMassage: state.sourceReducer.failMassage,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionSource, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Editor));
