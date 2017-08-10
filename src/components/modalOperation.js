/**
 * Created by Ethan on 2016/11/17.
 *
 */
import React,{Component} from 'react';
import {Button,Icon,DatePicker,Row,Col,Select,InputNumber,Table,Input,Modal,Form} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
export class ModalOperation extends Component {
    static defaultProps = {
        dataSource: [],
        onSaveHandler: null,
        form: null,
    }
    static propTypes = {
        onSaveHandler: React.PropTypes.func,
        form: React.PropTypes.object
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

    componentDidMount() {
    }

    handleModalOk(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.setState({modalLoading: true});
                this.props.onClickOk && this.props.onClickOk(values, this.state.rowData.id, this.cause);
            }
        });
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
        });
        this.props.form.setFieldsValue({
            remark: '',
        });
        const {setFields} = this.props.form; //用于和表单进行双向绑定
        setFields({
            operationState: {
                value: data.operationState || '1'
            }
        });
    }

    render() {
        let {rowData}= this.state;
        const {getFieldProps} = this.props.form; //用于和表单进行双向绑定
        return (
            <Modal ref="modal"
                   wrapClassName="vertical-center-modal"
                   visible={this.state.modalVisible}
                   title="预警处理"
                   onOk={this.handleModalOk.bind(this)}
                   onCancel={this.handleModalCancel.bind(this)}
                   footer={[
                                <Button key="submit" type="primary" size="large" 
                                loading={this.state.modalLoading} 
                                onClick={this.handleModalOk.bind(this)}>提 交</Button>,
                                <Button key="back" type="ghost" size="large" 
                                onClick={this.handleModalCancel.bind(this)}>返 回</Button>
                              ]}>
                <Form horizontal>
                    {/*<FormItem
                     label="预警原因："
                     labelCol={{ span: 4 }}
                     wrapperCol={{ span: 20 }}>
                     <p className="ant-form-text">{this.cause}</p>
                     </FormItem>*/}
                    <FormItem
                        label="处理操作："
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        required>
                        <Select
                            {...getFieldProps('operationState',
                                {
                                    initialValue: '1',
                                    rules: [{required: true, message: '操不能为空'}],
                                }
                            )}
                            style={{ width: 200 }}>
                            <Option value="1">待处理</Option>
                            <Option value="2">处理中</Option>
                            <Option value="3">解除</Option>
                            <Option value="4">风险事件</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="备注："
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        required>
                        <Input type="textarea"
                            {...getFieldProps('remark', {
                                initialValue: '',
                                rules: [{required: true, message: '备注不能为空'}],
                            })}
                               placeholder="请输入备注"
                        />
                    </FormItem>

                </Form>
            </Modal>
        )
    }

    get cause() {
        let {rowData}= this.state;
        var str = '';
        switch(rowData.alarmLevel) { // 0/无，1/黄色预警，2/红色预警 3黑色风险事项
            case 0:
                str = '';
                break;
            case 1:
                str = '黄色预警';
                break;
            case 2:
                str = '红色预警';
                break;
            case 3:
                str = '处理为风险事项';
                break;
        }
        str += ', ' + rowData.indicatorName + rowData.description;
        return str;
    }
}
