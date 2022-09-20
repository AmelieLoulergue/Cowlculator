import * as React from "react";
import "./Dashboard.css";

import charts from "../assets/svg/charts.svg";
import cowlculator from "../assets/img/cowlculator.png";
import { useRef } from "react";
import plant from "../assets/svg/plant.svg";
import footprint from "../assets/svg/footprint.svg";
import dollar from "../assets/svg/dollar.svg";
import { useNavigate } from "react-router-dom";
import { DoughnutChart } from "./charts/DoughnoutChart";
import { BarChart } from "./charts/VerticalBarChart";
import { LineChart } from "./charts/LineChart";
function Dashboard({ login, results, formIsCompleted }) {
  let navigate = useNavigate();
  return (
    <>
      {/* {results && <p>{JSON.stringify(results)}</p>} */}
      <div id="dash">
        <div id="summary" className="panel">
          {login?.email === "cowlculator.example@gmail.com" ? (
            <button onClick={() => navigate("/datas")}>See DATAS</button>
          ) : (
            <></>
          )}
          <div className="card-section">
            <div className="card">
              <div className="card-icon">
                <div className="card-top">
                  <img src={plant} alt="plant icon"></img>
                  <h1>
                    CO<sub>2</sub> saved
                  </h1>
                </div>
                <h2>
                  {Math.round(results.CO2mitigated * 100) / 100} T of CO2eq/year
                </h2>
              </div>
              {formIsCompleted ? (
                <DoughnutChart
                  id={"chart1"}
                  dataResults={[
                    results.utilitiesGraph,
                    results.fuelGraph,
                    results.otherGraph,
                    results.entericFermentationCO2Graph,
                    results.manureCO2graph,
                    results.cropsGraph,
                  ]}
                />
              ) : (
                <button className="btn" onClick={() => navigate("/form")}>
                  FILL THE FORM
                </button>
              )}
            </div>
            <div className="card">
              <div className="card-icon">
                <div className="card-top">
                  <img src={footprint} alt="carbon footprint icon"></img>
                  <h1>
                    CO<sub>2</sub> impact
                  </h1>
                </div>
                <h2>
                  {Math.round(results.CO2emmited * 100) / 100} T of CO2eq/year
                </h2>
                {formIsCompleted ? (
                  <BarChart
                    id={"chart2"}
                    dataResults={{
                      data1: [
                        results.totalEmissionsGraph,
                        results.totalEmissionsGraph / 2,
                      ],
                      data2: [
                        results.totalMitigatedEmissionsGraph,
                        results.totalMitigatedEmissionsGraph * 1.5,
                      ],
                    }}
                  />
                ) : (
                  <button className="btn" onClick={() => navigate("/form")}>
                    FILL THE FORM
                  </button>
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-icon">
                <div className="card-top">
                  <img src={dollar} alt="dollar sign icon"></img>
                  <h1>New income</h1>
                </div>
                <h2>
                  {Math.round(results.totalCarbonCredits * 100) / 100} $/year
                </h2>
                {formIsCompleted ? (
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
                  <button className="btn" onClick={() => navigate("/form")}>
                    FILL THE FORM
                  </button>
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
