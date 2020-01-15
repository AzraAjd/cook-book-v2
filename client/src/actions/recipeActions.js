import axios from 'axios';
import { GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, RECIPES_LOADING, SEARCH_RECIPES, GET_ONE_RECIPE} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errActions'

export const searchRecipes = name => dispatch => {
    axios
        .get(`http://localhost:8080/recipes/${name}`)
        .then(res => {
            console.log(res);
            dispatch({
                type: SEARCH_RECIPES,
                payload: name
            })
        })
}

export const getRecipes = () => dispatch => {
    dispatch(setRecipesLoading());
    axios
        .get('http://localhost:8080/recipes')
        .then(res => {
            console.log(res); 
            dispatch({
                type: GET_RECIPES,
                payload: res.data
            });
        }, 
        err => console.log(err))
    }

export const addRecipe = recipe => (dispatch, getState) => {
    axios
        .post('http://localhost:8080/recipes', recipe, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_RECIPE,
                payload: res.data
            })
        }).catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        );
        
};

export const deleteRecipe = id => (dispatch, getState) => {
    axios
        .delete(`http://localhost:8080/recipes/${id}`,tokenConfig(getState))
        .then( res => 
            dispatch({
                type: DELETE_RECIPE,
                payload: id
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const getRecipeById = id => dispatch => {
    axios
        .get(`http://localhost:8080/recipes/${id}`)
        .then( res => 
            dispatch({
                type: GET_ONE_RECIPE,
                payload: id
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const setRecipesLoading = () => {
    return {
        type: RECIPES_LOADING
    };
};