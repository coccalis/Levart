export const shortenUrl = (url) => {
  if (url.length > 30) {
    const truncatedUrl = `${url.substring(0, 30)}...`;
    return truncatedUrl;
  } else {
    return url;
  }
};
