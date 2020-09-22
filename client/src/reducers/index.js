import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import lists from "./lists";
import tasks from "./tasks";

export default combineReducers({
    auth,
    alert,
    lists,
    tasks
});