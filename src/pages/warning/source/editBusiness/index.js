/**
 * Created by Ethan on 2016/11/2.
 */
import '../../style.less';
import React,{Component} from 'react';
import {Tabs,Form,Input,Button,Select,notification} from 'antd';
import ruleType from 'UTILS/ruleType';
import { actionBusinessInfoManage} from 'ACTION';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const props = {
    labelCol: {span: 8},
    wrapperCol: {span: 8},
};
class EditBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPasswdProps: "",
            passwdProps: "",
            confirmPasswordProps: "",
        }
    }

    componentWillMount() {
        const {failMassage}= this.props;
        let {id} = this.props.routeParams;
        if(this.props.routeParams) {
            this.props.action.fetchGetCompanysInfo(id);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if(errors)return;
            let {id} = this.props.routeParams;
            this.props.action.fetchSaveCompanys(values, this.props.history, id);
        });
    }

    handleClickCancel(e) {
        this.props.history.push("warning/source/businessInfoManage");
    }

    render() {
        const {getFieldProps } = this.props.form; //用于和表单进行双向绑定
        const numberProps = getFieldProps('certificateNumber', {
            rules: [
                {required: true, whitespace: true, message: '请输入营业执照号'},
                {min: 15, max: 18, message: '营业执照长度应为15-18位'},
                ruleType('number')
            ],
            onChange: (e) => {
                this.setState({
                    numberProps: e.target.value
                })
            }
        });
        var name = getFieldProps('companyName', {
            rules: [
             {required: true, whitespace: true, message: '企业名称不能为空'},
             {max: 254, message: '请输入正确的企业名称'},
             ],
            onChange: (e) => {
                this.setState({
                    name: e.target.value
                })
            }
        });
        const nature = getFieldProps('companyNature', {
            rules: [
                {required: true, message: '企业性质不能为空'},
            ],
        });
        const scope = getFieldProps('companyScale', {
            rules: [
                {required: true, message: '企业规模不能为空'},
            ],
        });
        const industry = getFieldProps('industry', {
            rules: [
                {required: true, message: '所属行业不能为空'},
            ],
        });
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="企业信息编辑" key="1">
                    <div className="fn-mt-40">
                        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Item {...props} label="营业执照号：" hasFeedback required>
                                <Input autoComplete="off"
                                       placeholder=""
                                    {...numberProps}/>
                            </Form.Item>
                            <Form.Item {...props} label="企业名称：" hasFeedback required>
                                <Input autoComplete="off"
                                       placeholder=""
                                    {...name}  />
                            </Form.Item>
                            <Form.Item {...props} label="企业性质：" hasFeedback required>
                                <Select {...nature} placeholder="请选择企业性质" style={{ width: '100%' }}>
                                    <Option value="1">外资 （欧美）</Option>
                                    <Option value="2">外资 （非欧美）</Option>
                                    <Option value="3">合资</Option>
                                    <Option value="4">国企</Option>
                                    <Option value="5">民营企业</Option>
                                    <Option value="6">外企代表处</Option>
                                    <Option value="7">政府机构</Option>
                                    <Option value="8">事业单位</Option>
                                    <Option value="9">非盈利机构</Option>
                                    <Option value="10">上市公司</Option>
                                    <Option value="11">创业公司</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...props} label="企业规模：" hasFeedback required>
                                <Select {...scope} placeholder="请选择企业规模" style={{ width: '100%' }}>
                                    <Option value="1">少于50人</Option>
                                    <Option value="2">50-150人</Option>
                                    <Option value="3">150-500人</Option>
                                    <Option value="4">500-1000人</Option>
                                    <Option value="5">1000-5000人</Option>
                                    <Option value="6">5000-10000人</Option>
                                    <Option value="7">10000人以上</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...props} label="所属行业：" hasFeedback required>
                                <Select {...industry} placeholder="请选择所属行业" style={{ width: '100%' }}>
                                    <Option value="A">农、林、牧、渔业</Option>
                                    <Option value="B">采矿业</Option>
                                    <Option value="C">制造业</Option>
                                    <Option value="D">电力、热力、燃气及水生产和供应业</Option>
                                    <Option value="E">建筑业</Option>
                                    <Option value="F">批发和零售业</Option>
                                    <Option value="G">交通运输、仓储和邮政业</Option>
                                    <Option value="H">住宿和餐饮业</Option>
                                    <Option value="I">信息传输、软件和信息技术服务业</Option>
                                    <Option value="J">金融业</Option>
                                    <Option value="K">房地产业</Option>
                                    <Option value="L">租赁和商务服务业</Option>
                                    <Option value="M">科学研究和技术服务业</Option>
                                    <Option value="N">水利、环境和公共设施管理业</Option>
                                    <Option value="O">居民服务、修理和其他服务业</Option>
                                    <Option value="P">教育</Option>
                                    <Option value="Q">卫生和社会工作</Option>
                                    <Option value="R">文化、体育和娱乐业</Option>
                                    <Option value="S">公共管理、社会保障和社会组织</Option>
                                    <Option value="T">国际组织</Option>
                                    <Option value="9999">其它</Option>
                                </Select>
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
    return (state) => {
        var {companyName,
            certificateNumber,
            companyNature,
            companyScale,
            industry,failMassage} = state.businessInfoManageReducer;
            var arr=null;
            if(failMassage){
                arr=[new Error(failMassage)]
            }
        return {
            fromValueName: {
                value: companyName,
                errors: arr
            },
            fromValueNumber: {
                value: certificateNumber
            },
            fromValueNature: {
                value: companyNature
            },
            fromValueScale: {
                value: companyScale
            },
            fromValueIndustrye: {
                value: industry
            },
        }
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionBusinessInfoManage, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create(
    {
        mapPropsToFields(props) {
            return {
                companyName: props.fromValueName,
                certificateNumber: props.fromValueNumber,
                companyNature: props.fromValueNature,
                companyScale: props.fromValueScale,
                industry: props.fromValueIndustrye,
            }
        }
    }
)(EditBusiness));
