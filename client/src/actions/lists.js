import { GET_LISTS, GET_LIST_ERROR, CREATE_LIST, DELETE_LIST, CLEAR_TASKS } from "./types";
import axios from "axios";

export const getUserLists = () => async dispatch => {
    try {
        const res = await axios.get("/api/lists");

        dispatch({
            type: GET_LISTS,
            payload: res.data
        });

        dispatch({
            type: CLEAR_TASKS
        });
    } catch (error) {
        dispatch({
            type: GET_LIST_ERROR
        });
    }
}


export const createList = (title, history) => async dispatch => {
    const tasklist = {
        title: title
    }

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify(tasklist)
    try {
        const res = await axios.post("/api/lists/", body, config);
        dispatch({
            type: CREATE_LIST,
            payload: res.data
        });
        history.push("/dashboard");
    } catch (error) {
        dispatch({
            type: GET_LIST_ERROR
        });
    }
}

export const deleteList = list_id => async dispatch => {
    try {
        await axios.delete(`/api/lists/${list_id}`);
        dispatch({
            type: DELETE_LIST,
            payload: list_id
        })
    } catch (error) {
        dispatch({
            type: GET_LIST_ERROR
        });
    }
}