import * as React from "react";
import "./Firstnav.css";
import { useNavigate } from "react-router-dom";
import logow from "../assets/img/logo-w.png";
import account from "../assets/svg/profile.svg";

function Firstnav({ viewHeight, scroll }) {
  let navigate = useNavigate();
  function onClickNavigate(e) {
    e.preventDefault();

    navigate("/account");
  }
  return (
    <>
      <nav
        id="Firstnav"
        className={scroll > 0.9 * viewHeight - 94 ? "Firstnav-bg" : ""}
      >
        <ul>
          <li>
            <img src={logow} id="logo" alt="Logo"></img>
          </li>
          <li onClick={onClickNavigate}>
            <img src={account} alt="profile icon for login-in"></img>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Firstnav;
