/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History,Link} from 'react-router';
import {Row, Col, Menu, Icon, Breadcrumb} from 'antd';
import  {RouterContext}  from 'react-router'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
import MAP from 'STATIC';
import AUTH from 'COM/authorization';
const SubMenu = Menu.SubMenu;
class Source extends Component {
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
        this.state={};
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        /**
         * 源产品管理 10
         * 源产品更新周期配置 11
         */
        this.props.action.fetchShuyouInstitutionsAll(MAP.INSTITUTIONS_TYPE_MAP["源产品管理"]);
        this.props.action.fetchShuyouInstitutionsAll(MAP.INSTITUTIONS_TYPE_MAP["源产品更新周期配置"]);
    }

    handleClick(e) {
        //跳转
        let url = e.keyPath[1] ? "/source/" + e.keyPath[1] + "/" + e.key : "/source/" + e.key;
        //this.props.history.push(url);
        this.context.router.push(url);
    }

    render() {
        const institutionsSourceProduct = this.props.institutionsSourceProduct || [];
        const institutionsSourceSetting = this.props.institutionsSourceSetting || [];

        var pathnameArr=this.props.location.pathname.split('/');
        var currentKey=`${pathnameArr[pathnameArr.length-2]}/${pathnameArr[pathnameArr.length-1]}`;
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
                                defaultOpenKeys={['products', 'setting']}
                                mode="inline">
                                {AUTH.js(MAP.AUTH_MAP['数据机构管理']) ?
                                    <Menu.Item key="data/home">数据机构管理</Menu.Item> : null}
                                {AUTH.js(MAP.AUTH_MAP['源产品管理']) ?
                                    <SubMenu key="products" title={<span>源产品管理</span>}>
                                        { institutionsSourceProduct.map((item, index) => {
                                            return <Menu.Item key={"home/" + item.id}>{item.proInfraName}</Menu.Item>
                                        })}
                                    </SubMenu> : null}
                                {AUTH.js(MAP.AUTH_MAP['源产品更新周期配置']) ?
                                    <SubMenu key="setting" title={<span>源产品更新周期配置</span>}>
                                        { institutionsSourceSetting.map((item, index) => {
                                            return <Menu.Item
                                                key={"settingHome/" + item.id}>{item.proInfraName}</Menu.Item>
                                        })}
                                    </SubMenu> : null}
                            </Menu>
                        </Col>
                    </Row>
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
        institutionsSourceProduct: state.sourceReducer.institutionsSourceProduct,
        institutionsSourceSetting: state.sourceReducer.institutionsSourceSetting,
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionSource, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Source);
