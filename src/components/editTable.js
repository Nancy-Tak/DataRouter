import md5 from 'md5';
import React,{Component} from 'react';
import {Button,Icon,DatePicker,Row,Col,Select,InputNumber,Table,Input } from 'antd';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
/**
 * Created by Ethan on 2016/11/10.
 * 可编辑TABLE (FUCK YOU 版)
 * 在ANTD 基础上加功能，就是那么简单 , 按后台格式改写数据结构FUCK , 保存只提交对应数据fuck后台的小鲜肉。
 */
export class EditTable extends Component {
    static defaultProps = {
        mender: [], //修改过的都保存到此数据,保存后提交这个
        dataSource: [],
        onSaveHandler: null,
    }
    static propTypes = {
        mender: React.PropTypes.array,
        onSaveHandler: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            currentYear: this.props.defYear,
        }
    }

    componentDidMount() {
        if(this.props.defYear) {
            this.props.onYearChange && this.props.onYearChange(this.props.defYear);
        }
    }

    //获取formatter 类型 1. 正数数字文本编辑框  2. 选择框（变更|不变更|空）  3. 选择框（是|否|空）  4. 文本编辑框带%   5.可负数的数字文本编辑框  6 可负数的文本编辑框带% 
    renderFn(month, text, record, index) {
        switch(record.type) {
            case '1':
                if(this.state.isEdit) {
                    return (
                        <div>
                            <InputNumber
                                onChange={this.handleItemChange.bind(this,record,index,month)}
                                style={{ width: 75 }}
                                min={0}
                                size="small"
                                defaultValue={text||''}/>
                        </div>
                    )
                } else {
                    return text;
                }
                break;
            case '2':
                if(this.state.isEdit) {
                    return (
                        <Select defaultValue={text}
                                size="small"
                                style={{ width: 75 }}
                                onChange={this.handleItemChange.bind(this,record,index,month)}>
                            <Option value="1">&nbsp;</Option>
                            <Option value="2">无变更</Option>
                            <Option value="3">变更</Option>
                        </Select>
                    )
                } else {
                    var t = "";
                    switch(text) {
                        case '1':
                            t = '  ';
                            break;
                        case '2':
                            t = '无变更';
                            break;
                        case '3':
                            t = '变更';
                            break;
                    }
                    return t;
                }
                break;
            case '3':
                if(this.state.isEdit) {
                    return (
                        <Select defaultValue={text}
                                onChange={this.handleItemChange.bind(this,record,index,month)}
                                size="small"
                                style={{ width: 75 }}>
                            <Option value="1">&nbsp;</Option>
                            <Option value="2">是</Option>
                            <Option value="3">否</Option>
                        </Select>
                    )
                } else {
                    var t = "";
                    switch(text) {
                        case '1':
                            t = '  ';
                            break;
                        case '2':
                            t = '是';
                            break;
                        case '3':
                            t = '否';
                            break;
                    }
                    return t;
                }
            case '4':
                if(this.state.isEdit) {
                    return (
                        <div>
                            <InputNumber
                                onChange={this.handleItemChange.bind(this,record,index,month)}
                                style={{ width: 45 }}
                                min={0}
                                size="small"
                                defaultValue={text||''}/>
                            <span> %</span>
                        </div>
                    )
                } else {
                    return text ? text + '%' : '';
                }
                break;
            case '5':
                if(this.state.isEdit) {
                    return (
                        <div>
                            <InputNumber
                                onChange={this.handleItemChange.bind(this,record,index,month)}
                                style={{ width: 75 }}
                                min={-999}
                                size="small"
                                defaultValue={text||''}/>
                        </div>
                    )
                } else {
                    return text;
                }
                break;
            case '6':
                if(this.state.isEdit) {
                    return (
                        <div>
                            <InputNumber
                                onChange={this.handleItemChange.bind(this,record,index,month)}
                                style={{ width: 45 }}
                                min={-999}
                                size="small"
                                defaultValue={text||''}/>
                            <span> %</span>
                        </div>
                    )
                } else {
                    return text ? text + '%' : '';
                }
                break;
        }
        return 'error type格式不符,请联系钱途开发人员';
    }

    handleItemChange(record, index, month, e) {
        let {dataSource,mender} = this.props;
        let {currentYear}= this.state;
        var obj = dataSource[index];
        var item = getItemByMonth(month, obj.indicators);
        if(item) {
            item.editType = record.type;
            item.indicatorId = obj.indicatorId;
            item.year = currentYear;
            item.key = md5([obj.indicatorId, obj.indicatorName, item.companyIndicatorId, item.month].join());  //对比用 
        }
        //判断是否已有
        if(getItemOnMender(item)) {  //有就直接赋值
            //console.log('更改');
            getItemOnMender(item).indicatorValue = e;
        } else {//没就加入
            // console.log('增加');
            if(e != null && typeof(e) != undefined) {
                item.indicatorValue = e;
                mender.push(item);
            }
        }
        function getItemByMonth(num, arr) {
            for(var i = 0; i < arr.length; i++) {
                var o = arr[i];
                if(o.month == num) {
                    return o;
                }
            }
            return {
                "month": num,
            };
        }

        function getItemOnMender(item) {
            for(var j = 0; j < mender.length; j++) {
                var ob = mender[j];
                if(ob.key == item.key) {
                    return ob;
                }
            }
            return false;
        }
    }

    handleYearChange(e) {
        this.setState({
            currentYear: e,
        });
        this.props.onYearChange && this.props.onYearChange(e);
    }

    handleClickSave(e) {
        this.setState({
            isEdit: !this.state.isEdit,
        });
        // console.log('mender',this.mender);
        this.props.onSaveHandler && this.props.onSaveHandler(this.mender.concat());
        this.props.mender.splice(0, this.props.mender.length);
        // console.log('mender',this.mender);
    }

    handleClickEdit(e) {
        this.setState({
            isEdit: !this.state.isEdit,
        });
    }

    render() {
        let {isEdit,currentYear}= this.state;
        return (
            <div>
                <div className="fn-mb-10">
                    <span>年份：</span>
                    <Select
                        disabled={isEdit?true:false}
                        value={currentYear}
                        style={{ width: 150 }}
                        onChange={this.handleYearChange.bind(this)}>
                        <Option value="2015">2015</Option>
                        <Option value="2016">2016</Option>
                        <Option value="2017">2017</Option>
                    </Select>
                    <Button style={{display: isEdit ?'none':'inline-block'}} className="fn-ml-20"
                            icon="edit"
                            onClick={this.handleClickEdit.bind(this)}>编辑</Button>
                    <Button style={{display: isEdit ?'inline-block ':'none'}} type="primary"
                            className="fn-ml-20"
                            icon="save"
                            onClick={this.handleClickSave.bind(this)}>保存</Button>
                </div>
                <Table columns={this.columns}
                       dataSource={this.dataSource}
                       pagination={false}/>
            </div>
        )
    }

    //改数据格式
    get dataSource() {
        let newData = [];
        let {dataSource} = this.props;
        if(!dataSource)return;
        for(var i = 0; i < dataSource.length; i++) {
            var obj = dataSource[i];
            var newObj = {
                name: obj.indicatorName,
                type: obj.editType.toString(),
                month_1: getValueByMonth(1, obj.indicators),
                month_2: getValueByMonth(2, obj.indicators),
                month_3: getValueByMonth(3, obj.indicators),
                month_4: getValueByMonth(4, obj.indicators),
                month_5: getValueByMonth(5, obj.indicators),
                month_6: getValueByMonth(6, obj.indicators),
                month_7: getValueByMonth(7, obj.indicators),
                month_8: getValueByMonth(8, obj.indicators),
                month_9: getValueByMonth(9, obj.indicators),
                month_10: getValueByMonth(10, obj.indicators),
                month_11: getValueByMonth(11, obj.indicators),
                month_12: getValueByMonth(12, obj.indicators),
            }
            newData.push(newObj);
        }
        function getValueByMonth(num, arr) {
            for(var i = 0; i < arr.length; i++) {
                var o = arr[i];
                if(o.month == num) {
                    return o.indicatorValue;
                }
            }
            return null;
        }

        return newData;
    }

    //根据数据类型生成columns
    get columns() {
        const columns = [
            {
                title: '指标',
                dataIndex: 'name',
            }, {
                title: '1月',
                className: 'text-align-center',
                dataIndex: 'month_1',
                render: this.renderFn.bind(this, 1)
            }, {
                title: '2月',
                dataIndex: 'month_2',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 2)
            }, {
                title: '3月',
                dataIndex: 'month_3',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 3)
            }, {
                title: '4月',
                dataIndex: 'month_4',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 4)
            }, {
                title: '5月',
                dataIndex: 'month_5',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 5)
            }, {
                title: '6月',
                dataIndex: 'month_6',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 6)
            }
            , {
                title: '7月',
                dataIndex: 'month_7',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 7)
            }
            , {
                title: '8月',
                dataIndex: 'month_8',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 8)
            }
            , {
                title: '9月',
                dataIndex: 'month_9',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 9)
            }
            , {
                title: '10月',
                dataIndex: 'month_10',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 10)
            }, {
                title: '11月',
                dataIndex: 'month_11',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 11)
            }, {
                title: '12月',
                dataIndex: 'month_12',
                className: 'text-align-center',
                render: this.renderFn.bind(this, 12)
            }];
        return columns;
    }

    get mender() {
        return this.props.mender;
    }
}