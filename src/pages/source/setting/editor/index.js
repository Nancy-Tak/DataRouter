/**
 * Created by Ethan on 2016/11/2.
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
const SubMenu = Menu.SubMenu;
const createForm = Form.create;
const FormItem = Form.Item;
const Panel = Collapse.Panel;

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
import ruleType from 'UTILS/ruleType';



class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'search'
        };
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        let params = this.props.params.id;
        this.props.action.fetchUpdateCyclesCommonRule(params)
    }
    handleSave(e) {
        const {updateCyclesCommonRule} = this.props;
        let _this = this;
        let params = _this.props.params.id;

        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                //console.log('Errors in form!!!');
                return;
            }
            //console.log('Submit!!!');
            //console.log(values);
            let params = this.props.params.id;
            let postData = {
                "id": updateCyclesCommonRule && updateCyclesCommonRule.id || null,
                "updateCycle": values.updateCycle || null,
                "infraId": params || null,
            }
            this.props.action.fetchUpdateCyclesCommonRuleUpdate(postData,params);
        });

    }
    callback(key) {
        console.log(key);
    }

    render() {
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const {updateCyclesCommonRule} = this.props;

        const updateCycleProps = getFieldProps('updateCycle', {
            rules: [
                {
                    required: true,
                    message: '天数不能为空'
                },
                ruleType('number')
            ],
            initialValue: updateCyclesCommonRule && updateCyclesCommonRule.updateCycle
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
                    <Collapse defaultActiveKey={['1']} onChange={this.callback.bind(this)}>
                        <Panel header="通用规则修改" key="1">
                            <div>
                                <div className="clearfix source-table">
                                    <FormItem {...formItemLayout} label="数据更新周期" hasFeedback>
                                        T +
                                        <Input style={{
                                            width: 100
                                        }} {...updateCycleProps} placeholder="数据更新周期"/>
                                        自然日
                                    </FormItem>
                                </div>

                            </div>
                            <div style={{
                                "width": "1200px",
                                "margin": "10px auto"
                            }}>
                                说明：T指上一次从数据源中获取数据后保存在本地数据库中的时间。
                            </div>
                            <div className="clearfix source-table">
                                <div style={{
                                    "text-align": "center"
                                }}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={this.handleSave.bind(this)}>
                                        保存
                                    </Button>
                                    <Link
                                        className="ant-btn ant-btn-lg fn-ml-20"
                                        to="/source/setting"
                                        >
                                        返回
                                    </Link>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>

                </div>
            </div>
        );
    }
}

//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {updateCyclesCommonRule: state.sourceReducer.updateCyclesCommonRule}
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
