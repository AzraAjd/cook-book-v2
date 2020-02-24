import axios from 'axios';
import { GET_USERS, GET_ONE_USER, DELETE_USER, SEARCH_USER} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errActions'

export const getUsers = () => dispatch => {
    axios
        .get('http://localhost:8080/users')
        .then(res => {
            console.log(res); 
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        }, 
        err => console.log(err))
    }

export const getUserById = id => dispatch => {
    axios
        .get(`http://localhost:8080/users/${id}`)
        .then( res => 
            dispatch({
                type: GET_ONE_USER,
                payload: id
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteUser = id => (dispatch, getState) => {
    axios
        .delete(`http://localhost:8080/users/${id}`,tokenConfig(getState))
        .then( res => 
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};