import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons/Arrows";
import TripPlanCard from "../ui/TripPlanCard";

function TripPlanCarousel({ tripPlan }) {
  const sliderRef = useRef(null);
  const [sliderInitialized, setSliderInitialized] = useState(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,

    responsive: [
      {
        breakpoint: 1024,

        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (sliderRef.current) {
      setSliderInitialized(true);
    }
  }, []);

  const handlePrev = () => {
    if (sliderInitialized && sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderInitialized && sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  return (
    <div className="w-full my-10 mx-auto max-w-7xl h-full">
      <div className="flex space-x-4 justify-between">
        <button
          id="backButton"
          className="px-2 py-1 rounded-md hover:bg-gray-200 active:bg-gray-300"
          onClick={handlePrev}
        >
          <ChevronLeftIcon className="font-bold text-black" />
        </button>
        <button
          className="px-2 py-1 rounded-lg hover:bg-gray-200 active:bg-gray-300"
          onClick={handleNext}
        >
          <ChevronRightIcon className="font-bold text-black" />
        </button>
      </div>

      <div className="w-full mt-4">
        <Slider ref={sliderRef} {...settings}>
          {tripPlan.map((day, index) => (
            <div key={index} className="px-2">
              <TripPlanCard tripDay={day} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default TripPlanCarousel;
