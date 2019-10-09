import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: false
        };
    }

    onCloseForm = () => {
        this.props.onCloseForm();
        this.onClear();
        console.log(this.state.id);
    };

    onChange = event => {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        if (name === "status") {
            value = target.value === "true" ? true : false;
        }
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onCloseForm();
    };
    onClear = () => {
        this.setState({
            id: "",
            name: "",
            status: false
        });
    };
    UNSAFE_componentWillMount() {
        if (this.props.itemEditting && this.props.itemEditting.id !== null) {
            this.setState({
                id: this.props.itemEditting.id,
                name: this.props.itemEditting.name,
                status: this.props.itemEditting.status
            });
        } else {
            this.onClear();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditting) {
            this.setState({
                id: nextProps.itemEditting.id,
                name: nextProps.itemEditting.name,
                status: nextProps.itemEditting.status
            });
        } else {
            this.onClear();
        }
    }

    render() {
        if (this.props.isDisplayForm === false) {
            return null;
        }
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {!this.state.id ? "Add a work" : "Update a work"}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Status:</label>
                        <select
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Active</option>
                            <option value={false}>Pending</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>
                                Save
                            </button>
                            &nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onCloseForm}
                            >
                                <span className="fa fa-window-close mr-5"></span>
                                Cancel
                            </button>
                        </div>
                    </form>
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
        onSaveTask: task => {
            dispatch(actions.saveTask(task));
        },

        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskForm);
