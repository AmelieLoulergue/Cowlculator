import * as React from "react";
import './Bg.css';

function Bg() {

    return (
      <>
      <div id="Bg">
        <svg width="100vw" height="100vh">
            <circle cx="20vw" cy="20vh" r="100" fill="rgb(0,60,20)"></circle>
            <circle cx="80vw" cy="80vh" r="300" fill="#36096d90"></circle>
        </svg>
      </div>
      </>
    );
  }
  
  export default Bg;
  