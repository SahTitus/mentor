import * as api from "../api/index.js";
import {
	error,
	isLoading,
	getMessages,
	createMessage,
	// deleteMessage,

} from "../redux/messages";

export const sendMessage = (id, chatData) => async (dispatch) => {
    try {
      const {data} = await api.sendMessage(id, chatData);
  
      dispatch(createMessage(data));
    } catch (error) {
      console.error(error);
    }
  };

  export const fetchMessages = (id) => async (dispatch) => {
    dispatch(isLoading());

    try {
      const { data } = await api.fetchMessages(id);
   
  
      dispatch(getMessages(data));
    } catch (err) {
      // dispatch(error(err));
      console.log(err)
    }
  };