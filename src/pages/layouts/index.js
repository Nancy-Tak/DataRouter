import React, {Component} from 'react';
import {Menu, Icon, message, Modal, Spin} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionLogin, globalReducer} from 'ACTION';
import Header from './common/header';
import Footer from './common/footer';
import Leftbar from './common/leftbar';
import './style.less';

class Index extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    static defaultProps = {
        logoutMsg: '',
        loading: {
            show: false,
            tip: '',
        },
    }
    static propTypes = {}

    constructor(props) {
        super(props);
        this.state = {
            systemAsideState: true,
        }
    }

    componentWillMount() {
        //判断是否已经登录过
        this.props.setLoginStatus();
    }

    componentDidUpdate() {
        if(this.props.logoutMsg) {
            Modal.success({
                title: '提示',
                content: '退出登录成功',
                onOk: () => {
                    this.context.router.push("/userLogin");
                    this.props.clearModal();
                }
            });
        }
    }

    handleLogout() {
        this.props.fetchLogout();
    }

    handleSystemAside(e) {
        this.setState({
            systemAsideState: !this.state.systemAsideState
        })
    }

    render() {
        let style = this.state.systemAsideState ? "system-container fold-for-aside" : "system-container";
        const {loading} = this.props;
        return (
            <div className="main-frm" style={{height: '100%'}}>
                <Header username={this.props.username} exitHandler={this.handleLogout.bind(this)}/>
                <div className={style}>
                    <div className="system-content-wrap">
                        <div className="system-content">
                            <div className="frame-wrap-bg">
                                {/* 左边容区 */}
                                <Leftbar handleStateCur={this.props.location.pathname}
                                         callback={this.handleSystemAside.bind(this)}/>
                                <Spin size="large" tip={loading.tip} spinning={loading.show}>
                                    <div className="frame-wrap">
                                        {this.props.children}
                                    </div>
                                </Spin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    (state, props) => ({
        logoutMsg: state.loginReducer.logoutMsg,
        loading: state.globalReducer.loading,
        username:state.loginReducer.username,
    }),
    dispatch => bindActionCreators({
            clearModal: actionLogin.clearModal,
            fetchLogout: actionLogin.fetchLogout,
            setLoginStatus: actionLogin.setLoginStatus,
        },
        dispatch)
)(Index)