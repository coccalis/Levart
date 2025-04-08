import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

function MapResult({ lat, lng, zoom = 20 }) {
  const position = [lat, lng];
  // console.log(position);
  return (
    <div className="w-full h-80 overflow-hidden rounded-lg border border-gray-300 relative z-0">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
        <ChangeCenter position={position} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom()); // Adjusts the center without changing the zoom
    }
  }, [position, map]); // Dependency array ensures this runs when lat or lng changes

  return null;
}

export default MapResult;
