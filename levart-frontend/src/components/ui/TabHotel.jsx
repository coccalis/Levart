import { Tab, Tabs } from "@nextui-org/react";
import MapResult from "./MapResult";
import { useState } from "react";
import {
  propertyAmentitiesIcons,
  roomFeaturesIcons,
} from "../../data/hotelAmentities";
import { getCountryCode } from "../../data/countryCodes";
import ReactCountryFlag from "react-country-flag";

function TabSectionHotel({
  name,
  country,
  languages,
  description,
  lat,
  lng,
  propertyAmenities,
  roomFeatures,
}) {
  const [selected, setSelected] = useState("about");
  const countryCode = getCountryCode(country);

  const renderAmenitiesWithIcons = () => {
    return propertyAmentitiesIcons.map((amenity, index) => {
      const isAvailable = propertyAmenities[amenity.title] || false;

      if (isAvailable) {
        return (
          <div
            key={index}
            className="flex items-center space-x-5 my-1 text-mainText font-semibold"
          >
            <div className="flex-shrink-0 w-6 flex justify-center items-center">
              {amenity.icon}
            </div>

            <div className="flex-1">
              <p className="text-left text-sm">{amenity.title}</p>
            </div>
          </div>
        );
      }
      return null;
    });
  };

  const renderFeaturesWithIcons = () => {
    return roomFeaturesIcons.map((feature, index) => {
      const isAvailable = roomFeatures[feature.title] || false; // Ensure matching key

      if (isAvailable) {
        return (
          <div
            key={index}
            className="flex items-center space-x-5 my-1 text-mainText"
          >
            <div className="flex-shrink-0 w-6 flex justify-center items-center">
              {feature.icon}
            </div>

            <div className="flex-1">
              <p className="text-left text-sm">{feature.title}</p>
            </div>
          </div>
        );
      }
      return null;
    });
  };
  return (
    <div className="my-10">
      <Tabs
        size="lg"
        radius="sm"
        selectedKey={selected}
        onSelectionChange={setSelected}
        className="justify-evenly"
        classNames={{
          panel: "border-1 border-gray-200 rounded-lg p-5",
          tab: "font-semibold",
          base: "w-full",
          tabList: "w-full",
        }}
      >
        <Tab key="about" title={`About the ${name}`}>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-5 h-full">
              <h1 className="text-xl text-mainText font-semibold">About</h1>
              <p className="text-mainText">{description}</p>
              <div className="mt-auto flex flex-col gap-x-1">
                <p className="text-mainText font-semibold">
                  Languages: {languages}
                </p>
                <div className="flex flex-row gap-x-1">
                  <p className="text-mainText font-semibold">
                    Country: {country}
                  </p>
                  {countryCode && (
                    <ReactCountryFlag
                      countryCode={countryCode}
                      svg
                      style={{
                        fontSize: "1.5em",
                        lineHeight: "2em",
                        marginLeft: "0.5em",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {lat && lng && (
              <div>
                <MapResult lat={lat} lng={lng} />
              </div>
            )}
          </div>
        </Tab>
        <Tab key="amenities" title="Property Amenities">
          {propertyAmenities ? (
            <div className="grid grid-cols-2 gap-5">
              {renderAmenitiesWithIcons()}
            </div>
          ) : (
            <p>No amenities available</p>
          )}
        </Tab>
        <Tab key="features" title="Room Features">
          {roomFeatures ? (
            <div className="grid grid-cols-2 gap-5">
              {renderFeaturesWithIcons()}
            </div>
          ) : (
            <p>No room features available</p>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabSectionHotel;
