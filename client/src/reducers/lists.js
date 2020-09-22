import { GET_LISTS, GET_LIST_ERROR, CREATE_LIST, DELETE_LIST } from "../actions/types";

const initialState = {
    lists: [],
    loading: true
}

export default function(state=initialState, action){
    switch (action.type) {
        case GET_LISTS:
            return {
                ...state,
                lists: action.payload,
                loading: false
            };

        case CREATE_LIST:
            return {
                ...state,
                lists: [...state.lists, action.payload],
                loading: false
            }
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => list._id.toString() !== action.payload.toString()),
                loading: false
            }
        case GET_LIST_ERROR:
            return {
                ...state,
                lists: [],
                loading: false
            }
        default:
            return state;
    }
}