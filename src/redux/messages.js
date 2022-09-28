import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	messages: [],
	error: [],


};

export const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		chatsData: (state, action) => {
			localStorage.setItem("chats", JSON.stringify({ ...action.payload }));
			state.messages = action.payload;
		  },
		getMessages: (state, action) => {
			state.messages = action.payload;
			state.isLoading = false;
		},
		isLoading: (state) => {
			state.isLoading = true;
		},
		isError: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	createMessage: (state, action) => {
			state.messages = [...state.messages, action.payload];
			localStorage.setItem("room", JSON.stringify({ ...action.payload }));
		},
		deleteMessage: (state, action) => {
			state.messages = state.messages.filter((room) => room._id !== action.payload);
		},
	},
});

export const {
	error,
	isLoading,
	getMessages,
	createMessage,
	deleteMessage,

} = messagesSlice.actions;
export default messagesSlice.reducer;
