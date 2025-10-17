import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from "./slices/anecdotesSlice";
import { filterReducer } from "./slices/filterSlice";
import notificationReducer from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
