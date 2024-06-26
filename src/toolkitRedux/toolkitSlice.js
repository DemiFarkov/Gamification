import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie';

const initialState = {
    isLogged: false,

    acoin: 0,
    employee_id: 0,
    experience: 0,
    groups: [],
    karma: 0,
    token: Cookies.get("userToken"),
    
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLogged = true
            state.acoin = action.payload.acoin
            state.employee_id = action.payload.employee_id
            state.experience = action.payload.experience
            state.groups = action.payload.groups
            state.karma = action.payload.karma
            state.token = action.payload.token
            
        }
    }
})

export const { login } = authSlice.actions
export default authSlice.reducer