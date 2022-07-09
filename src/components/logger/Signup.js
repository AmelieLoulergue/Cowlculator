import * as React from "react";
import './Signup.css';
import './Logger.css';
import back_arrow from '../../assets/svg/back-arrow.svg';
import eye from '../../assets/svg/pass-eye.svg';
import { Link } from "react-router-dom";
import { passwordStrength } from 'check-password-strength';
import { useState } from "react";
import Lottie from "lottie-react";
import eyeBlink from "../../assets/anim/eye-blink.json";
import { useRef } from "react";

import Bg from '.././Bg';

function Register() {
    const [strengthVal, setStrengthVal] = useState('');
    let strength
    const passChange = () => {
        let indicator = document.getElementById('color-indicators');
        strength = passwordStrength(document.getElementById('password').value)
        setStrengthVal(strength.value)
        if (strength.id >= 0) {indicator.style.width = '25%'}
        if (strength.id >= 1) {indicator.style.width = '50%'}
        if (strength.id >= 2) {indicator.style.width = '75%'}
        if (strength.id >= 3) {indicator.style.width = '100%'}

        if (strength.contains.includes('lowercase')) {document.getElementById('Lowercase').classList.add('valid')} else {document.getElementById('Lowercase').classList.remove('valid')}
        if (strength.contains.includes('uppercase')) {document.getElementById('Uppercase').classList.add('valid')} else {document.getElementById('Uppercase').classList.remove('valid')}
        if (strength.contains.includes('number')) {document.getElementById('Number').classList.add('valid')} else {document.getElementById('Number').classList.remove('valid')}
        if (strength.contains.includes('symbol')) {document.getElementById('Symbol').classList.add('valid')} else {document.getElementById('Symbol').classList.remove('valid')}
    }
    const pass = useRef();
    const passConf = useRef();

    const showPass = () => {document.getElementById('password').type = "text"; document.getElementById('password').classList.add('borderGradient'); pass.current.goToAndPlay(0, true)}
    const hidePass = () => {document.getElementById('password').type = "password"; document.getElementById('password').classList.remove('borderGradient')}
    
    const showPassConf = () => {document.getElementById('passwordConfirm').type = "text"; document.getElementById('passwordConfirm').classList.add('borderGradient'); passConf.current.goToAndPlay(0, true)}
    const hidePassConf = () => {document.getElementById('passwordConfirm').type = "password"; document.getElementById('passwordConfirm').classList.remove('borderGradient')}
    
    var lastChecked;
    const radioCheck = (e) => {

            e.target.parentElement.classList.add('checkedRadio')
            if(lastChecked) {lastChecked.parentElement.classList.remove('checkedRadio')}
            lastChecked = e.target
    }
    return (
      <>
      <div className="center-flex">
        <div className="navbar"><Link to="../account"><img src={back_arrow}></img></Link></div>
        <div className="content">
            <div className="title">
                <h1>Let's register.</h1>
                <p>It's great to see new face !
                    <br></br>
                    Don't worry, it's all gonna be easy
                </p>
            </div>

            <form>
                <div className="input">
                    <div className="typeChoose">    
                        <div className="typeChoose_type">
                            <label htmlFor="farmer">Farmer</label>
                            <input name="type" type="radio" id="farmer" onChange={radioCheck}></input>
                        </div>
                        <div className="typeChoose_type">
                            <label htmlFor="researcher">Researcher</label>
                            <input name="type" type="radio" id="researcher" onChange={radioCheck}></input>
                        </div>
                    </div>
                    <input type="email" placeholder="Email"></input>
                    <div style={{position: 'relative'}}>
                        <input type="password" placeholder="Password" onKeyUp={passChange} id="password"></input>
                        <Lottie lottieRef={pass} autoplay={false} animationData={eyeBlink} loop={false} onMouseDown={showPass} onMouseUp={hidePass} className="eye-pass" />
                    </div>
                    <h2>{strengthVal}</h2>
                    <div id="color-indicators"></div>
                    <p>Password must contains :</p>
                    <ul>
                        <li id="Lowercase">Lowercase</li>
                        <li id="Uppercase">Uppercase</li>
                        <li id="Number">Number</li>
                        <li id="Symbol">Symbol</li>
                    </ul>
                    <div style={{position: 'relative'}}>
                        <input type="password" placeholder="Confirm password" id="passwordConfirm"></input>
                        <Lottie lottieRef={passConf} autoplay={false} animationData={eyeBlink} loop={false} onMouseDown={showPassConf} onMouseUp={hidePassConf} className="eye-pass" />
                    </div>
                    <h2>I am a</h2>
                </div>
                <div className="submit">
                    <p>Already have an account ? <Link to="../account/login"><b>Log in</b></Link></p>
                    <button type="submit" className="btn">Register</button>
                </div>
            </form>
        </div>
      </div>
        <Bg></Bg>
      </>
    );
  }
  
  export default Register;
  