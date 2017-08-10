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
const _ = require('lodash');
// 表单布局
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

class EditAccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static defaultProps = {}

    static contextTypes = {
        router:React.PropTypes.object.isRequired
    }

    componentWillMount() {
        let {id} = this.props.routeParams;
        if(this.props.routeParams) {
            this.props.action.fetchAccountInfoById(id);
        }
        this.props.action.fetchAllRoleList();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                values.id = this.props.routeParams.id;
                this.props.action.updateAccountInfo(values, this.props.form);
            };
        });
    }

    handleClickCancel(e) {
        this.context.router.push("/account/accountManage/home");
    }

    render() {
        const {getFieldProps } = this.props.form; //用于和表单进行双向绑定
        var {selectRoleItems} = this.props;

        // 表单校验
        const rules = {
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
                <TabPane tab="子账号编辑" key="1">
                    <div className="fn-mt-40">
                        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Item {...formItemLayout} label="账号" required>
                                <Input autoComplete="off"
                                       disabled
                                    {...getFieldProps('userName')}/>
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
                            label="角色"
                            required
                            >
                                <Select
                                style={{ width: 150 }}
                                {...getFieldProps('roleId')}
                                >
                                    {selectRoleItemsHtml}
                                </Select>
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="备注" hasFeedback >
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
        editAccountInfo:state.accountReducer.editAccountInfo,
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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create(
    {
        mapPropsToFields(props) {
            return {
                accountName: {value:props.editAccountInfo.accountName},
                userName: {value:props.editAccountInfo.userName},
                phone: {value:props.editAccountInfo.phone},
                email: {value:props.editAccountInfo.email},
                roleId: {value:`${props.editAccountInfo.roleId}`},
                description:{value:props.editAccountInfo.description}
            }
        }
    }
)(EditAccountInfo));
