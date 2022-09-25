import * as React from "react";
import "./Home.css";
import videoSrc from "../assets/video/720pmini.webm";
import Firstnav from "./Firstnav";
import Bg from "./Bg";
import arrow from "../assets/svg/arrow.svg";
import { useNavigate } from "react-router-dom";
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
          <p>
            Cowlculator is a free app that helps you, American farmers, to
            generate <b>carbon credits </b>
            more efficiently by understanding and managing your carbon balance.
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
            Cowlculator helps you to feel <b>motivated</b> that you can do more,
            not only for the money but also for the <b>future generations</b>.
            Cowlculator allows you to <b>keep track of your improvements</b> and
            reminds you how and why you are doing it!
            <br></br>
            <br></br>
            <br></br>
            Cowlculator is also a powerful tool for <b>
              agricultural research
            </b>{" "}
            allowing researchers having a professional and authorized email
            address to access our <b>nationwide database</b> , source of
            information about farms, their practices and their evolution.
            <br></br>
            <br></br>
            <br></br>
            Cowlculator research branch helpsresearchers access the necessary
            information to lead research to influence the local policy makers to
            make <b>meaningful policies</b> to{" "}
            <b>
              support agricultural carbon sequestration and the creation of
              carbon credits
            </b>
            .
          </p>

          <h1>Take a short questionnaire</h1>
          <p>
            Cowlculator needs to know about your farm's activities and
            practices. You can update your information by retaking the
            questionnaire at any time if any change occurs on your farm.
          </p>
          <svg height="100" width="100">
            <circle r="50" fill="white" cx="50" cy="50"></circle>
          </svg>
          <h1>Access personalized report</h1>
          <p>
            Cowlculator generates a personalized report based on the information
            you provided. This report includes your farm's CO2eq mitigations,
            CO2eq emissions, and, your potential earnings via carbon credits.
          </p>
          <svg height="100" width="100">
            <circle r="50" fill="white" cx="50" cy="50"></circle>
          </svg>
          <h1>Take actions</h1>
          <p>
            Cowlculator helps you to make decisions on what practices to
            implement to maximize your environmental and financial rewards.
          </p>
          <svg height="100" width="100">
            <circle r="50" fill="white" cx="50" cy="50"></circle>
          </svg>
          <h1>Access meaningful data</h1>
          <p>
            Cowlculator's database gathers users' information whil guaranteeing
            their privacy. Using an authorized email address, acces this dataset
            to conduct meaningful agricultural research.
          </p>
          <svg height="100" width="100">
            <circle r="50" fill="white" cx="50" cy="50"></circle>
          </svg>
        </div>
        <br></br>
        <br></br>
        <button
          className="btn sticky-bottom"
          onClick={() => navigate("/account")}
        >
          get started
        </button>
      </div>
    </>
  );
}

export default Home;
