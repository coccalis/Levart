export const checkIsMyComment = (commentUser, userAuth) => {
  if (!commentUser || !userAuth) return false;
  return commentUser.username === userAuth.username;
};

export default checkIsMyComment;
