import { useParams } from "react-router-dom";
import DiscoverCard from "../components/ui/DiscoverCard";
import imgPrw from "../assets/images/discover-background.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  fetchActivities,
  fetchHotels,
  fetchVenues,
} from "../store/browseSlice";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { SortTypes } from "../data/SortTypes";
import { calculateAverageRating } from "../utils/calculateAverageRating";

function Discover() {
  const { type } = useParams();
  const dispatch = useDispatch();
  const { hotels, activities, venues } = useSelector((state) => state.browse);

  const [sortValue, setSortValue] = useState("Sort by Default");
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    switch (type.toLowerCase()) {
      case "hotels":
        dispatch(fetchHotels());
        break;
      case "activities":
        dispatch(fetchActivities());
        break;
      case "venues":
      case "restaurants":
      case "bars":
      case "coffee-shops":
        dispatch(fetchVenues());
        break;
      default:
        break;
    }
  }, [dispatch, type]);

  const handleSelectionChange = (e) => {
    setIsSorting(true);
    setSortValue(e.target.value);
    setTimeout(() => {
      setIsSorting(false);
    }, 500);
  };

  const sortedData = useMemo(() => {
    const filterData = () => {
      const lowerType = type.toLowerCase().trim();
      let data;

      switch (lowerType) {
        case "restaurants":
          data = venues.filter(
            (venue) => venue.type.toLowerCase().trim() === "restaurant"
          );
          break;
        case "bars":
          data = venues.filter(
            (venue) => venue.type.toLowerCase().trim() === "bar"
          );
          break;
        case "coffee-shops":
          data = venues.filter(
            (venue) => venue.type.toLowerCase().trim() === "coffee shop"
          );
          break;
        case "venues":
          data = venues;
          break;
        case "activities":
          data = activities;
          break;
        case "hotels":
          data = hotels;
          break;
        default:
          data = [];
      }

      const updatedData = [...data];

      switch (sortValue) {
        case "rating":
          return updatedData.sort((a, b) => {
            if (
              a.category === "hotel" &&
              (a.ratingCount === null || b.ratingCount === null)
            ) {
              return 0;
            }

            if (a.category === b.rating) {
              return a.title.localeCompare(b.title);
            }
            return a.rating - b.rating;
          });
        case "rating-desc":
          return updatedData.sort((a, b) => {
            let ratingA, ratingB;

            if (a.category === "hotel") {
              ratingA = a.ratingCount;
            } else {
              ratingA = a.rating;
            }

            if (b.category === "hotel") {
              ratingB = b.ratingCount;
            } else {
              ratingB = b.rating;
            }

            if (ratingA !== undefined && ratingB !== undefined) {
              if (ratingA === ratingB) {
                return (a.name || "").localeCompare(b.name || "");
              }
              return ratingB - ratingA;
            }

            return 0;
          });
        case "alphabetical":
          return updatedData.sort((a, b) => {
            if (a.category === "hotel") {
              return a.name.localeCompare(b.name);
            }

            return a.title.localeCompare(b.title);
          });
        default:
          return updatedData;
      }
    };

    return filterData();
  }, [type, sortValue, activities, hotels, venues]);

  const visibleData = useMemo(
    () => sortedData.slice(0, visibleCount),
    [sortedData, visibleCount]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const threshold = document.documentElement.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        if (visibleCount >= sortedData.length) {
          return;
        }

        setIsLoading(true);

        setTimeout(() => {
          setVisibleCount((prevCount) => {
            if (prevCount >= sortedData.length) {
              setIsLoading(false);
              return prevCount;
            }
            return prevCount + 5;
          });

          setIsLoading(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sortedData.length, visibleCount]);

  const formatData = (item) => {
    switch (type.toLowerCase()) {
      case "hotels":
        return {
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.name,
          location: item.city,
          country: item.country,
          description: item.description,
          rating: calculateAverageRating(item.ratingType),
          category: item.category,
        };
      case "activities":
        return {
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.title,
          location: item.city,
          country: item.country,
          type: item.type,
          description: item.description,
          rating: item.rating,
          category: item.category,
        };
      case "venues":
      case "restaurants":
      case "bars":
      case "coffee-shops":
        return {
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.title,
          location: item.city,
          country: item.country,
          description: item.description,
          rating: item.rating,
          type: item.type,
          category: item.category,
        };
      default:
        return {};
    }
  };

  const renderCards = () =>
    visibleData.map((item) => <DiscoverCard {...formatData(item)} />);

  const renderContent = () => {
    switch (type.toLowerCase()) {
      case "hotels":
        return (
          <h1 className="text-2xl font-semibold text-mainText">
            Browse Hotels
          </h1>
        );
      case "activities":
        return (
          <h1 className="text-2xl font-semibold text-mainText">
            Browse Activities
          </h1>
        );
      case "venues":
        return (
          <h1 className="text-2xl font-semibold text-mainText">
            Browse Venues
          </h1>
        );
      case "restaurants":
        return (
          <h1 className="text-2xl font-semibold text-mainText">
            Browse Restaurants
          </h1>
        );
      case "bars":
        return (
          <h1 className="text-2xl font-semibold text-mainText ">Browse Bars</h1>
        );
      case "coffee-shops":
        return (
          <h1 className="text-2xl font-semibold text-mainText ">
            Browse Coffee Shops
          </h1>
        );
      default:
        return (
          <h1 className="text-2xl font-semibold text-mainText ">Browse</h1>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gradient-to-b from-navClr to-white">
        <div className="w-full mx-auto max-w-7xl">
          <img
            alt="Discover Card"
            src={imgPrw}
            className="w-full h-60 object-fill"
          />
        </div>
      </div>
      <div className="w-full my-10 mx-auto max-w-5xl px-4">
        <div className="w-full flex xsm:flex-col md:flex-row items-center justify-between my-10">
          {renderContent()}
          <Select
            className="max-w-xs"
            placeholder="Sort by Default"
            size="sm"
            selectedKeys={[sortValue]}
            variant="bordered"
            onChange={handleSelectionChange}
            classNames={{ value: "font-semibold" }}
          >
            {SortTypes.map((type) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>
        </div>
        {isSorting ? (
          <div className="flex justify-center my-10">
            <Spinner color="primary" size="lg" />
          </div>
        ) : (
          <div className="flex flex-col space-y-10">{renderCards()}</div>
        )}
        <div className="flex justify-center my-10">
          {isLoading && <Spinner color="primary" size="lg" />}
        </div>
      </div>
    </div>
  );
}

export default Discover;
