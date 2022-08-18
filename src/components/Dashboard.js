import * as React from "react";
import './Dashboard.css';

import charts from '../assets/svg/charts.svg';
import logow from '../assets/img/logo-w.png';

import Bg from './Bg';

function Dashboard() {
    const toggleSideNav = () => {
        document.getElementById('dash-side').classList.toggle('active')
        document.getElementById('dash-nav-icon-burger').classList.toggle('active')
    }
    return (
      <>
      <div id="dash">
        <div className="dash-side" id="dash-side">
            <div className="dash-side-container">
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
            <div className="dash-nav-icon" onClick={toggleSideNav}>
                <span id="dash-nav-icon-burger"></span>
            </div>
            <div className="logo">
                CarbonBalance <img src={logow}></img>
            </div>
            <div style={{'width': '20px'}}></div>
        </div>
      </div>
      <Bg></Bg>
      </>
    );
  }
  
  export default Dashboard;
  