import axios from "axios";

const BASE_URL_PRIVATE = "http://localhost:8080/api/v1/levart/private";
const BASE_URL_PUBLIC = "http://localhost:8080/api/v1/levart/public";

export const createPost = async (postForm) => {
  console.log(postForm);
  const formData = new FormData();
  const response = await fetch(postForm.image.uri);
  const blob = await response.blob();

  let ratingData = {};
  if (postForm.category === "city" || postForm.category === "hotel") {
    ratingData = { ratingType: postForm.ratingType };
  } else {
    ratingData = { rating: postForm.rating };
  }

  formData.append(
    "post",
    JSON.stringify({
      location: postForm.location,
      description: postForm.description,
      tags: postForm.tags,
      category: postForm.category,
      groupId: postForm.groupId,
      ...ratingData,
    })
  );

  // Append the image file
  const file = new File([blob], postForm.image.name || "default_name.jpg", {
    type: postForm.image.type || "image/jpeg",
    webkitRelativePath: postForm.image.uri,
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
    const res = await axios.post(`${BASE_URL_PRIVATE}/create-post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("success");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (postId, postForm) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `${BASE_URL_PRIVATE}/edit-post?postId=${postId}`,
      postForm,
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

export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL_PRIVATE}/delete-post?postId=${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("delete");
  } catch (error) {
    console.log(error);
  }
};

// ## COMMENTS

export const fetchComments = async (postId) => {
  try {
    const res = await axios.get(
      `${BASE_URL_PUBLIC}/get-comments?postId=${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (commentForm) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(`${BASE_URL_PRIVATE}/make-comment`, commentForm, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("komple");
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(
      `${BASE_URL_PRIVATE}/delete-comment?commentId=${commentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("delete");
  } catch (error) {
    console.log(error);
  }
};

export const editComment = async (commentForm) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `${BASE_URL_PRIVATE}/edit-comment`,
      commentForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//## LIKES
export const fetchLikes = async (postId) => {
  try {
    const res = await axios.get(
      `${BASE_URL_PUBLIC}/get-likes?postId=${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId) => {
  console.log(postId);
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${BASE_URL_PRIVATE}/like-post?postId=${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("like");
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL_PRIVATE}/unlike-post?postId=${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("unlike");
  } catch (error) {
    console.log(error);
  }
};
