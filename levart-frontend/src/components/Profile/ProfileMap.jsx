import { useDispatch, useSelector } from "react-redux";
import MapCard from "../Map/MapCard";
import MapTrack from "../Map/MapTrack";
import { useEffect } from "react";
import { fetchMapCities } from "../../store/mapSlice";
import MapAddCity from "../Map/MapAddCity";
import { TOTAL_CITIES } from "../../data/citiesCount";
function ProfileMap({ username, isMyProfile }) {
  const dispatch = useDispatch();
  console.log("username: ", username);
  const { mapCities, toggleAddCityForm, visitedCities, visitedCountries } =
    useSelector((state) => state.map);
  const triggerRefresh = useSelector((state) => state.map.triggerRefresh);

  useEffect(() => {
    if (toggleAddCityForm === false) {
      dispatch(fetchMapCities({ username }));
    }
  }, [toggleAddCityForm, triggerRefresh, username]);
  const percentage = ((visitedCities / TOTAL_CITIES) * 100).toFixed(4);

  console.log(mapCities);
  return (
    <div>
      {isMyProfile ? (
        <div className="flex flex-col space-y-2 my-2">
          <h1 className="text-xl font-semibold text-mainText">
            Your Travel Map: Pin the World, Track Your Journey
          </h1>
          <p className="text-sm font-semibold text-secondary-text ">
            Mark the cities you've explored, watch your personal travel map come
            to life, and discover what percentage of the world you've conquered.
            Every pin tells a story—start mapping your adventures today!
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 my-2">
          <h1 className="text-xl font-semibold text-mainText">
            Explore {username}'s Travel Map: Track Their Journey
          </h1>
          <p className="text-sm font-semibold text-secondary-text">
            See where they've been and the percentage of the world they've
            discovered. Get inspired by their journey and start planning your
            next adventure!
          </p>
        </div>
      )}
      {visitedCities > 0 && (
        <div className="flex flex-col border-1 border-gray-100 rounded-lg p-3 my-2 shadow-sm">
          <p className="text-md font-semibold text-mainText">
            You've explored{" "}
            <span className=" text-mainBtn font-bold">{visitedCities}</span>{" "}
            cities across{" "}
            <span className=" text-mainBtn font-bold">{visitedCountries}</span>{" "}
            countries so far—that's{" "}
            <span className=" text-mainBtn font-bold">{percentage}%</span> of
            the world! Keep going, adventurer!
          </p>
          <p className=" text-xs font-semibold text-secondary-text">
            **"Note: There are approximately 4 million cities and 195 countries
            worldwide, so this percentage is an estimate. Your journey is just
            getting started!"
          </p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-5 h-auto">
        <div className="col-span-2 h-full">
          <MapTrack isMyProfile={isMyProfile} />
        </div>

        {toggleAddCityForm ? <MapAddCity /> : <MapCard mapCities={mapCities} />}
      </div>
    </div>
  );
}

export default ProfileMap;
