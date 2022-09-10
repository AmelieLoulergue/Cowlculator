import * as React from "react";
import './Dashboard.css';

import charts from '../assets/svg/charts.svg';
import cowlculator from '../assets/img/cowlculator.png';

import plant from '../assets/svg/plant.svg';
import footprint from '../assets/svg/footprint.svg';
import dollar from '../assets/svg/dollar.svg';

import Bg from './Bg';


import { Doughnut } from 'react-chartjs-2';

function Dashboard() {
    
    return (
      <>
      <div id="dash">
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
                            <h1>CO<sub>2</sub> impact</h1>
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
  