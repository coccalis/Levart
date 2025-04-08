import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCityInfo } from "../store/mapSlice"; // Correct import
import axios from "axios";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const useFetchCitydata = ({ lat, lng }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchCityData() {
      try {
        const res = await axios.get(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = res.data;
        console.log(data);
        dispatch(setCityInfo(data)); // Use the correct action
      } catch (err) {
        console.error(err);
      }
    }

    fetchCityData();
  }, [lat, lng, dispatch]);

  return;
};

export default useFetchCitydata;
