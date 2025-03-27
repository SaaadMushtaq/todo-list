import axios from "axios";

export const login = (username, password) => {
  return axios.post(
    "http://localhost:3000/api/login",
    {
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const signup = (firstName, lastName, username, password) => {
  return axios.post(
    "http://localhost:3000/api/signup",
    {
      firstName,
      lastName,
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
