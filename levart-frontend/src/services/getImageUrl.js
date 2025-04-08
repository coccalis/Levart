import {
  getActivitiesImgUrl,
  getCityImgUrl,
  getHotelImgsUrl,
  getVenuesImgUrl,
} from "./imageMap";

export default function getImageUrl(category, image) {
  switch (category) {
    case "city":
      return getCityImgUrl(image);
    case "hotel":
      return getHotelImgsUrl(image);
    case "activity":
      return getActivitiesImgUrl(image);
    case "venue":
      return getVenuesImgUrl(image);
    default:
      return "";
  }
}
