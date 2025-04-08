import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons/Arrows";
import Slider from "react-slick";
import CustomCard from "./CustomCard";
import { SkeletonCard } from "./SkeletonCard";
import FancyCard from "./FancyCard";
import { renderCategoryIcon } from "../../utils/typeIconService";

function CarouselCard({ items, title, isLoading, category, slidesShown = 3 }) {
  const sliderRef = useRef(null);
  const [sliderInitialized, setSliderInitialized] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesShown,
    slidesToScroll: 1,
    arrows: false,

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
    <div className="py-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          {renderCategoryIcon({ category: category })}
          <h1 className="text-mainText text-2xl font-semibold leading-none ml-2">
            {title}
          </h1>
          <p className="text-2xl text-secondary-text font-semibold">
            ({items?.length})
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            id="backButton"
            className="px-2 py-1 rounded-md justify-end hover:bg-gray-200 active:bg-gray-300"
            onClick={handlePrev}
          >
            <ChevronLeftIcon className="font-bold text-black" />
          </button>
          <button
            className="px-2 py-1 rounded-lg justify-end hover:bg-gray-200 active:bg-gray-300"
            onClick={handleNext}
          >
            <ChevronRightIcon className="font-bold text-black" />
          </button>
        </div>
      </div>
      <div className="flex flex-row w-full ">
        <div className="w-full h-1/2 ">
          <div>
            <Slider ref={sliderRef} {...settings}>
              {!isLoading
                ? category === "hotel"
                  ? items &&
                    items.map((item, index) => (
                      <FancyCard
                        key={index}
                        imageUrl={item?.imageUrl}
                        title={item.name || item.title}
                        ratio={"auto"}
                        category={category}
                      />
                    ))
                  : items &&
                    items.map((item, index) => (
                      <CustomCard
                        key={index}
                        imageUrl={item?.imageUrl}
                        title={item?.title}
                        location={item?.address}
                        rating={item?.rating}
                        isLoading={isLoading}
                        category={category}
                      />
                    ))
                : [...Array(5)].map((_, index) => (
                    <SkeletonCard index={index} />
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;
