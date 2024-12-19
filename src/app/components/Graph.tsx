"use client";

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

// Configuration Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Graph() {
  // Données pour le graphique
  const data = {
    labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
    datasets: [
      {
        label: "Catastrophes par mois",
        data: [12, 19, 3, 5, 2, 3], // Exemple de données
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options typées
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Nombre de catastrophes par mois" },
    },
  };

  return (
    <div style={{ height: "500px", width: "100%", textAlign:"center" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
