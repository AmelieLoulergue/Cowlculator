import * as React from "react";
import './Login.css';
import account from '../assets/svg/profile.svg';
import lock from '../assets/svg/lock.svg';

import Bg from './Bg';

function Login() {
    return (
      <>
        <div className="container center" id="login">
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
            </div>
            <div className="registrer"></div>
            <h2>Need to <u>register</u> ?</h2>
        </div>
        <Bg></Bg>
      </>
    );
  }
  
  export default Login;
  