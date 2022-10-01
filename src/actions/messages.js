import * as api from "../api/index.js";
import {
  error,
  isLoading,
  getMessages,
  createMessage,
  deleteMsg,
} from "../redux/messages";

export const sendMessage = (id, chatData) => async (dispatch) => {
  try {
    const { data } = await api.sendMessage(id, chatData);

    dispatch(createMessage(data));
  } catch (err) {
    dispatch(error(err));
  }
};

export const fetchMessages = (id) => async (dispatch) => {
  dispatch(isLoading());

  try {
    const { data } = await api.fetchMessages(id);

    dispatch(getMessages(data));
  } catch (err) {
    dispatch(error(err));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  try {
    await api.deleteMessage(id);

    dispatch(deleteMsg(id));
  } catch (err) {
    dispatch(error(err));
  }
};
