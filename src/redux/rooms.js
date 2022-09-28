import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	rooms: [],
	room: {},
	error: [],


};

export const roomsSlice = createSlice({
	name: "rooms",
	initialState,
	reducers: {
		roomsData: (state, action) => {
			localStorage.setItem("mentor", JSON.stringify({ ...action.payload }));
	  
			state.user = action.payload;
		  },
		getRooms: (state, action) => {
			state.rooms = action.payload;
			state.isLoading = false;
		},
		getRoom: (state, action) => {
			state.room = action.payload;
		},
		messages: (state, action) => {
			state.rooms = action.payload;
			state.isLoading = false;
		},
		isLoading: (state) => {
			state.isLoading = true;
		},
		isError: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		addRoom: (state, action) => {
			state.rooms = [...state.rooms, action.payload];
			localStorage.setItem("room", JSON.stringify({ ...action.payload }));
		},
		deleteGroup: (state, action) => {
			state.rooms = state.rooms.filter((room) => room._id !== action.payload);
		},
	},
});

export const {
	error,
	isLoading,
	getRooms,
	getRoom,
	addRoom,
	deleteGroup,
	update,
    messages

} = roomsSlice.actions;
export default roomsSlice.reducer;
