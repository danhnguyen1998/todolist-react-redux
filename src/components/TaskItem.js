import React from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";

class TaskItem extends React.Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    };

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    };

    onUpdate = () => {
        this.props.onUpdateTask(this.props.task);
        this.props.onOpenForm();
    };

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        className={
                            task.status === false
                                ? "badge badge-danger"
                                : "badge badge-success"
                        }
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === false ? "Pending" : "Active"}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onUpdate}
                    >
                        <i
                            className="fa fa-pencil-square mr-5"
                            aria-hidden="true"
                        ></i>
                        Edit
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Delete
                    </button>
                    &nbsp;
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: id => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: id => {
            dispatch(actions.deleteTask(id));
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onUpdateTask: task => {
            dispatch(actions.updateTask(task));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskItem);
