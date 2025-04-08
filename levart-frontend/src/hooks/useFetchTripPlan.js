import { useEffect, useState } from "react";
import tripPlanner from "../services/gemini-api";

const useFetchTripPlan = (tripInfo) => {
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAIResult = async () => {
    if (!tripInfo) return;

    setLoading(true); // Start loading
    setError(null); // Reset error

    try {
      // Await the result of tripPlanner function
      const response = await tripPlanner({ tripInfo: tripInfo });
      const days = response.split("---").map((day) => day.trim()); // Split and clean days
      setTripPlan(days);
      console.log(response); // Store split days
    } catch (err) {
      setError("Failed to fetch AI suggestions.");
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };
  useEffect(() => {
    fetchAIResult();
  }, []);

  return { tripPlan, loading };
};
export default useFetchTripPlan;
