import {
  faBicycle,
  faCity,
  faCoffee,
  faHotel,
  faLocationDot,
  faMartiniGlass,
  faShop,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DestinationIcon } from "../assets/icons/DestinactionIcon";

export const fetchTypeIcon = ({ type, color, size }) => {
  switch (type) {
    case "Bar":
      return (
        <FontAwesomeIcon
          icon={faMartiniGlass}
          className={`text-${color}  size-${size}`}
        />
      );

    case "Restaurant":
      return (
        <FontAwesomeIcon
          icon={faUtensils}
          className={`text-${color}  size-${size}`}
        />
      );
    case "Shop":
      return (
        <FontAwesomeIcon
          icon={faShop}
          className={`text-${color}  size-${size}`}
        />
      );
    case "Coffee Shop":
      return (
        <FontAwesomeIcon
          icon={faCoffee}
          className={`text-${color}  size-${size}`}
        />
      );
    default:
      return null;
  }
};

export const renderCategoryIcon = ({
  category,
  size = 6,
  extraStyle = "mainText",
}) => {
  switch (category) {
    case "hotel":
      return (
        <FontAwesomeIcon
          icon={faHotel}
          className={`size-${size} text-${extraStyle}`}
        />
      );
    case "activity":
      return (
        <FontAwesomeIcon
          icon={faBicycle}
          className={`size-${size}  text-${extraStyle}`}
        />
      );
    case "venue":
      return (
        <FontAwesomeIcon
          icon={faLocationDot}
          className={`size-${size}  text-${extraStyle}`}
        />
      );
    case "cities":
      return <DestinationIcon className={`size-${size}  text-${extraStyle}`} />;
    case "city":
      return (
        <FontAwesomeIcon
          icon={faCity}
          className={`size-${size}  text-${extraStyle}`}
        />
      );
    default:
      return null;
  }
};
