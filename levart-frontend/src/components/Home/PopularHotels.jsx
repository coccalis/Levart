import FancyCard from "../ui/FancyCard";
import { useSelector } from "react-redux";
import { SkeletonBigCard } from "../ui/SkeletonCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

function PopularHotels() {
  const { hotels, isLoading } = useSelector((state) => state.browse);

  //TODO SORT BASED ON RATING AND LIMIT TO 3
  const randomHotels =
    hotels && hotels.length > 0
      ? [...hotels].sort(() => 0.5 - Math.random()).slice(0, 3)
      : [];

  return (
    <>
      <div className="mx-10 md:mx-10 lg:mx-36 py-5">
        <div className="bg-[#00241B] px-10 lg:px-10 py-5 w-full rounded-xl">
          <div className="flex flex-row items-center">
            <FontAwesomeIcon icon={faHotel} className="size-6 text-white" />
            <h1 className="text-white text-2xl font-semibold leading-none ml-2">
              Your Perfect Stay Awaits
            </h1>
          </div>

          <div className="xsm:grid xsm:grid-cols-1 lg:flex lg:flex-row w-full xsm:gap-x-5 md:space-x-5">
            {!isLoading ? (
              randomHotels && randomHotels.length > 0 ? (
                randomHotels.map((hotel, index) => (
                  <FancyCard
                    key={index}
                    imageUrl={hotel.imageUrl}
                    title={hotel.name}
                    ratio={"auto"}
                    category={hotel.category}
                  />
                ))
              ) : (
                <div>No hotels found</div>
              )
            ) : (
              [...Array(3)].map((_, index) => (
                <SkeletonBigCard key={index} index={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularHotels;
