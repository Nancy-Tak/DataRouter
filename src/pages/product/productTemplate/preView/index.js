/**
 * Created by wuyq on 2016/11/1.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';
import {Report} from 'COM/template';

class ProductTplPreView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //    '个人风险信息查询': 'QT010001',
        //    '个人信贷多次申请核查': 'QT010002',
        //    '消费及月度收支等级评估': 'QT010003',
        //    '稳定性评估': 'QT010004',

        //console.log(this.props.routeParams.id);
        var html=null;
        switch(this.props.routeParams.id){
            case 'QT010001':
                html=<Report.personalRiskInfo disabled/>;
                break;
            case 'QT010003':
                html=<Report.consumerBehaviors disabled/>;
                break;
            case 'QT010004':
                html=<Report.personalStability disabled/>;
                break;
            case 'QT010002':
                html=<Report.personalCredit disabled/>;
                break;
            default :
                html ='阿哦，找不到对应的模板~';
        }
        return (
            <div>
                {html}
            </div>
        )
    }
}
export default ProductTplPreView;
