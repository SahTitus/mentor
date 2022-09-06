import axios from "axios";

const API = axios.create({ baseURL: "https://mentor-engine.vercel.app" });

// const url = "http://localhost:5000"


API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchMentors = () => API.get(`/mentors`);
export const fetchMentor = (id) => API.get(`/mentors/${id}`);

export const createMentor = (newMentor) => API.post(`/mentors`, newMentor);
export const updateMentor = (id, updatedMentor) => API.patch(`/mentors/${id}`, updatedMentor);
export const likeMentor = (id) => API.patch(`/mentors/${id}/likementor`);

export const deleteMentor = (id) => API.delete(`/mentors/${id}`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
