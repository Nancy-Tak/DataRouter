import React, {Component} from 'react';
import {Router, History} from 'react-router';
import {
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Table,
    Button,
    Form,
    Alert
} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionHistory} from 'ACTION';
import moment from 'moment';
import {Report} from 'COM/template';
const SubMenu = Menu.SubMenu;
const createForm = Form.create;
const FormItem = Form.Item;
import './../../style.less'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'search'
        };
    }
    componentDidMount() {
        this.loadData();
    }
    componentWillUnmount(){
        this.props.action.recordUsersTemplateClear();
    }
    loadData() {
        let dataTemplateId = this.props.params.templateId;
        let dataProductCode = this.props.params.productCode;
        let dataQueryCode = this.props.params.queryCode;

        this.props.action.fetchrecordUsersTemplate(dataTemplateId, dataProductCode, dataQueryCode)
    }


    render() {




        return (
            <div className="fn-pa-10">
                <div className="panel">

                    内部产品名称：{this.props.location.query.productName} 查询编号：{this.props.routeParams.queryCode}
                    <div>{this.getHTML}</div>

                </div>
            </div>
        );
    }

    get getHTML(){
        const {recordUsersTemplate,recordUsersTemplateStatus} = this.props;

        //    '个人风险信息查询': 'QT010001',
        //    '个人信贷多次申请核查': 'QT010002',
        //    '消费及月度收支等级评估': 'QT010003',
        //    '稳定性评估': 'QT010004',

        var html = null;
        if (!recordUsersTemplate || recordUsersTemplateStatus.code!=200){
            console.log("recordUsersTemplateStatus1",recordUsersTemplateStatus)
            return;
        }else if(recordUsersTemplate && recordUsersTemplateStatus.code==200 && recordUsersTemplate.code==400){
            html =  (
                <div style={{"margin":"10px 0"}}>
                    <Alert message="查询失败" description={"错误原因：" + recordUsersTemplate.message} type="error" showIcon/>
                </div>
            )
        }
        else if(recordUsersTemplate && recordUsersTemplateStatus.code==200){
            console.log("recordUsersTemplateStatus2",recordUsersTemplateStatus)
            switch (this.props.routeParams.productCode) {
                case 'QT010001':
                    html = <Report.personalRiskInfo dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "没有数据",
                                id: this.props.location.query.id || "没有数据",
                                name: this.props.location.query.name || "没有数据",
                            }
                        }
                    }}/>;
                    break;
                case 'QT010003':
                    html = <Report.consumerBehaviors dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "没有数据",
                                id: this.props.location.query.id || "没有数据",
                                name: this.props.location.query.name || "没有数据",
                                email: this.props.location.query.mail || "没有数据",
                            }
                        }
                    }}/>;
                    break;
                case 'QT010004':
                    html = <Report.personalStability dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "没有数据",
                                id: this.props.location.query.id || "没有数据",
                                name: this.props.location.query.name || "没有数据",
                                email: this.props.location.query.mail || "没有数据",
                                homeCell: this.props.location.query.tel_home || "没有数据",
                                companyCell: this.props.location.query.tel_biz || "没有数据",
                            }
                        }
                    }}/>;
                    break;
                case 'QT010002':
                    html = <Report.personalCredit dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "没有数据",
                                id: this.props.location.query.id || "没有数据",
                                name: this.props.location.query.name || "没有数据",
                            }
                        }
                    }}/>;
                    break;
                default:
                    html = (
                        <div style={{"margin":"10px 0"}}>
                            <Alert message="查询失败" description={"错误原因：" + recordUsersTemplateStatus.message} type="error" showIcon/>
                        </div>
                    );
            }
        }else{
            html = <span>找不到后端数据</span>;
        }
        return html
    }



}

//export default createForm()(Data);
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        recordUsersTemplate: state.historyReducer.recordUsersTemplate,
        recordUsersTemplateStatus: state.historyReducer.recordUsersTemplateStatus,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionHistory, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Detail));
