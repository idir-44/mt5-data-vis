"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Graph() {
  const [chartData, setChartData] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/v1/populations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        const labels = data.map((item: any) => item.CommonName);
        const populations = data.map((item: any) => item.Population);

        setChartData({
          labels,
          datasets: [
            {
              label: "Population",
              data: populations,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Impossible de charger les données");
        setLoading(false);
      });
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Population par pays" },
    },
  };

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ height: "50%", width: "80%", margin : "auto" }}>
      {chartData ? <Bar data={chartData} options={options} /> : <p>Aucune donnée disponible</p>}
    </div>
  );
}
