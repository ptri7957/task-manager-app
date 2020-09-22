import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserLists, deleteList } from "../actions/lists";
import { getAllTasks } from "../actions/tasks";

const Dashboard = ({ lists, tasks, getUserLists, getAllTasks, deleteList }) => {
  useEffect(() => {
    getUserLists();
    getAllTasks();
  }, [getUserLists, getAllTasks]);

  return (
    <Fragment>
      <div className="container mt-100 mb-100">
        <div className="card dashboard-card">
          <div className="card-body dashboard">
            <h3>
              <strong>DASHBOARD</strong>
            </h3>
            <div className="row">
              {lists.lists.length > 0 && !lists.loading ? (
                lists.lists.map((list) => {
                  return (
                    <div className="col-lg-4 col-md-4">
                      <div key={list._id} className="card shadow">
                        <div className="card-body">
                          <h5>
                            <strong>{list.title.toUpperCase()}</strong>
                          </h5>
                          <p>
                            <strong>Tasks: </strong>{" "}
                            {" " +
                              tasks.allTasks.filter(
                                (task) =>
                                  task.list.toString() === list._id.toString()
                              ).length}
                          </p>
                          <div className="card-btns">
                          <Link to={`/dashboard/${list._id}`}>
                            <button className="btn btn-light">
                              <span className="fas fa-clipboard"></span>
                            </button>
                          </Link>
                          <button
                            className="btn btn-light"
                            onClick={(e) => deleteList(list._id)}
                          >
                            <span className="fas fa-trash"></span>
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Fragment>
                  <p>You don't have any lists to show.</p>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  lists: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  getUserLists: PropTypes.func.isRequired,
  getAllTasks: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  tasks: state.tasks,
});

export default connect(mapStateToProps, {
  getUserLists,
  getAllTasks,
  deleteList,
})(Dashboard);
