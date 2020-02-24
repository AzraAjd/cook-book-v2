import { GET_USERS, GET_ONE_USER, DELETE_USER, SEARCH_USER, MAKE_USER_ADMIN} from '../actions/types';

const initialState = {
    users: [],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }

            case GET_ONE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id === action.payload)
            }

            case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            }
            
            default:
                return state;
        }
    }