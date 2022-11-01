import * as React from "react";
import "./Dashboard.css";
import plant from "../assets/svg/plant.svg";
import footprint from "../assets/svg/footprint.svg";
import dollar from "../assets/svg/dollar.svg";
import { useNavigate } from "react-router-dom";
import { DoughnutChart } from "./charts/DoughnoutChart";
import { BarChart } from "./charts/VerticalBarChart";
import { LineChart } from "./charts/LineChart";
import Advices from "../utils/calculs/Advices";
import { HashLink as Link } from "react-router-hash-link";
import { useResultContext } from "../context/resultContext";
function Dashboard() {
  let navigate = useNavigate();
  const { resultInformations } = useResultContext();
  resultInformations?.allResultsUser?.sort((a, b) => {
    return (
      Number(new Date(a.find((el) => el.id === "end_date").response)) -
      Number(new Date(b.find((el) => el.id === "end_date").response))
    );
  });
  let currentResult =
    resultInformations?.allResultsUser[
      resultInformations?.allResultsUser?.length - 1
    ];
  const allTotalEmissionsArray = resultInformations?.allResultsUser
    ?.filter((element) => element !== null)
    ?.map(
      (element) =>
        element.find((el) => el.id === "totalEmissionsGraph").response
    );
  const allCO2emmitedArray = resultInformations?.allResultsUser
    ?.filter((element) => element !== null)
    ?.map((element) => element.find((el) => el.id === "CO2emmited").response);

  const allCO2mitigatedEmissions = resultInformations?.allResultsUser
    ?.filter((element) => element !== null)
    ?.map((element) => element.find((el) => el.id === "CO2mitigated").response);
  const labelPeriodChart2 = resultInformations?.allResultsUser
    ?.filter((element) => element !== null)
    ?.map((element, index) => {
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
  const labelPeriodChart3 = resultInformations?.allResultsUser
    ?.filter((element) => element !== null)
    ?.map((element, index) => {
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
  const grayscale = `#dash .card-section {filter: grayscale(1); cursor: not-allowed; opacity: .4} #dash .card {cursor: not-allowed}`;
  const chartoption = {
    responsive: false,
    maintainAspectRatio: false,
  };
  console.log(currentResult);
  return (
    <>
      <div id="dash">
        <div id="summary" className="panel">
          {!currentResult && (
            <>
              <style>{grayscale}</style>
              <button className="btn" onClick={() => navigate("/form")}>
                FILL THE FORM
              </button>
            </>
          )}
          <div className="card-section">
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
                        ? 162
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
                <h2>
                  CO<sub>2</sub> mitigated
                </h2>
              </div>
            </Link>

            <Link className="card impact" to={"/dashboard#recommendations"}>
              <div className="card-icon">
                <div className="card-top">
                  <img src={footprint} alt="carbon footprint icon"></img>
                  <h1>
                    <b>
                      {currentResult
                        ? Intl.NumberFormat("en-US").format(
                            Math.round(
                              currentResult?.find(
                                (element) => element.id === "CO2emmited"
                              )?.response / 1000
                            )
                          )
                        : 557}
                      {" K"}
                    </b>
                    <br></br>
                    Tonne CO2eq/year
                  </h1>
                </div>
                <h2>
                  CO<sub>2</sub> emitted
                </h2>
              </div>
            </Link>

            <Link className="card income" to={"/dashboard#recommendations"}>
              <div className="card-icon">
                <div className="card-top">
                  <img src={dollar} alt="dollar sign icon"></img>
                  <h1>
                    <b>
                      {currentResult
                        ? Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          }).format(
                            Math.round(
                              currentResult?.find(
                                (element) => element.id === "totalCarbonCredits"
                              )?.response
                            )
                          )
                        : 11613}
                    </b>
                    <br></br>
                    $/year
                  </h1>
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
                  <DoughnutChart
                    options={chartoption}
                    id={"chart1"}
                    dataResults={[520263, 26652, 7345, 2743]}
                  />
                )}
              </div>
              <div className={"card-advice"}>
                Take a look at the repartition of your emissions to know which
                part of your activity generates the most greenhouse gases.
                <br></br> Tip: Click on the name of a category to add it or
                remove it from the graph!
              </div>
            </div>
            {currentResult ? (
              <>
                <div className="card-dash-line">
                  <div className="card-chart">
                    <LineChart
                      options={chartoption}
                      labels={labelPeriodChart3}
                      id={"chart3"}
                      dataResults={{
                        data1: allCO2emmitedArray,
                        data2: allCO2mitigatedEmissions,
                      }}
                    />
                  </div>
                  <div className={"card-advice"}>
                    Watch your emissions decrease and your mitigation increase
                    over time!
                  </div>
                </div>

                <div className="card-dash-line">
                  <div className="card-chart">
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
                  </div>
                  <div className={"card-advice"}>
                    Realize the importance of your efforts over time by
                    comparing your unmitigated emissions with your mitigated
                    emissions.
                  </div>
                </div>
              </>
            ) : (
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "3rem",
                  letterSpacing: "2rem",
                }}
              >
                ...
              </h1>
            )}
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
