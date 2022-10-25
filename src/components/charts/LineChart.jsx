import React from "react";
import { Line } from "react-chartjs-2";
export const LineChart = ({ id, dataResults, labels }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        color: "white",
        text: "Evolution of emissions and mitigations over time in tonne of CO₂eq/year",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
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
          font: { size: 10 },
        },
      },
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "CO₂eq emissions",
        data: dataResults.data1,
        fill: false,
        borderColor: "rgb(237, 120, 107)",
        tension: 0.1,
      },
      {
        label: "CO₂eq mitigations",
        data: dataResults.data2,
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
