import React, { useEffect, useRef, useState, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { FavoritesContext } from "./FavoritesContext";
import PlaceItem from "./PlaceItem";

// Иконки
const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const favoriteIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
  iconRetinaUrl: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

export default function MapView({ places }) {
  const mapRef = useRef(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const { favorites } = useContext(FavoritesContext);

  const favoritePlaceIds = favorites.map((p) => p.id);

  useEffect(() => {
    if (selectedPlaceId && mapRef.current) {
      const map = mapRef.current;
      const place = places.find((p) => p.id === selectedPlaceId);
      if (place) {
        map.setView([place.latitude, place.longitude], 15, { animate: true });
      }
    }
  }, [selectedPlaceId, places]);

  return (
    <MapContainer
      center={[50.8278, 12.9214]}
      zoom={13}
      style={{ height: "100%", width: "100%" }} // 🔧 Главное изменение
      scrollWheelZoom={true}
      doubleClickZoom={true}
      touchZoom={true}
      zoomControl={true}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) =>
        place.latitude && place.longitude ? (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={favoritePlaceIds.includes(place.id) ? favoriteIcon : defaultIcon}
            eventHandlers={{
              click: () => setSelectedPlaceId(place.id),
            }}
          >
            <Popup>
              <PlaceItem place={place} minimal />
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
