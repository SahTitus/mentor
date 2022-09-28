import * as api from "../api/index.js";
import { isLoading, getRooms, getRoom, error, update, addRoom } from "../redux/rooms";

export const fetchRooms = (id) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchRooms(id);

    dispatch(getRooms(data));
  } catch (err) {
    dispatch(error(err));
  }
};
export const fetchRoom = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchRoom(id);

    dispatch(getRoom(data));
  } catch (err) {
    dispatch(error(err));
  }
};

export const createRoom = (room) => async (dispatch) => {
  try {
    const { data } = await api.createRoom(room);
    dispatch(addRoom(data));

  } catch (error) {
    console.error(error);
  }
};

// export const updateRoom= (id, room) => async (dispatch) => {
//   try {
//     const updatedRoom = await api.updateRoom(id, room);

//     dispatch(update(updatedRoom));
//   } catch (error) {
//     console.error(error);
//   }
// };

// Check this

// export const deleteChat = (id) => async (dispatch) => {
//   try {
//     await api.deleteChat(id);

//     dispatch(deleteChat(id));
//   } catch (error) {
//     console.error(error);
//   }
// };
