/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History, Link} from 'react-router';
import {
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Table,
    Button,
    Popconfirm
} from 'antd';
import './../../style.less'
const SubMenu = Menu.SubMenu;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
class Source extends Component {
    static defaultProps = {
        institutions: {}, //数据机构列表
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 'search'
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {

        //获取数据机构列表
        let data = {
            "pageNum": 1,
            "pageSize": 10,
        }
        this.props.action.fetchInstitutionsList(data);
    }

    handleClick(e) {
        this.setState({current: e.key});
        //跳转
        let url = e.keyPath[1]
            ? "warning/" + e.keyPath[1] + "/" + e.key
            : "warning/" + e.key;
        this.props.history.push(url);
    }

    handleDetails() {
        alert("详情")
    }

    handleEditor() {
        alert("编辑")
    }

    handleDisable(obj, stateNum) {
        let objId = obj.id;
        let objState = obj.state;
        this.props.action.fetchInstitutionsState(objId, stateNum)
    }

    render() {
        let {
            institutions, //数据机构列表
        } = this.props;
        let _this = this;
        const pagination = {
            total: institutions.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            // pageSizeOptions:["1"],
            // pageSize:1,
            onShowSizeChange(current, pageSize) {
                let data = {
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                }
                _this.props.action.fetchInstitutionsList(data);
            },
            onChange(current) {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                }
                _this.props.action.fetchInstitutionsList(data);
            },
        };
        return (
            <div className="fn-pa-10" style={{minHeight: 700}}>
                <div className="panel">
                    <div>
                        <Table
                            ref='table'
                            columns={this.columns}
                            dataSource={institutions.list}
                            pagination={pagination}
                        />
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
                dataIndex: 'key',
                className: 'text-align-center',
                render: (text, record, index) => {
                    let current = self.refs.table && self.refs.table.state.pagination.current || 1;
                    let pageSize = self.refs.table && self.refs.table.state.pagination.pageSize || 10;
                    return (
                        <div>{(current-1)*pageSize+index+1}</div>
                    )
                }
            },
            {
                title: '机构编码',
                className: 'text-align-center',
                dataIndex: 'infraCode',
            },
            {
                title: '机构名称',
                className: 'text-align-center',
                dataIndex: 'name',
            },
            {
                title: '服务方式',
                dataIndex: 'serviceName',
                className: 'text-align-center',
                render: (text, record, index) => {
                    return (
                        <div>
                            {
                                record.serviceMethods.map((item, index) => {
                                    return (
                                        <span key={index}>{item.serviceName}&nbsp;</span>
                                    )
                                })
                            }
                        </div>
                    )
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                className: 'text-align-center',
                render: (text) => {
                    return (
                        <div>
                            {text == "1" ? "开启" : "关闭"}
                        </div>
                    )
                }
            },
            {
                title: '创建时间',
                className: 'text-align-center',
                dataIndex: 'createTime',
                render: (text) => {
                    return (
                        <div>
                            {moment(text).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                className: 'text-align-center',
                width:"150px",
                render: (text, record, index) => {
                    return (
                        <div>
                            <Link to={`/source/data/detail/${record.id}`}>详情</Link>
                            <span className="ant-divider"></span>
                            <Link to={`/source/data/editor/${record.id}`}>编辑</Link>
                            <span className="ant-divider"></span>
                            {record.state == '1'
                                ?
                                <Popconfirm title="禁用后将无法获取该数据机构提供的所有数据，确定禁用？"
                                            onConfirm={this.handleDisable.bind(this, record, 0)}
                                            okText="确定"
                                            cancelText="取消">
                                    <a href="javascript:void(0)">禁用</a>
                                </Popconfirm>
                                :
                                <Popconfirm title="启用后可获取该数据机构提供的所有数据，确定启用？"
                                            onConfirm={this.handleDisable.bind(this, record, 1)}
                                            okText="确定"
                                            cancelText="取消">
                                            <a  href="javascript:void(0)">开启</a>
                                </Popconfirm>
                            }

                        </div>
                    )
                }
            }
        ];
        return columns
    }

}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    ////console.log("state=>")
    ////console.log("hhh", state)
    return {
        institutions: state.sourceReducer.institutions
    }
}
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionSource, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Source);
