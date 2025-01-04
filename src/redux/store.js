import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import boardsReducer from "./slices/boardsSlice";
// import tasksReducer from "./slices/tasksSlice";

const store = configureStore({
    reducer: {
        theme : themeReducer,
        boards : boardsReducer,
        // tasks : tasksReducer
    }
});

export default store;