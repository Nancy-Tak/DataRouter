/**
 * Created by Ethan on 2016/11/2.
 */
import '../../style.less';
import React,{Component} from 'react';
import { Tabs,Form,Input,Button,Collapse,Table,Icon,Select,Row,Col,Upload,message,notification} from 'antd';
import {CATEGORY_ID_MAP} from '../setQuota';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
export default class ImportQuota extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyButton: false,
            financeAssetButton: false,
            corporateCreditButton: false,
            operatingButton: false,
            administrativeButton: false,
            recordButton: false,
        }
    }

    handleOnChange(id, e) {
        // e.fileList = [];
        var b = false;
        switch(id) {
            case CATEGORY_ID_MAP['企业信息']:
                if(e.file.response && e.file.response.status.code != 200) {
                    this.refs.cUpload.removeFile(e.file);
                    ms(e.file.response.status.message);
                }
                e.fileList.length ? b = true : b = false;
                this.setState({
                    companyButton: b,
                });
                break;
            case  CATEGORY_ID_MAP['财务指标']:
                if(e.file.response && e.file.response.status.code != 200) {
                    this.refs.fUpload.removeFile(e.file);
                    ms(e.file.response.status.message);
                }
                e.fileList.length ? b = true : b = false;
                this.setState({
                    financeAssetButton: b,
                })
                break;
            case  CATEGORY_ID_MAP['征信数据']:
                if(e.file.response && e.file.response.status.code != 200) {
                    this.refs.coUpload.removeFile(e.file);
                    ms(e.file.response.status.message);
                }
                var b = false;
                this.setState({
                    corporateCreditButton: b,
                })
                break;
            case  CATEGORY_ID_MAP['经营数据']:
                if(e.file.response && e.file.response.status.code != 200) {
                    this.refs.oUpload.removeFile(e.file);
                    ms(e.file.response.status.message);
                }
                e.fileList.length ? b = true : b = false;
                this.setState({
                    operatingButton: b,
                })
                break;
            case  CATEGORY_ID_MAP['行政处罚记录']:
                if(e.file.response && e.file.response.status.code != 200) {
                    this.refs.aUpload.removeFile(e.file);
                    ms(e.file.response.status.message);
                }
                e.fileList.length ? b = true : b = false;
                this.setState({
                    administrativeButton: b,
                })
                break;
            case  CATEGORY_ID_MAP['诉讼记录']:
                if(e.file.response && e.file.response.status.code != 200) {
                    this.refs.rUpload.removeFile(e.file);
                    ms(e.file.response.status.message);
                }
                e.fileList.length ? b = true : b = false;
                this.setState({
                    recordButton: b,
                })
                break;
        }
        function ms(title) {
            notification['error']({
                message: '',
                description: title,
            });
            //  message.error(title);
        }
    }

    render() {
        const companyProps = {
            onChange: this.handleOnChange.bind(this, CATEGORY_ID_MAP['企业信息']),
            action: '/shuyou/alarm/indicators/upload',
            multiple: false,
            beforeUpload(file) {
                const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                if(!isXls) {
                    message.error('只能上传 Excel 文件哦！');
                }
                return isXls;
            },
        };
        const financeAssetProps = {
            onChange: this.handleOnChange.bind(this, CATEGORY_ID_MAP['财务指标']),
            action: '/shuyou/alarm/indicators/upload',
            multiple: false,
            beforeUpload(file) {
                const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                if(!isXls) {
                    message.error('只能上传 Excel 文件哦！');
                }
                return isXls;
            },
        };
        const corporateCreditProps = {
            onChange: this.handleOnChange.bind(this, CATEGORY_ID_MAP['征信数据']),
            action: '/shuyou/alarm/indicators/upload',
            multiple: false,
            beforeUpload(file) {
                const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                if(!isXls) {
                    message.error('只能上传 Excel 文件哦！');
                }
                return isXls;
            },
        };
        const operatingProps = {
            onChange: this.handleOnChange.bind(this, CATEGORY_ID_MAP['经营数据']),
            action: '/shuyou/alarm/indicators/upload',
            multiple: false,
            beforeUpload(file) {
                const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                if(!isXls) {
                    message.error('只能上传 Excel 文件哦！');
                }
                return isXls;
            },
        };
        const administrativeProps = {
            onChange: this.handleOnChange.bind(this, CATEGORY_ID_MAP['行政处罚记录']),
            action: '/shuyou/alarm/indicators/upload',
            multiple: false,
            beforeUpload(file) {
                const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                if(!isXls) {
                    message.error('只能上传 Excel 文件哦！');
                }
                return isXls;
            },
        };
        const recordProps = {
            onChange: this.handleOnChange.bind(this, CATEGORY_ID_MAP['诉讼记录']),
            action: '/shuyou/alarm/indicators/upload',
            multiple: false,
            beforeUpload(file) {
                const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                if(!isXls) {
                    message.error('只能上传 Excel 文件哦！');
                }
                return isXls;
            },
        };
        const {
            companyButton,
            financeAssetButton,
            corporateCreditButton,
            operatingButton,
            administrativeButton,
            recordButton
            } = this.state;
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="指标数据导入" key="1">
                    <div className="fn-mt-20">
                        <Collapse defaultActiveKey={['1','2','3','4','5','6','7']}>
                            <Panel header="企业信息" key="1">
                                <Row type="flex" justify="space-between" align="top">
                                    <Col span={2}>
                                        <a href="../shuyou-web/templet/companyTemp.xlsx" download="数据模板-企业信息.xlsx" >模版下载</a>
                                    </Col>
                                    <Col span={4}>
                                        <div className="fn-mb-10">
                                            <span>选择文件：</span>
                                            <Upload ref="cUpload" {...companyProps} disabled={companyButton}>
                                                <Button type="ghost">
                                                    <Icon type="upload"/> 点击上传
                                                </Button>
                                            </Upload>
                                        </div>
                                    </Col>
                                    <Col span={2}>
                                        <span><h6>(上传文件格式.xlsx)</h6></span>
                                    </Col>
                                    <Col span={15}>
                                    </Col>
                                </Row>


                            </Panel>
                            <Panel header="财务指标" key="2">
                                <Row type="flex" justify="space-between" align="top">
                                    <Col span={2}>
                                        <a href="../shuyou-web/templet/financeAssetTemp.xlsx" download="数据模板-财务指标.xlsx" >模版下载</a>
                                    </Col>
                                    <Col span={4}>
                                        <div className="fn-mb-10">
                                            <span>选择文件：</span>
                                            <Upload ref="fUpload" {...financeAssetProps} disabled={financeAssetButton}>
                                                <Button type="ghost">
                                                    <Icon type="upload"/> 点击上传
                                                </Button>
                                            </Upload>

                                        </div>
                                    </Col>
                                    <Col span={2}>
                                        <span><h6>(上传文件格式.xlsx)</h6></span>
                                    </Col>
                                    <Col span={15}>
                                    </Col>
                                </Row>

                            </Panel>
                            <Panel header="征信数据" key="3">
                                <Row type="flex" justify="space-between" align="top">
                                    <Col span={2}>
                                        <a href="../shuyou-web/templet/corporateCreditTemp.xlsx" download="数据模板-征信数据.xlsx" >模版下载</a>
                                    </Col>
                                    <Col span={4}>
                                        <div className="fn-mb-10">
                                            <span>选择文件：</span>
                                            <Upload ref="coUpload" {...corporateCreditProps}
                                                    disabled={corporateCreditButton}>
                                                <Button type="ghost">
                                                    <Icon type="upload"/> 点击上传
                                                </Button>
                                            </Upload>

                                        </div>
                                    </Col>
                                    <Col span={2}>
                                        <span><h6>(上传文件格式.xlsx)</h6></span>
                                    </Col>
                                    <Col span={15}>
                                    </Col>
                                </Row>

                            </Panel>
                            <Panel header="经营数据" key="5">
                                <Row type="flex" justify="space-between" align="top">
                                    <Col span={2}>
                                        <a href="../shuyou-web/templet/operatingTemp.xlsx" download="数据模板-经营数据.xlsx" >模版下载</a>
                                    </Col>
                                    <Col span={4}>
                                        <div className="fn-mb-10">
                                            <span>选择文件：</span>
                                            <Upload ref="oUpload" {...operatingProps} disabled={operatingButton}>
                                                <Button type="ghost">
                                                    <Icon type="upload"/> 点击上传
                                                </Button>
                                            </Upload>
                                        </div>
                                    </Col>
                                    <Col span={2}>
                                        <span><h6>(上传文件格式.xlsx)</h6></span>
                                    </Col>
                                    <Col span={15}>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel header="行政处罚记录" key="6">
                                <Row type="flex" justify="space-between" align="top">
                                    <Col span={2}>
                                        <a href="../shuyou-web/templet/administrativeTemp.xlsx" download="数据模板-行政处罚记录.xlsx" >模版下载</a>
                                    </Col>
                                    <Col span={4}>
                                        <div className="fn-mb-10">
                                            <span>选择文件：</span>
                                            <Upload ref="aUpload" {...administrativeProps}
                                                    disabled={administrativeButton}>
                                                <Button type="ghost">
                                                    <Icon type="upload"/> 点击上传
                                                </Button>
                                            </Upload>

                                        </div>
                                    </Col>
                                    <Col span={2}>
                                        <span><h6>(上传文件格式.xlsx)</h6></span>
                                    </Col>
                                    <Col span={15}>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel header="诉讼记录" key="7">
                                <Row type="flex" justify="space-between" align="top">
                                    <Col span={2}>
                                        <a href="../shuyou-web/templet/recordTemp.xlsx" download="数据模板-诉讼记录.xlsx" >模版下载</a>
                                    </Col>
                                    <Col span={4}>
                                        <div className="fn-mb-10">
                                            <span>选择文件：</span>
                                            <Upload ref="rUpload" {...recordProps} disabled={recordButton}>
                                                <Button type="ghost">
                                                    <Icon type="upload"/> 点击上传
                                                </Button>
                                            </Upload>

                                        </div>
                                    </Col>
                                    <Col span={2}>
                                        <span><h6>(上传文件格式.xlsx)</h6></span>
                                    </Col>
                                    <Col span={15}>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

