import { Button, Card } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { RatingIcon } from "../../assets/icons/RatingIcon";
import { getCountryCode } from "../../data/countryCodes";
import ReactCountryFlag from "react-country-flag";

function TopVenue() {
  const navigate = useNavigate();
  const { venues, isLoading } = useSelector((state) => state.browse);

  const restaurants = venues?.filter((venue) => venue.type === "Restaurant");

  console.log(restaurants);

  const topRestaurant = restaurants?.reduce((top, current) => {
    return parseFloat(current.rating) > parseFloat(top.rating) ? current : top;
  }, restaurants[0]);

  console.log(topRestaurant?.category);
  console.log(topRestaurant?.country);
  const countryCode = getCountryCode(topRestaurant?.country);
  console.log(countryCode);

  const handleNav = (category, name) => {
    console.log(category, name);
    navigate(`/search/${category}/${name}`);
  };

  return (
    <div className="mx-10 md:mx-10 lg:mx-36 py-5">
      <div className="bg-[#F2F1EC] w-full px-10 lg:px-10 py-10 rounded-xl">
        <div className="flex flex-wrap items-center xsm:justify-center md:justify-start">
          <h1 className="text-mainText text-4xl font-semibold leading-none ml-2 xsm:text-center md:text-start">
            Levarter’s #1 Dining Spot in {topRestaurant?.city}!
          </h1>
          {countryCode && (
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{
                fontSize: "2em",
                lineHeight: "2em",
                marginLeft: "0.5em",
              }}
            />
          )}
        </div>
        <div className="grid xsm:grid-col-1 md:grid-cols-2 gap-8 mx-2 my-5">
          <div className="flex flex-col justify-center items-center">
            <div className="mx-2 space-y-5">
              <div className="flex flex-row items-center">
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="size-6 text-mainText "
                />
                <h1 className="text-3xl font-semibold text-mainText leading-none ml-2 ">
                  {topRestaurant?.title}
                </h1>
              </div>

              <p className="text-xl xsm:text-center md:text-start text-secondary-text mt-2">
                {topRestaurant?.description}.
              </p>
              <div className="flex flex-row items-center space-x-3">
                <RatingIcon className="text-mainBtn size-10" />
                <p className="text-2xl text-hoverText font-bold">
                  {topRestaurant?.rating}
                </p>
              </div>
              <Button
                color="primary"
                className="w-full font-semibold text-lg"
                onClick={() =>
                  handleNav(topRestaurant?.category, topRestaurant?.title)
                }
              >
                Learn more
              </Button>
            </div>
          </div>
          <div className="flex items-center">
            <Card className="w-full cursor-pointer">
              <motion.img
                whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
                alt="Discover Card"
                src={topRestaurant?.imageUrl}
                className="w-full h-auto rounded-lg object-cover xsm:aspect-[16/9] md:aspect-[1.85/1]"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopVenue;
