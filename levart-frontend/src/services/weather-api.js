import axios from "axios";

export default async function weatherFetch({ city }) {
  console.log("mesa sto api  malaka", city);
  const response = await axios.get(
    `http://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${city}&days=4&aqi=no&alerts=no
`
  );
  return response.data;
}
