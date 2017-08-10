import React,{Component} from 'react';
import { Select,Input,Button, Icon } from 'antd';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
const Option = Select.Option;
/**
 * Created by Ethan on 2016/11/14.
 * 动态提示搜索框
 */
let timeout;
let currentValue;
function getData(value, callback) {
    if(timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    function fake() {
        const body = {
            companyName: value
        }
        fetch('api/shuyou/api/companys', {
            method: 'post',
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(
                function(json) {
                    if(currentValue === value) {
                        const result = json.data;
                        var data = [];
                        result.forEach((r) => {
                            data.push({
                                value: r.companyName,
                                id: r.id,
                            });
                        });
                        callback(data);
                    }
                }
            )
    }

    timeout = setTimeout(fake, 300);
}
export class DynamicSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: '',
            focus: false,
        }
    }

    handleChange(value) {
        
        var self = this;
        this.setState({value});
        getData(value, function(data) {
            self.setState({data})
        });
    }

    handleSubmit() {
        this.props.onSubmit && this.props.onSubmit(this.state.value);
        //console.log('输入框内容是: ', this.state.value);
    }

    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
    }

    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        const options = this.state.data.map(d => <Option key={d.value}>{d.value}</Option>);
        return (
            <div className="ant-search-input-wrapper" style={this.props.style}>
                <Input.Group className={searchCls}>
                    <Select
                        combobox
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        notFoundContent=""
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onChange={this.handleChange.bind(this)}
                        onFocus={this.handleFocusBlur.bind(this)}
                        onBlur={this.handleFocusBlur.bind(this)}>
                        {options}
                    </Select>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} onClick={this.handleSubmit.bind(this)}>
                            <Icon type="search"/>
                        </Button>
                    </div>
                </Input.Group>
            </div>
        )
    }
}