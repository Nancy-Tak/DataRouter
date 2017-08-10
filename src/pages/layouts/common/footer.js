/*
 公用底部
 */
import React,{Component} from 'react';
import { Icon } from 'antd';
export default class Footer extends Component {
    render() {
        return (
            <div className="main-footer clearfix">
                <div className="main-ft-inner">
                    <div className="main-ft-bank"><span className="bank-bg bank-cmb"></span></div>
                    <div className="main-ft-helper">
                        <ul>
                            <li className="has-r-line">
                                <Icon type="message"/>
                                <a href="##">帮助中心</a>
                            </li>
                            <li className="tel"><Icon type="phone"/>客服热线<b>400-106-6698</b></li>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}
