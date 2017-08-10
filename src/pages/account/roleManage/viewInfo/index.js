/**
 * Created by wuyq on 2016/11/2.
 */

import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs,Form,Input,Button,Select,Tree} from 'antd';
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import ruleType from 'UTILS/ruleType';
import {actionRole} from 'ACTION';
import {helper} from 'UTILS';
const _ = require('lodash');

// 表单布局
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

class ViewRoleInfo extends Component {
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
            this.props.action.fetchRoleInfoById(id,'viewInfo');
        }
    }

    //离开的时候清空state
    componentWillUnmount(){
        this.props.action.removeRoleInfo();
    }

    handleClickCancel(e) {
        this.context.router.push("/account/roleManage/home");
    }

    render() {
        const {getFieldProps } = this.props.form; //用于和表单进行双向绑定

        var {roleInfo,permissionsObj} = this.props;
        const loop = data => data.map((item) => {
            if (item.children && item.children.length>0) {
                return (
                    <TreeNode key={item.id} title={item.name}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={item.name} />;
        });

        var treeHtml =null;
        if(permissionsObj.data && permissionsObj.data.length > 0){
            treeHtml=(
                <div className='fn-pa-20' style={{marginLeft:'31%'}}>
                    <h3>角色权限</h3>
                    <Tree
                        defaultExpandedKeys={permissionsObj.expandedKeys}
                    >
                        {permissionsObj.data && loop(permissionsObj.data)}
                    </Tree>
                </div>
            )
        }

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="角色查看" key="1">
                    <div className="fn-mt-40">
                        <Form horizontal>
                            <Form.Item {...formItemLayout} label="角色名称" required>
                                <Input autoComplete="off"
                                       disabled
                                       placeholder="角色名称.."
                                    {...getFieldProps('name')}/>
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="角色描述">
                                <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} autoComplete="off"
                                       placeholder="角色描述.."
                                       disabled
                                    {...getFieldProps('description')}  />
                            </Form.Item>
                            {treeHtml}
                            <Form.Item wrapperCol={{span: 12, offset: 10}}>
                                <Button className="fn-ml-20" onClick={this.handleClickCancel.bind(this)}>返回</Button>
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
        roleInfo:state.roleReducer.roleInfo,
        permissionsObj:state.roleReducer.permissionsObj
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionRole, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create(
    {
        mapPropsToFields(props) {
            return {
                name: {value:props.roleInfo.name},
                description:{value:props.roleInfo.description}
            }
        }
    }
)(ViewRoleInfo));
