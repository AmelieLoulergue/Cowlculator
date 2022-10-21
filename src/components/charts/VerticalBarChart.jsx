import React from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = ({ dataResults, id, labels }) => {
  // console.log(dataResults);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Emissions if no mitigations",
        data: dataResults.data1,
        borderColor: "rgb(237, 120, 107 )",
        backgroundColor: "rgb(237, 120, 107)",
      },
      {
        label: "Mitigated emissions",
        data: dataResults.data2,
        color: "white",
        borderColor: "rgb(32, 191, 169)",
        backgroundColor: "rgb(32, 191, 169, 0.8)",
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        color: "white",
        text: "Comparison of mitigated emissions and not mitigated emissions in tonne CO₂eq/year",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          font: { size: 10, weight: 500 },
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
