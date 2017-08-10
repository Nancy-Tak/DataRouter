/**
 * Created by Ethan on 2016/12/19.
 * 权限控件
 */
import React, {Component, PropTypes} from 'react';
import {actionLogin} from 'ACTION';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
//获取COOKIS 权限 fuck
const getAuth = function(id, callback) {
    let authObj;
    let auth = cookie.load('DRM_AUTH');
    let username = cookie.load('DRM_USERNAME');
    if(auth) {
        let auths = auth.split("-");
        let authObj = [];
        for(var i = 0; i < auths.length; i++) {
            var obj = {};
            obj.key = auths[i];
            authObj.push(obj);
        }
        return authObj;
    }
};
class Auth extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    static defaultProps = {
        id: null,  //权限ID
        isLogined: null, //是否登录
        auth: null,
    }
    static propTypes = {
        id: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        this.loginStatus();
        // return this.auth ? React.cloneElement(this.props.children, {...this.props}) : null;
        return this.auth ? this.props.children : null;
    }

    //登录状态
    loginStatus() {
        const {isLogined, logoutMsg, routing}=this.props;
        if(!isLogined && !logoutMsg && !routing.locationBeforeTransitions.pathname.includes('userLogin')) {
            this.context.router.push('/userLogin');
        }
        return (<div>请登录</div>);
    }

    get auth() {
        const {auth} = this.props;
        if(!auth)return false;
        for(let i = 0; i < auth.length; i++) {
            let authItem = auth[i];
            if(authItem.key && this.props.id === authItem.key) {
                return true;
            }
        }
        return false;
    }
}
const authClass = connect(
    (state, props) => ({
        routing: state.routing,
        isLogined: state.loginReducer.isLogined,
        auth: state.loginReducer.auth,
        logoutMsg: state.loginReducer.logoutMsg,
    }),
    dispatch => bindActionCreators({
            actionLogin: actionLogin,
        },
        dispatch)
)(Auth)
function checkAuth(ids, replace, urls) {
    let auth = getAuth();
    if(!auth) {
        replace && replace('', '/');
        return false;
    }
    for(let i = 0; i < auth.length; i++) {
        let authItem = auth[i];
        for(let j = 0; j < ids.length; j++) {
            let id = ids[j];
            if(authItem.key && id === authItem.key) {
                replace && replace('', urls[j]);
                return;
            }
        }
    }
    return;
}
function jsAuth(id) {
    let auth = getAuth();
    if(!auth) {
        replace && replace('', '/');
        return false;
    }
    for(let i = 0; i < auth.length; i++) {
        let authItem = auth[i];
        if(authItem.key && id === authItem.key) {
            return true;
        }
    }
    return false;
};
export default {
    react: authClass, //标签用
    route: checkAuth, //路由用
    js: jsAuth //js 判断用
}