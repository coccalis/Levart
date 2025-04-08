import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/levart/private";

export const followUser = async ({ username }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${BASE_URL}/follow-user?username=${username}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("success");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = async ({ username }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `${BASE_URL}/unfollow-user?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("success unfollow");
    return res;
  } catch (error) {
    console.log(error);
  }
};
