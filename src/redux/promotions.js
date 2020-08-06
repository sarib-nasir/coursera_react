// import { PROMOTIONS } from '../shared/Promotion';
import * as ActionTypes from './ActionTypes';

export const Promotions = (state= {isLoading:true,err:null,promotions:[]},action)=> {
    switch(action.type){
        case ActionTypes.ADD_PROMOTIONS:
            return {...state,isLoading:false, err: null, promotions: action.payload}
        case ActionTypes.PROMOTIONS_LOADING:
            return {...state,isLoading:true, err: null, promotions: []}
        case ActionTypes.PROMOTIONS_FAILED:
            return {...state,isLoading:false, err: action.payload, promotions: []}

        default:
            return state;
    }
}