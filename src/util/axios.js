import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(
        url,
        { params },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
