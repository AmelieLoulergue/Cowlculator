import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
let options = {
  plugins: {
    datalabels: {
      color: "white",
      font: {
        size: 14,
        weight: 500,
      },
      formatter: function (value, index) {
        if (value > 0) {
          return `${Math.round(value * 100) / 100} TCO2eq/year`;
        } else {
          return "";
        }
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
};
export const DoughnutChart = ({ id, dataResults }) => {
  const data = {
    labels: [
      "Utilities",
      "Fuel",
      "Other",
      "Animals’ enteric fermentation",
      "Animals’ manure",
      "Crops",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: dataResults,
        backgroundColor: [
          "rgb(237, 120, 107)",
          "rgb(32, 191, 169)",
          "rgb(253, 185, 90)",
          "rgb(91, 171, 197)",
          "rgb(130, 91, 197)",
          "rgb(144, 222, 93)",
        ],
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      id={id}
      options={options}
      plugins={[ChartDataLabels]}
    />
  );
};
