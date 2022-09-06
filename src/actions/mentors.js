import * as api from "../api/index.js";
import {
  isLoading,
  getMentors,
  getMentor,
  error,
  addMentor,
  update,
  deleteMentor,
  like,
  repost
} from "../redux/mentors";

export const fetchMentors = () => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchMentors();

    console.log(data);

    dispatch(getMentors(data));
  } catch (err) {
    dispatch(error(err));
  }
};

export const fetchMentor = (id) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchMentor(id);

    console.log(data);

    dispatch(getMentor(data));
  } catch (error) {
    dispatch(error(error));
  }
};


export const createMentor = (mentor) => async (dispatch) => {
  try {
    const { data } = await api.createMentor(mentor);
    dispatch(addMentor(data));

    console.log(mentor);
  } catch (error) {
    console.error(error);
  }
};

export const updateMentor = (id, mentor) => async (dispatch) => {
  try {
    const updatedMentor = await api.updateMentor(id, mentor);

    dispatch(update(updatedMentor));
  } catch (error) {
    console.error(error);
  }
};

export const likeMentor = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.likeMentor(id);
    console.log(data);

    dispatch(like(data));
  } catch (error) {
    console.error(error);
  }
};

// Check this 

export const deleteMento = (id) => async (dispatch) => {
  try {
    await api.deleteMentor(id);

    dispatch(deleteMentor(id));
  } catch (error) {
    console.error(error);
  }
};
