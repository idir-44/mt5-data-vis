"use client";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

type Catastrophe = {
  ID: string;
  EonetID: string;
  Title: string;
  Description: string;
  Link: string;
  Category: string;
  Date: string;
  Latitude: number;
  Longitude: number;
};

type City = {
  ID: string;
  CommonName: string;
  OfficialName: string;
  Latitude: number;
  Longitude: number;
  Population: number;
};

const Map = () => {
  const searchParams = useSearchParams();
  const populationMax = searchParams.get("lte");
  const [catastrophes, setCatastrophes] = useState<Catastrophe[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCatastrophes = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/events");
        const data = await response.json();
        const formattedCatastrophes = data.map((item: any) => ({
          ID: item.ID,
          EonetID: item.EonetID,
          Title: item.Title || "Catastrophe sans titre",
          Description: item.Description || "Aucune description",
          Link: item.Link,
          Category: item.Category,
          Date: item.Date,
          Latitude: item.Latitude,
          Longitude: item.Longitude,
        }));
        setCatastrophes(formattedCatastrophes);
      } catch (error) {
        console.error("Erreur lors de la récupération des catastrophes:", error);
      }
    };

    const fetchCities = async () => {
      try {
        const url = new URL("http://localhost:8080/v1/populations");
        if (populationMax) {
          url.searchParams.append("lte", populationMax);
        }
        const response = await fetch(url.toString());
        const data = await response.json();
        const formattedCities = data.map((item: any) => ({
          ID: item.ID,
          CommonName: item.CommonName,
          OfficialName: item.OfficialName,
          Latitude: item.Latitude,
          Longitude: item.Longitude,
          Population: item.Population,
        }));

        setCities(formattedCities);
      } catch (error) {
        console.error("Erreur lors de la récupération des villes:", error);
      }
    };

    fetchCatastrophes();
    fetchCities();
  }, [populationMax]);  

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {catastrophes.map((catastrophe) => (
        <Marker key={catastrophe.ID} position={[catastrophe.Latitude, catastrophe.Longitude]}>
          <Popup>
            <strong>{catastrophe.Category}</strong><br />
            <a href={catastrophe.Link} target="_blank" rel="noopener noreferrer">Voir les détails</a><br />
            <em>{catastrophe.Date}</em>
          </Popup>
        </Marker>
      ))}
      {cities.map((city) => (
        <Circle
          key={city.ID}
          center={[city.Latitude, city.Longitude]}
          radius={city.Population / 10000}
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.4 }}
        >
          <Popup>
            <strong>{city.CommonName}</strong><br />
            Population: {city.Population.toLocaleString()}
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default Map;
