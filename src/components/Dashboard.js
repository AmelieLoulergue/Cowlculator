import * as React from "react";
import "./Dashboard.css";
import plant from "../assets/svg/plant.svg";
import footprint from "../assets/svg/footprint.svg";
import dollar from "../assets/svg/dollar.svg";
import { useNavigate } from "react-router-dom";
import { DoughnutChart } from "./charts/DoughnoutChart";
import { BarChart } from "./charts/VerticalBarChart";
import { LineChart } from "./charts/LineChart";
import advices from "../utils/calculs/advice";
function Dashboard({ allResultsUser }) {
  let navigate = useNavigate();
  allResultsUser.sort((a, b) => {
    return (
      Number(new Date(a.find((el) => el.id === "end_date").response)) -
      Number(new Date(b.find((el) => el.id === "end_date").response))
    );
  });
  let currentResult = allResultsUser[allResultsUser.length - 1];
  let advicesArray = advices({ result: currentResult });
  console.log(advicesArray);
  const allTotalEmissionsArray = allResultsUser
    .filter((element) => element !== null)
    .map(
      (element) =>
        element.find((el) => el.id === "totalEmissionsGraph").response
    );
  const allCO2emmitedArray = allResultsUser
    .filter((element) => element !== null)
    .map((element) => element.find((el) => el.id === "CO2emmited").response);

  const allCO2mitigatedEmissions = allResultsUser
    .filter((element) => element !== null)
    .map((element) => element.find((el) => el.id === "CO2mitigated").response);
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
            (allCO2mitigatedEmissions[index] / allCO2emmitedArray[index]) * 100
          )}% of mitigation`,
        ];
      }
    });
  const labelPeriodChart3 = allResultsUser
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
        ];
      }
    });
  return (
    <>
      <div id="dash">
        <div id="summary" className="panel">
          <div className="card-section">
            <div className="columns is-multiline">
              <div className="column is-4 is-12-touch">
                <div className="is-flex is-centered">
                  <div className="card saved">
                    <div className="card-icon">
                      <div className="card-top">
                        <img src={plant} alt="plant icon"></img>
                        <h1>
                          CO<sub>2</sub> mitigated
                        </h1>
                      </div>
                      {currentResult && (
                        <h2>
                          {isNaN(
                            Math.round(
                              currentResult.find(
                                (element) => element.id === "CO2mitigated"
                              )?.response * 10
                            ) / 10
                          )
                            ? 0
                            : Math.round(
                                currentResult.find(
                                  (element) => element.id === "CO2mitigated"
                                ).response * 1
                              ) / 1}{" "}
                          Tonne CO2eq/year
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-4 is-12-touch">
                <div className="is-flex is-centered">
                  <div className="card impact">
                    <div className="card-icon">
                      <div className="card-top">
                        <img src={footprint} alt="carbon footprint icon"></img>
                        <h1>
                          CO<sub>2</sub> emitted
                        </h1>
                      </div>
                      {currentResult && (
                        <h2>
                          {Math.round(
                            currentResult.find(
                              (element) => element.id === "CO2emmited"
                            )?.response * 1
                          ) / 1}
                          Tonne CO2eq/year
                        </h2>
                      )}
                    </div>{" "}
                  </div>{" "}
                </div>
              </div>
              <div className="column is-4 is-12-touch">
                <div className="is-flex is-centered">
                  <div className="card income">
                    <div className="card-icon">
                      <div className="card-top">
                        <img src={dollar} alt="dollar sign icon"></img>
                        <h1>Estimated carbon credits</h1>
                      </div>
                      {currentResult && (
                        <h2>
                          {Math.round(
                            currentResult.find(
                              (element) => element.id === "totalCarbonCredits"
                            )?.response * 1
                          ) / 1}{" "}
                          $/year
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-touch">
                <div className="card-chart">
                  {currentResult ? (
                    <DoughnutChart
                      responsive={false}
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
                          (element) => element.id === "manureCO2Graph"
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
              <div className="column is-6 is-12-touch">
                <div className="card-chart has-text-centered">
                  {advicesArray?.map((advice) => (
                    <>
                      {advice}
                      <br />
                    </>
                  ))}
                </div>{" "}
              </div>
              <div className="column is-6 is-hidden-mobile">
                <div className="card-chart has-text-centered">ADVICE</div>{" "}
              </div>
              <div className="column is-6 is-12-touch">
                <div className="card-chart">
                  {currentResult ? (
                    <BarChart
                      responsive={false}
                      id={"chart2"}
                      labels={labelPeriodChart2}
                      dataResults={{
                        data1: allTotalEmissionsArray,
                        data2: allCO2emmitedArray,
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
              <div className="column is-6 is-hidden-desktop">
                <div className="card-chart has-text-centered">ADVICE</div>{" "}
              </div>
              <div className="column is-6 is-12-touch ">
                <div className="card-chart">
                  {currentResult ? (
                    <LineChart
                      responsive={false}
                      labels={labelPeriodChart3}
                      id={"chart3"}
                      dataResults={{
                        data1: allCO2emmitedArray,
                        data2: allCO2mitigatedEmissions,
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
              <div className="column is-6 ">
                <div className="card-chart has-text-centered">ADVICE</div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
