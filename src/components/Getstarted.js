import * as React from "react";
import "./Getstarted.css";

import Bg from "./Bg";

import farmer from "../assets/svg/farmer.svg";
import researcher from "../assets/svg/researcher.svg";
// import logo from '../assets/img/logo.png';
import { useNavigate } from "react-router-dom";
function Getstarted() {
  let navigate = useNavigate();
  return (
    <>
      <div id="Choice">
        <h1>I am a</h1>
        <p>Please make a choice</p>
        <div className="Choice-top">
          <div
            onClick={() => {
              localStorage.setItem("category_choosed", "farmer");
              navigate("/account/register");
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={farmer} alt="Icon of a farmer"></img>
            <h4>Farmer</h4>
          </div>
          <div
            onClick={() => {
              localStorage.setItem("category_choosed", "researcher");
              navigate("/account/register");
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={researcher} alt="Icon of a researcher"></img>
            <h4>Researcher</h4>
          </div>
        </div>
        <div className="Choice-path"></div>
        <div className="Choice-bot">
          <div>{/* <img src={logo} alt="logo"></img> */}</div>
        </div>
      </div>
      <Bg></Bg>
    </>
  );
}

export default Getstarted;
