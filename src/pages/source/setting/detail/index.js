/**
 * Created by Ethan on 2016/11/2.
 */
import React,{Component} from 'react';
import { Router,History } from 'react-router';
import { Row,Col,Menu,Icon,Breadcrumb,Button } from 'antd';
const SubMenu = Menu.SubMenu;
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {current: 'search'};
    }

    render() {
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    {/*数据机构详情*/}
                    <div className="fn-pa-20">

                        <div className="ant-spin-container" style={{"width":"1200px","margin":"0 auto","background":"#fff"}}>
                            <div className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">

                                <div className="ant-table-content">
                                    <div className="ant-table-body">
                                        <table>
                                            <thead className="ant-table-thead">
                                                <tr>
                                                    <th colSpan={2}>
                                                        通用规则
                                                        <span style={{"float":"right"}}>
                                                            <Button type="primary">修改</Button>
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="ant-table-tbody">
                                                <tr>
                                                    <td>数据更新周期</td>
                                                    <td>T + 3 自然日</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
