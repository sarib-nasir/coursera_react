// import { COMMENTS } from '../shared/Comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = {err:null,comments:[]}, action) => {
    switch (action.type) {
        case ActionTypes.COMMENTS_FAILED:
            return{...state,err:action.payload,comments:[]}

        case ActionTypes.ADD_COMMENTS:
            return{...state,err:null,comments:action.payload}

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length
            comment.date = new Date().toISOString()
            return {...state, comments: state.comments.concat(comment)}
        default:
            return state;
    }
}