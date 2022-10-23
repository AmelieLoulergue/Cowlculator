import * as React from "react";
import "./Footer.css";

import mif from "../assets/img/mif.png";
import wwc from "../assets/img/wwc-circle.png";
import logo from "../assets/img/cowlculator.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div id="footer">
        <div className="links">
          <h3>Links :</h3>
          <ul>
            <li>
              <Link to="/">Home page</Link>
            </li>
            <li>
              <Link to="/">
                <a href="app">About the app</a>
              </Link>
            </li>
            <li>
              <Link to="/">
                <a href="steps">How to get your results?</a>
              </Link>
            </li>
            <li>
              <Link to="/About">Meet the team</Link>
            </li>
            <li>
              <Link to="/account/register">Create your profile</Link>
            </li>
          </ul>
        </div>

        <div className="copyright">
          <img src={logo}></img>
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
          <img src={mif}></img>
        </div>
      </div>
    </>
  );
}

export default Footer;
