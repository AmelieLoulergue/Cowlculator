import * as React from "react";
import './Navbar.css';


import cowlculator from '../assets/img/cowlculator.png';

function Navbar() {
    const toggleSideNav = () => {
        document.getElementById('dash-side').classList.toggle('active')
        document.getElementById('dash-nav-icon-burger').classList.toggle('active')
    }

    return (
      <>
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
                        <li> Menu 1 </li>
                        <li> Menu 2 </li>
                        <li> Menu 3 </li>
                        <li> Menu 4 </li>
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
                <img src={cowlculator} alt='brand icon'></img>
            </div>
            <div style={{'width': '60px'}}></div>
        </div>
      </>
    );
  }
  
  export default Navbar;
  