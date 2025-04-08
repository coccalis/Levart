import { useDispatch, useSelector } from "react-redux";
import useFetchCitydata from "../../hooks/useFetchCitydata";
import { useEffect, useState } from "react";
import { Alert, Button, Input, Spinner } from "@nextui-org/react";
import { addMapCity, setToggleAddCityForm } from "../../store/mapSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function MapAddCity() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoadingCheck, setIsLoadingCheck] = useState(false);
  const [cityForm, setCityForm] = useState({
    name: "",
    country: "",
    date: "",
    lat: "",
    lng: "",
  });
  const { addCityForm, isLoading, cityInfo } = useSelector(
    (state) => state.map
  );
  const { lat, lng } = addCityForm;

  useFetchCitydata({ lat, lng });
  useEffect(() => {
    if (cityInfo) {
      setCityForm((prevForm) => ({
        ...prevForm,
        name: cityInfo.locality || prevForm.name,
        country: cityInfo.countryName || prevForm.country,
        lat: lat || prevForm.lat,
        lng: lng || prevForm.lng,
      }));
    }
  }, [cityInfo, lat, lng]);

  const handleSubmit = (e) => {
    setShowAlert(false);
    setIsLoadingCheck(true);
    e.preventDefault();

    if (
      cityForm.name === "" ||
      cityForm.country === "" ||
      cityForm.date === ""
    ) {
      setIsLoadingCheck(false);
      setShowAlert(true);
      return;
    }
    dispatch(addMapCity(cityForm));

    setTimeout(() => {
      setIsLoadingCheck(false);
      setShowAlert(false);
      dispatch(setToggleAddCityForm(false));
    }, 1000);
  };

  console.log("cityForm: ", cityForm);
  return (
    <div className="border-1 border-gray-200 rounded-lg shadow-md p-5 min-h-[150px] max-h-[800px] h-auto ">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <button
              className="text-secondary-text hover:text-mainText transition"
              onClick={() => dispatch(setToggleAddCityForm(false))}
            >
              <FontAwesomeIcon icon={faClose} className="  size-4" />
            </button>
          </div>
          <h1 className="text-center text-mainText font-semibold text-xl">
            Add a city
          </h1>
          <div>
            <label htmlFor="cityName" className="font-semibold text-mainText">
              City name
            </label>
            <Input
              id="cityName"
              onChange={(e) =>
                setCityForm({ ...cityForm, name: e.target.value })
              }
              isInvalid={showAlert}
              variant="bordered"
              value={cityForm.name}
            />
          </div>
          <div>
            <label htmlFor="country" className="font-semibold text-mainText">
              Country
            </label>
            <Input
              id="country"
              onChange={(e) =>
                setCityForm({ ...cityForm, country: e.target.value })
              }
              isInvalid={showAlert}
              variant="bordered"
              value={cityForm.country}
            />
          </div>
          <div>
            <label htmlFor="date" className="font-semibold text-mainText">
              Date visited
            </label>
            <Input
              id="date"
              type="date"
              onChange={(e) =>
                setCityForm({ ...cityForm, date: e.target.value })
              }
              isInvalid={showAlert}
              variant="bordered"
              value={cityForm.date}
            />
          </div>

          <div>
            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold text-lg"
            >
              {isLoadingCheck ? (
                <Spinner color="white" size="md" />
              ) : (
                "Add city"
              )}
            </Button>
          </div>
          {showAlert && (
            <Alert
              isVisible={showAlert}
              onClose={() => setShowAlert(false)}
              variant="faded"
              color="danger"
              title="Please fill in all the fields "
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default MapAddCity;
