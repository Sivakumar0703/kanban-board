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
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            board.name = payload.name;
            board.columns = payload.newColumns;
        },

        // delete board
        deleteBoard: (state, action) => {
            const board = state.find((board) => board.isActive);
            state.splice(state.indexOf(board), 1);
        },

        // set board status to active
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
        }
    }
});


export default boardsSlice.reducer;
export const {addBoard, editBoard, deleteBoard, setBoardStatusActive} = boardsSlice.actions;