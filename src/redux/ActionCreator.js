import * as ActionTypes from './ActionTypes'
import {DISHES} from '../shared/Data'
import {baseUrl}  from '../shared/baseUrl'
// import { actionTypes } from 'react-redux-form'

export const addComment = (comment) => ({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
})
export const postComment = (dishId,rating ,author, comment) => (dispatch)=>{
    const newComment = {
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }
    newComment.date = new Date().toISOString()

    fetch(baseUrl + 'comments', {
        method:'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('error '+ response.status + ': '+response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
          throw error;
    })
    .then(response=> response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
}
export const fetchDishes=()=> (dispatch) => {
    dispatch(dishesLoading(true))

    return (
        fetch(baseUrl +'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
    )
}
export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
})
export const dishesFailed=(err)=>({
    type: ActionTypes.DISHES_FAILED,
    payload: err
})
export const addDishes=(dishes)=>({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchComments=()=> (dispatch)=>{
    return(
        fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
    )
}
export const addComments= (comments)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})
export const commentsFailed=(err)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:err,
})

export const fetchPromos =()=>(dispatch)=>{
    fetch(baseUrl + 'promotions')
    .then(response=> response.json())
    .then(promos => dispatch(addPromos(promos)))
}
export const promosLoading=()=>({
    type:ActionTypes.PROMOTIONS_LOADING
})
export const promosFailed=(err)=>({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: err
})
export const addPromos=(promos)=>({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promos
})