import * as actionType from '../actionType'

export const draftsListReducer = (state = { drafts: [] }, action) => {
    switch (action.type) {
        case actionType.GET_DRAFTS_LIST:
            return {
                ...state,
                drafts: action.payload
            }
        default:
            return state;
    }
}