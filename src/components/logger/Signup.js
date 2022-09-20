import * as React from "react";
import "./Signup.css";
import "./Logger.css";
import back_arrow from "../../assets/svg/back-arrow.svg";
import eye from "../../assets/svg/pass-eye.svg";
import { Link } from "react-router-dom";
import { passwordStrength } from "check-password-strength";
import { useState } from "react";
import Lottie from "lottie-react";
import eyeBlink from "../../assets/anim/eye-blink.json";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bg from ".././Bg";
import signup from "../../utils/authentication/signup";
const validateEmail = ({ userProfile }) => {
  if (
    String(userProfile.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    if (userProfile.userType !== "researcher") {
      return true;
    } else if (userProfile.userType === "researcher") {
      if (
        userProfile.email.includes(".edu") ||
        userProfile.email.includes(".gov")
      ) {
        return true;
      } else {
        document.getElementById("email-message-alert").innerHTML =
          "Invalid researcher email";
        setTimeout(() => {
          document.getElementById("email-message-alert").innerHTML = "";
        }, 3000);
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const validatePassword = ({ password, strength, userProfile }) => {
  if (
    (strength !== "Weak" || strength !== "Too weak") &&
    password.length >= 8
  ) {
    return true;
  } else {
    return false;
  }
};
function Register({
  userProfile,
  setUserProfile,
  messageAlert,
  setMessageAlert,
  severity,
  setSeverity,
  displayAlert,
  setDisplayAlert,
}) {
  let navigate = useNavigate();
  const [strengthVal, setStrengthVal] = useState("");
  const [registrationIsValid, setRegistrationIsValid] = useState(false);
  let strength;
  const passChange = () => {
    let indicator = document.getElementById("color-indicators");

    strength = passwordStrength(document.getElementById("password").value);
    setStrengthVal(strength.value);
    if (strength.id >= 0) {
      indicator.style.width = "25%";
    }
    if (strength.id >= 1) {
      indicator.style.width = "50%";
    }
    if (strength.id >= 2) {
      indicator.style.width = "75%";
    }
    if (strength.id >= 3) {
      indicator.style.width = "100%";
    }

    if (strength.contains.includes("lowercase")) {
      document.getElementById("Lowercase").classList.add("valid");
    } else {
      document.getElementById("Lowercase").classList.remove("valid");
    }
    if (strength.contains.includes("uppercase")) {
      document.getElementById("Uppercase").classList.add("valid");
    } else {
      document.getElementById("Uppercase").classList.remove("valid");
    }
    if (strength.contains.includes("number")) {
      document.getElementById("Number").classList.add("valid");
    } else {
      document.getElementById("Number").classList.remove("valid");
    }
    if (strength.contains.includes("symbol")) {
      document.getElementById("Symbol").classList.add("valid");
    } else {
      document.getElementById("Symbol").classList.remove("valid");
    }
    if (userProfile.password.length >= 8) {
      document.getElementById("Length").classList.add("valid");
    } else {
      document.getElementById("Length").classList.remove("valid");
    }
  };
  const pass = useRef();
  const passConf = useRef();

  const showPass = () => {
    document.getElementById("password").type = "text";
    document.getElementById("password").classList.add("borderGradient");
    pass.current.goToAndPlay(0, true);
  };
  const hidePass = () => {
    document.getElementById("password").type = "password";
    document.getElementById("password").classList.remove("borderGradient");
  };

  const showPassConf = () => {
    document.getElementById("passwordConfirm").type = "text";
    document.getElementById("passwordConfirm").classList.add("borderGradient");
    passConf.current.goToAndPlay(0, true);
  };
  const hidePassConf = () => {
    document.getElementById("passwordConfirm").type = "password";
    document
      .getElementById("passwordConfirm")
      .classList.remove("borderGradient");
  };

  const radioCheck = (e) => {
    setIsFarmer(!isFarmer);
    setIsResearcher(!isResearcher);
  };
  const [isFarmer, setIsFarmer] = useState(
    localStorage.getItem("category_choosed") &&
      localStorage.getItem("category_choosed") === "farmer"
      ? true
      : false
  );
  const [isResearcher, setIsResearcher] = useState(
    localStorage.getItem("category_choosed") &&
      localStorage.getItem("category_choosed") === "researcher"
      ? true
      : false
  );
  useEffect(() => {
    if (isFarmer) {
      setUserProfile({ ...userProfile, userType: "farmer" });
    } else if (isResearcher) {
      setUserProfile({ ...userProfile, userType: "researcher" });
    }
  }, [isFarmer, isResearcher]);
  useEffect(() => {
    if (
      userProfile?.email &&
      userProfile?.password &&
      userProfile?.password === userProfile?.passwordConfirmation &&
      userProfile?.passwordConfirmation &&
      userProfile?.userType &&
      validateEmail({ userProfile }) &&
      validatePassword({
        password: userProfile.password,
        strength: strengthVal,
      })
    ) {
      setRegistrationIsValid(true);
    } else {
      setRegistrationIsValid(false);
    }
  }, [userProfile]);
  const noNav = `.dash-nav, .nav-margin, .dash-side {
    display: none !important;
}`
  return (
    <>
    <style>{noNav}</style>
      <div className="center-flex">
        <div className="navbar">
          <Link to="../account">
            <img src={back_arrow} alt="" />
          </Link>
        </div>
        <div className="content">
          <div className="title">
            <h1>Let's register.</h1>
            <p>
              It's great to see new face !<br></br>
              Don't worry, it's all gonna be easy
            </p>
          </div>

          <form>
            <div className="input">
              <h2>I am a</h2>
              <div className="typeChoose">
                <div
                  className={
                    isFarmer
                      ? "typeChoose_type checkedRadio"
                      : "typeChoose_type"
                  }
                >
                  <label htmlFor="farmer">Farmer</label>
                  <input
                    name="type"
                    type="radio"
                    id="farmer"
                    onChange={radioCheck}
                    checked={isFarmer}
                  ></input>
                </div>
                <div
                  className={
                    isResearcher
                      ? "typeChoose_type checkedRadio"
                      : "typeChoose_type"
                  }
                >
                  <label htmlFor="researcher">Researcher</label>
                  <input
                    name="type"
                    type="radio"
                    id="researcher"
                    onChange={radioCheck}
                    checked={isResearcher}
                  ></input>
                </div>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={userProfile?.email ? userProfile.email : ""}
                onChange={(event) =>
                  setUserProfile({
                    ...userProfile,
                    email: event.target.value,
                  })
                }
              ></input>
              <div id="email-message-alert"></div>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={userProfile?.password ? userProfile.password : ""}
                  onKeyUp={passChange}
                  onChange={(event) => {
                    setUserProfile({
                      ...userProfile,
                      password: event.target.value,
                    });
                  }}
                  id="password"
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
              <h2>{strengthVal}</h2>
              <div id="color-indicators"></div>
              <p>Password must contains :</p>
              <ul>
                <li id="Lowercase">Lowercase</li>
                <li id="Uppercase">Uppercase</li>
                <li id="Number">Number</li>
                <li id="Symbol">Symbol</li>
                <li id="Length">8 characters</li>
              </ul>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="passwordConfirm"
                  value={
                    userProfile?.passwordConfirmation
                      ? userProfile.passwordConfirmation
                      : ""
                  }
                  onChange={(event) =>
                    setUserProfile({
                      ...userProfile,
                      passwordConfirmation: event.target.value,
                    })
                  }
                ></input>
                <Lottie
                  lottieRef={passConf}
                  autoplay={false}
                  animationData={eyeBlink}
                  loop={false}
                  onMouseDown={showPassConf}
                  onMouseUp={hidePassConf}
                  className="eye-pass"
                />
              </div>
            </div>
            <div className="submit">
              <p>
                Already have an account ?{" "}
                <Link to="../account/login">
                  <b>Log in</b>
                </Link>
              </p>
              <button
                className={registrationIsValid ? "btn" : "btn disabled"}
                onClick={(event) => {
                  event.preventDefault();
                  signup({
                    userProfile,
                    messageAlert,
                    setMessageAlert,
                    severity,
                    setSeverity,
                    displayAlert,
                    setDisplayAlert,
                    navigate,
                  });
                }}
                disabled={registrationIsValid ? false : true}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
