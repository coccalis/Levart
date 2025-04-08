import { useEffect, useState } from "react";
import {
  currencyConverter,
  formatPriceRange,
} from "../../services/currency-converter-api";
import MapResult from "./MapResult";

function DiscoverInfoBox({
  category,
  description,
  priceRange,
  ticketPrice = 0,
  lat = 1,
  lng = 1,
  zoom = 20,
}) {
  const [usdRangePrice, setUsdRangePrice] = useState("");
  const [eurRangePrice, setEurRangePrice] = useState("");
  const [eurTicketPrice, setEurTicketPrice] = useState("");

  useEffect(() => {
    const fetchPriceRange = async () => {
      if (priceRange) {
        const { usdRange: usd, eurRange: eur } = await formatPriceRange(
          priceRange
        );
        setUsdRangePrice(usd);
        setEurRangePrice(eur);
      }

      if (ticketPrice !== 0) {
        const eur = await currencyConverter(ticketPrice, "USD", "EUR");
        setEurTicketPrice(eur.toFixed(2));
      }
    };

    fetchPriceRange();
  }, [priceRange, ticketPrice]);

  return (
    <div className="w-full border-1 border-gray-200 rounded-lg p-5 my-5">
      <div className="grid grid-cols-2 gap-x-5">
        <div className="flex flex-col gap-5 h-full">
          <h1 className="font-semibold text-mainText text-lg">About</h1>
          <p className="font-semibold text-mainText">{description}</p>
          {category === "venue" ? (
            <div className="mt-auto flex flex-col gap-x-1 text-mainText">
              <hr />
              {priceRange && (
                <h1 className="font-semibold">
                  Price Range: &nbsp;
                  {usdRangePrice} USD / {eurRangePrice} EUR
                </h1>
              )}
            </div>
          ) : (
            category === "activity" && (
              <div className="mt-auto flex flex-col gap-x-1 text-mainText">
                <hr />
                <h1 className="font-semibold">
                  Ticket Price: &nbsp; ${ticketPrice} USD / €{eurTicketPrice}{" "}
                  EUR
                </h1>
              </div>
            )
          )}
        </div>
        <div>
          <MapResult lat={lat} lng={lng} zoom={zoom} />
        </div>
      </div>
    </div>
  );
}

export default DiscoverInfoBox;
