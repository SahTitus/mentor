import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
}

export const authSlice = createSlice({
    name: "auth",
	initialState,
	reducers: {
authData: (state, action) => {
    localStorage.setItem('profile', JSON.stringify({...action.payload}))

state.user =  action.payload
console.log(action.payload)
},

logout: (state) => {
    localStorage.removeItem('profile')
    state.user = null
}

    }
})

export const {
	authData,
    logout
} = authSlice.actions;
export default authSlice.reducer;