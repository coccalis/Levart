import React from "react";

import { useSelector } from "react-redux";
import PopularCarouselCard from "../ui/PopularCarouselCard";

function PopularVenues() {
  const { venues, isLoading } = useSelector((state) => state.browse);

  return (
    <PopularCarouselCard
      items={venues}
      title="Perfect Places"
      isLoading={isLoading}
      category="venue"
    />
  );
}

export default PopularVenues;
