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
  return (
    <div className="has-text-centered">
      <Firstnav viewHeight={viewHeight} scroll={scroll}></Firstnav>
      <Bg></Bg>
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
        <h1>Take a short questionnaire</h1>
        <p>
          Cowlculator needs to know about your farm's activities and practices.
          You can update your information by retaking the questionnaire at any
          time if any change occurs on your farm.
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
          Cowlculator helps you to make decisions on what practices to implement
          to maximize your environmental and financial rewards.
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
      <button
        className="btn sticky-bottom"
        onClick={() => navigate("/getstarted")}
      >
        get strated
      </button>
      <p>
        Fugiat ea Lorem quis culpa esse commodo fugiat dolore anim aliqua fugiat
        ad. Ex ea velit sit consectetur aute aliqua cillum minim quis proident
        ut labore amet sint. Cillum ipsum quis non id occaecat. Ipsum non
        laborum veniam officia exercitation ullamco labore. Eiusmod ipsum duis
        mollit veniam exercitation occaecat. In dolore ipsum anim et laboris
        magna sit deserunt. Velit enim eu Lorem ad proident anim ullamco veniam.
        Do ad quis commodo aliqua. Qui in deserunt dolore quis nostrud id veniam
        eiusmod laboris voluptate in sit ullamco. Voluptate proident officia eu
        sit id Lorem tempor ipsum reprehenderit ex proident. Sit aliquip veniam
        velit cillum minim do nisi eiusmod pariatur veniam. Veniam qui fugiat ad
        cupidatat incididunt in qui voluptate nostrud aliquip labore veniam ad.
        Duis minim excepteur consequat anim est irure sit magna cupidatat esse
        sint anim minim. Et ut mollit anim minim do laboris reprehenderit. Lorem
        enim officia velit consectetur sunt laborum dolore exercitation. Officia
        amet amet minim ea culpa pariatur ipsum nisi ad minim fugiat. Aliqua
        excepteur officia aliqua aliqua ullamco et reprehenderit ex commodo.
        Laborum voluptate tempor aute minim. Occaecat duis ad ullamco ea sint
        excepteur pariatur est ad id. Esse pariatur sint voluptate aliqua in.
      </p>
    </div>
  );
}

export default Home;
