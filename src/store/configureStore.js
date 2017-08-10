import rootReducer from 'REDUCERS';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import fetchMiddleware from './middleware/fetchMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';
const routersMiddleware = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger({
    colors: {
        title: function() {
            return '#9B30FF'
        },
        prevState: function() {
            return '#8B8878'
        },
        action: function() {
            return '#EEEE00'
        },
        nextState: function() {
            return '#698B22'
        },
    },
    timestamp: true,
    level: 'log',
    duration: true,
    diff: false,
});
/**
 * 中间件
 */
const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
       // loggerMiddleware,// 一个很便捷的 middleware，用来打印 action 日志 （用DevTools代替）
        routersMiddleware,
        fetchMiddleware
    )
)(createStore)
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    if(module.hot) { //模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要页面刷新.
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store;
}
