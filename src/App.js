import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends React.Component {
    onToggleForm = () => {
        if (this.props.itemEditting && this.props.itemEditting.id !== "") {
            this.props.onClearTask({
                id: "",
                name: "",
                status: false
            });
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
            this.props.onClearTask({
                id: "",
                name: "",
                status: false
            });
        }
    };
    render() {
        var { isDisplayForm } = this.props;
        return (
            <div className="container">
                <div className="text-center">
                    <h1>To Do List</h1>
                    <hr />
                </div>
                <div className="row">
                    <div
                        className={
                            isDisplayForm === true
                                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                                : ""
                        }
                    >
                        <TaskForm />
                    </div>
                    <div
                        className={
                            isDisplayForm === true
                                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
                        }
                    >
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>Add a task
                        </button>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditting: state.itemEditting
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onClearTask: task => {
            dispatch(actions.updateTask(task));
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
