import React, {useState} from "react";
import PropTypes from "prop-types";
import Alert from "./Alert";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { createTask } from "../actions/tasks";

const AddTaskForm = ({createTask, history, match}) => {
  const [formData, setFormData] = useState({
    description: ""
  });

  const { description } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTask(match.params.list_id, description, history);
  };
  return (
    <div className="container">
      <div className="card mt-100 mb-100">
        <div className="card-body">
          <h2>Add Task</h2>
          <Alert />
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                onChange={(e) => onChange(e)}
                value={description}
              />
            </div>
            <button className="btn btn-submit submit" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


AddTaskForm.propTypes = {
    createTask: PropTypes.func.isRequired,
};

export default connect(null, {createTask})(withRouter(AddTaskForm));
