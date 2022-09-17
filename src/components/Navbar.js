import * as React from "react";
import "./Navbar.css";

import { useState } from "react";

import cowlculator from "../assets/img/cowlculator.png";
import { logout } from "../utils/authentication/controlLog";
function Navbar({ login, setLogin }) {
  const toggleSideNav = ({ login }) => {
    document.getElementById("dash-side").classList.toggle("active");
    document.getElementById("dash-nav-icon-burger").classList.toggle("active");
    document.getElementsByClassName("nav-title")[0].classList.toggle("active");
    document.getElementsByClassName("nav-title")[1].classList.toggle("active");
  };

  const [scroll, setScroll] = useState(window.scrollY);
  console.log(login);
  return (
    <>
      <div className="dash-side" id="dash-side">
        <div className="dash-side-container">
          {login && (
            <div className="dash-profile">
              <h1>Dashboard</h1>
              <div>
                <img></img>
                {login?.email && <h2>{login.email}</h2>}
                <p>Project name</p>
                <button className="btn" onClick={() => logout({ setLogin })}>
                  Disconect
                </button>
              </div>
            </div>
          )}
          <div className="dash-li">
            <ul>
              <li> Home </li>
              {login && login.userType === "farmer" && (
                <>
                  <li> Dashboard </li>
                  <li> Form </li>
                </>
              )}
              <li> References </li>
              <li> About Us </li>
            </ul>
          </div>
          <div className="copyright">
            <p>© Cowlculator 2022</p>
            <p>
              Made with 💙🤍❤️ by
              <br></br>
              <span>
                <small>Bertille Dormoy Smith</small>
              </span>
              <br></br>
              <span>
                <small>Amélie Loulergue</small>
              </span>
              <br></br>
              <span>
                <small>Clément Loulergue</small>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="dash-nav">
        <div className="dash-nav-icon" onClick={toggleSideNav}>
          <span id="dash-nav-icon-burger"></span>{" "}
          <p className="nav-title">MENU</p>
          <p className="active nav-title">CLOSE</p>
        </div>
        <div className="logo">
          <img
            src={cowlculator}
            alt="brand icon"
            className={scroll > 0 ? "" : "scrolled-icon"}
          ></img>
        </div>
        <div className="nav-spacer"></div>
      </div>
      <div className="nav-margin"></div>
    </>
  );
}

export default Navbar;
