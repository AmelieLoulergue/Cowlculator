import * as React from "react";
import './Dashboard.css';

import charts from '../assets/svg/charts.svg';
import logow from '../assets/img/logo-w.png';

import Bg from './Bg';

function Dashboard() {
    return (
      <>
      <div id="dash">
        <div className="dash-side slideLeft">
            <div className="dash-side-container slideLeft">
                <div className="dash-profile">
                    <h1>
                        Dashboard
                    </h1>
                    <div>
                        <img></img>
                        <h2>Username</h2>
                        <p>Project name</p>
                    </div>
                </div>
                <div className="dash-li">
                    <ul>
                        <li><img src={charts}></img> Menu 1 </li>
                        <li><img src={charts}></img> Menu 2 </li>
                        <li><img src={charts}></img> Menu 3 </li>
                        <li><img src={charts}></img> Menu 4 </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="dash-nav">
            <div className="dash-nav-icon">
                <span></span>
            </div>
            <div className="logo">
                CarbonBalance <img src={logow}></img>
            </div>
            <div></div>
        </div>
      </div>
      <Bg></Bg>
      </>
    );
  }
  
  export default Dashboard;
  