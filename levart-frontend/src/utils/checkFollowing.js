export function isFollowing(followers, loggedInUsername) {
  const followerUsernames = followers.map((entry) => entry.followed.username);

  return followerUsernames.includes(loggedInUsername);
}
