import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
let options = {
  plugins: {
    title: {
      display: true,
      color: "white",
      text: "Custom Chart Title",
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    datalabels: {
      color: "white",
      font: {
        size: 14,
        weight: 500,
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
  const labels = [
    dataResults[0] && dataResults[0] !== 0
      ? `Utilities ${Math.round(dataResults[0] * 100) / 100} TCO2eq/year`
      : null,
    dataResults[1] && dataResults[1] !== 0
      ? `Fuel ${Math.round(dataResults[1] * 100) / 100} TCO2eq/year`
      : null,
    dataResults[2] && dataResults[2] !== 0
      ? `Other ${Math.round(dataResults[2] * 100) / 100} TCO2eq/year`
      : null,
    dataResults[3] && dataResults[3] !== 0
      ? `Animals’ enteric fermentation ${
          Math.round(dataResults[3] * 100) / 100
        } TCO2eq/year`
      : null,
    dataResults[4] && dataResults[4] !== 0
      ? `Animals’ manure ${Math.round(dataResults[4] * 100) / 100} TCO2eq/year`
      : null,
    dataResults[5] && dataResults[5] !== 0
      ? `Crops ${Math.round(dataResults[5] * 100) / 100} TCO2eq/year`
      : null,
  ];
  const data = {
    labels: labels.filter((label) => label !== null),
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

  return <Doughnut data={data} id={id} options={options} />;
};
