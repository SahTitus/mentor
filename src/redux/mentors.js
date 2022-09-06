import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	mentors: [],
	mentor: {},
	error: [],


};

export const mentorsSlice = createSlice({
	name: "mentorss",
	initialState,
	reducers: {
		getMentors: (state, action) => {
			state.mentors = action.payload;
			state.isLoading = false;
		},
		getMentor: (state, action) => {
			state.mentor = action.payload;
			state.isLoading = false;
		},
		isLoading: (state) => {
			state.isLoading = true;
		},
		error: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		addMentor: (state, action) => {
			state.mentors = [...state.mentors, action.payload];
		},
		deleteMentor: (state, action) => {
			state.mentors = state.mentors.filter((mentor) => mentor._id !== action.payload);
		},
		update: (state, action) => {
			state.mentors = state.mentors.map((mentor) => mentor._id === action.payload._id ? action.payload : mentor );
		},
		like: (state, action) => {
			state.mentors = state.mentors.map((mentor) => mentor._id === action.payload._id ? action.payload : mentor );
		},


	},
});

export const {
	error,
	isLoading,
	getMentors,
	getMentor,
	addMentor,
	deleteMentor,
	update,
	detectLink,
	like,

} = mentorsSlice.actions;
export default mentorsSlice.reducer;
