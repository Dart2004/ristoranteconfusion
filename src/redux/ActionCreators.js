import * as ActionTypes from "./ActionTypes";
import { baseURL } from '../shared/baseURL';
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseURL + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(errmess => console.log(errmess))
}

export const fetchComments = () => (dispatch) => {
    return fetch(baseURL + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(errmess => console.log(errmess))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    return fetch(baseURL + 'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(errmess => console.log(errmess))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    return fetch(baseURL + 'leaders')
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})