import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import data from "../../data/data.json";

// get data from local storage
function getDataFromLocal(){
    const data = localStorage.getItem("boardsData");
    if(!data){
        return null
    }
    return JSON.parse(data).boards
}


// save data to local storage
function saveDataInLocal(data){
    // Use Lodash to deep clone the state to avoid circular references 
    const cleanedData = _.cloneDeep(data); 
    console.log("clone",cleanedData)
    const boardsData = { boards: cleanedData }; 
    localStorage.setItem("boardsData", JSON.stringify(boardsData)); 
    console.log("Updated data:",boardsData);
}

const initialState = getDataFromLocal() || [];
console.log("*",initialState)

const boardsSlice = createSlice({
    name:"boards",
    initialState: initialState,
    // initialState: data?.boards,
    reducers : {
        // add new board
        addBoard: (state, action) => {
            const payload = action.payload;
            const isActive = state.length > 0 ? false : true;
            const board = {
                name: payload.name,
                isActive: isActive,
                columns: payload.columns ? payload.columns : []
            };
            // board.columns = payload.newColumns;
            state.push(board);
            console.log("add board",board)
            saveDataInLocal(state);
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
            saveDataInLocal(state);
        },

        // delete board
        deleteBoard: (state, action) => {
            const board = state.find((board) => board.isActive);
            state.splice(state.indexOf(board), 1);
            saveDataInLocal(state);
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
            saveDataInLocal(state);
        },

        /////////////////////////////////////// reducers for task //////////////////////////////////
        
        // add task
        addTask: (state,action) => {
            const {title, description, newColIndex, status, subTasks, deadline, priority, assignee} = action.payload;
            const task = {title, description, status, subTasks, deadline, priority, assignee};
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((col,index) => index === newColIndex);
            console.log('col', column)
            column?.tasks.push(task);
            saveDataInLocal(state);
        },

        // edit task
        editTask: (state, action) => {
            const {title, status, description, subTasks, prevColIndex, newColIndex, taskIndex, deadline, priority, assignee} = action.payload;
            console.log("deadline",prevColIndex,newColIndex)
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((col, index) => index === prevColIndex);
            const task = column.tasks.find((task, index) => index === taskIndex);
            task.title = title;
            task.description = description;
            task.subTasks = subTasks;
            task.status = status;
            task.priority = priority;
            task.assignee = assignee;
            task.deadline = deadline;
            // if(prevColIndex === newColIndex){
            //     return
            // }
            column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
            const newCol = board.columns.find((col, index) => index === newColIndex);
            newCol.tasks.push(task);
            saveDataInLocal(state);
        },

        // drag task
        dragTask: (state, action) => {
            const {colIndex, prevColIndex, taskIndex} = action.payload;
            const board = state.find((board) => board.isActive);
            const prevCol = board.columns.find((col, index) => index === prevColIndex ); // fetching the column where the task actually is
            const task = prevCol.tasks.splice(taskIndex , 1)[0]; // splicing the particular task from that column
            board.columns.find((col, i) => i === colIndex)?.tasks.push(task); // fetching the destination column and pushing the spliced task into the destination column
            console.log("drag action called",prevColIndex,colIndex,taskIndex)
            saveDataInLocal(state);
        },

        // update when sub-task is completed
        updateSubTaskWhenCompleted:(state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((colum, index) => index === payload.colIndex); 
            const task = column.tasks.find((task, index) => index === payload.taskIndex); 
            const subTask = task.subTasks.find((subTask, index) => index === payload.index);
            subTask.isCompleted = !subTask.isCompleted;
            saveDataInLocal(state);
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
            saveDataInLocal(state);
        },

        // delete task
        deleteTask: (state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((column, index) => index === payload.colIndex);
            column.tasks = column.tasks.filter((task, index) => index !== payload.taskIndex);
            saveDataInLocal(state);
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