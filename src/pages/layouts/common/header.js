/*
 公用头部
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Tooltip} from 'antd';
import systemLogo from 'ASSETS/images/eplus.png';
import userHead from 'ASSETS/images/avatar/userHead.png';
import fetch from 'isomorphic-fetch';
import AUTH from 'COM/authorization';
import MAP from 'STATIC';
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="system-top-nav">
                <div className="system-logo">
                    <img src={systemLogo} alt=""/>
                </div>
                <div className="stn-dropdown-wrap pull-left">
                    <a href="javaScript:void(0);" className="stn-btn">
                        <Tooltip placement="right" title="v1.0.0.4">
                            数由管理后台
                        </Tooltip>
                    </a>
                </div>
                <div className="stn-dropdown-wrap pull-right user">
                    { this.props.username ? <a className="stn-btn">
                            <img src={userHead} alt=""/>
                            {this.props.username}
                        </a> : null
                    }
                    <div className="stn-dropdown-menu">
                        <ul className="stn-user-menu">
                            <AUTH.react id={MAP.AUTH_MAP['账号信息']}>
                                <li>
                                    <Link to="/system/accountInfo">账户信息</Link>
                                </li>
                            </AUTH.react>
                            <AUTH.react id={MAP.AUTH_MAP['修改密码']}>
                                <li>
                                    <Link to="/system/resetPassword">修改密码</Link>
                                </li>
                            </AUTH.react>
                            <li>
                                <a href="javaScript:void(0);" onClick={this.props.exitHandler}>退出</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
