import React, { useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import PopularCarouselCard from "../ui/PopularCarouselCard";

function PopularDestinations() {
  const { cities, isLoading } = useSelector((state) => state.browse);

  return (
    <PopularCarouselCard
      items={cities}
      title="Dream Destinations"
      isLoading={isLoading}
      category="cities"
    />
  );
}

export default PopularDestinations;
