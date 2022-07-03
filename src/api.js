import axios from "axios";
const baseURL = 'http://127.0.0.1:8080';

export const request = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// login & logout
export const postUserLogin = (data) => request.post("/login", data);
export const postUserRegister = (data) => request.post("/register", data);