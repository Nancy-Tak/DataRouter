/**
 *左边栏菜单
 */
import React from 'react';
import {Menu, Icon, Button, Tooltip} from 'antd';
import {Link} from 'react-router';
import AUTH from 'COM/authorization';
import MAP from 'STATIC';
const SubMenu = Menu.SubMenu;
export default class Leftbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systemAsideState: true
        }
    }

    systemAside() {
        this.props.callback && this.props.callback();
        this.setState({
            systemAsideState: !this.state.systemAsideState
        })
    }

    onClickHandler(e) {
    }

    render() {
        let style = this.state.systemAsideState ? "system-aside fold" : "system-aside";
        return (
            <aside className={style} id="systemAside">
                <div className="system-aside-container">
                    <a onClick={this.systemAside.bind(this)}
                       className="system-aside-switch"
                       href="javascript:void(0);">
                        <span></span>
                    </a>
                    <ul className="aside-list-1" data-toggle="navigator" onClick={this.onClickHandler}>
                        <AUTH.react id={MAP.AUTH_MAP['数据查询']}>
                            <Tooltip placement="right" title="数据查询">
                                <li>
                                    <Link to="/search" ref="search" className="system-home" activeClassName="current">
                                        <span className="sa">数据查询</span>
                                    </Link>
                                </li>
                            </Tooltip>
                        </AUTH.react>
                        <AUTH.react id={MAP.AUTH_MAP['数据源管理']}>
                            <Tooltip placement="right" title="数据源管理">
                                <li>
                                    <Link to="/source" ref="source" className="channel-manage"
                                          activeClassName="current">
                                        <span className="sa">数据源管理</span>
                                    </Link>
                                </li>
                            </Tooltip>
                        </AUTH.react>
                        <AUTH.react id={MAP.AUTH_MAP['内部产品管理']}>
                            <Tooltip placement="right" title="内部产品管理">
                                <li>
                                    <Link to="/product" ref="product" className="operative-manage"
                                          activeClassName="current">
                                        <span className="sa">内部产品管理</span>
                                    </Link>
                                </li>
                            </Tooltip>
                        </AUTH.react>
                        <AUTH.react id={MAP.AUTH_MAP['查询记录']}>
                            <Tooltip placement="right" title="查询记录">
                                <li>
                                    <Link to="/history" ref="history" className="service-manage"
                                          activeClassName="current">
                                        <span className="sa">查询记录</span>
                                    </Link>
                                </li>
                            </Tooltip>
                        </AUTH.react>
                        <AUTH.react id={MAP.AUTH_MAP['子账号管理']}>
                            <Tooltip placement="right" title="子账号管理">
                                <li>
                                    <Link to="/account" ref="account" className="account-query"
                                          activeClassName="current">
                                        <span className="sa">子账号管理</span>
                                    </Link>
                                </li>
                            </Tooltip>
                        </AUTH.react>
                        <AUTH.react id={MAP.AUTH_MAP['系统管理']}>
                            <Tooltip placement="right" title="系统管理">
                                <li >
                                    <Link to="/system" ref="system" className="system-manage" activeClassName="current">
                                        <span className="sa">系统管理</span>
                                    </Link>
                                </li>
                            </Tooltip>
                        </AUTH.react>
                    </ul>
                </div>
            </aside>
        );
    }
}
