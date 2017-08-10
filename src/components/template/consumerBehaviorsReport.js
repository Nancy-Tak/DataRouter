/**
 * Created by Ethan on 2016/12/8.
 * 消费行为及收支等级评估 模版
 * ConsumerBehaviors report
 *
 */
import React, {Component} from 'react';
import {Row, Col, Collapse} from 'antd';
import './style.less'
const Panel = Collapse.Panel;
export class ConsumerBehaviors extends Component {
    static defaultProps = {
        disabled: null,//是否模板
        dataSource: {}
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {disabled, dataSource}=this.props;
        return (
            <div className="fn-pa-10">
                <h2 style={this.css.center}>
                    <span style={this.css.color}>消费行为及收支等级评估</span>
                </h2>
                <div className="report-table fn-mb-20">
                    <Row>
                        <Col span={6}>基础信息</Col>
                        <Col span={7} offset={11}>
                            <span>查询编号</span>
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
                        <Col span={8}>{this.base.phone}</Col>
                        <Col span={4}>邮箱</Col>
                        <Col span={8}>{this.base.email}</Col>
                    </Row>
                </div>
                <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4', '5', '6', '7'] }>
                    <Panel header="商品消费评估" key="1">
                        {/*模块A 商品消费评估*/}
                        {this.consumption}
                    </Panel>
                    <Panel header="月度收支等级评估" key="2">
                        {this.accountChange}
                    </Panel>
                </Collapse>

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
                id: base.id || '',
                email: base.email || ''
            }
        }
        return {
            name: '',
            phone: '',
            id: '',
            email: ''
        }
    }

    get consumption() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div>
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="17%"/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th></th>
                            <th className="text-align-center">近3个月</th>
                            <th className="text-align-center">近12个月</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>消费次数总和</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>消费金额总和</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>消费金额>0类目类别数</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>浏览类目类别数</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>浏览次数总和</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最大单类目消费次数</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最大单类目消费金额</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最大单类目消费金额的类目</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>日用百货类商品总消费次数</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>日用百货类商品总消费金额</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>家用电器类商品总消费次数</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>家用电器类商品总消费金额</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>母婴用品类商品总消费次数</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>母婴用品类商品总消费金额</th>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            const {consumption, message} = this.props.dataSource;
            console.log('-------------')
            console.log(consumption)
            if(consumption && consumption.code != 200) {
                return (
                    <div>
                        <h3>{consumption.message ? consumption.message : `code:${consumption.code}`}</h3>
                    </div>);
            }
            if(consumption && !disabled) {
                return (
                    <div>
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="17%"/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th></th>
                                <th className="text-align-center">近3个月</th>
                                <th className="text-align-center">近12个月</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>消费次数总和</th>
                                <td>{consumption.items.three.consTotNum}</td>
                                <td>{consumption.items.twelve.consTotNum}</td>
                            </tr>
                            <tr>
                                <th>消费金额总和</th>
                                <td>{consumption.items.three.consTotPay}</td>
                                <td>{consumption.items.twelve.consTotPay}</td>
                            </tr>
                            <tr>
                                <th>消费金额>0类目类别数</th>
                                <td>{consumption.items.three.consTotPCatenum}</td>
                                <td>{consumption.items.twelve.consTotPCatenum}</td>
                            </tr>
                            <tr>
                                <th>浏览类目类别数</th>
                                <td>{consumption.items.three.consTotVCatenum}</td>
                                <td>{consumption.items.twelve.consTotVCatenum}</td>
                            </tr>
                            <tr>
                                <th>浏览次数总和</th>
                                <td>{consumption.items.three.consTotVisits}</td>
                                <td>{consumption.items.twelve.consTotVisits}</td>
                            </tr>
                            <tr>
                                <th>最大单类目消费次数</th>
                                <td>{consumption.items.three.consMaxNum}</td>
                                <td>{consumption.items.twelve.consMaxNum}</td>
                            </tr>
                            <tr>
                                <th>最大单类目消费金额</th>
                                <td>{consumption.items.three.consMaxPay}</td>
                                <td>{consumption.items.twelve.consMaxPay}</td>
                            </tr>
                            <tr>
                                <th>最大单类目消费金额的类目</th>
                                <td>{consumption.items.three.consMaxPaycate}</td>
                                <td>{consumption.items.twelve.consMaxPaycate}</td>
                            </tr>
                            <tr>
                                <th>日用百货类商品总消费次数</th>
                                <td>{consumption.items.three.consRybhNum}</td>
                                <td>{consumption.items.twelve.consRybhNum}</td>
                            </tr>
                            <tr>
                                <th>日用百货类商品总消费金额</th>
                                <td>{consumption.items.three.consRybhPay}</td>
                                <td>{consumption.items.twelve.consRybhPay}</td>
                            </tr>
                            <tr>
                                <th>家用电器类商品总消费次数</th>
                                <td>{consumption.items.three.consJydqNum}</td>
                                <td>{consumption.items.twelve.consJydqNum}</td>
                            </tr>
                            <tr>
                                <th>家用电器类商品总消费金额</th>
                                <td>{consumption.items.three.consJydqPay}</td>
                                <td>{consumption.items.twelve.consJydqPay}</td>
                            </tr>
                            <tr>
                                <th>母婴用品类商品总消费次数</th>
                                <td>{consumption.items.three.consMyypNum}</td>
                                <td>{consumption.items.twelve.consMyypNum}</td>
                            </tr>
                            <tr>
                                <th>母婴用品类商品总消费金额</th>
                                <td>{consumption.items.three.consMyypPay}</td>
                                <td>{consumption.items.twelve.consMyypPay}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>)
            }
        }
    }

    get accountChange() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className=" fn-mt-10">
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="17%"/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>信用卡储蓄卡总张数</th>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%"/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th colSpan="2"></th>
                            <th className="text-align-center">可用余额（月末）</th>
                            <th className="text-align-center">支出金额</th>
                            <th className="text-align-center">支出笔数</th>
                            <th className="text-align-center">投资金额</th>
                            <th className="text-align-center">还贷金额</th>
                            <th className="text-align-center">收入金额</th>
                            <th className="text-align-center">收入笔数</th>
                            <th className="text-align-center">取现金额</th>
                            <th className="text-align-center">是否按时还贷</th>
                            <th className="text-align-center">贷款金额</th>
                            <th className="text-align-center">个人消费金额</th>
                            <th className="text-align-center">单笔最大入账金额</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th rowSpan="2">过去第1个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第2个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第3个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第4个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第5个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第6个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第7-9个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第10-12个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第13-15个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th rowSpan="2">过去第16-18个月</th>
                            <th>储蓄卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                            <th>信用卡</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
                </div>
            )
        } else {
            console.log(this.props.dataSource)
            const {code, accountChange, message} = this.props.dataSource;
            if(code && code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(accountChange && !disabled) {
                if(accountChange.code != 200) {
                    return (
                        <div>
                            <h3>{accountChange.message ? accountChange.message : `code:${accountChange.code}`}</h3>
                        </div>);
                }
                return (
                    <div className=" fn-mt-10">
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="17%"/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>信用卡储蓄卡总张数</th>
                                <td>{accountChange.acmCardIndex}</td>
                            </tr>
                            </tbody>
                        </table>
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="10%"/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th colSpan="2"></th>
                                <th className="text-align-center">可用余额（月末）</th>
                                <th className="text-align-center">支出金额</th>
                                <th className="text-align-center">支出笔数</th>
                                <th className="text-align-center">投资金额</th>
                                <th className="text-align-center">还贷金额</th>
                                <th className="text-align-center">收入金额</th>
                                <th className="text-align-center">收入笔数</th>
                                <th className="text-align-center">取现金额</th>
                                <th className="text-align-center">是否按时还贷</th>
                                <th className="text-align-center">贷款金额</th>
                                <th className="text-align-center">个人消费金额</th>
                                <th className="text-align-center">单笔最大入账金额</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th rowSpan="2">过去第1个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.one.acmDebitBalance}</td>
                                <td>{accountChange.items.one.acmDebitOut}</td>
                                <td>{accountChange.items.one.acmDebitOutNum}</td>
                                <td>{accountChange.items.one.acmDebitInvest}</td>
                                <td>{accountChange.items.one.acmDebitRepay}</td>
                                <td>{accountChange.items.one.acmDebitIn}</td>
                                <td>{accountChange.items.one.acmDebitInNum}</td>
                                <td>{accountChange.items.one.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.one.acmLoan}</td>
                                <td>{accountChange.items.one.acmCons}</td>
                                <td>{accountChange.items.one.acmMaxIn}</td>
                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.one.acmCreditBalance}</td>
                                <td>{accountChange.items.one.acmCreditOut}</td>
                                <td>{accountChange.items.one.acmCreditOutNum}</td>
                                <td>{accountChange.items.one.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.one.acmCreditIn}</td>
                                <td>{accountChange.items.one.acmCreditInNum}</td>
                                <td>{accountChange.items.one.acmCreditCash}</td>
                                <td>{accountChange.items.one.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第2个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.two.acmDebitBalance || 'API Error'}</td>
                                <td>{accountChange.items.two.acmDebitOut}</td>
                                <td>{accountChange.items.two.acmDebitOutNum}</td>
                                <td>{accountChange.items.two.acmDebitInvest}</td>
                                <td>{accountChange.items.two.acmDebitRepay}</td>
                                <td>{accountChange.items.two.acmDebitIn}</td>
                                <td>{accountChange.items.two.acmDebitInNum}</td>
                                <td>{accountChange.items.two.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.two.acmLoan}</td>
                                <td>{accountChange.items.two.acmCons}</td>
                                <td>{accountChange.items.two.acmMaxIn}</td>

                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.two.acmCreditBalance}</td>
                                <td>{accountChange.items.two.acmCreditOut}</td>
                                <td>{accountChange.items.two.acmCreditOutNum}</td>
                                <td>{accountChange.items.two.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.two.acmCreditIn}</td>
                                <td>{accountChange.items.two.acmCreditInNum}</td>
                                <td>{accountChange.items.two.acmCreditCash}</td>
                                <td>{accountChange.items.two.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第3个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.three.acmDebitBalance || 'API Error'}</td>
                                <td>{accountChange.items.three.acmDebitOut}</td>
                                <td>{accountChange.items.three.acmDebitOutNum}</td>
                                <td>{accountChange.items.three.acmDebitInvest}</td>
                                <td>{accountChange.items.three.acmDebitRepay}</td>
                                <td>{accountChange.items.three.acmDebitIn}</td>
                                <td>{accountChange.items.three.acmDebitInNum}</td>
                                <td>{accountChange.items.three.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.three.acmLoan}</td>
                                <td>{accountChange.items.three.acmCons}</td>
                                <td>{accountChange.items.three.acmMaxIn}</td>

                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.three.acmCreditBalance}</td>
                                <td>{accountChange.items.three.acmCreditOut}</td>
                                <td>{accountChange.items.three.acmCreditOutNum}</td>
                                <td>{accountChange.items.three.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.three.acmCreditIn}</td>
                                <td>{accountChange.items.three.acmCreditInNum}</td>
                                <td>{accountChange.items.three.acmCreditCash}</td>
                                <td>{accountChange.items.three.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第4个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.four.acmDebitBalance || 'API Error'}</td>
                                <td>{accountChange.items.four.acmDebitOut}</td>
                                <td>{accountChange.items.four.acmDebitOutNum}</td>
                                <td>{accountChange.items.four.acmDebitInvest}</td>
                                <td>{accountChange.items.four.acmDebitRepay}</td>
                                <td>{accountChange.items.four.acmDebitIn}</td>
                                <td>{accountChange.items.four.acmDebitInNum}</td>
                                <td>{accountChange.items.four.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.four.acmLoan}</td>
                                <td>{accountChange.items.four.acmCons}</td>
                                <td>{accountChange.items.four.acmMaxIn}</td>

                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.four.acmCreditBalance}</td>
                                <td>{accountChange.items.four.acmCreditOut}</td>
                                <td>{accountChange.items.four.acmCreditOutNum}</td>
                                <td>{accountChange.items.four.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.four.acmCreditIn}</td>
                                <td>{accountChange.items.four.acmCreditInNum}</td>
                                <td>{accountChange.items.four.acmCreditCash}</td>
                                <td>{accountChange.items.four.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第5个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.five.acmDebitBalance || 'API Error'}</td>
                                <td>{accountChange.items.five.acmDebitOut}</td>
                                <td>{accountChange.items.five.acmDebitOutNum}</td>
                                <td>{accountChange.items.five.acmDebitInvest}</td>
                                <td>{accountChange.items.five.acmDebitRepay}</td>
                                <td>{accountChange.items.five.acmDebitIn}</td>
                                <td>{accountChange.items.five.acmDebitInNum}</td>
                                <td>{accountChange.items.five.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.five.acmLoan}</td>
                                <td>{accountChange.items.five.acmCons}</td>
                                <td>{accountChange.items.five.acmMaxIn}</td>

                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.five.acmCreditBalance}</td>
                                <td>{accountChange.items.five.acmCreditOut}</td>
                                <td>{accountChange.items.five.acmCreditOutNum}</td>
                                <td>{accountChange.items.five.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.five.acmCreditIn}</td>
                                <td>{accountChange.items.five.acmCreditInNum}</td>
                                <td>{accountChange.items.five.acmCreditCash}</td>
                                <td>{accountChange.items.five.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第6个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.six.acmDebitBalance || 'API Error'}</td>
                                <td>{accountChange.items.six.acmDebitOut}</td>
                                <td>{accountChange.items.six.acmDebitOutNum}</td>
                                <td>{accountChange.items.six.acmDebitInvest}</td>
                                <td>{accountChange.items.six.acmDebitRepay}</td>
                                <td>{accountChange.items.six.acmDebitIn}</td>
                                <td>{accountChange.items.six.acmDebitInNum}</td>
                                <td>{accountChange.items.six.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.six.acmLoan}</td>
                                <td>{accountChange.items.six.acmCons}</td>
                                <td>{accountChange.items.six.acmMaxIn}</td>
                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.six.acmCreditBalance}</td>
                                <td>{accountChange.items.six.acmCreditOut}</td>
                                <td>{accountChange.items.six.acmCreditOutNum}</td>
                                <td>{accountChange.items.six.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.six.acmCreditIn}</td>
                                <td>{accountChange.items.six.acmCreditInNum}</td>
                                <td>{accountChange.items.six.acmCreditCash}</td>
                                <td>{accountChange.items.six.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第7-9个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.sevenToNine.acmDebitBalance || 'API Error'}</td>
                                <td>{accountChange.items.sevenToNine.acmDebitOut}</td>
                                <td>{accountChange.items.sevenToNine.acmDebitOutNum}</td>
                                <td>{accountChange.items.sevenToNine.acmDebitInvest}</td>
                                <td>{accountChange.items.sevenToNine.acmDebitRepay}</td>
                                <td>{accountChange.items.sevenToNine.acmDebitIn}</td>
                                <td>{accountChange.items.sevenToNine.acmDebitInNum}</td>
                                <td>{accountChange.items.sevenToNine.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.sevenToNine.acmLoan}</td>
                                <td>{accountChange.items.sevenToNine.acmCons}</td>
                                <td>{accountChange.items.sevenToNine.acmMaxIn}</td>

                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.sevenToNine.acmCreditBalance}</td>
                                <td>{accountChange.items.sevenToNine.acmCreditOut}</td>
                                <td>{accountChange.items.sevenToNine.acmCreditOutNum}</td>
                                <td>{accountChange.items.sevenToNine.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.sevenToNine.acmCreditIn}</td>
                                <td>{accountChange.items.sevenToNine.acmCreditInNum}</td>
                                <td>{accountChange.items.sevenToNine.acmCreditCash}</td>
                                <td>{accountChange.items.sevenToNine.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第10-12个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.tenToTwelve.acmDebitBalance || 'API Error'}</td>
                                <td>{accountChange.items.tenToTwelve.acmDebitOut}</td>
                                <td>{accountChange.items.tenToTwelve.acmDebitOutNum}</td>
                                <td>{accountChange.items.tenToTwelve.acmDebitInvest}</td>
                                <td>{accountChange.items.tenToTwelve.acmDebitRepay}</td>
                                <td>{accountChange.items.tenToTwelve.acmDebitIn}</td>
                                <td>{accountChange.items.tenToTwelve.acmDebitInNum}</td>
                                <td>{accountChange.items.tenToTwelve.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.tenToTwelve.acmLoan}</td>
                                <td>{accountChange.items.tenToTwelve.acmCons}</td>
                                <td>{accountChange.items.tenToTwelve.acmMaxIn}</td>
                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.tenToTwelve.acmCreditBalance}</td>
                                <td>{accountChange.items.tenToTwelve.acmCreditOut}</td>
                                <td>{accountChange.items.tenToTwelve.acmCreditOutNum}</td>
                                <td>{accountChange.items.tenToTwelve.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.tenToTwelve.acmCreditIn}</td>
                                <td>{accountChange.items.tenToTwelve.acmCreditInNum}</td>
                                <td>{accountChange.items.tenToTwelve.acmCreditCash}</td>
                                <td>{accountChange.items.tenToTwelve.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第13-15个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.thirdteenToFifteen.acmDebitBalance}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmDebitOut}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmDebitOutNum}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmDebitInvest}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmDebitRepay}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmDebitIn}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmDebitInNum}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.thirdteenToFifteen.acmLoan}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmCons}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmMaxIn}</td>

                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.thirdteenToFifteen.acmCreditBalance}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmCreditOut}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmCreditOutNum}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.thirdteenToFifteen.acmCreditIn}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmCreditInNum}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmCreditCash}</td>
                                <td>{accountChange.items.thirdteenToFifteen.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th rowSpan="2">过去第16-18个月</th>
                                <th>储蓄卡</th>
                                <td>{accountChange.items.sixteenToEighteen.acmDebitBalance || 'API Error'}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmDebitOut}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmDebitOutNum}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmDebitInvest}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmDebitRepay}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmDebitIn}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmDebitInNum}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmDebitCash}</td>
                                <td></td>
                                <td>{accountChange.items.sixteenToEighteen.acmLoan}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmCons}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmMaxIn}</td>

                            </tr>
                            <tr>
                                <th>信用卡</th>
                                <td>{accountChange.items.sixteenToEighteen.acmCreditBalance}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmCreditOut}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmCreditOutNum}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmCreditInvest}</td>
                                <td></td>
                                <td>{accountChange.items.sixteenToEighteen.acmCreditIn}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmCreditInNum}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmCreditCash}</td>
                                <td>{accountChange.items.sixteenToEighteen.acmCreditDef}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
    }
}
