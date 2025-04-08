import { motion } from "framer-motion";
import { refactorDate } from "../../utils/refactorTimeDate";
import { Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";

function WeatherSection({ city, weather }) {
  return (
    <div className="my-10">
      <div className="flex flex-row items-center gap-5">
        <FontAwesomeIcon icon={faCloud} className="text-mainText size-6" />

        <h1 className="text-xl text-mainText font-semibold">When to Visit</h1>
      </div>
      <div className="flex flex-row space-x-20 items-center justify-center my-5">
        {weather ? (
          weather.forecast.forecastday.map((day, index) => (
            <Tooltip
              offset={15}
              placement="bottom"
              closeDelay={0}
              content={
                <div className="flex flex-row items-center justify-center gap-5 font-semibold">
                  <div className="flex flex-col">
                    <p>Sunrise: {day.astro.sunrise}</p>
                    <p>Moonrise: {day.astro.moonrise}</p>
                  </div>
                  <div className="flex flex-col">
                    <p>Sunset: {day.astro.sunset}</p>
                    <p>Moonset: {day.astro.moonset}</p>
                  </div>
                </div>
              }
              showArrow={true}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                key={index}
                className="flex flex-col items-center justify-center gap-5 border-1 border-gray-200 rounded-xl p-5 w-1/2 h-64 cursor-pointer hover:shadow-md font-semibold text-mainText"
              >
                <p>{refactorDate(day.date)}</p>
                <img src={day.day.condition.icon} alt="weather icon" />
                <p className="text-center">{day.day.condition.text}</p>
                <p>
                  {day.day.avgtemp_c}°C / {day.day.avgtemp_f}°F
                </p>
              </motion.div>
            </Tooltip>
          ))
        ) : (
          <p>No weather information available</p>
        )}
      </div>
    </div>
  );
}

export default WeatherSection;
