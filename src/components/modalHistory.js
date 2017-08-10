/**
 * Created by Ethan on 2016/11/17.
 *
 */
import React,{Component} from 'react';
import {Button,Icon,DatePicker,Row,Col,Select,InputNumber,Table,Input,Modal,Form} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
export class ModalHistory extends Component {
    static defaultProps = {
        dataSource: [],
        form: null,
    }
    static propTypes = {
        form: React.PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            editData: null,
            modalLoading: false,
            modalVisible: false,
        }
    }

    componentWillMount() {
    }

    componentDidUpdate() {
    }

    handleModalOk(e) {
        this.setState({modalLoading: true});
        this.props.onClickOk && this.props.onClickOk(e);
    }

    handleModalCancel(e) {
        this.setState(
            {modalVisible: false}
        );
    }

    hideModal() {
        this.setState({modalLoading: false, modalVisible: false});
    }

    showModal(data) {
        this.setState({
            modalVisible: true,
            rowData: data,
            loading: true
        });
    }

    render() {
        let {rowData}= this.state;
       // console.log(this.props.dataSource)
        return (
            <Modal ref="modal"
                   width='900'
                   wrapClassName="vertical-center-modal"
                   visible={this.state.modalVisible}
                   title="处理历史"
                   onOk={this.handleModalOk.bind(this)}
                   onCancel={this.handleModalCancel.bind(this)}
                   footer={[
                                <Button key="back" type="ghost" size="large" 
                                onClick={this.handleModalCancel.bind(this)}>返 回</Button>
                              ]}>
                <Table columns={this.columns}
                       loading={this.props.dataSource?false:true }
                       dataSource={this.props.dataSource}
                       pagination={false}/>
            </Modal>
        )
    }

    //根据数据类型生成columns
    get columns() {
        const columns = [
            {
                title: '操作时间',
                className: 'text-align-center',
                dataIndex: 'operatorTime',
            }, /*{
                title: '预警原因',
                className: 'text-align-center',
                dataIndex: 'operatorReason',  
            }, */{
                title: '处理操作',
                dataIndex: 'operationState',
                className: 'text-align-center',
                render: function(text, record) {
                    if(text != null && text != '' && text != 'null') {
                        var str = '';
                        switch(text.toString()) {
                            case '1':
                                str = '待处理';
                                break;
                            case '2':
                                str = '处理为处理中';
                                break;
                            case '3':
                                str = '警报解除';
                                break;
                            case '4':
                                str = '处理为风险事项';
                                break;
                            default:
                                str = '参数问题';
                                break;
                        }
                        return (<span>{str}</span> );
                    } else {
                        return (<span></span> );
                    }
                }
            }, {
                title: '预警级别',
                dataIndex: 'alarmLevel',
                className: 'text-align-center', //0/无，1/黄色预警，2/红色预警
                render: function(text, record) {
                    switch(text) {
                        case 0:
                            return (<span>无</span>);
                            break;
                        case 1:
                            return (<i className="circle circle-yellow"></i>);
                            break;
                        case 2:
                            return (<i className="circle circle-red"></i>);
                            break;
                        case 3:
                            return (<i className="circle circle-black"></i>);
                            break;
                    }
                    return (<span>无</span> );
                }
            }, {
                title: '备注',
                dataIndex: 'comments',
                className: 'text-align-center',
            }, {
                title: '操作人',
                dataIndex: 'operator',
                className: 'text-align-center',
            }]
        return columns;
    }
}
// 
