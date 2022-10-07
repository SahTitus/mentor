import {
  authData,
  isError,
  getUsers,
  getUser,
  isLoading,
  update,
} from "../redux/auth";
import * as api from "../api/index.js";

export const fetchUsers = () => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchUsers();

    dispatch(getUsers(data));
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};
export const fetchUser = (id) => async (dispatch) => {
  dispatch(isLoading());

  try {
    const { data } = await api.fetchUser(id);

    dispatch(getUser(data));
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch(authData(data));

    navigate("/");
  } catch (error) {
    dispatch(isError(error));
  }
};

export const logWithGoogle = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logWithGoogle(formData);

    dispatch(authData(data));

    navigate("/");
  } catch (error) {
    dispatch(isError(error));
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch(authData(data));

    navigate("/");
  } catch (error) {
    dispatch(isError(error));
  }
};

export const updateUser = (id, userData, navigate) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.updateUser(id, userData);

    navigate("/profile/1001");
    dispatch(update(data));
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};
