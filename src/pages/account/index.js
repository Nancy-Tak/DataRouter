/**
 * Created by wuyq on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History,Link} from 'react-router';
import {Row, Col, Menu, Icon, Breadcrumb} from 'antd';
import AUTH from 'COM/authorization';
import MAP from 'STATIC';
const SubMenu = Menu.SubMenu;
export default class Source extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {
        itemRender: (route, params, routes, paths) => {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? <span>{route.breadcrumbName}</span> :
                <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
        }
    };

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
        //跳转
        let url = `/account/${e.key}`;
        this.context.router.push(url);
    }

    render() {
        var currentKey = this.props.location.pathname.indexOf('accountManage') >= 0 ? 'accountManage' : 'roleManage'
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <Row>
                        <Col span={21} push={3}>
                            <div style={{padding: "0 0 0 20px"}}>
                                <div style={{margin: "0 0 20px 0"}}>
                                    {/*Breadcrumb*/}
                                    <Breadcrumb {...this.props} />
                                </div>
                                {/* 主内容区 */}
                                {this.props.children}
                            </div>
                        </Col>
                        <Col span={3} pull={21}>
                            <Menu
                                onClick={this.handleClick.bind(this)}
                                selectedKeys={[currentKey]}
                                mode="inline">
                                {AUTH.js(MAP.AUTH_MAP['员工账号']) ?
                                    <Menu.Item key="accountManage">员工账号</Menu.Item> : null}
                                {AUTH.js(MAP.AUTH_MAP['角色权限']) ?
                                    <Menu.Item key="roleManage">角色权限</Menu.Item> : null}
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
