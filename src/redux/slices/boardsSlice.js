import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data.json";


const boardsSlice = createSlice({
    name:"boards",
    initialState: data?.boards,
    reducers : {
        // add new board
        addBoard: (state, action) => {
            const payload = action.payload;
            const isActive = state.length > 0 ? false : true;
            const board = {
                name: payload.name,
                isActive: isActive,
                columns: []
            };
            board.columns = payload.newColumns;
            state.push(board);
        },

        // edit board
        editBoard: (state, action) => {
            console.log("state",state)
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            console.log("active board ",board)
            if(board){
                board.name = payload.name;
                board.columns = payload.columns;
            }
        },

        // delete board
        deleteBoard: (state, action) => {
            const board = state.find((board) => board.isActive);
            state.splice(state.indexOf(board), 1);
        },

        // set board status 
        setBoardStatusActive: (state, action) => {
            const payload = action.payload;
            state.map((board, index) => {
                if(index === payload.index){
                    board.isActive = true;
                } else {
                    board.isActive = false;
                }
                return board
            });
        },

        /////////////////////////////////////// reducers for task //////////////////////////////////

        // add task
        addTask: (state,action) => {
            const {title, description, subTasks, newColIndex, status} = action.payload;
            const task = {title, description, subTasks, status};
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((col,index) => index === newColIndex);
            column?.tasks.push(task);
        },

        // edit task
        editTask: (state, action) => {
            const {title, status, description, subTasks, prevColIndex, newColIndex, taskIndex} = action.payload;
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((col, index) => index === prevColIndex);
            const task = column.tasks.find((task, index) => index === taskIndex);
            task.title = title;
            task.description = description;
            task.subTasks = subTasks;
            task.status = status;
            if(prevColIndex === newColIndex){
                return
            }
            column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
            const newCol = board.columns.find((col, index) => index === newColIndex);
            newCol.tasks.push(task);
        },

        // drag task
        dragTask: (state, action) => {
            const {colIndex, prevColIndex, taskIndex} = action.payload;
            const board = state.find((board) => board.isActive);
            const prevCol = board.columns.find((col, index) => index === prevColIndex );
            const task = prevCol.tasks.splice(taskIndex , 1)[0];
            board.columns.find((col, i) => i === colIndex)?.tasks.push(task);
        },

        // update when sub-task is completed
        updateSubTaskWhenCompleted:(state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((colum, index) => index === payload.colIndex);
            const task = column.tasks.find((task, index) => index === payload.taskIndex);
            const subTask = task.subTasks.find((subTask, index) => index === payload.index);
            subTask.isCompleted = !subTask.isCompleted;
        },

        // set task status
        setTaskStatus: (state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const columns = board.columns;
            const column = columns.find((column, index) => index === payload.colIndex);
            if(payload.colIndex === payload.newColIndex){
                return
            }
            const task = column.tasks.find((task, index) => index === payload.taskIndex);
            task.status = payload.status;
            column.tasks = column.tasks.filter((task, index) => index !== payload.taskIndex);
            const newColumn = columns.find((column, index) => index === payload.newColIndex);
            newColumn.tasks.push(task);
        },

        // delete task
        deleteTask: (state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((column, index) => index === payload.colIndex);
            column.tasks = column.tasks.filter((task, index) => index !== payload.taskIndex);
        }

    }
});


export default boardsSlice.reducer;
export const { 
    addBoard, 
    editBoard,
    deleteBoard,
    setBoardStatusActive,
    addTask, // task
    editTask,
    dragTask, 
    updateSubTaskWhenCompleted, 
    setTaskStatus, 
    deleteTask
} = boardsSlice.actions;