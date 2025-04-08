import { useSelector } from "react-redux";
import { useState } from "react";
import useFetchTripPlan from "../hooks/useFetchTripPlan";
import TripPlanCarousel from "../components/TripPlanner/TripPlanCarousel";
import { Spinner } from "@nextui-org/react";

function TripPlannerResult() {
  const trip = useSelector((state) => state.trip.trip);
  const titleOfDay = useSelector((state) => state.trip.titleOfDay);
  const [error, setError] = useState(null);

  const { tripPlan, loading } = useFetchTripPlan(trip);

  console.log("tripPlan", trip);
  console.log("title", titleOfDay);

  if (trip === null)
    return (
      <main className="w-full my-10 mx-auto max-w-7xl">
        <div className="w-full justify-center text-center items-center ">
          <h1 className="text-mainText font-semibold text-xl ">
            No trip details found. Start planning your adventure now to unlock
            personalized recommendations!
          </h1>
        </div>
      </main>
    );
  if (loading)
    return (
      <main className="w-full my-10 mx-auto max-w-7xl">
        <div className="w-full justify-center items-center text-center ">
          <Spinner size="large" color="primary" />
        </div>
      </main>
    );

  if (error) return <p>{error}</p>;

  return (
    <main className="w-full ">
      <div className="w-full bg-gradient-to-b from-navClr to-white">
        <div className="w-full mx-auto max-w-7xl">
          <div className="w-full justify-center text-center items-center text-mainText ">
            <h3 className="text-3xl font-semibold p-5">
              Trip Plan in {trip.destination} for {trip.duration} days
            </h3>
            <h4>
              <span className="font-semibold">Interests:</span>
              {trip.interests.join(", ")}
            </h4>
          </div>
        </div>
      </div>
      <div className="w-full my-10 mx-auto max-w-7xl">
        {tripPlan ? (
          <TripPlanCarousel tripPlan={tripPlan} />
        ) : (
          <p className="text-center text-mainText font-bold text-lg">
            No suggestions available.
          </p>
        )}
      </div>
    </main>
  );
}

export default TripPlannerResult;
