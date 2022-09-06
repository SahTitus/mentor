import { configureStore } from '@reduxjs/toolkit';
import authSlice  from '../redux/auth';
import  mentorsSlice  from '../redux/mentors';
// import  commentsSlice  from '../redux/comments';

export default configureStore({
	reducer: {
		mentors: mentorsSlice,
		auth: authSlice,
		// comments: commentsSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});