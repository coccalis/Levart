import React from "react";
import PopularCarouselCard from "../ui/PopularCarouselCard";
import { useSelector } from "react-redux";

function PopularActivities() {
  const { activities, isLoading } = useSelector((state) => state.browse);

  return (
    <PopularCarouselCard
      items={activities}
      title="Do More, See More"
      isLoading={isLoading}
      category="activity"
    />
  );
}

export default PopularActivities;
