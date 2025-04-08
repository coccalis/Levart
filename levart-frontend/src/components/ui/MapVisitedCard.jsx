import { faClose, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  removeMapCity,
  setTriggerRefresh,
  setViewVisitedCity,
} from "../../store/mapSlice";
import { getCountryCode } from "../../data/countryCodes";
import ReactCountryFlag from "react-country-flag";

function MapVisitedCard({ item }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeMapCity(item.id));
    dispatch(setTriggerRefresh(true)); // Trigger refresh
    setTimeout(() => {
      dispatch(setTriggerRefresh(false)); // Reset refresh state
    }, 100);
  };

  const handleViewVisitedCity = () => {
    dispatch(setViewVisitedCity({ lat: item.lat, lng: item.lng }));
  };

  const countryCode = getCountryCode(item?.country);
  return (
    <div className="border-1 border-gray-200 rounded-md p-5 hover:bg-gray-100 cursor-pointer shadow-sm ">
      <div
        className="flex justify-between text-mainText"
        onClick={() => handleViewVisitedCity()}
      >
        <div className="flex flex-col">
          <div className="flex flex-col ">
            <p className="font-semibold line-clamp-1">{item.name}</p>
            <div className="flex flex-row items-center gap-2">
              <p className="font-semibold line-clamp-1">{item.country}</p>
              {countryCode && (
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
                  style={{
                    fontSize: "1em",
                    lineHeight: "2em",
                    marginLeft: "0.5em",
                  }}
                />
              )}
            </div>
          </div>
          <div>
            <p className="font-semibold text-secondary-text">
              Day visited: {item.date}
            </p>
          </div>
        </div>
        <div>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapVisitedCard;
