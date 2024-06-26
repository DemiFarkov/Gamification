import { createSlice } from "@reduxjs/toolkit"

const iputIsCorrect = [] 

export const authSlice = createSlice({
    name: 'auth',
    iputIsCorrect,
    reducers: {
        login(state, action) {
            state.user = action.payload
            state.isLogged = true
        }
    }
})

export const { login } = authSlice.actions
export default authSlice.reducer