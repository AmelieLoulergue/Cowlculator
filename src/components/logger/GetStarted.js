import * as React from "react";
import "./GetStarted.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import fandr from "../../assets/anim/fandr.json";
import home from "../../assets/svg/home.svg";

function Logger() {
  const noNav = `.dash-nav, .nav-margin, .dash-side {
    display: none !important;
}`;
  const noFoot = `#footer {display: none !important}`;
  return (
    <>
      <style>
        {noNav}
        {noFoot}
      </style>
      <div className="navbar">
        <Link to={"../"}>
          <img src={home}></img>
        </Link>
      </div>
      <div id="logger">
        <Lottie animationData={fandr} loop={true} />
        <div className="Titles">
          <h1>Take part of the project.</h1>
          <p>
            We really appreciate your commitment, and we are glad that you're
            interested in our project. <br></br>But before going further, do we
            already know each other?
          </p>
        </div>
        <div className="choice">
          <Link to={"register"} className="register">
            Register
          </Link>
          <Link to={"login"} className="signin">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
}

export default Logger;
