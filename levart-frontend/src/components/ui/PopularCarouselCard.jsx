import { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons/Arrows";
import { renderCategoryIcon } from "../../utils/typeIconService";
import { calculateAverageRating } from "../../utils/calculateAverageRating";
import { SkeletonCard } from "./SkeletonCard";
import CustomCard from "./CustomCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PopularCarouselCard({ items, title, isLoading, category }) {
  const sliderRef = useRef(null);
  const [sliderInitialized, setSliderInitialized] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,

        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  const memoizedItems = useMemo(() => items, [items]);

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
    <div className="mx-10 md:mx-10 lg:mx-36 py-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          {renderCategoryIcon({
            category: category,
            size: 7,
          })}
          <h1 className="text-mainText text-2xl font-semibold leading-none ml-2">
            {title}
          </h1>
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
      <div className="flex flex-row w-full">
        <div className="w-full ">
          <div>
            <Slider ref={sliderRef} {...settings}>
              {!isLoading ? (
                memoizedItems && memoizedItems.length > 0 ? (
                  memoizedItems.map((item, index) => (
                    <CustomCard
                      key={index}
                      imageUrl={item.imageUrl}
                      title={item.name || item.title}
                      location={item.country || item.city}
                      rating={
                        item.ratingType
                          ? calculateAverageRating(item.ratingType)
                          : item.rating
                      }
                      isLoading={isLoading}
                      category={item.category}
                    />
                  ))
                ) : (
                  <div>No {category} found</div>
                )
              ) : (
                [...Array(5)].map((_, index) => <SkeletonCard index={index} />)
              )}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCarouselCard;
