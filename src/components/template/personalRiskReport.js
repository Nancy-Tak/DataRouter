/**
 * Created by Ethan on 2016/12/6.
 * 个人风险信息报告 模版
 * Personal risk information report
 *
 */
import React,{Component} from 'react';
import { Row,Col,Collapse } from 'antd';
import './style.less'
const Panel = Collapse.Panel;
export class PersonalRiskInfo extends Component {
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
                    <span style={this.css.color}>个人风险信息报告</span>
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
                        <Col span={20}>{this.base.phone}</Col>
                    </Row>
                </div>
                <Collapse bordered={false} defaultActiveKey={['1','2','3','4','5','6','7'] }>
                    {/* 个人担任法定代表人信息*/}
                    <Panel header="个人担任法定代表人信息" key="1">
                        {this.ryPosFr}
                    </Panel>
                    {/* 个人股权投资信息*/}
                    <Panel header="个人股权投资信息" key="2">
                        {this.ryPosSha}
                    </Panel>
                    {/* 个人担任高管信息*/}
                    <Panel header="个人担任高管信息" key="3">
                        {this.ryPosPer}
                    </Panel>
                    {/* 被执行人信息*/}
                    <Panel header="被执行人信息" key="4">
                        {this.punished}
                    </Panel>
                    {/* 失信被执行人信息*/}
                    <Panel header="失信被执行人信息" key="5">
                        {this.punishBreak}
                    </Panel>
                    {/* 行政处罚历史信息*/}
                    <Panel header="行政处罚历史信息" key="6">
                        {this.personCaseInfo}
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
                id: base.id || ''
            }
        }
        return {
            name: '',
            phone: '',
            id: ''
        }
    }

    //个人担任法定代表人信息
    get ryPosFr() {
        const {disabled} = this.props;
        if(disabled) {
            return ( //模板
                <div className="report-table">
                    <Row>
                        <Col span={4}>企业（机构）名称</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>企业（机构）类型</Col>
                        <Col span={8}></Col>
                        <Col span={4}>企业状态</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>注册资本（万元）</Col>
                        <Col span={8}></Col>
                        <Col span={4}>注册资本币种</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>工商注册号</Col>
                        <Col span={8}></Col>
                        <Col span={4}></Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
            )
        } else {
            const {ryPosFr} = this.props.dataSource;
            const {code,data,message} = ryPosFr;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(ryPosFr && !disabled) {
                var arr = [];
                for(var i = 0; i < data.length; i++) {
                    var item = data[i];
                    arr.push(
                        <div className="report-table fn-mt-10" key={`ryPosFr_${i}`}>
                            <Row>
                                <Col span={4}>企业（机构）名称</Col>
                                <Col span={20}>{item.entName}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>企业（机构）类型</Col>
                                <Col span={8}>{item.entType}</Col>
                                <Col span={4}>企业状态</Col>
                                <Col span={8}>{item.entStatus}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>注册资本（万元）</Col>
                                <Col span={8}>{item.regCap}</Col>
                                <Col span={4}>注册资本币种</Col>
                                <Col span={8}>{item.regCapCur}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>工商注册号</Col>
                                <Col span={8}>{item.regNo}</Col>
                                <Col span={4}></Col>
                                <Col span={8}></Col>
                            </Row>
                        </div>
                    )
                }
                return arr;
            }
        }
    }

    //个人股权投资信息
    get ryPosSha() {
        const {disabled} = this.props;
        if(disabled) {
            return ( //模板
                <div className="report-table">
                    <Row>
                        <Col span={4}>企业（机构）名称</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>工商注册号</Col>
                        <Col span={8}></Col>
                        <Col span={4}>企业（机构）类型</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>注册资本（万元）</Col>
                        <Col span={8}></Col>
                        <Col span={4}>注册资本币种</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>认缴出资额（万元）</Col>
                        <Col span={8}></Col>
                        <Col span={4}>认缴出资币种</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>出资比例</Col>
                        <Col span={8}></Col>
                        <Col span={4}>出资方式</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>企业状态</Col>
                        <Col span={8}></Col>
                        <Col span={4}></Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
            )
        } else {
            const {ryPosSha} = this.props.dataSource;
            const {code,data,message} = ryPosSha;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(ryPosSha && !disabled) {
                var arr = [];
                for(var i = 0; i < data.length; i++) {
                    var item = data[i];
                    arr.push(
                        <div className="report-table fn-mt-10" key={`ryPosSha_${i}`}>
                            <Row>
                                <Col span={4}>企业（机构）名称</Col>
                                <Col span={20}>{item.entName}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>工商注册号</Col>
                                <Col span={8}>{item.regNo}</Col>
                                <Col span={4}>企业（机构）类型</Col>
                                <Col span={8}>{item.entType}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>注册资本（万元）</Col>
                                <Col span={8}>{item.regCap}</Col>
                                <Col span={4}>注册资本币种</Col>
                                <Col span={8}>{item.regCapCur}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>认缴出资额（万元）</Col>
                                <Col span={8}>{item.subConAm}</Col>
                                <Col span={4}>认缴出资币种</Col>
                                <Col span={8}>{item.currency}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>出资比例</Col>
                                <Col span={8}>{item.fundedRatio}</Col>
                                <Col span={4}>出资方式</Col>
                                <Col span={8}>{item.conForm}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>企业状态</Col>
                                <Col span={8}>{item.entStatus}</Col>
                                <Col span={4}></Col>
                                <Col span={8}></Col>
                            </Row>
                        </div>
                    )
                }
                return arr;
            }
        }
    }

    //个人担任高管信息
    get ryPosPer() {
        const {disabled} = this.props;
        if(disabled) {
            return ( //模板
                <div className="report-table ">
                    <Row>
                        <Col span={4}>企业（机构）名称</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>工商注册号</Col>
                        <Col span={8}></Col>
                        <Col span={4}>担任职务</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>注册资本（万元）</Col>
                        <Col span={8}></Col>
                        <Col span={4}>注册资本币种</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>企业类型</Col>
                        <Col span={8}></Col>
                        <Col span={4}>企业状态</Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
            )
        } else {
            const {ryPosPer} = this.props.dataSource;
            const {code,data,message} = ryPosPer;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(ryPosPer && !disabled) {
                var arr = [];
                for(var i = 0; i < data.length; i++) {
                    var item = data[i];
                    arr.push(
                        <div className="report-table fn-mt-10" key={`ryPosPer_${i}`}>
                            <Row>
                                <Col span={4}>企业（机构）名称</Col>
                                <Col span={20}>{item.entName}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>工商注册号</Col>
                                <Col span={8}>{item.regNo}</Col>
                                <Col span={4}>担任职务</Col>
                                <Col span={8}>{item.position}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>注册资本（万元）</Col>
                                <Col span={8}>{item.regCap}</Col>
                                <Col span={4}>注册资本币种</Col>
                                <Col span={8}>{item.regCapCur}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>企业类型</Col>
                                <Col span={8}>{item.entType}</Col>
                                <Col span={4}>企业状态</Col>
                                <Col span={8}>{item.entStatus}</Col>
                            </Row>
                        </div>
                    )
                }
                return arr;
            }
        }
    }

    //被执行人信息
    get punished() {
        const {disabled} = this.props;
        if(disabled) {
            return ( //模板
                <div className="report-table">
                    <Row>
                        <Col span={4}>被执行人姓名/名称</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>身份证号/工商注册号</Col>
                        <Col span={8}></Col>
                        <Col span={4}>省份</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>年龄</Col>
                        <Col span={8}></Col>
                        <Col span={4}>性别</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>身份证原始发证地</Col>
                        <Col span={8}></Col>
                        <Col span={4}>立案地间</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>案号</Col>
                        <Col span={8}></Col>
                        <Col span={4}>执行法院</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>执行标的（元）</Col>
                        <Col span={8}></Col>
                        <Col span={4}>案件状态</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>关注次数</Col>
                        <Col span={8}></Col>
                        <Col span={4}></Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
            )
        } else {
            const {punished} = this.props.dataSource;
            const {code,data,message} = punished;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(punished && !disabled) {
                var arr = [];
                for(var i = 0; i < data.length; i++) {
                    var item = data[i];
                    arr.push(
                        <div className="report-table fn-mt-10" key={`punished_${i}`}>
                            <Row>
                                <Col span={4}>被执行人姓名/名称</Col>
                                <Col span={20}>{item.name}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>身份证号/工商注册号</Col>
                                <Col span={8}>{item.cardNum}</Col>
                                <Col span={4}>省份</Col>
                                <Col span={8}>{item.areaName}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>年龄</Col>
                                <Col span={8}>{item.age}</Col>
                                <Col span={4}>性别</Col>
                                <Col span={8}>{item.sex}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>身份证原始发证地</Col>
                                <Col span={8}>{item.ysfzd}</Col>
                                <Col span={4}>立案地间</Col>
                                <Col span={8}>{item.regDate}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>案号</Col>
                                <Col span={8}>{item.caseCode}</Col>
                                <Col span={4}>执行法院</Col>
                                <Col span={8}>{item.courtName}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>执行标的（元）</Col>
                                <Col span={8}>{item.execMoney}</Col>
                                <Col span={4}>案件状态</Col>
                                <Col span={8}>{item.caseStatus}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>关注次数</Col>
                                <Col span={8}>{item.focusNumber}</Col>
                                <Col span={4}></Col>
                                <Col span={8}></Col>
                            </Row>
                        </div>
                    )
                }
                return arr;
            }
        }
    }

    //失信被执行人信息
    get punishBreak() {
        const {disabled} = this.props;
        if(disabled) {
            return ( //模板
                <div className="report-table">
                    <Row>
                        <Col span={4}>被执行人姓名/名称</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>身份证号/工商注册号</Col>
                        <Col span={8}></Col>
                        <Col span={4}>身份证原始发证地</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>失信人类型</Col>
                        <Col span={8}></Col>
                        <Col span={4}>法定代表人/负责人姓名</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>立案时间</Col>
                        <Col span={8}></Col>
                        <Col span={4}>案号</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>执行法院</Col>
                        <Col span={8}></Col>
                        <Col span={4}>省份</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>执行依据文号</Col>
                        <Col span={8}></Col>
                        <Col span={4}>执行依据单位</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>关注次数</Col>
                        <Col span={8}></Col>
                        <Col span={4}>退出日期</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>生效法律文书确定的义务</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>失信被执行人行为具体情形</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>被执行人的履行情况</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>已履行</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>未履行</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>公布时间</Col>
                        <Col span={20}></Col>
                    </Row>
                </div>
            )
        } else {
            const {punishBreak} = this.props.dataSource;
            const {code,data,message} = punishBreak;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(punishBreak && !disabled) {
                var arr = [];
                for(var i = 0; i < data.length; i++) {
                    var item = data[i];
                    arr.push(
                        <div className="report-table fn-mt-10" key={`punishBreak_${i}`}>
                            <Row>
                                <Col span={4}>被执行人姓名/名称</Col>
                                <Col span={20}>{item.name}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>身份证号/工商注册号</Col>
                                <Col span={8}>{item.cardNum}</Col>
                                <Col span={4}>身份证原始发证地</Col>
                                <Col span={8}>{item.ysfzd}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>失信人类型</Col>
                                <Col span={8}>{item.type}</Col>
                                <Col span={4}>法定代表人/负责人姓名</Col>
                                <Col span={8}>{item.businessEntity}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>立案时间</Col>
                                <Col span={8}>{item.regDate}</Col>
                                <Col span={4}>案号</Col>
                                <Col span={8}>{item.caseCode}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>执行法院</Col>
                                <Col span={8}>{item.courtName}</Col>
                                <Col span={4}>省份</Col>
                                <Col span={8}>{item.areaName}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>执行依据文号</Col>
                                <Col span={8}>{item.gistId}</Col>
                                <Col span={4}>执行依据单位</Col>
                                <Col span={8}>{item.gistUnit}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>关注次数</Col>
                                <Col span={8}>{item.focusNumber}</Col>
                                <Col span={4}>退出日期</Col>
                                <Col span={8}>{item.exitDate}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>生效法律文书确定的义务</Col>
                                <Col span={20}>{item.duty}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>失信被执行人行为具体情形</Col>
                                <Col span={20}>{item.disruptType}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>被执行人的履行情况</Col>
                                <Col span={20}>{item.performance}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>已履行</Col>
                                <Col span={20}>{item.performedPart}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>未履行</Col>
                                <Col span={20}>{item.unPerformedPart}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>公布时间</Col>
                                <Col span={20}>{item.publishDate}</Col>
                            </Row>
                        </div>
                    )
                }
                return arr;
            }
        }
    }

    //行政处罚历史信息
    get personCaseInfo() {
        const {disabled} = this.props;
        if(disabled) {
            return ( //模板
                <div className="report-table">
                    <Row>
                        <Col span={4}>企业名称</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>案发时间</Col>
                        <Col span={8}></Col>
                        <Col span={4}>违法行为类型</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>处罚决定书签发日期</Col>
                        <Col span={8}></Col>
                        <Col span={4}>作出行政处罚决定机关名称</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>处罚种类</Col>
                        <Col span={8}></Col>
                        <Col span={4}>处罚金额</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>执行类别</Col>
                        <Col span={8}></Col>
                        <Col span={4}>案件结果</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>处罚决定文书</Col>
                        <Col span={8}></Col>
                        <Col span={4}>处罚结果</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>案值</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>案由</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>主要违法事实</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>处罚依据</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>处罚执行情况</Col>
                        <Col span={20}></Col>
                    </Row>
                </div>
            )
        } else {
            const {personCaseInfo} = this.props.dataSource;
            const {code,data,message} = personCaseInfo;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(personCaseInfo && !disabled) {
                var arr = [];
                for(var i = 0; i < data.length; i++) {
                    var item = data[i];
                    arr.push(
                        <div className="report-table fn-mt-10" key={`personCaseInfo_${i}`}>
                            <Row>
                                <Col span={4}>企业名称</Col>
                                <Col span={20}>{item.name}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>案发时间</Col>
                                <Col span={8}>{item.caseTime}</Col>
                                <Col span={4}>违法行为类型</Col>
                                <Col span={8}>{item.caseType}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>处罚决定书签发日期</Col>
                                <Col span={8}>{item.penDecIssDate}</Col>
                                <Col span={4}>作出行政处罚决定机关名称</Col>
                                <Col span={8}>{item.penAuth}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>处罚种类</Col>
                                <Col span={8}>{item.penType}</Col>
                                <Col span={4}>处罚金额</Col>
                                <Col span={8}>{item.penAm}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>执行类别</Col>
                                <Col span={8}>{item.exeSort}</Col>
                                <Col span={4}>案件结果</Col>
                                <Col span={8}>{item.caseResult}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>处罚决定文书</Col>
                                <Col span={8}>{item.penDecNo}</Col>
                                <Col span={4}>处罚结果</Col>
                                <Col span={8}>{item.penResult}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>案值</Col>
                                <Col span={20}>{item.caseVal}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>案由</Col>
                                <Col span={20}>{item.caseReason}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>主要违法事实</Col>
                                <Col span={20}>{item.illegFact}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>处罚依据</Col>
                                <Col span={20}>{item.penBasis}</Col>
                            </Row>
                            <Row>
                                <Col span={4}>处罚执行情况</Col>
                                <Col span={20}>{item.penExeSt}</Col>
                            </Row>
                        </div>
                    )
                }
                return arr;
            }
        }
    }
}
