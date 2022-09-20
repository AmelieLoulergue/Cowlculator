import React from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = ({ dataResults, id }) => {
  const labels = [
    "1st Form - 10/09/2022",
    "2nd Form - 12/09/2022",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Emissions if no mitigations (Tons Co2 eq/year)",
        data: dataResults.data1,
        borderColor: "rgb(237, 120, 107 )",
        backgroundColor: "rgb(237, 120, 107)",
      },
      {
        label: "Mitigated emissions (Tons Co2 eq/year)",
        data: dataResults.data2,
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
