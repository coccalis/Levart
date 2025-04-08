import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddCityForm,
  setToggleAddCityForm,
  setTriggerRefresh,
} from "../../store/mapSlice";
import "../../styles/MapStyle.css";
import { useEffect, useState } from "react";
function MapTrack({ isMyProfile }) {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { mapCities, viewVisitedCity, isLoading } = useSelector(
    (state) => state.map
  );

  console.log("viewVisitedCity ", viewVisitedCity);

  return (
    <div className="w-full h-full overflow-hidden rounded-lg border border-gray-300">
      <MapContainer
        center={mapPosition}
        zoom={2}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        {mapCities.map((city) => (
          <Marker position={[city.lat, city.lng]} key={city.id}>
            <Popup>
              <span className="text-mainText font-semibold">{city.name}</span>,
              &nbsp;
              <span className="text-mainText font-semibold">
                {city.country}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeView center={viewVisitedCity} />
        {isMyProfile ? <DetectClick /> : null}
      </MapContainer>
    </div>
  );
}

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center.lat && center.lng) {
      map.flyTo([center.lat, center.lng], 10, { duration: 1.5 });
    }
  }, [center, map]);

  return null;
}

function DetectClick() {
  const dispatch = useDispatch();
  const toggleAddCityForm = useSelector((state) => state.map.toggleAddCityForm);

  useMapEvents({
    click: (e) => {
      console.log("Coordinates: ", e.latlng.lat, e.latlng.lng);
      dispatch(setAddCityForm({ lat: e.latlng.lat, lng: e.latlng.lng }));
      dispatch(setTriggerRefresh(true));
      if (!toggleAddCityForm) {
        dispatch(setToggleAddCityForm(true));
      }
    },
  });

  return null;
}

export default MapTrack;
