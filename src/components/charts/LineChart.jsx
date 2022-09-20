import React from "react";
import { Line } from "react-chartjs-2";
export const LineChart = ({ id }) => {
  const labels = [
    "1st Form - 10/09/2022",
    "2nd Form - 12/09/2022",
    "3rd Form - 14/09/2022",
  ];
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
  const data = {
    labels: labels,
    datasets: [
      {
        label: "CO2eq emissions (Tons Co2 eq/year)",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(237, 120, 107)",
        tension: 0.1,
      },
      {
        label: "CO2eq mitigations (Tons Co2 eq/year)",
        data: [68, 40, 30, 90, 40, 50, 42],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div>
      <Line id={id} data={data} options={options} />
    </div>
  );
};
