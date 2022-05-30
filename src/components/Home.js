import * as React from "react";
import './Home.css';
import videoSrc from '../assets/video/720pmini.webm';
import Firstnav from './Firstnav';
import Bg from './Bg';

function Home() {
  return (
    <>
    <Firstnav></Firstnav>
    <Bg></Bg>
    <div id="hero-container">
      <div className="hero">
        <h2 className="catchPhrase">Our planet is beautiful.<br></br> It's time to work for, not against her.</h2>
        <button className="btn">Learn More</button>
      </div>
      <video autoPlay muted loop id="hero-bg">
        <source src={videoSrc} type="video/webm"/>
      </video>
    </div>
    
    <h1>loremEu officia magna sit laboris id eiusmod.
    </h1>
    <p>Lorem sit fugiat in eiusmod consequat esse. Esse ex et mollit consectetur cillum. Et cupidatat pariatur duis labore in aute velit eiusmod velit cillum cupidatat sunt exercitation laboris.</p>
    <h1>loremEu officia magna sit laboris id eiusmod.
    </h1>
    <p>Lorem sit fugiat in eiusmod consequat esse. Esse ex et mollit consectetur cillum. Et cupidatat pariatur duis labore in aute velit eiusmod velit cillum cupidatat sunt exercitation laboris.</p>
    <h1>loremEu officia magna sit laboris id eiusmod.
    </h1>
    <p>Lorem sit fugiat in eiusmod consequat esse. Esse ex et mollit consectetur cillum. Et cupidatat pariatur duis labore in aute velit eiusmod velit cillum cupidatat sunt exercitation laboris.</p>
    </>
  );
}

export default Home;
