import * as React from "react";
import './Login.css';
import './Logger.css';
import back_arrow from '../../assets/svg/back-arrow.svg';
import { Link } from "react-router-dom";

import Bg from '.././Bg';

function Login() {
    return (
      <>
      <div className="center-flex">
        <div className="navbar"><Link to="../account"><img src={back_arrow}></img></Link></div>
        <div className="content">
            <div className="title">
                <h1>Let's sign in.</h1>
                <p>It's great to see you back !
                    <br></br>
                    Psst, it's a secret but we missed you 
                </p>
            </div>

            <form>
                <div className="input">
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                </div>
                <div className="submit">
                    <p>Don't have an account ? <Link to="register"><b>Register</b></Link></p>
                    <button type="submit" className="btn">Sign in</button>
                </div>
            </form>
        </div>
      </div>
        <Bg></Bg>
      </>
    );
  }
  
  export default Login;
  