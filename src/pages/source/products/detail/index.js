/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History} from 'react-router';
import {Row, Col, Menu, Icon, Breadcrumb, Button} from 'antd';
const SubMenu = Menu.SubMenu;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
class Detail extends Component {
    static defaultProps = {
        sourceproductsDetail: {}
    }

    constructor(props) {
        super(props);
        this.state = {current: 'search'};
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {

        //获取URL参数 /source/data/detail/1 => 1
        let paramsObj = this.props.params.obj;
        /**
         * 如果url存在就跳转到详情，否则就跳走了。
         */
        if(paramsObj) {
            //获取数据机构列表
            //console.log("paramsObj",paramsObj)
            this.props.action.fetchSourceproductsDetail(paramsObj);
        } else {
            this.props.history.push("/source/data")
        }
    }

    render() {
        let {sourceproductsDetail} = this.props;
        let sourceproductsDetailInfraProductTypes = sourceproductsDetail && sourceproductsDetail.infraProductTypes || [];
        let sourceproductsDetailInfrafeeTypes = sourceproductsDetail && sourceproductsDetail.productFees || [];
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <div className="fn-pa-20">
                        {/*基本信息*/}
                        <div className="ant-spin-container"
                             style={{"width": "100%", "margin": "0 auto"}}>
                            <div
                                className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">
                                <div className="ant-table-content">
                                    <div className="ant-table-body">
                                        <table>
                                            <thead className="ant-table-thead">
                                            <tr>
                                                    <th colSpan={2} style={{"textAlign":"left"}}>基础信息</th>
                                            </tr>
                                            </thead>
                                            <tbody className="ant-table-tbody">
                                            <tr>
                                                <td>源产品编号</td>
                                                <td>{sourceproductsDetail.productCode}</td>
                                            </tr>
                                            <tr>
                                                <td>源产品名称</td>
                                                <td>{sourceproductsDetail.name}</td>
                                            </tr>
                                            <tr>
                                                <td>源产品类型</td>
                                                <td>
                                                    {
                                                        sourceproductsDetailInfraProductTypes.map((item, index) => {
                                                            if(sourceproductsDetail.productTypeId == item.id) {
                                                                return (
                                                                    <span key={index}>{item.name}&nbsp;</span>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>服务方式</td>
                                                <td>{sourceproductsDetail.serviceName}</td>
                                            </tr>
                                            <tr>
                                                <td>数据属性</td>
                                                <td>{sourceproductsDetail.dataAttr}</td>
                                            </tr>
                                            <tr>
                                                <td>数据覆盖范围</td>
                                                <td>{
                                                    sourceproductsDetail.scope == 1
                                                        ?
                                                        <span>全国</span>
                                                        :
                                                        <span>地区</span>
                                                }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>数据更新周期</td>
                                                <td>
                                                    {
                                                        sourceproductsDetail.updateCycle
                                                        ?
                                                        <span>T + {sourceproductsDetail.updateCycle}自然日</span>
                                                        :
                                                        <span>暂无数据</span>
                                                    }

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>源产品说明</td>
                                                <td>可以查看个人的基本身份信息，包括姓名、证件信息等。</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/*资费说明*/}
                        <div className="ant-spin-container fn-mt-20"
                             style={{"width": "100%", "margin": "0 auto"}}>
                            <div
                                className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">

                                <div className="ant-table-content">
                                    <div className="ant-table-body">
                                        <table>
                                            <thead className="ant-table-thead">
                                            <tr>
                                                    <th colSpan={2}  style={{"textAlign":"left"}}>资费说明</th>
                                            </tr>
                                            </thead>
                                            <tbody className="ant-table-tbody">
                                            <tr>
                                                <td>收费方式</td>
                                                <td>
                                                    {
                                                        sourceproductsDetailInfrafeeTypes.map((item, index) => {
                                                            if(sourceproductsDetail.curFeeId == item.id) {
                                                                return (
                                                                    <span key={index}>{item.feeDesc}</span>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>产品价格</td>
                                                <td>
                                                    {
                                                        sourceproductsDetailInfrafeeTypes.map((item, index) => {
                                                            if(sourceproductsDetail.curFeeId == item.id) {
                                                                return (
                                                                    <span key={index}>{item.fee}</span>
                                                                )
                                                            }
                                                        })
                                                    }
                                                    元/次
                                                </td>
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
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        sourceproductsDetail: state.sourceReducer.sourceproductsDetail
    }
}
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionSource, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
