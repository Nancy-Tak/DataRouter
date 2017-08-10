import React,{Component} from 'react';
import { Select,Input,Button, Icon } from 'antd';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
const Option = Select.Option;
/**
 * Created by Ethan on 2016/11/14.
 * 动态提示选择框
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
        fetch('/shuyou/api/companys', {
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
export class DynamicSelect extends Component {
    static defaultProps = {}
    static propTypes = {}

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectId: null,
            value: undefined,
        }
    }

    componentWillMount() {
        const {defaultValue } = this.props;
        var self = this;
        if(defaultValue) {
            getData(defaultValue, function(data) {
                self.setState({data}, function() {
                })
            });
        }else{
            getData('', function(data) {
                self.setState({data}, function() {
                })
            });
        }
    }

    componentWillReceiveProps() {
    }

    set cValue(name) {
        var self = this;
        this.setState({
            value: name
        })
        getData(name, function(data) {
            self.setState({data})
        });
    }

    handleChange(value) {
        var self = this;
        getData(value, function(data) {
            self.setState({data})
        });
    }

    handleSelect(e) {
        this.setState({
            value: e
        })
        this.props.onSelect && this.props.onSelect(e);
    }

    render() {
        const {defaultValue } = this.props;
        //this.state.value = defaultValue
        const options = this.state.data.map(d => <Option key={d.id} value={d.id.toString()}>{d.value}</Option>);
        return (
            <Select
                showSearch
                value={this.state.value}
                ref="dynamicSelect"
                style={this.props.style}
                placeholder="请输入企业名称"
                notFoundContent="无法找到企业信息"
                defaultActiveFirstOption={true}
                showArrow={true}
                filterOption={false}
                onSelect={this.handleSelect.bind(this)}
                onSearch={this.handleChange.bind(this)}>
                {options}
            </Select>
        )
    }
}