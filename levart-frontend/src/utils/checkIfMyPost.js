const checkIfMyPost = (userPost, authUser) => {
  if (userPost.username === authUser.username) {
    return true;
  }
  return false;
};

export default checkIfMyPost;
