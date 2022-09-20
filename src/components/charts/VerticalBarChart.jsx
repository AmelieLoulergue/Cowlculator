import React from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData, id }) => {
  const labels = [
    "1st Form - 10/09/2022",
    "2nd Form - 12/09/2022",
    "3rd Form - 14/09/2022",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Emissions if no mitigations (Tons Co2 eq/year)",
        data: [60, 30, 50, 40],
        borderColor: "rgb(237, 120, 107 )",
        backgroundColor: "rgb(237, 120, 107)",
      },
      {
        label: "Mitigated emissions (Tons Co2 eq/year)",
        data: [-30, -60, -70, -40],
        color: "white",
        borderColor: "rgb(32, 191, 169)",
        backgroundColor: "rgb(32, 191, 169, 0.8)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 12, weight: 500 },
          color: "white",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  return (
    <div>
      <Bar id={id} data={data} options={options} />
    </div>
  );
};
