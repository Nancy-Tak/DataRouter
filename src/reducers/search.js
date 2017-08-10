/**
 * Created by Ethan on 2016/11/21.
 */
import {actionSearch} from 'ACTION';
export function searchReducer(state = {
    templateData: null,
    templateDataError: null,
}, action) {
    switch(action.type) {
        case actionSearch.SEARCH_SELECT_LEAVE:
            return {
                ...state,
                data: null
            }
            break;
        case actionSearch.GET_TYPESANDTEMPLATES_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
            break;
        case actionSearch.RECEIVE_TEMPLATE_DATASEARCH:
            let templateData = action.payload;
            return Object.assign({}, state,
                {
                    templateData: templateData
                },
                action);
            break;
        case actionSearch.RECEIVE_TEMPLATE_DATASEARCH_ERROR:
            let templateDataError = action.payload;
            return {
                ...state,
                templateDataError
            }
            break;
        case actionSearch.CLEAR_MESSAGE:
            return {
                ...state,
                templateDataError: null
            }
            break;
        case actionSearch.CLEAR_TEMPLATEDATA:
            return {
                ...state,
                templateData: null
            }
            break;
        default:
            return state;
    }
}
