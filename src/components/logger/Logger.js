import * as React from "react";
import './Logger.css';
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import fandr from '../../assets/anim/fandr.json';

import Bg from '.././Bg';

function Logger() {
    return (
      <>
        <div id="logger">
            <Lottie animationData={fandr} loop="true"/>
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
  
  export default Logger;
  