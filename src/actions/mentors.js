import * as api from "../api/index.js";
import { getUser } from "../redux/auth.js";
import {
  isLoading,
  getMentors,
  getMentor,
  // getMentorSearch,
  getMentees,
  error,
  addMentor,
  update,
  deleteMentor,
  removeMentee,
  queryMentors,
} from "../redux/mentors";

export const fetchMentors = () => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchMentors();

    dispatch(getMentors(data));
  } catch (err) {
    dispatch(error(err));
  }
};

export const fetchMentor = (id) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchMentor(id);

    dispatch(getMentor(data));
  } catch (error) {
    dispatch(error(error));
  }
};

export const fetchMentorsBySearch = (searchQuery) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchMentorsBySearch(searchQuery);

    dispatch(queryMentors(data));
  } catch (error) {
    dispatch(error(error));
  }
};

export const fetchMentees = (id) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchMentees(id);

    dispatch(getMentees(data));
  } catch (error) {
    dispatch(error(error));
  }
};


export const createMentor = (mentor) => async (dispatch) => {
  try {
    const { data } = await api.createMentor(mentor);
    dispatch(addMentor(data));

  } catch (error) {
    console.error(error);
  }
};

export const updateMentor = (id, mentor) => async (dispatch) => {
  try {
    const{ data } = await api.updateMentor(id, mentor);

    dispatch(update(data));
  } catch (error) {
    console.error(error);
  }
};


export const disConnect = (id, menteeId) => async (dispatch) => {
  try {
    const { data } = await api.disConnect(id, menteeId);

    dispatch(getMentor(data.updatedMentor));
    dispatch(getUser(data.updatedMentee));
  } catch (error) {
    console.error(error);
  }
};

export const deleteMento = (id) => async (dispatch) => {
  try {
    await api.deleteMentor(id);

    dispatch(deleteMentor(id));
  } catch (error) {
    console.error(error);
  }
};

export const deleteMentee = (id) => async (dispatch) => {
  try {
    await api.deleteMentee(id);

    dispatch(removeMentee(id));
  } catch (err) {
    dispatch(error(err?.response?.data));
  }
};
