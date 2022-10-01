import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  mentors: [],
  mentees: [],
  queriedMentors: [],
  mentor: {},
  error: [],
};

export const mentorsSlice = createSlice({
  name: "mentorss",
  initialState,
  reducers: {
    mentorData: (state, action) => {
      localStorage.setItem("mentor", JSON.stringify({ ...action.payload }));

      state.user = action.payload;
    },
    getMentors: (state, action) => {
      state.mentors = action.payload;
      state.isLoading = false;
    },
    queryMentors: (state, action) => {
      state.queriedMentors = action.payload;
      state.isLoading = false;
    },
    getMentees: (state, action) => {
      state.mentees = action.payload;
      state.isLoading = false;
    },
    getMentor: (state, action) => {
      state.mentor = action.payload;
      state.isLoading = false;
    },
    isLoading: (state) => {
      state.isLoading = true;
    },
    isError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    addMentor: (state, action) => {
      state.mentor = action.payload;
      state.mentors = [...state.mentors, action.payload];
      localStorage.setItem("mentor", JSON.stringify({ ...action.payload }));
    },
    deleteMentor: (state, action) => {
	state.mentors = state.mentors.filter(
        (mentor) => mentor._id !== action.payload
      );
    },
    removeMentee: (state, action) => {
      state.mentors = state.mentors.map((mentor) => mentor.mentees.filter((id) => id !== action.payload));
    },
    update: (state, action) => {
      state.mentors = state.mentors.map((mentor) =>
        mentor._id === action.payload._id ? action.payload : mentor
      );
	  localStorage.setItem("mentor", JSON.stringify({ ...action.payload }));
    },
    connect: (state, action) => {
      state.mentors = state.mentors.map((mentor) =>
        mentor._id === action.payload._id ? action.payload : mentor
      );
    },
    logoutMentor: (state) => {
      localStorage.removeItem("mentor");
      state.mentor = null;
    },
  },
});

export const {
  error,
  isLoading,
  getMentors,
  getMentees,
  getMentor,
  addMentor,
  deleteMentor,
  removeMentee,
  update,
  detectLink,
  connect,
  queryMentors,
  logoutMentor,
} = mentorsSlice.actions;
export default mentorsSlice.reducer;
