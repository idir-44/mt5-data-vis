// components/Map.tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

const Map = () => {
  const [data, setData] = useState<Catastrophe[]>([]);

  // Simuler la récupération des données depuis une API ou base de données
  useEffect(() => {
    // Exemple de données fictives
    const fetchData = async () => {
      const fakeData = [
        { id: "1", name: "Ouragan Sandy", latitude: 40.7128, longitude: -74.006 },
        { id: "2", name: "Tremblement de terre", latitude: 34.0522, longitude: -118.2437 },
        { id: "3", name: "Feu de forêt", latitude: 37.7749, longitude: -122.4194 },
      ];
      setData(fakeData);
    };
    fetchData();
  }, []);

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((catastrophe) => (
        <Marker key={catastrophe.id} position={[catastrophe.latitude, catastrophe.longitude]}>
          <Popup>
            <strong>{catastrophe.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
