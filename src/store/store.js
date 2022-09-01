import { configureStore } from '@reduxjs/toolkit';
import authSlice  from '../redux/auth';
// import  postsSlice  from '../redux/posts';
// import  commentsSlice  from '../redux/comments';

export default configureStore({
	reducer: {
		// posts: postsSlice,
		auth: authSlice,
		// comments: commentsSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});