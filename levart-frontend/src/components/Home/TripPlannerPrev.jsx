import { AppStoreButton, GooglePlayButton } from "react-mobile-app-button";
import tripimg from "../../assets/images/trip_ai_planner_banner.svg";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import GooglePLayIcon from "../../assets/icons/icon";
import { useNavigate } from "react-router-dom";

function TripPlannerPrev() {
  const navigate = useNavigate();
  return (
    <div
      className="mx-5 my-10 md:mx-10 lg:mx-36 py-5 overflow-hidden rounded-xl shadow-lg"
      style={{
        backgroundImage: `url(${tripimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[500px]">
        {/* Column 1: Empty on large screens, disappears on small screens */}
        <div className="hidden lg:block "></div>

        {/* Column 2: Content */}
        <div className="p-5 lg:p-5 text-mainText z-10 flex items-center justify-center ">
          <div className="flex flex-col justify-center items-center  p-6 ">
            <h2 className="text-xl md:text-xl lg:text-2xl text-mainText font-bold mb-4 text-center">
              Transform Your Travel Planning with LevartGuide AI
            </h2>

            <p className="px-0 font-semibold text-mainText text-sm md:text-base lg:text-base text-center">
              Discover the future of travel planning with our cutting-edge AI
              technology. Let our intelligent system craft the perfect itinerary
              while you focus on the excitement of your upcoming adventure. From
              hidden local gems to popular attractions, we'll help you create
              unforgettable memories without the stress of traditional travel
              planning.
            </p>

            <div className="w-full flex flex-col justify-center items-center mt-5">
              <Button
                radius="md"
                size="lg"
                className="w-full  bg-mainBtn text-white text-xl font-semibold transition"
                onClick={() => navigate("/trip-planner")}
              >
                Start Your Journey Now
              </Button>
            </div>

            {/* App Store and Google Play buttons for large screens */}
            <div className="hidden lg:flex justify-center items-center space-x-4 mt-4">
              <AppStoreButton theme="dark" className="border-transparent" />
              <GooglePlayButton theme="dark" className="border-transparent" />
            </div>

            {/* Icons for medium screens */}
            <div className="hidden xsm:flex md:flex lg:hidden space-x-10 mt-4 justify-center w-full items-center">
              <FontAwesomeIcon icon={faApple} className="text-4xl text-black" />
              <GooglePLayIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripPlannerPrev;
