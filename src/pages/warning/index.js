/**
 * Created by Ethan on 2016/11/2.
 */
import React,{Component} from 'react';
import { Router,History } from 'react-router';
import { Row,Col,Menu,Icon,Breadcrumb } from 'antd';
import  {RouterContext}  from 'react-router'
const SubMenu = Menu.SubMenu;
export default class Warning extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {current: 'search'};
        console.log(this.props)
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
        //跳转
        let url = e.keyPath[1] ? "/warning/" + e.keyPath[1] + "/" + e.key : "/warning/" + e.key;
        this.context.router.push(url);
    }

    render() {
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <Row>
                        <Col style={{width:180,float:'left',margin:'0 10px 0 0'}}>
                            <Menu
                                onClick={this.handleClick.bind(this)}
                                selectedKeys={[this.state.current]}
                                mode="inline">
                                <Menu.Item key="search">风险预警查询</Menu.Item>
                                <Menu.Item key="rule">预警规则设置</Menu.Item>
                                <SubMenu key="source" title={<span>数据源管理</span>}>
                                    <Menu.Item key="businessInfoManage">企业信息管理</Menu.Item>
                                    <Menu.Item key="setQuota">指标数据录入</Menu.Item>
                                    <Menu.Item key="importQuota">指标数据导入</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Col>
                        <Col>
                            <div style={{padding:"0 0 0 20px"}}>
                                <div style={{margin:"0 0 20px 0"}}>
                                    {/*Breadcrumb*/}
                                    <Breadcrumb {...this.props} />
                                </div>
                                {/* 主内容区 */}
                                {this.props.children}
                            </div>
                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}
