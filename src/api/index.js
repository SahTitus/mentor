import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchMentors = () => API.get(`/mentors`);
export const fetchMentorsBySearch = (searchQuery) => API.get(`/mentors/search?searchQuery=${searchQuery }`);
export const fetchMentor = (id) => API.get(`/mentors/${id}`);
export const createMentor = (newMentor) => API.post(`/mentors`, newMentor);
export const updateMentor = (id, updatedMentor) => API.patch(`/mentors/${id}/update`, updatedMentor);
export const deleteMentor = (id) => API.delete(`/mentors/${id}`);

export const fetchMentees = (id) => API.get(`/mentors/${id}/mentees`);
export const deleteMentee = (id) => API.delete(`/mentors/${id}/removeMentee`);

export const fetchMessages = (id) => API.get(`/messages/${id}`);
export const sendMessage = (id, messageData) => API.post(`/messages/${id}/sendMessage`, messageData);
export const deleteMessage = (id) => API.delete(`/messages/${id}/delete`);

export const fetchRooms = (id) => API.get(`/rooms/${id}`);
export const fetchRoom = (id) => API.get(`/rooms/${id}/getRoom`);
export const createRoom = (room) => API.post(`/rooms/createRoom`, room);
export const updateRoom = (id, updatedRoom) => API.patch(`/rooms/${id}/update`, updatedRoom);
export const deleteRoom = (id) => API.delete(`/rooms/${id}/delete`);
export const memberAction = (ids) => API.patch(`/rooms/memberAction`, ids);

export const fetchNotifications = (id) => API.get(`notifications/${id}`);
export const sendRequest = (request) => API.post(`notifications/sendRequest`, request);
export const cancelRequest = (ids) => API.patch(`notifications/cancelRequest`, ids);
export const deleteRequest = (id) => API.delete(`notifications/${id}/deleteNotification`);
export const acceptRequest = (ids) => API.patch(`notifications/acceptRequest`, ids);
export const disConnect = (ids) => API.patch(`/mentors/disConnect`, ids);


export const fetchUsers = () => API.get(`/user`);
export const fetchUser = (id) => API.get(`/user/${id}`);
export const signIn = (formData) => API.post(`/user/signin`, formData);
export const logWithGoogle = (formData) => API.post(`/user/googleAuth`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
export const updateUser = (id, updateUser) => API.patch(`/user/${id}/update`, updateUser);