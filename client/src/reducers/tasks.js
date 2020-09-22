import { GET_TASKS_FROM_LIST, GET_TASK_ERROR, GET_ALL_TASKS, CREATE_TASK, DELETE_TASK, CLEAR_TASKS } from "../actions/types";

const initialState = {
    tasks: [],
    allTasks: [],
    loading: true
}

export default function(state=initialState, action){
    switch (action.type) {
        case GET_ALL_TASKS:
            return {
                ...state,
                allTasks: action.payload,
                loading: false
            };
        case GET_TASKS_FROM_LIST:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };
        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                loading: false
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id.toString() !== action.payload.toString()),
                loading: false
            }
        case CLEAR_TASKS:
        case GET_TASK_ERROR:
            return {
                ...state,
                tasks: [],
                loading: false
            }
        default:
            return state;
    }
}