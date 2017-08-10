import { combineReducers } from 'redux';
import {loginReducer} from './login';
import { routerReducer } from 'react-router-redux';
import {sourceReducer} from './source';
import {productReducer} from './product';
import {searchReducer} from './search';
import {accountReducer} from './account';
import {roleReducer} from './role';
import {historyReducer} from './history';
import {systemReducer} from './system';
import {globalReducer} from './global';

// 将所有的reducer结合为一个,传给store
export default combineReducers({
    routing: routerReducer,
    loginReducer,
    sourceReducer,
    productReducer,
    searchReducer,
    accountReducer,
    roleReducer,
    historyReducer,
    systemReducer,
    globalReducer,
})
