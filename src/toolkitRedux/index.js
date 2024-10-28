import { configureStore } from "@reduxjs/toolkit";
import authSlice, { changeBackgroundReducer } from "./toolkitSlice";
import userData  from "./profileData";
const store = configureStore({
    reducer: {
        auth: authSlice,
        background: changeBackgroundReducer,
        userData: userData,

    }
})

export default store