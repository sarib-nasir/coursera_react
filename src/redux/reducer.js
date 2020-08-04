import {DISHES} from '../shared/Data'
import { COMMENTS } from '../shared/Comments';
import { PROMOTIONS } from '../shared/Promotion';
import { LEADERS } from '../shared/Leader';

export const initialState={
    dishes:DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
}
export const Reducer = (state= initialState,action)=>{
    return state;
}