import React from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";

class TaskList extends React.Component {
    render() {
        let { tasks } = this.props;
        let elementTasks = tasks.map((task, index) => {
            return <TaskItem key={task.id} index={index} task={task} />;
        });
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>{elementTasks}</tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    };
};

export default connect(
    mapStateToProps,
    null
)(TaskList);
