import axios from "axios";

export const getAllTasks = (token) => {
  return axios.get("http://localhost:3000/api/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addTask = (token, text) => {
  return axios.post(
    "http://localhost:3000/api/todos",
    text,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteTask = (token, id) => {
  return axios.delete(`http://localhost:3000/api/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
