import * as React from "react";
import "./Form_design.css";
import back_arrow from "../assets/svg/back-arrow.svg";
import Lottie from "lottie-react";
import form_begin from "../assets/anim/form-begin.json";
import home from "../assets/svg/home.svg";
import send from "../assets/svg/send.svg";
import menu from "../assets/svg/burger.svg";

import Bg from "./Bg";

function Form_design() {
  const startForm = () => {};
  return (
    <>
      <div className="formChat">
        <div className="beginin">
          <div className="LottieContainer">
            <Lottie animationData={form_begin} loop={true} />
          </div>
          <div>
            <h3>Are you ready ?</h3>
            <h1>Start filling the form today</h1>
          </div>
          <div className="btns">
            <img src={back_arrow}></img>
            <div>
              <button className="btn" onClick={startForm}>
                Let's get started
              </button>
              <h3>
                By clicking on "Let's get started" you agree that the
                information collected are anonymously shared and used for
                research purpose.
              </h3>
            </div>
            <img src={home}></img>
          </div>
        </div>

        <div className="questions">
          <div className="nav">
            <img src={menu}></img>
            <h1>Name of the categorie</h1>
            <img src={home}></img>
          </div>
          <div className="ask fadeInBottom">
            <p>Question will appear here</p>
          </div>

          <div className="response fadeInBottom delay-05">
            <p contentEditable={true} suppressContentEditableWarning={true}>
              And your sended response here
            </p>
          </div>
          <div className="response following-response fadeInBottom delay-15">
            <p contentEditable={true} suppressContentEditableWarning={true}>
              Note that all your responses are editable
            </p>
          </div>

          <div className="inputField">
            <div className="response-input">
              <input type="text" placeholder="Enter your response here"></input>
            </div>
            <button className="btn">
              <img src={send}></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form_design;
