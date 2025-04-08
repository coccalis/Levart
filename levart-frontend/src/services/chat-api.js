import axios from "axios";

const BASE_URL_CHAT = "http://localhost:8080/api/v1/levart/public";

export const fetchConversation = async ({ loginUser, otherUser }) => {
  try {
    // const token =
    //   localStorage.getItem("token") || sessionStorage.getItem("token");
    const res = await axios.get(
      `${BASE_URL_CHAT}/messages?loginUser=${loginUser}&otherUser=${otherUser}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
