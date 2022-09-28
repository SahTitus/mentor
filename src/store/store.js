import { configureStore } from '@reduxjs/toolkit';
import authSlice  from '../redux/auth';
import  mentorsSlice  from '../redux/mentors';
import  roomsSlice  from '../redux/rooms';
import  messagesSlice  from '../redux/messages';
import  notificationsSlice  from '../redux/notifications';

export default configureStore({
	reducer: {
		mentors: mentorsSlice,
		auth: authSlice,
		rooms: roomsSlice,
		messages: messagesSlice,
		notifications: notificationsSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});