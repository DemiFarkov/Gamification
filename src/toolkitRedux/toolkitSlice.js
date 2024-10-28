import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie';

const initialState = {
    isLogged: Cookies.get("userToken") ? true : false,

    acoin: 0,
    employee_id: 0,
    experience: 0,
    groups: Cookies.get('groups'),
    karma: 0,
    token: Cookies.get("userToken"),
    passwordPolicyRegex: {},
    microProfile: {},
    typeAchData: {},
    newTypeMainData: {},
    newTypeStyleData: {},
    currentAchievementsData: {},
    backSideCard: {},


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
            state.groups = Cookies.get('groups')
            state.karma = action.payload.karma,
                state.token = Cookies.get("userToken")

        },
        passwordPolicyRegex(state, action) {
            state.passwordPolicyRegex = action.payload
        },
        microProfile(state, action) {
            state.microProfile = action.payload
        },
        typeAchData(state, action) {
            state.typeAchData = action.payload
        },
        newTypeStyleData(state, action) {
            state.newTypeStyleData = { ...action.payload }
        },
        currentAchievementsData(state, action) {
            state.currentAchievementsData = action.payload
        },
        backSideCard(state, action) {
            state.backSideCard = action.payload
        },
        newTypeMainData(state, action) {
            state.newTypeMainData = action.payload
        },
    }
})

export const { login, passwordPolicyRegex, microProfile, typeAchData, newTypeStyleData, currentAchievementsData, backSideCard, newTypeMainData } = authSlice.actions
export default authSlice.reducer

const stateBackground = {
    dialogIsOpen: false,
    urlBackground: "",


}

export const changeBackground = createSlice({
    name: 'background',
    initialState: stateBackground,
    reducers: {
        openDialorBackground(state, action) {
            state.dialogIsOpen = action.payload
        },
        changeUrl(state, action) {
            console.log(action.payload)
            state.urlBackground = action.payload
        },
    }
})
export const { openDialorBackground,changeUrl } = changeBackground.actions;
export const changeBackgroundReducer = changeBackground.reducer