function getHotelImgsUrl(name) {
  return new URL(`../assets/images/hotels/${name}`, import.meta.url).href;
}

function getCityImgUrl(name) {
  return new URL(`../assets/images/cities/${name}`, import.meta.url).href;
}
function getActivitiesImgUrl(name) {
  return new URL(`../assets/images/activities/${name}`, import.meta.url).href;
}
function getVenuesImgUrl(name) {
  return new URL(`../assets/images/venues/${name}`, import.meta.url).href;
}

function getProfileImgUrl(name) {
  return new URL(`../assets/images/users/${name}`, import.meta.url).href;
}

export {
  getHotelImgsUrl,
  getActivitiesImgUrl,
  getCityImgUrl,
  getVenuesImgUrl,
  getProfileImgUrl,
};
