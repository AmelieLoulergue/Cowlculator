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
  const grayscale = `#dash .panel {filter: grayscale(1)}`;
  const chartoption = {
    responsive: false,
    maintainAspectRatio: false,
  };
  return (
    <>
      <div id="dash">
        <div id="summary" className="panel">
          <div className="card-section">
            {!currentResult && (
              <>
                <style>{grayscale}</style>
                <div className="column is-12">
                  <div style={{ textAlign: "center" }}>
                    <button className="btn" onClick={() => navigate("/form")}>
                      FILL THE FORM
                    </button>
                  </div>
                </div>
              </>
            )}
            <div className="card saved">
              <div className="card-icon">
                <div className="card-top">
                  <img src={plant} alt="plant icon"></img>
                  <h1>
                    <b>
                      {isNaN(
                        Intl.NumberFormat("en-US").format(
                          Math.round(
                            currentResult?.find(
                              (element) => element.id === "CO2mitigated"
                            )?.response
                          )
                        )
                      )
                        ? 0
                        : Intl.NumberFormat("en-US").format(
                            Math.round(
                              currentResult?.find(
                                (element) => element.id === "CO2mitigated"
                              ).response
                            )
                          )}
                    </b>
                    <br></br>
                    Tonne CO2eq/year
                  </h1>
                </div>
                {currentResult && (
                  <h2>
                    CO<sub>2</sub> mitigated
                  </h2>
                )}
              </div>
            </div>

            <div className="card impact">
              <div className="card-icon">
                <div className="card-top">
                  <img src={footprint} alt="carbon footprint icon"></img>
                  <h1>
                    <b>
                      {Intl.NumberFormat("en-US").format(
                        Math.round(
                          currentResult?.find(
                            (element) => element.id === "CO2emmited"
                          )?.response / 1000
                        )
                      )}
                      {" K"}
                    </b>
                    <br></br>
                    Tonne CO2eq/year
                  </h1>
                </div>
                {currentResult && (
                  <h2>
                    CO<sub>2</sub> emitted
                  </h2>
                )}
              </div>
            </div>

            <div className="card income">
              <div className="card-icon">
                <div className="card-top">
                  <img src={dollar} alt="dollar sign icon"></img>
                  {currentResult && (
                    <h1>
                      <b>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                        }).format(
                          Math.round(
                            currentResult?.find(
                              (element) => element.id === "totalCarbonCredits"
                            )?.response
                          )
                        )}
                      </b>
                      <br></br>
                      $/year
                    </h1>
                  )}
                </div>
                <h2>Estimated carbon credits</h2>
              </div>
            </div>
          </div>

          <div id="dash-charts" className="card-section container">
            <div className="card-dash-line">
              <div className="card-chart">
                {currentResult ? (
                  <DoughnutChart
                    options={chartoption}
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
                  <></>
                )}
              </div>
              <div
                className={
                  advicesArray.length === 0 ? "is-hidden" : "card-advice"
                }
              >
                {advicesArray.length === 0 ? (
                  <>
                    <h2>Impressive! You're doing great!</h2>
                    We don't have any advice to provide to you. You are currently doing all recommended actions in our database to reduce CO2 emmisions. Keep going!
                  </>
                ) : (
                  <>
                    <h2>Want to improve your results?</h2>
                    {currentResult &&
                      advicesArray.length > 0 &&
                      advicesArray
                        ?.filter((advice, index) => index === 0)
                        .map((advice) => advice)}
                  </>
                )}
              </div>
            </div>

                  {advicesArray.length < 2 ? (
                  <>
                    <div className="card-dash-line">
                      <div className="card-chart">
                      {currentResult ? (
                          <LineChart
                            options={chartoption}
                            labels={labelPeriodChart3}
                            id={"chart3"}
                            dataResults={{
                              data1: allCO2emmitedArray,
                              data2: allCO2mitigatedEmissions,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="card-chart">
                      {currentResult ? (
                          <BarChart
                            width={100}
                            height={50}
                            options={{ maintainAspectRatio: false, responsive: false }}
                            id={"chart2"}
                            labels={labelPeriodChart2}
                            dataResults={{
                              data1: allTotalEmissionsArray,
                              data2: allCO2emmitedArray,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                  ) : (
                  <>
                    <div className="card-dash-line">
                      <div className="card-chart">
                        {currentResult ? (
                          <LineChart
                            options={chartoption}
                            labels={labelPeriodChart3}
                            id={"chart3"}
                            dataResults={{
                              data1: allCO2emmitedArray,
                              data2: allCO2mitigatedEmissions,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div
                        className={
                          advicesArray.length < 2 ? "is-hidden" : "card-advice"
                        }
                      >
                        <h2>Here is something you can do:</h2>
                        {currentResult &&
                          advicesArray.length >= 2 &&
                          advicesArray
                            ?.filter((advice, index) => index === 1)
                            .map((advice) => advice)}
                      </div>
                    </div>

                    <div className="card-dash-line">
                      <div className="card-chart">
                        {currentResult ? (
                          <BarChart
                            width={100}
                            height={50}
                            options={{ maintainAspectRatio: false, responsive: false }}
                            id={"chart2"}
                            labels={labelPeriodChart2}
                            dataResults={{
                              data1: allTotalEmissionsArray,
                              data2: allCO2emmitedArray,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div
                        className={
                          advicesArray.length < 3 ? "is-hidden" : "card-advice"
                        }
                      >
                        <h2>You're doing great!</h2>
                        {currentResult &&
                          advicesArray.length >= 3 &&
                          advicesArray
                            ?.filter((advice, index) => index === 2)
                            .map((advice) => advice)}
                      </div>
                    </div>
                  </>
                  )}

            <div
                className={
                  advicesArray.length < 3 ? "is-hidden" : "card-advice"
                }
              >
                <h2>List of advices</h2>
                {currentResult &&
                  advicesArray.length >= 3 &&
                  advicesArray
                    ?.filter((advice, index) => index > 2)
                    .map((advice) => (
                      <>
                      <ul>
                        <li>{advice}</li>
                      </ul>
                      </>
                    ))}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
