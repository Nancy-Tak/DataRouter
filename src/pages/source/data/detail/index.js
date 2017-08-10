/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History} from 'react-router';
import {Row, Col, Menu, Icon, Breadcrumb, Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
const SubMenu = Menu.SubMenu;
class Detail extends Component {
    static defaultProps = {
        institutionsDetail: {}
    }

    constructor(props) {
        super(props);
        this.state = {current: 'search'};
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {

        //获取URL参数 /source/data/detail/1 => 1
        let paramsObj = this.props.params.obj;
        /**
         * 如果url存在就跳转到详情，否则就跳走了。
         */
        if(paramsObj) {
            this.props.action.fetchInstitutionsDetail(paramsObj);
        } else {
            this.props.history.push("/source/data")
        }
    }

    render() {
        let {institutionsDetail} = this.props;
        let institutionsDetailServiceMethods = institutionsDetail && institutionsDetail.serviceMethods || []
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    {/*数据机构详情*/}
                    <div className="fn-pa-20">
                        <div className="ant-spin-container"
                             style={{"width": "100%", "margin": "0 auto"}}>
                            <div
                                className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">
                                <div className="ant-table-content">
                                    <div className="ant-table-body">
                                        <table>
                                            <thead className="ant-table-thead">
                                            <tr>
                                                <th colSpan={2}>基础信息</th>
                                            </tr>
                                            </thead>
                                            <tbody className="ant-table-tbody">
                                            <tr>
                                                <td>创建时间</td>
                                                <td>{institutionsDetail && moment(institutionsDetail.createTime).format("YYYY-MM-DD HH:mm:ss")}</td>
                                            </tr>
                                            <tr>
                                                <td>机构编码</td>
                                                <td>{institutionsDetail && institutionsDetail.infraCode}</td>
                                            </tr>
                                            <tr>
                                                <td>机构名称</td>
                                                <td>{institutionsDetail && institutionsDetail.name}</td>
                                            </tr>
                                            <tr>
                                                <td>机构简称</td>
                                                <td>{institutionsDetail && institutionsDetail.shortName}</td>
                                            </tr>
                                            <tr>
                                                <td>服务方式</td>
                                                <td>
                                                    {
                                                        institutionsDetailServiceMethods.map((item, index) => {
                                                            return (
                                                                <span key={index}>{item.serviceName}&nbsp;</span>
                                                            )
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>状态</td>
                                                <td>{institutionsDetail && institutionsDetail.state == 1 ? "开启" : "关闭"}</td>
                                            </tr>
                                            <tr>
                                                <td>联系人</td>
                                                <td>{institutionsDetail && institutionsDetail.contactName}</td>
                                            </tr>
                                            <tr>
                                                <td>手机号码</td>
                                                <td>{institutionsDetail && institutionsDetail.cellPhone}</td>
                                            </tr>
                                            <tr>
                                                <td>座机号码</td>
                                                <td>{institutionsDetail && institutionsDetail.contact}</td>
                                            </tr>
                                            <tr>
                                                <td>邮箱</td>
                                                <td>{institutionsDetail && institutionsDetail.email}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/*
                                     <div className="ant-table-footer">
                                     <div style={{"text-align":"center"}}>
                                     <Button type="primary">保存</Button>
                                     <a style={{"marginLeft":"10px"}} href="javascript:;">返回</a>
                                     </div>
                                     </div>
                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
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
        institutionsDetail: state.sourceReducer.institutionsDetail
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionSource, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
