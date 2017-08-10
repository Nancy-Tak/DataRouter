/**
 * Created by wuyq on 2016/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tabs, Form, Input, Button, Select, Row, Col} from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
import {actionSystem} from 'ACTION';
// 表单布局
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8},
};
class SystemAccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {}

    componentWillMount() {
        this.props.action.fetchSystemAccountInfo();
    }

    render() {
        const {getFieldProps} = this.props.form; //用于和表单进行双向绑定
        const {systemAccountInfo} = this.props;
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="账号信息" key="1">
                    {/* <div className="fn-mt-40">
                     <Form horizontal>
                     <Form.Item {...formItemLayout} label="账号">
                     <p>{systemAccountInfo.accountName}</p>
                     </Form.Item>
                     <Form.Item {...formItemLayout} label="姓名">
                     <p>{systemAccountInfo.userName}</p>
                     </Form.Item>
                     <Form.Item {...formItemLayout} label="手机号码">
                     <p>{systemAccountInfo.phone}</p>
                     </Form.Item>
                     <Form.Item {...formItemLayout} label="邮箱">
                     <p>{systemAccountInfo.email}</p>
                     </Form.Item>
                     <Form.Item {...formItemLayout} label="角色">
                     <p>{systemAccountInfo.roleName}</p>
                     </Form.Item>
                     </Form>
                     </div>*/}
                    <div className="report-table">
                        <Row>
                            <Col span={4}>账号</Col>
                            <Col span={20}>{systemAccountInfo.userName}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>姓名</Col>
                            <Col span={20}>{systemAccountInfo.accountName}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>手机号码</Col>
                            <Col span={20}>{systemAccountInfo.phone}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>邮箱</Col>
                            <Col span={20}>{systemAccountInfo.email}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>角色</Col>
                            <Col span={20}>{systemAccountInfo.roleName}</Col>
                        </Row>
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}
function mapStateToProps(state, props) {
    return {
        systemAccountInfo: state.systemReducer.systemAccountInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionSystem, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SystemAccountInfo));
