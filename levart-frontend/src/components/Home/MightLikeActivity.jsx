import { faMartiniGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import FancyCard from "../ui/FancyCard";
import { SkeletonCard } from "../ui/SkeletonCard";
import { getVenuesImgUrl } from "../../services/imageMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MightLikeActivity() {
  const { venues, isLoading } = useSelector((state) => state.browse);
  const type = "Bar";
  const bars = venues?.filter((venue) => venue.type === type);

  return (
    <div className="mx-10 md:mx-10 lg:mx-36 py-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <FontAwesomeIcon
            icon={faMartiniGlass}
            className="size-6 text-mainText"
          />
          <h1 className="text-mainText text-2xl font-semibold  leading-none ml-2">
            Cheers to That
          </h1>
        </div>
      </div>
      <div className="grid xsm:grid-col-1 lg:grid-cols-3 gap-x-10">
        {!isLoading ? (
          bars && bars.length > 0 ? (
            bars.map((venue, index) => (
              <FancyCard
                key={index}
                imageUrl={venue.imageUrl}
                title={venue.title}
                location={venue.city}
                ratio={"aspect-[16/9]"}
                category={venue.category}
              />
            ))
          ) : (
            <div>no</div>
          )
        ) : (
          [...Array(3)].map((_, index) => (
            <SkeletonCard key={index} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default MightLikeActivity;
