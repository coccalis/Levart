import RockieReporterIcon from "../assets/images/achievements/post/rockie-reporter-icon.svg";
import ContentCreatorIcon from "../assets/images/achievements/post/content-creator-icon.svg";
import TravelBloggerIcon from "../assets/images/achievements/post/travel-blogger-icon.svg";
import FirstStepsIcon from "../assets/images/achievements/map/first-steps-icon.svg";
import CityHopperIcon from "../assets/images/achievements/map/city-hopper-icon.svg";
import GlobetrotterIcon from "../assets/images/achievements/map/globetrotter-icon.svg";
import GroupPioneerIcon from "../assets/images/achievements/group/group-pioneer-icon.svg";
import FriendFinderIcon from "../assets/images/achievements/social/friend-finder-icon.svg";
import SocialButterflyIcon from "../assets/images/achievements/social/social-butterfly-icon.svg";
import TravelInfluencerIcon from "../assets/images/achievements/social/travel-influencer-icon.svg";

const achievementsData = {
  Posts: [
    {
      threshold: 1,
      title: "Rookie Reporter",
      subtext: "Create your first post",
      icon: RockieReporterIcon,
    },
    {
      threshold: 5,
      title: "Content Creator",
      subtext: "Create 5 posts",
      icon: ContentCreatorIcon,
    },
    {
      threshold: 25,
      title: "Travel Blogger",
      subtext: "Create 25 posts",
      icon: TravelBloggerIcon,
    },
  ],
  Map: [
    {
      threshold: 1,
      title: "First Steps",
      subtext: "Add your first city to the map",
      icon: FirstStepsIcon,
    },
    {
      threshold: 5,
      title: "City Hopper",
      subtext: "Visit 5 different cities",
      icon: CityHopperIcon,
    },
    {
      threshold: 10,
      title: "Globetrotter",
      subtext: "Visit 10 different cities",
      icon: GlobetrotterIcon,
    },
  ],
  Group: [
    {
      threshold: 1,
      title: "Group Pioneer",
      subtext: "Create your first travel group",
      icon: GroupPioneerIcon,
    },
  ],
  Social: [
    {
      threshold: 1,
      title: "Friend Finder",
      subtext: "Make your first follow",
      icon: FriendFinderIcon,
    },
    {
      threshold: 10,
      title: "Social Butterfly",
      subtext: "Follow 10 travelers",
      icon: SocialButterflyIcon,
    },
    {
      threshold: 20,
      title: "Travel Influencer",
      subtext: "Have 20 follows",
      icon: TravelInfluencerIcon,
    },
  ],
};

export default achievementsData;
