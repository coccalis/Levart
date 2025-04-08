import { ratingCityLabels, ratingHotelLabels } from "../data/ratingLabels";

export const calculateAverageRating = (ratingType) => {
  if (!ratingType || Object.keys(ratingType).length === 0) return "0";
  const ratingsArray = Object.values(ratingType);
  const total = ratingsArray.reduce((acc, curr) => acc + curr, 0);
  const average = total / ratingsArray.length;
  return Math.min(average, 5).toFixed(1);
};

export const ratingTypeLabelsCalc = (ratingType, category) => {
  if (category === "city") {
    return ratingCityLabels.reduce((acc, label) => {
      acc[label] = ratingType?.[label] ?? 0.0;
      return acc;
    }, {});
  } else {
    return ratingHotelLabels.reduce((acc, label) => {
      acc[label] = ratingType?.[label] ?? 0.0;
      return acc;
    }, {});
  }
};
