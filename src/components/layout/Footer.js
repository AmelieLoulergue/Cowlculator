import * as React from "react";
import "./Footer.css";

import Lottie from "lottie-react";
import liberty from "../../assets/anim/liberty.json";
import libertyc from "../../assets/anim/liberty-c.json";
import wwc from "../../assets/img/wwc-circle.png";
import logo from "../../assets/img/cowlculator.png";
import { HashLink as Link } from "react-router-hash-link";
function Footer({ login }) {
  return (
    <>
      <div id="footer">
        <div className="links">
          <h3>Links :</h3>
          <ul>
            <li>
              <Link to="/#tophome">Home page</Link>
            </li>
            <li>
              <Link to="/#app">About the app</Link>
            </li>
            <li>
              <Link to="/#steps">How to get your results?</Link>
            </li>
            <li>
              <Link to="/About#aboutus">Meet the team</Link>
            </li>
            <li>
              <Link to="/references#references">Learn more</Link>
            </li>
            {!login && (
              <li>
                <Link to="/account/register">Create your profile</Link>
              </li>
            )}
            {login?.userType === "farmer" && (
              <li>
                <Link to="/form">Fill the form</Link>
              </li>
            )}
            {login?.userType === "farmer" && (
              <li>
                <Link to="/account/register">Access downloadable data</Link>
              </li>
            )}
            {login?.userType === "researcher" && (
              <li>
                <Link to="/datas">Access downloadable data</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="copyright">
          <img src={logo} alt="Cowlculator logo"></img>
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

        <div className="logos">
          <img src={wwc}></img>
          <div>
            <Lottie animationData={libertyc} loop={true} />
            <h3>Made by french in america</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
