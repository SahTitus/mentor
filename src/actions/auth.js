import { authData } from "../redux/auth";
import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch(authData(data));

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch(authData(data));

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};
