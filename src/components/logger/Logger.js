import * as React from "react";
import './Logger.css';
import fandr from '../../assets/svg/farmer-and-researcher.svg';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Bg from '.././Bg';

function Login() {
  let navigate = useNavigate();
    function onClickNavigate(location) {

        navigate('/account/' + location)
    }
    return (
      <>
        <div id="logger">
            <img src={fandr}></img>
            <div className="Titles">
                <h1>Take part of the project.</h1>
                <p>We really appreciate your comitment, and we are glade that you're interested in our project. <br></br>But before going further, do we already know each other?</p>
            </div>
            <div className="choice">
              <Link to={"signup"} className="register">Register</Link>
              <Link to={"login"} className="signin">Sign in</Link>
            </div>
        </div>
        <Bg></Bg>
      </>
    );
  }
  
  export default Login;
  