import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  notifications: [],
  error: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotifications: (state, action) => {
      state.notifications = action.payload;
      state.isLoading = false;
    },

    isLoading: (state) => {
      state.isLoading = true;
    },
    isError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    createRequest: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
    },
    approved: (state, action) => {
      state.notifications = state.notifications.map((notification) =>
        notification._id === action.payload._id ? action.payload : notification
      );
    },
    deleteRqt: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload
      );
    },
  },
});

export const {
  error,
  isLoading,
  getNotifications,
  createRequest,
  deleteRqt,
  approved,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
