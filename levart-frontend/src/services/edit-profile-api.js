import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/levart/private";

export const editUserInfo = async ({ formUser }) => {
  console.log("formUser in api: ", formUser);

  try {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    await axios.put(`${BASE_URL}/edit-user`, formUser, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
export const editLayout = async ({ layout }) => {
  console.log("layoutOption", layout);
  try {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const response = await axios.post(
      `${BASE_URL}/set-user-layout?layout=${layout}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in editLayout API call:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const changeBgImage = async ({ form }) => {
  try {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    const formData = new FormData();

    const response = await fetch(form.uri);
    const blob = await response.blob();

    const file = new File([blob], form.name || "default_name.jpg", {
      type: form.type || "image/jpeg",
      webkitRelativePath: form.uri,
    });
    console.log("file", file);
    formData.append("file", file);

    console.log("mpainw???");
    formData.forEach((value, key) => {
      if (key === "file") {
        // Log detailed file information
        console.log(
          `File details: Name: ${value.name}, Type: ${value.type}, URI: ${value.uri}`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    });

    await axios.put(`${BASE_URL}/upload-bg-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    const response = await axios.put(
      `${BASE_URL}/change-password`,
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Password changed successfully!");
    return response.data;
  } catch (error) {
    console.error(
      `Error: ${error.response.status} - ${
        error.response.data.message || "Failed to change password"
      }`
    );

    throw error;
  }
};
