import * as React from "react";
import "./Dashboard.css";
import plant from "../assets/svg/plant.svg";
import footprint from "../assets/svg/footprint.svg";
import dollar from "../assets/svg/dollar.svg";
import { useNavigate } from "react-router-dom";
import { DoughnutChart } from "./charts/DoughnoutChart";
import { BarChart } from "./charts/VerticalBarChart";
import { LineChart } from "./charts/LineChart";
import { useState } from "react";
function Dashboard({
  login,
  results,
  formIsCompleted,
  datasForm,
  allResultsUser,
}) {
  let navigate = useNavigate();
  let test = [];
  console.log(allResultsUser);
  const [datasGraph2, setDatasGraph2] = useState(
    allResultsUser
      .filter((element) => element !== null)
      .map((element) => [
        element.find((el) => el.id === "totalEmissionsGraph").response,
        element.find((el) => el.id === "totalMitigatedEmissionsGraph").response,
      ])
  );
  const dates = allResultsUser
    .filter((element) => element !== null)
    .map((element) =>
      new Date(element.find((el) => el.id === "end_date").response).getTime()
    );
  console.log(dates);
  const max = Math.max(...dates.filter(element => element ));
  const index = dates.indexOf(max);
  console.log(index);
  const currentResult = allResultsUser[index];
  console.log(currentResult);

  React.useEffect(() => console.log(datasGraph2), [datasGraph2]);
  const allTotalEmissionsArray = allResultsUser
    .filter((element) => element !== null)
    .map(
      (element) =>
        element.find((el) => el.id === "totalEmissionsGraph").response
    );

  console.log(allTotalEmissionsArray);
  const allTotalMitigatedEmissions = allResultsUser
    .filter((element) => element !== null)
    .map(
      (element) =>
        element.find((el) => el.id === "totalMitigationsGraph").response
    );
  console.log(allTotalMitigatedEmissions);
  const labelPeriodChart2 = allResultsUser
    .filter((element) => element !== null)
    .map((element, index) => {
      if (
        element.find((el) => el.id === "start_date")?.response &&
        element.find((el) => el.id === "end_date")?.response
      ) {
        return [
          `${element
            .find((el) => el.id === "start_date")
            ?.response.replaceAll("-", "/")} - ${element
            .find((el) => el.id === "end_date")
            ?.response.replaceAll("-", "/")}`,
          `${Math.round(
            allTotalMitigatedEmissions[index] / allTotalEmissionsArray[index]
          )}% of mitigation`,
        ];
      }
    });
  console.log(labelPeriodChart2);
  labelPeriodChart2.map((element, index) => {
    return [
      ...test,
      {
        [`data${index}`]: [
          allTotalEmissionsArray[index],
          allTotalMitigatedEmissions[index],
        ],
      },
    ];
  });
  console.log(test);
  return (
    <>
      <div id="dash">
        <div id="summary" className="panel">
          <div className="card-section">
            <div className="card">
              <div className="card-icon">
                <div className="card-top">
                  <img src={plant} alt="plant icon"></img>
                  <h1>
                    CO<sub>2</sub> saved
                  </h1>
                </div>
                {currentResult && (
                  <h2>
                    {isNaN(
                      Math.round(
                        currentResult.find(
                          (element) => element.id === "CO2mitigated"
                        )?.response * 100
                      ) / 100
                    )
                      ? 0
                      : Math.round(
                          currentResult.find(
                            (element) => element.id === "CO2mitigated"
                          ).response * 100
                        ) / 100}{" "}
                    T of CO2eq/year
                  </h2>
                )}
              </div>
              <div className="card-chart">
                {currentResult ? (
                  <DoughnutChart
                    id={"chart1"}
                    dataResults={[
                      currentResult.find(
                        (element) => element.id === "utilitiesGraph"
                      )?.response,
                      currentResult.find(
                        (element) => element.id === "fuelGraph"
                      )?.response,
                      currentResult.find(
                        (element) => element.id === "otherGraph"
                      )?.response,
                      currentResult.find(
                        (element) =>
                          element.id === "entericFermentationCO2Graph"
                      )?.response,
                      currentResult.find(
                        (element) => element.id === "manureCO2graph"
                      )?.response,
                      currentResult.find(
                        (element) => element.id === "cropsGraph"
                      )?.response,
                    ]}
                  />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <button className="btn" onClick={() => navigate("/form")}>
                      FILL THE FORM
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-icon">
                <div className="card-top">
                  <img src={footprint} alt="carbon footprint icon"></img>
                  <h1>
                    CO<sub>2</sub> impact
                  </h1>
                </div>
                {currentResult && (
                  <h2>
                    {Math.round(
                      currentResult.find(
                        (element) => element.id === "CO2emmited"
                      )?.response * 100
                    ) / 100}{" "}
                    T of CO2eq/year
                  </h2>
                )}
              </div>{" "}
              <div className="card-chart">
                {currentResult ? (
                  <BarChart
                    id={"chart2"}
                    labels={labelPeriodChart2}
                    dataResults={{
                      data1: allTotalEmissionsArray,
                      data2: allTotalMitigatedEmissions,
                    }}
                  />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <button className="btn" onClick={() => navigate("/form")}>
                      FILL THE FORM
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-icon">
                <div className="card-top">
                  <img src={dollar} alt="dollar sign icon"></img>
                  <h1>New income</h1>
                </div>
                {currentResult && (
                  <h2>
                    {Math.round(
                      currentResult.find(
                        (element) => element.id === "totalCarbonCredits"
                      )?.response * 100
                    ) / 100}{" "}
                    $/year
                  </h2>
                )}
              </div>
              <div className="card-chart">
                {currentResult ? (
                  <LineChart
                    id={"chart3"}
                    dataResults={{
                      data1: [
                        results.totalEmissionsGraph,
                        results.totalEmissionsGraph / 2,
                      ],
                      data2: [
                        results.totalMitigationsGraph,
                        results.totalMitigationsGraph / 1.5,
                      ],
                    }}
                  />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <button className="btn" onClick={() => navigate("/form")}>
                      FILL THE FORM
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
