import * as actionType from '../actionType'

export const createDraftReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.CREATE_DRAFT_REQUEST:
            return { loading: true }

        case actionType.CREATE_DRAFT_SUCCESS:
            return {
                loading: false,
                draft: action.payload,
                success: true
            }
        case actionType.CREATE_DRAFT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionType.CREATE_DRAFT_RESET:
            return {}
        default:
            return state;
    }
}

export const draftsListReducer = (state = { drafts: [] }, action) => {
    switch (action.type) {
        case actionType.DRAFTS_LIST_REQUEST:
            return {
                loading: true
            }
        case actionType.DRAFTS_LIST_SUCCESS:
            return {
                loading: false,
                drafts: action.payload
            }
        case actionType.DRAFTS_LIST_ERROR:
            return {
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}

export const deleteDraftReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.DELETE_DRAFT_REQUEST:
            return { loading: true }
        case actionType.DELETE_DRAFT_SUCCESS:
            return { loading: false, success: true }
        case actionType.DELETE_DRAFT_FAIL:
            return { loading: false, error: action.payload }
        case actionType.DELETE_DRAFT_RESET:
            return {}
        default:
            return state;
    }
}