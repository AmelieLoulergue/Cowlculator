import * as React from "react";
import "./Home.css";
import videoSrc from "../assets/video/720pmini.webm";
import arrow from "../assets/svg/arrow.svg";
import { useNavigate } from "react-router-dom";

import survey from "../assets/svg/Storyset/survey.svg";
import report from "../assets/svg/Storyset/report.svg";
import choice from "../assets/svg/Storyset/choice.svg";
import data from "../assets/svg/Storyset/data.svg";

function Home({ viewHeight, scroll }) {
  let navigate = useNavigate();
  function scrollHero() {
    window.scrollTo({
      left: 0,
      top: 0.9 * window.innerHeight,
      behavior: "smooth",
    });
  }
  const noNavMargin = `
  .nav-margin { display: none }
  `;
  return (
    <>
      <style>{noNavMargin}</style>
      <div className="has-text-centered">
        {/* <Firstnav viewHeight={viewHeight} scroll={scroll}></Firstnav> */}
        <div id="hero-container">
          <div className="hero">
            <h2 className="catchPhrase" onClick={scrollHero}>
              “ We know solutions to help mitigate greenhouse gas emissions in
              agriculture. <br></br>The question is: how to get people to
              implement them?” <br></br> Steven Mufson, 2019
            </h2>
            <button className="btn" onClick={scrollHero}>
              Learn More
            </button>
            <div className="arrow-animated" onClick={scrollHero}>
              <img
                src={arrow}
                className="arrow1"
                alt="arrow facing down, inviting the user to scroll"
              ></img>
              <img
                src={arrow}
                className="arrow2"
                alt="arrow facing down, inviting the user to scroll"
              ></img>
            </div>
          </div>
          <video autoPlay muted loop id="hero-bg">
            <source src={videoSrc} type="video/webm" />
          </video>
        </div>

        <div className="container">
          <div id="app" className="aboutApp">
            <h1 className="primaryTitle">About the app</h1>
            <p>
              Cowlculator is a free app that helps you, American farmers, to
              generate <b>carbon credits </b>
              more efficiently by understanding and managing your carbon
              balance.
              <br></br>
              <br></br>
              <br></br>
              Based on the information collected via a form, Cowlculator is
              providing you insights into your <b>carbon emissions</b>, the{" "}
              <b>mitigations</b> happening on your farm thanks to the practices
              you might have implemented, and a estimate of{" "}
              <b>potential earnings</b>.<br></br>
              <br></br>
              <br></br>
              Cowlculator helps you to feel <b>motivated</b> that you can do
              more, not only for the money but also for the{" "}
              <b>future generations</b>. Cowlculator allows you to{" "}
              <b>keep track of your improvements</b> and reminds you how and why
              you are doing it!
              <br></br>
              <br></br>
              <br></br>
              Cowlculator is also a powerful tool for{" "}
              <b>agricultural research</b> allowing researchers having a
              professional and authorized email address to access our{" "}
              <b>nationwide database</b> , source of information about farms,
              their practices and their evolution.
              <br></br>
              <br></br>
              <br></br>
              Cowlculator research branch helpsresearchers access the necessary
              information to lead research to influence the local policy makers
              to make <b>meaningful policies</b> to{" "}
              <b>
                support agricultural carbon sequestration and the creation of
                carbon credits
              </b>
              .
            </p>
          </div>
          <br></br>
          <button
            className="btn sticky-bottom"
            onClick={() => navigate("/account")}
          >
            get started
          </button>
          <h1 id="steps" className="primaryTitle">
            Which steps?
          </h1>

          <div className="land-hiw">
            <div className="land-hiw-svg">
              <img src={survey}></img>
            </div>
            <div>
              <div className="number">1</div>
              <h1>Take a short questionnaire</h1>
              <p>
                Cowlculator needs to know about your farm's activities and
                practices. You can update your information by retaking the
                questionnaire at any time if any change occurs on your farm.
              </p>
            </div>
          </div>

          <div className="land-hiw">
            <div className="land-hiw-svg">
              <img src={report}></img>
            </div>
            <div>
              <div className="number">2</div>
              <h1>Access personalized report</h1>
              <p>
                Cowlculator generates a personalized report based on the
                information you provided. This report includes your farm's CO
                <sub>2</sub>eq mitigations, CO<sub>2</sub>eq emissions, and,
                your potential earnings via carbon credits.
              </p>
            </div>
          </div>

          <div className="land-hiw">
            <div className="land-hiw-svg">
              <img src={choice}></img>
            </div>
            <div>
              <div className="number">3</div>
              <h1>Take actions</h1>
              <p>
                Cowlculator helps you to make decisions on what practices to
                implement to maximize your environmental and financial rewards.
              </p>
            </div>
          </div>

          <div className="land-hiw">
            <div className="land-hiw-svg">
              <img src={data}></img>
            </div>
            <div>
              <div className="number">4</div>
              <h1>Access meaningful data</h1>
              <p>
                Cowlculator's database gathers users' information while
                guaranteeing their privacy. Using an authorized email address,
                acces this dataset to conduct meaningful agricultural research.
              </p>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
}

export default Home;
