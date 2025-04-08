import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faBicycle,
  faLocationDot,
  faUtensils,
  faMartiniGlass,
  faCoffee,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export const navIcons = {
  chevron: (
    <FontAwesomeIcon icon={faChevronDown} className="size-3 text-[#333]" />
  ),
  hotel: <FontAwesomeIcon icon={faHotel} className="size-5 text-[#6fa8dc] " />,
  venue: (
    <FontAwesomeIcon icon={faLocationDot} className="size-5 text-[#e06666]" />
  ),
  activities: (
    <FontAwesomeIcon icon={faBicycle} className="size-5 text-[#8e7cc3]" />
  ),
  restaurants: (
    <FontAwesomeIcon icon={faUtensils} className="size-5 text-[#dcca6f]" />
  ),
  bars: (
    <FontAwesomeIcon icon={faMartiniGlass} className="size-5 text-[#dc6fbc]" />
  ),
  coffee: <FontAwesomeIcon icon={faCoffee} className="size-5 text-[#6f81dc]" />,
};

export const menuItems = [
  { label: "LevartHub", path: "/levart-hub", type: "link" },
  { label: "LevartGuide AI", path: "/trip-planner", type: "link" },
  { label: "About", path: "/about", type: "link" },
];

export const dropdownItems = [
  {
    key: "hotels",
    label: "Hotels",
    description:
      "Discover and book the best hotels around the world for a comfortable and luxurious stay.",
    icon: navIcons.hotel,
    path: "discover/hotels",
  },
  {
    key: "venues",
    label: "Venues",
    description:
      "Discover exceptional venues around the world, from charming cafes to elegant dining spots, all curated for unforgettable experiences.",
    icon: navIcons.venue,
    path: "discover/venues",
  },
  {
    key: "activities",
    label: "Activities",
    description:
      "Explore exciting activities and experiences worldwide to enhance your travel adventures.",
    icon: navIcons.activities,
    path: "discover/activities",
  },
  {
    key: "restaurants",
    label: "Restaurants",
    description:
      "Find top-rated restaurants globally, offering a variety of cuisines to satisfy your taste.",
    icon: navIcons.restaurants,
    path: "discover/restaurants",
  },
  {
    key: "bars",
    label: "Bars",
    description:
      "Unwind at the best bars and lounges, offering expertly crafted cocktails, lively atmospheres, and stunning views.",
    icon: navIcons.bars,
    path: "discover/bars",
  },
  {
    key: "coffee",
    label: "Coffee Shops",
    description:
      "Relax at cozy coffee shops offering a blend of aromatic coffee, artisanal pastries, and inviting atmospheres.",
    icon: navIcons.coffee,
    path: "discover/coffee-shops",
  },
];
