import * as React from "react";
import "./Navbar.css";
import account from "../../assets/svg/profile.svg";
import home from "../../assets/svg/home.svg";
import dashboard from "../../assets/svg/dashboard.svg";
import form from "../../assets/svg/form.svg";
import download from "../../assets/svg/download.svg";
import book from "../../assets/svg/book.svg";
import group from "../../assets/svg/group.svg";

import { useState, useEffect } from "react";

import cowlculator from "../../assets/img/cowlculator.png";
import { logout } from "../../utils/authentication/controlLog";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
function Navbar() {
  const { authInformations, setAuthInformations } = useAuthContext();
  const toggleSideNav = () => {
    document.getElementById("dash-side").classList.toggle("active");
    document.getElementById("dash-nav-icon-burger").classList.toggle("active");
    document.getElementsByClassName("nav-title")[0].classList.toggle("active");
    document.getElementsByClassName("nav-title")[1].classList.toggle("active");
  };

  const [scroll, setScroll] = useState(window.scrollY);
  useEffect(() => setScroll(window.scrollY), []);
  const navigate = useNavigate();
  return (
    <>
      <div className="dash-side" id="dash-side">
        <div className="dash-side-container">
          {authInformations?.login && (
            <div className="dash-profile">
              <h1>Dashboard</h1>
              <div>
                {authInformations?.login?.email && (
                  <h2>{authInformations?.login.email}</h2>
                )}
                {authInformations?.login.userType === "farmer" && (
                  <>Farm Name</>
                )}
                <p>
                  {authInformations?.login.userType === "farmer" &&
                  authInformations?.login.farmName ? (
                    authInformations?.login.farmName
                  ) : (
                    <></>
                  )}
                </p>
                <button
                  className="btn"
                  onClick={() => logout({ setAuthInformations })}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
          {!authInformations?.login && (
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
                  <img alt="" src={home}></img>
                  Home{" "}
                </div>
              </li>
              {authInformations?.login &&
                authInformations?.login.userType === "farmer" && (
                  <>
                    <li
                      onClick={() => {
                        navigate("/dashboard");
                        toggleSideNav();
                      }}
                    >
                      <div>
                        <img alt="" src={dashboard}></img>
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
                        <img alt="" src={form}></img>
                        Form{" "}
                      </div>
                    </li>
                  </>
                )}
              {((authInformations?.login &&
                authInformations?.login.userType === "researcher") ||
                (authInformations?.login &&
                  authInformations?.login.email ===
                    "cowlculator.example@gmail.com")) && (
                <>
                  <li
                    onClick={() => {
                      navigate("/datas");
                      toggleSideNav();
                    }}
                    className="hovered"
                  >
                    <div>
                      <img alt="" src={download}></img>
                      Download datas{" "}
                    </div>
                  </li>
                </>
              )}
              <li
                onClick={() => {
                  navigate("/references");
                  toggleSideNav();
                }}
              >
                <div>
                  <img alt="" src={book}></img>
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
                  <img alt="" src={group}></img>
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
          <img
            alt=""
            src={account}
            onClick={() => {
              if (!authInformations?.login) {
                navigate("/account");
              } else if (authInformations?.login?.userType === "farmer") {
                navigate("/dashboard");
              } else {
                navigate("/datas");
              }
            }}
          ></img>
        </div>
      </div>
      <div className="nav-margin"></div>
    </>
  );
}

export default Navbar;
