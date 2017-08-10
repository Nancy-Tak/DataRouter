/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History, Link} from 'react-router';
import {Row, Col, Menu, Icon, Breadcrumb} from 'antd';
import  {RouterContext}  from 'react-router'
export default class Search extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {
        itemRender: (route, params, routes, paths) => {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? <span>{route.breadcrumbName}</span> :
                <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
        }
    };

    constructor(props) {
        super(props);
        this.state = {current: 'data'};
    }

    render() {
        return (
            <div className="fn-pa-20">
                <div >
                    {/*Breadcrumb*/}
                    <Breadcrumb {...this.props} />
                </div>
                <div className="panel fn-mt-10">
                    <div>
                        {/* 主内容区 */}
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
