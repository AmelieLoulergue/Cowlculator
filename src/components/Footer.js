import * as React from "react"
import "./Footer.css"

import mif from '../assets/img/mif.png'
import wwc from '../assets/img/wwc-circle.png'
import logo from '../assets/img/cowlculator.png'

function Footer() {
    return (
        <>

        <div id="footer">

        <div className="links">
            <h3>Links :</h3>
            <ul>
                <li>Home page</li>
                <li>About the app</li>
                <li>How to get your results?</li>
                <li>About the team</li>
                <li>Access your profile</li>
                <li>Fill the form</li>
                <li>Are you a researcher? Download datas</li>
            </ul>
        </div>

        <div className="copyright">
            <img src={logo}></img>
            <p>© Cowlculator 2022</p>
            <p>
              Made with 💙🤍❤️ by
              <br></br>
              <span>
                <small>Bertille Dormoy Smith</small>
              </span>
              <br></br>
              <span>
                <small>Amélie Loulergue</small>
              </span>
              <br></br>
              <span>
                <small>Clément Loulergue</small>
              </span>
            </p>
        </div>
        
        <div className="logos">
            <img src={wwc}></img>
            <img src={mif}></img>
        </div>
        </div>

        </>
    )
}

export default Footer