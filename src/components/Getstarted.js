import * as React from "react";
import './Getstarted.css';

import Bg from './Bg';

import farmer from '../assets/svg/farmer.svg';
import researcher from '../assets/svg/researcher.svg';
import logo from '../assets/img/logo.png';

function Getstarted() {
    return (
      <>
        <div id="Choice">
            <h1>I am a</h1>
            <p>Please make a choice</p>
            <div className="Choice-top">
                <div>
                    <img src={farmer} alt="Icon of a farmer"></img>
                    <h4>Farmer</h4>
                </div>
                <div>
                    <img src={researcher} alt="Icon of a researcher"></img>
                    <h4>Researcher</h4>
                </div>
            </div>
            <div className="Choice-path"></div>
            <div className="Choice-bot">
                <div>
                    <img src={logo} alt="logo"></img>
                </div>
            </div>
        </div>
        <Bg></Bg>
      </>
    );
  }
  
  export default Getstarted;
  