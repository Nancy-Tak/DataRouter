/*
 404页面
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd';
import './style.less';
export default class NoFound extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    handleSave() {
        this.context.router.push("/userLogin");
    }

    render() {
        return (
            <div className="error-wrap">
                <div className="error-img">
                    <img src='../../src/assets/images/404/404_1.png'/>
                </div>
                <div className="error-content">
                    <h1 className="fn-mb-15 fontcolor-info">页面不存在！</h1>
                    <div className="lh-24"> 很抱歉，你来晚了一步，它已经不在了...</div>
                    <div className="fn-mb-15">你要坚强些，继续发掘别的页面去吧</div>
                    <Button type="primary" onClick={this.handleSave.bind(this)}>返回首页</Button>
                </div>
            </div>
        );
    }
}
