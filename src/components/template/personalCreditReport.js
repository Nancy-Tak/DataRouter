/**
 * Created by Ethan on 2016/12/6.
 * 个人信贷多次申请核查报告 模版
 * Personal risk information report
 *
 */
import React, {Component} from 'react';
import {Row, Col, Collapse} from 'antd';
import './style.less';
const Panel = Collapse.Panel;
export class PersonalCredit extends Component {
    static defaultProps = {
        disabled: null,//是否模板
        dataSource: {}
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {disabled,dataSource}=this.props;
        return (
            <div className="fn-pa-10">
                <h2 style={this.css.center}>
                    <span style={this.css.color}>个人信贷多次申请核查报告</span>
                </h2>
                <div className="report-table fn-mb-20">
                    <Row>
                        <Col span={6}>查询主体</Col>
                        <Col span={7} offset={11}>
                            <span>查询编号：</span>
                            {(!disabled && dataSource) && dataSource.queryCode || ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>姓名</Col>
                        <Col span={8}>{this.base.name}</Col>
                        <Col span={4}>身份证号</Col>
                        <Col span={8}>{this.base.id}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>手机号</Col>
                        <Col span={20}>{this.base.phone}</Col>
                    </Row>
                </div>

                {/*模块A*/}
                {this.applyCountAndOrgs}
                {/*模块B 近6个月申请记录汇总*/}
                {this.applyCounts}
                {/*模块C 最近最早申请记录*/}
                {this.firstAndLastApplies}
            </div>
        )
    }

    get css() {
        const {disabled} = this.props;
        return {
            table: {
                width: '100%'
            },
            center: {
                textAlign: 'center',
                margin: '10px 0'
            },
            color: {
                color: disabled ? '#ffffff' : '#999999'
            }
        }
    }

    get base() {  //基础数据
        const {disabled} = this.props;
        if(this.props.dataSource && !disabled) {
            const {base} = this.props.dataSource;
            return {
                name: base.name || '',
                phone: base.cell || '',
                id: base.id || ''
            }
        }
        return {
            name: '',
            phone: '',
            id: ''
        }
    }

    get applyCountAndOrgs() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <table width="100%" className="report-table-sp">
                    <colgroup>
                        <col width="50"/>
                        <col width="15%"/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th rowSpan="2" colSpan="2"></th>
                        <th colSpan="2" className="text-align-center">近7天申请次数和机构数</th>
                        <th colSpan="2" className="text-align-center">近15天申请次数和机构数</th>
                        <th colSpan="2" className="text-align-center">近1个月申请次数和机构数</th>
                        <th colSpan="2" className="text-align-center">近3个月申请次数和机构数</th>
                    </tr>
                    <tr>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th rowSpan="3">银行</th>
                        <th>本机构申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>总申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>总申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th rowSpan="15">非银行</th>
                        <th>本机构申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>总申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>p2p申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>小贷申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>现金类分期申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>消费类分期申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>代偿类分期申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>其他申请次数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>p2p申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>小贷申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>现金类分期申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>消费类分期申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>代偿类分期申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>其他申请机构数</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            )
        } else {
            const {code, applyCountAndOrgs, applyCounts, firstAndLastApplies, message} = this.props.dataSource;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(applyCountAndOrgs && !disabled) {
                return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="50"/>
                            <col width="15%"/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th rowSpan="2" colSpan="2"></th>
                            <th colSpan="2" className="text-align-center">近7天申请次数和机构数</th>
                            <th colSpan="2" className="text-align-center">近15天申请次数和机构数</th>
                            <th colSpan="2" className="text-align-center">近1个月申请次数和机构数</th>
                            <th colSpan="2" className="text-align-center">近3个月申请次数和机构数</th>
                        </tr>
                        <tr>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th rowSpan="3">银行</th>
                            <th>本机构申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.bankSelfNum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.bankSelfNum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.bankSelfNum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.bankSelfNum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.bankSelfNum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.bankSelfNum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.bankSelfNum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.bankSelfNum}</td>
                        </tr>
                        <tr>
                            <th>总申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.bankAllnum}</td>
                        </tr>
                        <tr>
                            <th>总申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.bankOrgnum}</td>
                        </tr>
                        <tr>
                            <th rowSpan="15">非银行</th>
                            <th>本机构申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankSelfnum}</td>
                        </tr>
                        <tr>
                            <th>总申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankAllnum}</td>
                        </tr>
                        <tr>
                            <th>p2p申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankP2pAllnum}</td>
                        </tr>
                        <tr>
                            <th>小贷申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankMcAllnum}</td>
                        </tr>
                        <tr>
                            <th>现金类分期申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankCaAllnum}</td>
                        </tr>
                        <tr>
                            <th>消费类分期申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankCfAllnum}</td>
                        </tr>
                        <tr>
                            <th>代偿类分期申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankComAllnum}</td>
                        </tr>
                        <tr>
                            <th>其他申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankOthAllnum}</td>
                        </tr>
                        <tr>
                            <th>申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankOrgnum}</td>
                        </tr>
                        <tr>
                            <th>p2p申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                        </tr>
                        <tr>
                            <th>小贷申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankMcOrgnum}</td>
                        </tr>
                        <tr>
                            <th>现金类分期申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankCaOrgnum}</td>
                        </tr>
                        <tr>
                            <th>消费类分期申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankCfOrgnum}</td>
                        </tr>
                        <tr>
                            <th>代偿类分期申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankComOrgnum}</td>
                        </tr>
                        <tr>
                            <th>其他申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankOthOrgnum}</td>
                        </tr>
                        </tbody>
                    </table>
                )
            }
        }
    }

    get applyCounts() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <table width="100%" className="report-table-sp">
                    <colgroup>
                        <col width="15%"/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th rowSpan="2"></th>
                        <th colSpan="2" className="text-align-center">近6个月申请记录汇总</th>
                    </tr>
                    <tr>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>申请记录月份数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>平均每月申请次数(有申请月份平均)</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最大月申请次数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最小月申请次数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>申请最大间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>申请最小间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            )
        } else {
            const {code, applyCounts, message} = this.props.dataSource;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(applyCounts && !disabled) {
                return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="15%"/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th rowSpan="2"></th>
                            <th colSpan="2" className="text-align-center">近6个月申请记录汇总</th>
                        </tr>
                        <tr>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>申请记录月份数</th>
                            <td>{applyCounts.idApplyCount.totMons}</td>
                            <td>{applyCounts.cellApplyCount.totMons}</td>
                        </tr>
                        <tr>
                            <th>平均每月申请次数(有申请月份平均)</th>
                            <td>{applyCounts.idApplyCount.avgMonnum}</td>
                            <td>{applyCounts.cellApplyCount.avgMonnum}</td>
                        </tr>
                        <tr>
                            <th>最大月申请次数</th>
                            <td>{applyCounts.idApplyCount.maxMonnum}</td>
                            <td>{applyCounts.cellApplyCount.maxMonnum}</td>
                        </tr>
                        <tr>
                            <th>最小月申请次数</th>
                            <td>{applyCounts.idApplyCount.minMonnum}</td>
                            <td>{applyCounts.cellApplyCount.minMonnum}</td>
                        </tr>
                        <tr>
                            <th>申请最大间隔天数</th>
                            <td>{applyCounts.idApplyCount.maxInteday}</td>
                            <td>{applyCounts.cellApplyCount.maxInteday}</td>
                        </tr>
                        <tr>
                            <th>申请最小间隔天数</th>
                            <td>{applyCounts.idApplyCount.minInteday}</td>
                            <td>{applyCounts.cellApplyCount.minInteday}</td>
                        </tr>
                        </tbody>
                    </table>
                )
            }
        }
    }

    get firstAndLastApplies() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <table width="100%" className="report-table-sp">
                    <colgroup>
                        <col width="50"/>
                        <col width="15%"/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th rowSpan="2" colSpan="2"></th>
                        <th colSpan="2" className="text-align-center">最近最早申请记录</th>
                    </tr>
                    <tr>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th rowSpan="4">银行</th>
                        <th>距最早在银行机构申请的间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>距最近在银行机构申请的间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最近开始在银行机构连续申请的次数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最近开始在银行机构连续申请的持续天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th rowSpan="4">非银行</th>
                        <th>距最早在非银行机构申请的间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>距最近在非银行机构申请的间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最近开始在非银行机构连申请的次数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最近开始在非银行机构连续申请的持续天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            )
        } else {
            const {code, firstAndLastApplies, message} = this.props.dataSource;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(firstAndLastApplies && !disabled) {
                return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="50"/>
                            <col width="15%"/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th rowSpan="2" colSpan="2"></th>
                            <th colSpan="2" className="text-align-center">最近最早申请记录</th>
                        </tr>
                        <tr>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th rowSpan="4">银行</th>
                            <th>距最早在银行机构申请的间隔天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.firstBankInteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.firstBankInteday}</td>
                        </tr>
                        <tr>
                            <th>距最近在银行机构申请的间隔天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastBankInteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastBankInteday}</td>
                        </tr>
                        <tr>
                            <th>最近开始在银行机构连续申请的次数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastBankConsnum}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastBankConsnum}</td>
                        </tr>
                        <tr>
                            <th>最近开始在银行机构连续申请的持续天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastBankCsinteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastBankCsinteday}</td>
                        </tr>
                        <tr>
                            <th rowSpan="4">非银行</th>
                            <th>距最早在非银行机构申请的间隔天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.firstNbankInteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.firstNbankInteday}</td>
                        </tr>
                        <tr>
                            <th>距最近在非银行机构申请的间隔天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastNbankInteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastNbankInteday}</td>
                        </tr>
                        <tr>
                            <th>最近开始在非银行机构连申请的次数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastNbankConsnum}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastNbankConsnum}</td>
                        </tr>
                        <tr>
                            <th>最近开始在非银行机构连续申请的持续天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastNbankCsinteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastNbankCsinteday}</td>
                        </tr>
                        </tbody>
                    </table>
                )
            }
        }
    }
}