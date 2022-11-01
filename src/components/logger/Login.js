import * as React from "react";
import "./Login.css";
import "./GetStarted.css";
import back_arrow from "../../assets/svg/back-arrow.svg";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import Lottie from "lottie-react";
import eyeBlink from "../../assets/anim/eye-blink.json";
import { useNavigate } from "react-router-dom";
import loginFunc from "../../utils/authentication/login";
import { useAuthContext } from "../../context/authContext";
import { useAlertContext } from "../../context/alertContext";
function Login() {
  const pass = useRef();
  const { setAuthInformations } = useAuthContext();
  const { setAlertInformations } = useAlertContext();
  const [userProfile, setUserProfile] = useState({ email: "", password: "" });
  var passHide = false;
  const showPass = () => {
    if (passHide) {
      document.getElementById("password").type = "password";
      document.getElementById("password").classList.remove("borderGradient");
      passHide = false;
    } else {
      document.getElementById("password").type = "text";
      document.getElementById("password").classList.add("borderGradient");
      pass.current.goToAndPlay(0, true);
      passHide = true;
    }
  };
  let navigate = useNavigate();
  const noNav = `.dash-nav, .nav-margin, .dash-side {
    display: none !important;
}`;
  const noFoot = `#footer {display: none !important}`;
  return (
    <>
      <style>
        {noNav}
        {noFoot}
      </style>
      <div className="center-flex">
        <div className="navbar">
          <Link to="../account">
            <img src={back_arrow} alt=""></img>
          </Link>
        </div>
        <div className="content">
          <div className="title">
            <h1>Let's sign in.</h1>
            <p>
              It's great to see you back !<br></br>
              Psst, it's a secret but we missed you
            </p>
          </div>

          <form>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={userProfile?.email ? userProfile.email : ""}
                onChange={(event) =>
                  setUserProfile({ ...userProfile, email: event.target.value })
                }
              ></input>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  autoComplete="on"
                  value={userProfile?.password ? userProfile.password : ""}
                  onChange={(event) =>
                    setUserProfile({
                      ...userProfile,
                      password: event.target.value,
                    })
                  }
                ></input>
                <Lottie
                  lottieRef={pass}
                  autoplay={false}
                  animationData={eyeBlink}
                  loop={false}
                  onMouseDown={showPass}
                  className="eye-pass"
                />
              </div>
            </div>
            <div className="submit">
              <p>
                Don't have an account ?{" "}
                <Link to="../account/register">
                  <b>Register</b>
                </Link>
              </p>
              <button
                className="btn"
                onClick={(event) => {
                  event.preventDefault();
                  loginFunc({
                    event,
                    url: "https://cowlculatorback.herokuapp.com",
                    setAlertInformations,
                    userProfile,
                    setAuthInformations,
                    navigate,
                  });
                }}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
