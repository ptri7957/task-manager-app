import React, {useState} from "react";
import PropTypes from "prop-types";
import Alert from "./Alert";
import { connect } from "react-redux";
import { createList } from "../actions/lists";
import { withRouter } from "react-router-dom"

const AddListForm = ({createList, history}) => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const { title } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createList(title, history);
  };
  return (
    <div className="container">
      <div className="card mt-100 mb-100">
        <div className="card-body">
          <h2>Add List</h2>
          <Alert />
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={(e) => onChange(e)}
                value={title}
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


AddListForm.propTypes = {
    createList: PropTypes.func.isRequired,
};

export default connect(null, {createList})(withRouter(AddListForm));
