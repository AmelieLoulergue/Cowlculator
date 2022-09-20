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
        if (value !== 0) {
          if (index.dataIndex === 2) {
            return `${Math.round(value * 100) / 100} $/year`;
          } else {
            return `${Math.round(value * 100) / 100} TCO2eq`;
          }
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
      "Tonnes of CO2eq emitted/year",
      "Tonnes of CO2eq mitigated/year",
      "Potential carbon credit income $/year",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: dataResults,
        backgroundColor: [
          "rgb(237, 120, 107)",
          "rgb(32, 191, 169)",
          "rgb(253, 185, 90)",
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
