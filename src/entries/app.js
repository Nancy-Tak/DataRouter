/**
 * 入口文件
 */
import React from 'react';
import ReactDom from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from '../routes';
import {Provider} from 'react-redux';
import {createHistory} from 'history'
import configureStore from '../store/configureStore';
import 'ASSETS/less/main.less';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
ReactDom.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>
    , document.getElementById('root'))
