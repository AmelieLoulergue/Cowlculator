import * as React from "react";
import './Form_design.css';
import back_arrow from '../assets/svg/back-arrow.svg';
import Lottie from "lottie-react";
import form_begin from '../assets/anim/form-begin.json';
import home from '../assets/svg/home.svg';

import Bg from './Bg';

function Form_design() {
    return (
      <>
        <div className="formChat">
            <div className="beginin">
                <div className="LottieContainer">
                    <Lottie animationData={form_begin} loop={true}/>
                </div>
                <div>
                    <h3>Are you ready ?</h3>
                    <h1>Start filling the form today</h1>
                </div>
                <div className="btns">
                    <img src={back_arrow}></img>
                    <button className="btn">
                        Let's get started
                    </button>
                    <img src={home}></img>
                </div>
            </div>
        </div>
        <Bg></Bg>
      </>
    );
  }
  
  export default Form_design;
  