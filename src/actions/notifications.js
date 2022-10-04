import * as api from "../api/index.js";
import { removeMentee, update } from "../redux/mentors.js";
import {
  isLoading,
  getNotifications,
  error,
  createRequest,
  approved,
  deleteRqt,
} from "../redux/notifications";

export const fetchNotifications = (id) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchNotifications(id);

    dispatch(getNotifications(data));
  } catch (err) {
    dispatch(error(err));
  }
};

export const sendRequest = (request) => async (dispatch) => {
  try {
    await api.sendRequest(request);
  } catch (err) {
    dispatch(error(err));
  }
};
export const cancelRequest = (ids) => async (dispatch) => {
  try {
    const { data } = await api.cancelRequest(ids);

    dispatch(createRequest(data));
  } catch (err) {
    dispatch(error(err));
  }
};

export const acceptRequest = (id, room) => async (dispatch) => {
  try {
    const { data } = await api.acceptRequest(room);

    dispatch(approved(data));
    if (id) dispatch(removeMentee(id));
  } catch (err) {
    dispatch(error(err));
  }
};

export const deleteRequest = (id) => async (dispatch) => {
  try {
    await api.deleteRequest(id);

    dispatch(deleteRqt(id));
  } catch (err) {
    dispatch(error(err));
  }
};
