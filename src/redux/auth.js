import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  isLoading: false,
  isError: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authData: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      state.user = action.payload;
    },
    isLoading: (state) => {
      state.isLoading = true;
    },
    isError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    update: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem("profile");
      state.user = null;
    },
  },
});

export const {
  authData,
  logout,
  update,
  isLoading,
  isError,
  getUsers,
  getUser,
} = authSlice.actions;
export default authSlice.reducer;
