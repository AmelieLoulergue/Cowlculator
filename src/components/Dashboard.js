import * as React from "react";
import "./Dashboard.css";
import plant from "../assets/svg/plant.svg";
import footprint from "../assets/svg/footprint.svg";
import dollar from "../assets/svg/dollar.svg";
import { useNavigate } from "react-router-dom";
import { DoughnutChart } from "./charts/DoughnoutChart";
import { BarChart } from "./charts/VerticalBarChart";
import { LineChart } from "./charts/LineChart";
import Advices from "../utils/calculs/Advice";
import { HashLink as Link } from "react-router-hash-link";
function Dashboard({ allResultsUser }) {
  let navigate = useNavigate();
  allResultsUser.sort((a, b) => {
    return (
      Number(new Date(a.find((el) => el.id === "end_date").response)) -
      Number(new Date(b.find((el) => el.id === "end_date").response))
    );
  });
  let currentResult = allResultsUser[allResultsUser.length - 1];
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
            <Link className="card saved" to={"/dashboard#recommendations"}>
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
            </Link>

            <Link className="card impact" to={"/dashboard#recommendations"}>
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
            </Link>

            <Link className="card income" to={"/dashboard#recommendations"}>
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
            </Link>
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
              <div className={"card-advice"}>
                Take a look at the repartition of your emissions to know which
                part of your activity generates the most greenhouse gases.
                <br></br> Tip: Click on the name of a category to add it or
                remove it from the graph!
              </div>
            </div>
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
                <div className={"card-advice"}>
                  Watch your emissions decrease and your mitigation increase
                  over time!
                </div>
              </div>

              <div className="card-dash-line">
                <div className="card-chart">
                  {currentResult ? (
                    <BarChart
                      width={100}
                      height={50}
                      options={{
                        maintainAspectRatio: false,
                        responsive: false,
                      }}
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
                <div className={"card-advice"}>
                  Realize the importance of your efforts over time by comparing
                  your unmitigated emissions with your mitigated emissions.
                </div>
              </div>
            </>
          </div>

          <div className="container">
            <Advices result={currentResult} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
