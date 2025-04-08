import axios from "axios";

export default async function fetchGoogleImage({ query }) {
  const res = await axios.get(
    `https://www.googleapis.com/customsearch/v1?key=${
      import.meta.env.VITE_GOOGLE_IMG_KEY
    }&cx=b5e57f55b37004e2c&q=${query}&imgType=photo&num=1&searchType=image`
  );
  return res.data;
}
