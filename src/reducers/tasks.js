import * as types from "../constants/ActionTypes";

var data = JSON.parse(localStorage.getItem("tasks"));

var initialState = data ? data : [];
// generate ramdom id
var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

var generateID = () => {
    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
    );
};

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
};

var myReducer = (state = initialState, action) => {
    var index;
    var id;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            };
            if (!task.id) {
                task.id = generateID();
                state.push(task);
            } else {
                index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            var cloneTask = { ...state[index] };
            cloneTask.status = !cloneTask.status;
            state[index] = cloneTask;
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
};

export default myReducer;
