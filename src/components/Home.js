import * as React from "react";
import "./Home.css";
import videoSrc from "../assets/video/720pmini.webm";
import Firstnav from "./Firstnav";
import Bg from "./Bg";
import arrow from "../assets/svg/arrow.svg";

function Home({ viewHeight, scroll }) {
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
            Our planet is beautiful.<br></br> It's time to work for, not against
            her.
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
        <h1>loremEu officia magna sit laboris id eiusmod.</h1>
        <p>
          Lorem sit fugiat in eiusmod consequat esse. Esse ex et mollit
          consectetur cillum. Et cupidatat pariatur duis labore in aute velit
          eiusmod velit cillum cupidatat sunt exercitation laboris.
        </p>
        <svg height="100" width="100">
          <circle r="50" fill="white" cx="50" cy="50"></circle>
        </svg>
        <h1>loremEu officia magna sit laboris id eiusmod.</h1>
        <p>
          Lorem sit fugiat in eiusmod consequat esse. Esse ex et mollit
          consectetur cillum. Et cupidatat pariatur duis labore in aute velit
          eiusmod velit cillum cupidatat sunt exercitation laboris.
        </p>

        <svg height="100" width="100">
          <circle r="50" fill="white" cx="50" cy="50"></circle>
        </svg>
        <h1>loremEu officia magna sit laboris id eiusmod.</h1>
        <p>
          Lorem sit fugiat in eiusmod consequat esse. Esse ex et mollit
          consectetur cillum. Et cupidatat pariatur duis labore in aute velit
          eiusmod velit cillum cupidatat sunt exercitation laboris.
        </p>
        <svg height="100" width="100">
          <circle r="50" fill="white" cx="50" cy="50"></circle>
        </svg>
      </div>
      <button className="btn sticky-bottom">get strated</button>
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
