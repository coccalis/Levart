import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import MapVisitedCard from "../ui/MapVisitedCard";
import ReactCountryFlag from "react-country-flag";
import { getCountryCode } from "../../data/countryCodes";

function MapCard({ mapCities }) {
  const [selected, setSelected] = useState("cities");
  return (
    <div className="border-1 border-gray-200 rounded-lg shadow-md p-5">
      <Tabs
        // isVertical
        aria-label="Options"
        size="lg"
        radius="sm"
        color="primary"
        variant="underlined"
        selectedKey={selected}
        onSelectionChange={setSelected}
        className=" justify-evenly"
        classNames={{
          base: "w-full",
          tab: "font-semibold w-full",
          tabList: "w-max mx-16",
          tabContent: "w-max",
          panel: "w-full",
        }}
      >
        <Tab key="cities" title="Cities">
          <div className="space-y-5 min-h-[300px] max-h-[400px] h-auto overflow-y-auto">
            {mapCities &&
              mapCities.map((city) => (
                <MapVisitedCard key={city.id} item={city} />
              ))}
          </div>
        </Tab>
        <Tab key="countries" title="Countries">
          <div className="min-h-[150px] max-h-[400px] h-auto overflow-y-auto">
            {mapCities &&
              Object.entries(
                mapCities.reduce((acc, city) => {
                  acc[city.country] = (acc[city.country] || 0) + 1;
                  return acc;
                }, {})
              ).map(([country, count]) => (
                <div
                  key={country}
                  className="flex flex-col my-2 border-1 border-gray-100 shadow-sm rounded-lg p-5 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex flex-row items-center gap-2">
                    <ReactCountryFlag
                      countryCode={getCountryCode(country)}
                      svg
                      style={{
                        fontSize: "1em",
                        lineHeight: "2em",
                        marginLeft: "0.5em",
                      }}
                    />

                    <p className="font-semibold line-clamp-1">{country}</p>
                  </div>
                  <p className=" text-secondary-text font-semibold">
                    {count} {count === 1 ? "city" : "cities"} visited
                  </p>
                </div>
              ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default MapCard;
