import * as React from "react";
import './Login.css';
import account from '../../assets/svg/profile.svg';
import lock from '../../assets/svg/lock.svg';
import logo from '../../assets/img/logo.png';

import Bg from '.././Bg';

function Login() {
    return (
      <>
        <div className="container center" id="login">
            <img src={logo}></img>
            <div className="login">
                <h1>Welcome back ! &#128075;</h1>
                <form id="login-form">
                    <div>
                        <label htmlFor="mail"><img src={account}></img></label>
                        <input id="mail" type='email'></input>
                    </div>

                    <div>
                        <label htmlFor="password"><img src={lock}></img></label>
                        <input id="password" type='password'></input>
                    </div>

                    <button className="btn" type="submit">Login</button>
                </form>
                <h2>Already have an account ? <b>Sign up</b></h2>
            </div>
            <div className="registrer">
                
            </div>
        
        </div>
        <Bg></Bg>
      </>
    );
  }
  
  export default Login;
  