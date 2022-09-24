import * as React from "react";
import "./About.css";

import amelie from "../assets/img/amelie.jpg";
import clement from "../assets/img/clement.jpg";
import bertille from "../assets/img/bertille.jpg";

function About() {
  return (
    <>
      <div className="container">
        <div>
          <h1 className="primaryTitle">About us.</h1>
          <p>
            Cowlculator has been developed by a French team 💙🤍❤️, but beyond
            the business partnership, this is a family affair; linked by blood
            or 10-year friendship.
          </p>
        </div>
        <div className="card-section">
          <div className="card">
            <img src={amelie}></img>
            <h2>Amélie</h2>
            <p>
              Fullstack web developer for 2 years (React/Node JS), Amelie worked
              on several projects from a wide variety of areas such as the food
              industry, building and public works, agriculture and, telecoms.
            </p>
            <p>
              Always motivated and reactive, Amelie is a gem to work with in a
              team project. Whether for work or leisure, she is always down for
              a new adventure.
            </p>
            <p>
              For Cowlculator, Amelie was our backend expert and collaborated on
              the frontend.{" "}
            </p>
          </div>
          <div className="card">
            <img src={clement}></img>
            <h2>Clément</h2>
            <p>
              Creative and talented, Clement is a young undergrad student in
              biology, and in his free time, he volunteers for the Red Cross.
              When he was 12, Clement started his own business online by
              creating and designing logos for his customers.
            </p>
            <p>
              Clement is incredibly reliable and mature which associated with
              his sharp sense of humor makes him a real asset in a team project.
            </p>
            <p>
              Clement’s role for the Cowlculator project was frontend and design
              expert.{" "}
            </p>
          </div>
          <div className="card">
            <img src={bertille}></img>
            <h2>Bertille</h2>
            <p>
              Engineer in the food industry, Bertille moved to the USA in 2020.
              During her free time, she participates in projects allowing her to
              improve her skills in data analysis programming languages and
              learning the Javascript language.
            </p>
            <p>
              Her job and interest in agriculture drive her to focus on projects
              about the sustainability of the food chain.
            </p>
            <p>
              For Cowlculator Bertille was in charge of the research, project
              management and, collaborated on the backend by tackling
              calculations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
