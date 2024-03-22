import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./toolkitSlice";
const store = configureStore({reducer: {
    auth: authSlice
}})

export default store