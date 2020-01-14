import axios from 'axios';
import { GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, RECIPES_LOADING} from './types';
import { Types } from 'mongoose';


export const getRecipes = () => dispatch => {
    dispatch(setRecipesLoading());
    axios
        .get('http://localhost:8080/recipes')
        .then(res => {
            console.log(res); 
            dispatch({
                type: GET_RECIPES,
                payload: res.data,
            });
        }, 
        err => console.log(err))
    }

export const addRecipe = recipe => dispatch => {
    axios
        .post('http://localhost:8080/recipes', recipe)
        .then(res => 
            dispatch({
                type: ADD_RECIPE,
                payload: res.data
            })
        )
};

export const deleteRecipe = id => dispatch => {
    axios.delete(`http://localhost:8080/recipes/${id}`).then(res =>
    dispatch({
        type: DELETE_RECIPE,
        payload: id
    })
    )
};

export const setRecipesLoading = () => {
    return {
        type: RECIPES_LOADING
    };
};