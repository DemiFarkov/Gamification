import { createSlice } from "@reduxjs/toolkit"

export const userData = createSlice({
    name: 'userData',
    initialState: {},
    reducers: {
        addData(state, action) {
            console.log(action)
            state.acoin = action.payload.acoin
            state.karma = action.payload.karma
            state.EXP = action.payload.EXP
        },
    }
})
export const { addData } = userData.actions;
export default userData.reducer