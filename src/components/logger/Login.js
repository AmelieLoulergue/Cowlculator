import * as React from "react";
import "./Login.css";
import "./Logger.css";
import back_arrow from "../../assets/svg/back-arrow.svg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Lottie from "lottie-react";
import eyeBlink from "../../assets/anim/eye-blink.json";
import { useNavigate } from "react-router-dom";
import Bg from ".././Bg";
import loginFunc from "../../utils/authentication/login";
function Login({
  userProfile,
  setUserProfile,
  login,
  setLogin,
  setMessageAlert,
  setSeverity,
  setDisplayAlert,
}) {
  const pass = useRef();

  const showPass = () => {
    document.getElementById("password").type = "text";
    document.getElementById("password").classList.add("borderGradient");
    pass.current.goToAndPlay(0, true);
  };
  const hidePass = () => {
    document.getElementById("password").type = "password";
    document.getElementById("password").classList.remove("borderGradient");
  };
  let navigate = useNavigate();
  const noNav = `.dash-nav, .nav-margin, .dash-side {
    display: none !important;
}`;
  return (
    <>
      <style>{noNav}</style>
      <div className="center-flex">
        <div className="navbar">
          <Link to="../account">
            <img src={back_arrow}></img>
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
                  onMouseUp={hidePass}
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
                    userProfile,
                    setUserProfile,
                    login,
                    setLogin,
                    url: "http://localhost:3000",
                    setMessageAlert,
                    setSeverity,
                    setDisplayAlert,
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
