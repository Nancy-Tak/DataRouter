/**
 * Created by wuyq on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History, Link} from 'react-router';
import {Row, Col, Menu, Icon, Breadcrumb} from 'antd';
import AUTH from 'COM/authorization';
import MAP from 'STATIC';
const SubMenu = Menu.SubMenu;
export default class Source extends Component {
    static defaultProps = {
        itemRender: (route, params, routes, paths) => {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? <span>{route.breadcrumbName}</span> :
                <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
        }
    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        //跳转
        let url = `/product/${e.key}`;
        this.context.router.push(url);
    }

    render() {
        var currentKey = this.props.location.pathname.indexOf('productType') >= 0 ? 'productType' : 'productTemplate';
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
                                {AUTH.js(MAP.AUTH_MAP['内部产品类型管理']) ?
                                    <Menu.Item key="productType">内部产品类型管理</Menu.Item> : null}
                                {AUTH.js(MAP.AUTH_MAP['内部产品模板管理']) ?
                                    <Menu.Item key="productTemplate">内部产品模板管理</Menu.Item> : null}
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
