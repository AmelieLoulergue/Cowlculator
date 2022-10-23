import * as React from "react";
import "./Navbar.css";
import account from "../assets/svg/profile.svg";
import home from "../assets/svg/home.svg";
import dashboard from "../assets/svg/dashboard.svg";
import form from "../assets/svg/form.svg";
import download from "../assets/svg/download.svg";
import book from "../assets/svg/book.svg";
import group from "../assets/svg/group.svg";

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
                {login.type === "farmer" && <>Project Name</>}
                <p>{login.type === "farmer" && farmName ? farmName : <></>}</p>
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
                <div>
                  <img src={home}></img>
                  Home{" "}
                </div>
              </li>
              {login && login.userType === "farmer" && (
                <>
                  <li
                    onClick={() => {
                      navigate("/dashboard");
                      toggleSideNav();
                    }}
                  >
                    <div>
                      <img src={dashboard}></img>
                      Dashboard{" "}
                    </div>
                  </li>
                  <li
                    onClick={() => {
                      navigate("/form");
                      toggleSideNav();
                    }}
                  >
                    <div>
                      <img src={form}></img>
                      Form{" "}
                    </div>
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
                    <div>
                      <img src={download}></img>
                      Download datas{" "}
                    </div>
                  </button>
                </>
              )}
              <li
                onClick={() => {
                  navigate("/references");
                  toggleSideNav();
                }}
              >
                <div>
                  <img src={book}></img>
                  References{" "}
                </div>
              </li>
              <li
                onClick={() => {
                  navigate("/about");
                  toggleSideNav();
                }}
              >
                <div>
                  <img src={group}></img>
                  About Us{" "}
                </div>
              </li>
            </ul>
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
          <img src={account} onClick={() => {
                  navigate("/account");
                }}></img>
        </div>
      </div>
      <div className="nav-margin"></div>
    </>
  );
}

export default Navbar;
