import {
  faBanSmoking,
  faBed,
  faBellConcierge,
  faBroom,
  faClock,
  faDumbbell,
  faMartiniGlass,
  faPaw,
  faPlane,
  faShower,
  faSnowflake,
  faSquareParking,
  faTv,
  faUserGroup,
  faUtensils,
  faVolumeXmark,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const propertyAmentitiesIcons = [
  {
    icon: <FontAwesomeIcon icon={faPaw} />,
    title: "Pets Allowed (Dog / Pet Friendly)",
  },
  {
    icon: <FontAwesomeIcon icon={faUtensils} />,
    title: "Restaurant",
  },
  {
    icon: <FontAwesomeIcon icon={faClock} />,
    title: "24-hour front desk",
  },
  {
    icon: <FontAwesomeIcon icon={faWifi} />,
    title: "Free Internet (WiFi)",
  },
  {
    icon: <FontAwesomeIcon icon={faDumbbell} className="size-4" />,
    title: "Fitness Center with Gym / Workout Room",
  },
  {
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    title: "Meeting rooms",
  },
  {
    icon: <FontAwesomeIcon icon={faSquareParking} />,
    title: "Parking",
  },
  {
    icon: <FontAwesomeIcon icon={faMartiniGlass} />,
    title: "Bar / lounge",
  },
  {
    icon: <FontAwesomeIcon icon={faPlane} />,
    title: "Airport transportation",
  },
];

export const roomFeaturesIcons = [
  {
    icon: <FontAwesomeIcon icon={faSnowflake} />,
    title: "Air conditioning",
  },
  {
    icon: <FontAwesomeIcon icon={faBroom} />,
    title: "Housekeeping",
  },
  {
    icon: <FontAwesomeIcon icon={faClock} />,
    title: "Wake up service / alarm clock",
  },
  {
    icon: <FontAwesomeIcon icon={faBed} />,
    title: "Safe",
  },
  {
    icon: <FontAwesomeIcon icon={faTv} />,
    title: "Flatscreen TV",
  },
  {
    icon: <FontAwesomeIcon icon={faShower} />,
    title: "Walk in shower",
  },
  {
    icon: <FontAwesomeIcon icon={faBellConcierge} />,
    title: "Room Service",
  },
  {
    icon: <FontAwesomeIcon icon={faBanSmoking} />,
    title: "Non-smoking",
  },
  {
    icon: <FontAwesomeIcon icon={faVolumeXmark} />,
    title: "Soundproof rooms",
  },
];
