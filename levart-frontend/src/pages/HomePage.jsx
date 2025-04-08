import { useDispatch } from "react-redux";
import ActivitiesToDoIn from "../components/Home/ActivitiesToDoIn";
import MainSearchBar from "../components/Home/MainSearchBar";
import MightLikeActivity from "../components/Home/MightLikeActivity";
import PopularActivities from "../components/Home/PopularActivities";
import PopularDestinations from "../components/Home/PopularDestinations";
import PopularHotels from "../components/Home/PopularHotels";
import PopularVenues from "../components/Home/PopularVenues";
import TopVenue from "../components/Home/TopVenue";

import TripPlannerPrev from "../components/Home/TripPlannerPrev";
import "../styles/GeneralStyles.css";
import { useEffect } from "react";
import {
  fetchActivities,
  fetchCities,
  fetchHotels,
  fetchVenues,
} from "../store/browseSlice";
import LazyLoadSection from "../components/LazyLoadSection";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchActivities());
    dispatch(fetchHotels());
    dispatch(fetchVenues());
  }, [dispatch]);

  return (
    <>
      <MainSearchBar />
      <hr className="h-1 bg-divider-clr xsm:mx-10 md:mx-16 rounder-2xl" />

      <TripPlannerPrev />
      <PopularDestinations />
      <LazyLoadSection>
        <PopularActivities />
        <PopularHotels />
      </LazyLoadSection>

      <LazyLoadSection>
        <PopularVenues />
        <ActivitiesToDoIn />
      </LazyLoadSection>

      <LazyLoadSection>
        <TopVenue />
        <MightLikeActivity />
      </LazyLoadSection>
    </>
  );
}

export default HomePage;
