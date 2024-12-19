// components/Map.tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Correction des icônes Leaflet pour Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

type Catastrophe = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
};

const Map = () => {
  const [catastrophes, setCatastrophes] = useState<Catastrophe[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fakeCatastrophes = [
        { id: "1", name: "Ouragan Sandy", latitude: 40.7128, longitude: -74.006 },
        { id: "2", name: "Tremblement de terre", latitude: 34.0522, longitude: -118.2437 },
        { id: "3", name: "Feu de forêt", latitude: 37.7749, longitude: -122.4194 },
      ];
      setCatastrophes(fakeCatastrophes);

      const fakeCities = [
        { id: "1", name: "New York", latitude: 40.7128, longitude: -74.006, population: 8419600 },
        { id: "2", name: "Los Angeles", latitude: 34.0522, longitude: -118.2437, population: 3980400 },
        { id: "3", name: "San Francisco", latitude: 37.7749, longitude: -122.4194, population: 883305 },
      ];
      setCities(fakeCities);
    };
    fetchData();
  }, []);

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {catastrophes.map((catastrophe) => (
        <Marker key={catastrophe.id} position={[catastrophe.latitude, catastrophe.longitude]}>
          <Popup>
            <strong>{catastrophe.name}</strong>
          </Popup>
        </Marker>
      ))}
      {cities.map((city) => (
        <Circle
          key={city.id}
          center={[city.latitude, city.longitude]}
          radius={city.population / 100}
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.4 }}
        >
          <Popup>
            <strong>{city.name}</strong><br />
            Population: {city.population.toLocaleString()}
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default Map;
