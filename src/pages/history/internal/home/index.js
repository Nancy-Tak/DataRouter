/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History,Link} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionHistory} from 'ACTION';
import moment from 'moment';

import {
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Table,
    Button,
    Form,
    Input,
    Select
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;

import './../../style.less'

class Internal extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {
        recordInternalProducts:{},
        recordInternalProductsProducts:[]
    }
    constructor(props) {
        super(props);
        this.state = {
            current: 'search',
            //记录当前 productTypeId
            productTypeId:0,
        };
    }
    componentDidMount(){
        this.loadData();
    }
    //加载数据
    loadData(){
        /**
         * all 1表示显示全部，0为根据其他字段搜索
         * pageNum 页码数
         * pageSize 条数
         * productTypeId 内部产品类型ID
         */
        let data = {
            "all":1,
            "pageNum":1,
            "pageSize":10,
        }
        this.props.action.fetchInternalProducts(data)
    }
    handleDetails(record){
        this.context.router.push({
          pathname: `/history/internal/detail/${record.id}`,
          query: {
              productName: record.productName,
          },
        });
    }
    //内部产品类型
    // datasourcesData(){
    //     const { recordInternalProductsProducts } = this.props;
    //     let recordRecordDatasourcesProducts = recordInternalProductsProducts || [];
    //     let result = [];
    //     recordRecordDatasourcesProducts.map( (item,index)=>{
    //             result.push({
    //                 "value":item.id,
    //                 "label":item.name,
    //             })
    //     })
    //     return result;
    // }
    render() {
        const {
            recordInternalProducts,
            recordInternalProductsProducts
        } = this.props;
        //let datasourcesData = this.datasourcesData();

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const productTypeProps = getFieldProps('productTypeId', {
            initialValue:"",
            onChange: (value) => {
                let data = {}
                if(value==0){
                    data = {
                        "all":1,
                        "pageNum":1,
                        "pageSize":10,
                    }
                }else{
                    data= {
                        "all":0,
                        "pageNum":1,
                        "pageSize":10,
                        "productTypeId":value || null,
                    }

                }

                this.props.action.fetchInternalProducts(data)
            }

        });

        let _this = this;
        //分页配置
        const pagination = {
            total:recordInternalProducts.total,
            showSizeChanger: true,
            pageSizeOptions:["10","20","50","100"],
            // pageSizeOptions:["1"],
            // pageSize:1,
            onShowSizeChange(current, pageSize) {
                const form = _this.props.form;
                let data = {};
                if( form.getFieldValue('productTypeId')==0 ){
                    data = {
                        "all":1,
                        "pageNum":current || null,
                        "pageSize":pageSize || null,
                    }
                }else{
                    data = {
                        "all":0,
                        "pageNum":current || null,
                        "pageSize":pageSize || null,
                        "productTypeId":form.getFieldValue('productTypeId') || null
                    }
                }
                _this.props.action.fetchInternalProducts(data);
            },
            onChange(current) {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                const form = _this.props.form;
                let data = {};
                if( form.getFieldValue('productTypeId')==0 ){
                    data = {
                        "all":1,
                        "pageNum":current || null,
                        "pageSize":pageSize || null,
                    }
                }else{
                    data = {
                        "all":0,
                        "pageNum":current || null,
                        "pageSize":pageSize || null,
                        "productTypeId":form.getFieldValue('productTypeId') || null
                    }
                }

                _this.props.action.fetchInternalProducts(data);
                console.log('Current: ', current);
            },
        };
        //内部产品查询记录 Option 信息
        if(recordInternalProductsProducts){
            //recordInternalProductsProducts.unshift({id:'',name:'全部'});
            var innerProductTypeHtml = recordInternalProductsProducts.map((item,index)=>{
                return  <Option key={index} value={item.id.toString()}>{item.name}</Option>
            })
        }

        return (
            <div className="fn-pa-10">
                <div className="panel">

                    <div className="fn-pa-10">

                        <Form inline className="ant-advanced-search-form">
                            <FormItem   label="内部产品类型">
                                <Select
                                style={{ width: 150 }}
                                {...productTypeProps}
                                >
                                    {innerProductTypeHtml}
                                </Select>

                            </FormItem>
                        </Form>

                    </div>
                    <div>
                        <Table
                            ref='table'
                            columns={this.columns}
                            dataSource={recordInternalProducts.list}
                            pagination={pagination}
                            /> {/*
                        title={() => '页头'}
                        footer={() => '页脚'}
                    */}
                    </div>
                </div>
            </div>
        );
    }

    //初始化表格
    get columns() {
        var self = this;
        const columns = [
            {
                title: '序号',
                dataIndex: 'ceshi1',
                render: (text, record, index) => {
                    let current = self.refs.table && self.refs.table.state.pagination.current || 1;
                    let pageSize = self.refs.table && self.refs.table.state.pagination.pageSize || 10;
                    return (
                        <div>{(current-1)*pageSize+index+1}</div>
                    )
                }
            }, {
                title: '内部产品编号',
                dataIndex: 'productCode'
            }, {
                title: '内部产品名称',
                dataIndex: 'productName'
            }, {
                title: '内部产品类型',
                dataIndex: 'productType'

            }, {
                title: '查询次数',
                dataIndex: 'queryTimes'

            }, {
                title: '最近一次查询时间',
                dataIndex: 'lastQueryTime'

            }, {
                title: '操作',
                dataIndex: 'id',
                className: 'text-align-center',
                width:"150px",
                render: (text, record, index) => {
                    return (
                        <div>
                            {/*<Link to={`/history/internal/detail/${record.id}`}>详情</Link>*/}
                            <a href="javascript:;" onClick={self.handleDetails.bind(this,record)}>详情</a>
                        </div>
                    )
                }
            }
        ];
        return columns
    }


}


//export default createForm()(Data);
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        recordInternalProducts:state.historyReducer.recordInternalProducts,
        recordInternalProductsProducts:state.historyReducer.recordInternalProductsProducts,
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

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Internal));
