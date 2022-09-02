import * as React from "react";
import './Dashboard.css';

import charts from '../assets/svg/charts.svg';
import cowlculator from '../assets/img/cowlculator.png';

import plant from '../assets/svg/plant.svg';
import footprint from '../assets/svg/footprint.svg';
import dollar from '../assets/svg/dollar.svg';

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
                        <button className="btn">Disconect</button>
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
                <div className="copyright">
                    <p>© CarbonBalance 2022</p>
                    <p>Made with 💙🤍❤️ by
                        <br></br><span><small>Bertille Dormoy Smith</small></span>
                        <br></br><span><small>Amélie Loulergue</small></span>
                        <br></br><span><small>Clément Loulergue</small></span>
                    </p>
                    
                </div>
            </div>
        </div>

        <div className="dash-nav">
            <div className="dash-nav-icon" onClick={toggleSideNav}>
                <span id="dash-nav-icon-burger"></span>
            </div>
            <div className="logo">
                <img src={cowlculator} alt="brand icon"></img>
            </div>
            <div style={{'width': '60px'}}></div>
        </div>

        <div id="summary" className="panel">
            <div className="card-section">
                <div className="card">
                    <div className="card-icon">
                        <div className="card-top">
                            <img src={plant} alt="plant icon"></img>
                            <h1>CO<sub>2</sub> saved</h1>
                        </div>
                        <h2>2000 T of CO2</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon">
                        <div className="card-top">
                            <img src={footprint} alt="carbon footprint icon"></img>
                            <h1>CO<sub>2</sub> consuption</h1>
                        </div>
                        <h2>25 T of CO2</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon">
                        <div className="card-top">
                            <img src={dollar} alt="dollar sign icon"></img>
                            <h1>New income</h1>
                        </div>
                        <h2>$3.8 M per month</h2>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Bg></Bg>
      </>
    );
  }
  
  export default Dashboard;
  