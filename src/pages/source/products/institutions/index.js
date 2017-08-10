/**
 * Created by Ethan on 2016/11/2.
 */
import React,{Component} from 'react';
import { Router,History } from 'react-router';
import { Row,Col,Menu,Icon,Breadcrumb } from 'antd';
const SubMenu = Menu.SubMenu;
export default class Institutions extends Component {
    constructor(props) {
        super(props);
        this.state = {current: 'search'};
    }

    render() {
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    Institutions
                </div>
            </div>
        );
    }
}
