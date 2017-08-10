/**
 * Created by wuyq on 2016/11/2.
 */

import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs,Form,Input,Button,Select,Tree,Modal} from 'antd';
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import ruleType from 'UTILS/ruleType';
import {actionRole} from 'ACTION';


// 表单布局
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};


var selectedKeys =['24','25'];

class AddRoleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // this.checkedKeys=[];
    }

    static defaultProps = {}

    static contextTypes = {
        router:React.PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.action.getPermissionsAll();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                if(selectedKeys.length <= 0){
                    Modal.warning({
                        title: '提示',
                        content: '请为此角色分配权限！',
                    });
                    return;
                }
                values.permissionIds=selectedKeys;
                this.props.action.addRole(values);
            };
        });
    }

    handleClickCancel(e) {
        this.context.router.push("/account/roleManage/home");
    }

    onCheck(checkedKeys) {
        //console.log('onCheck',checkedKeys);
        selectedKeys=checkedKeys;
    }
    onSelect(selectedKeys, info) {
        //console.log('onSelect', info);
    }

    render() {
        const {getFieldProps } = this.props.form; //用于和表单进行双向绑定
        var {permissionsArr}  =this.props;

        //console.log('pppppppp~~~~~~',permissionsArr);
        const rules={
            name:{
                rules:[
                    {required: true, message: '角色名称不能为空'},
                    {min:2,max:10,message:'仅支持输入2-10位'},
                    ruleType('cn+en+str')
                ]
            },
            description:{
                rules:[
                    {min:1,max:30,message:'最多只能输入30位的字符'}
                ]
            }
        }

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
        if(permissionsArr.data && permissionsArr.data.length > 0){
            treeHtml=(
                <div className='fn-pa-20' style={{marginLeft:'31%'}} >
                    <h3>角色权限</h3>
                    <Tree
                        checkable
                        checkStrictly={false}
                        defaultExpandAll={true}
                        onCheck={this.onCheck.bind(this)}
                        defaultCheckedKeys={['21']}
                    >
                        {loop(permissionsArr.data)}
                    </Tree>
                </div>
            )
        }

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="角色新增" key="1">
                    <div className="fn-mt-40">
                        <Form horizontal  onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Item {...formItemLayout} label="角色名称" required>
                                <Input autoComplete="off"
                                    {...getFieldProps('name',rules.name)}/>
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="角色描述">
                                <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} autoComplete="off"
                                       placeholder="备注.."
                                    {...getFieldProps('description',rules.description)} />
                            </Form.Item>
                            {treeHtml}
                            <Form.Item wrapperCol={{span: 12, offset: 10}}>
                                <Button type="primary" htmlType="submit">保存</Button>
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
        permissionsArr:state.roleReducer.permissionsArr,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionRole, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddRoleInfo));
