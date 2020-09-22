import { GET_TASKS_FROM_LIST, GET_TASK_ERROR, GET_ALL_TASKS, CREATE_TASK, DELETE_TASK } from "./types";
import axios from "axios";

export const getTasksByList = id => async dispatch => {
    try {
        const res = await axios.get(`/api/tasks/${id}`);
        dispatch({
            type: GET_TASKS_FROM_LIST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_TASK_ERROR
        });
    }
}

export const getAllTasks = () => async dispatch => {
    try {
        const res = await axios.get("/api/tasks");
        dispatch({
            type: GET_ALL_TASKS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_TASK_ERROR
        });
    }
}

export const createTask = (list_id, description, history) => async dispatch => {
    const task = {
        description: description
    }

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify(task);
    try {
        const res = await axios.post(`/api/tasks/${list_id}`, body, config);
        dispatch({
            type: CREATE_TASK,
            payload: res.data
        });
        history.push(`/dashboard/${list_id}`);
    } catch (error) {
        dispatch({
            type: GET_TASK_ERROR
        });
    }
}

export const deleteTask = (list_id, task_id) => async dispatch => {
    try {
        await axios.delete(`/api/tasks/${list_id}/${task_id}`);
        dispatch({
            type: DELETE_TASK,
            payload: task_id
        })
    } catch (error) {
        dispatch({
            type: GET_TASK_ERROR
        });
    }
}
