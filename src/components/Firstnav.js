import * as React from "react";
import './Firstnav.css';
import logow from '../assets/img/logo-w.png';
import account from '../assets/img/account.png';

function Firstnav() {

  return (
    <>
    <nav id="Firstnav">
        <ul>
            <li><img src={logow} id="logo"></img></li>
            <li><img src={account}></img></li>
        </ul>
    </nav>
    </>
  );
}

export default Firstnav;
