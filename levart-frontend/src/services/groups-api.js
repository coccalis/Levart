import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/levart/private";

export const joinGroup = async (groupId, username) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${BASE_URL}/add-member?groupId=${groupId}&username=${username}`,
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

export const leaveGroup = async (groupId, username) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(
      `${BASE_URL}/remove-member?groupId=${groupId}&username=${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL}/delete-group?groupId=${groupId}`, {
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

export const changeBgGroupImg = async ({ groupId, form }) => {
  try {
    const formData = new FormData();
    console.log(groupId);
    console.log(form);
    console.log(form.uri);
    console.log(form.name);
    console.log(form.type);

    const response = await fetch(form.uri);
    const blob = await response.blob();

    // formData.append("groupId", groupId);
    const file = new File([blob], form.name || "default_name.jpg", {
      type: form.type || "image/jpeg",
      webkitRelativePath: form.uri,
    });

    console.log("file", file);
    formData.append("image", file);

    // Log FormData content
    console.log("FormData contents:");
    formData.forEach((value, key) => {
      if (value instanceof File || value instanceof Blob) {
        console.log(`${key}:`, value); // Print the Blob or File object
      } else {
        console.log(`${key}:`, value);
      }
    });

    const token = localStorage.getItem("token");

    await axios.post(
      `${BASE_URL}/upload-group-image?groupId=${groupId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Image uploaded successfully!");
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const createGroup = async (formInfo) => {
  console.log(formInfo);
  const formData = new FormData();
  const response = await fetch(formInfo.image.uri);
  const blob = await response.blob();
  // Append the group JSON string
  formData.append(
    "groupDtoJson",
    JSON.stringify({
      name: formInfo.name,
      information: formInfo.information,
    })
  );

  // Append the image file
  const file = new File([blob], formInfo.image.name || "default_name.jpg", {
    type: formInfo.image.type || "image/jpeg",
    webkitRelativePath: formInfo.image.uri,
  });
  formData.append("image", file);
  console.log("file", file);
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
  console.log("prin thn try");
  try {
    const token = localStorage.getItem("token");
    await axios.post(`${BASE_URL}/create-group`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Group created successfully:");
  } catch (error) {
    console.error(
      "Error creating group:",
      error.response ? error.response.data : error.message
    );
  }
};

export const editGroup = async (formInfo) => {
  console.log(formInfo.formInfo);

  try {
    const token = localStorage.getItem("token");
    await axios.patch(`${BASE_URL}/edit-group`, formInfo.formInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Group editted successfully:");
  } catch (error) {
    console.error(
      "Error editting group:",
      error.response ? error.response.data : error.message
    );
  }
};
