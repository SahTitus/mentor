import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  rooms: [],
  room: {},
  error: [],
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    roomsData: (state, action) => {
      localStorage.setItem("mentor", JSON.stringify({ ...action.payload }));

      state.user = action.payload;
    },
    getRooms: (state, action) => {
      state.rooms = action.payload;
      state.isLoading = false;
    },
    getRoom: (state, action) => {
      state.room = action.payload;
    },
    isLoading: (state) => {
      state.isLoading = true;
    },
    error: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    addRoom: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
      localStorage.setItem("room", JSON.stringify({ ...action.payload }));
    },
    deleteGroup: (state, action) => {
      state.rooms = state.rooms.filter(
        (room) => room.roomId !== action.payload
      );
    },
    update: (state, action) => {
      state.rooms = state.rooms.map((room) =>
        room._id === action.payload._id ? action.payload : room
      );
    },
  },
});

export const {
  error,
  isLoading,
  getRooms,
  getRoom,
  addRoom,
  deleteGroup,
  update,
} = roomsSlice.actions;
export default roomsSlice.reducer;
