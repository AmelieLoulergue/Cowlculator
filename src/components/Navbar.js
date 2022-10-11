import * as React from "react";
import "./Navbar.css";
import account from "../assets/svg/profile.svg"

import { useState } from "react";

import cowlculator from "../assets/img/cowlculator.png";
import { logout } from "../utils/authentication/controlLog";
import { useNavigate } from "react-router-dom";
function Navbar({ login, setLogin, farmName }) {
  const toggleSideNav = () => {
    document.getElementById("dash-side").classList.toggle("active");
    document.getElementById("dash-nav-icon-burger").classList.toggle("active");
    document.getElementsByClassName("nav-title")[0].classList.toggle("active");
    document.getElementsByClassName("nav-title")[1].classList.toggle("active");
  };

  const [scroll, setScroll] = useState(window.scrollY);
  const navigate = useNavigate();
  return (
    <>
      <div className="dash-side" id="dash-side">
        <div className="dash-side-container">
          {login && (
            <div className="dash-profile">
              <h1>Dashboard</h1>
              <div>
                {login?.email && <h2>{login.email}</h2>}
                <p>{farmName ? farmName : "Farm name"}</p>
                <button className="btn" onClick={() => logout({ setLogin })}>
                  Log out
                </button>
              </div>
            </div>
          )}
          {!login && (
            <div className="dash-profile">
              <button
                className="btn"
                onClick={() => {
                  navigate("/account/login");
                  toggleSideNav();
                }}
              >
                Log in
              </button>
              <button
                className="btn"
                onClick={() => {
                  navigate("/account/register");
                  toggleSideNav();
                }}
              >
                Register
              </button>
            </div>
          )}
          <div className="dash-li">
            <ul>
              <li
                onClick={() => {
                  navigate("/");
                  toggleSideNav();
                }}
              >
                {" "}
                Home{" "}
              </li>
              {login && login.userType === "farmer" && (
                <>
                  <li
                    onClick={() => {
                      navigate("/dashboard");
                      toggleSideNav();
                    }}
                  >
                    {" "}
                    Dashboard{" "}
                  </li>
                  <li
                    onClick={() => {
                      navigate("/form");
                      toggleSideNav();
                    }}
                  >
                    {" "}
                    Form{" "}
                  </li>
                </>
              )}
              {((login && login.userType === "researcher") ||
                (login && login.email === "cowlculator.example@gmail.com")) && (
                <>
                  <button
                    className="btn"
                    onClick={() => {
                      navigate("/datas");
                      toggleSideNav();
                    }}
                  >
                    {" "}
                    Download datas{" "}
                  </button>
                </>
              )}
              <li
                onClick={() => {
                  navigate("/references");
                  toggleSideNav();
                }}
              >
                {" "}
                References{" "}
              </li>
              <li
                onClick={() => {
                  navigate("/about");
                  toggleSideNav();
                }}
              >
                {" "}
                About Us{" "}
              </li>
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
        <div className="nav-spacer">
          <img src={account}></img>
        </div>
      </div>
      <div className="nav-margin"></div>
    </>
  );
}

export default Navbar;
