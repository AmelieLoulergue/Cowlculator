import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Getstarted from "./components/Getstarted";
import Account from "./components/logger/Logger";
import Login from "./components/logger/Login";
import Signup from "./components/logger/Signup";
import { useState, useEffect } from "react";

function App() {
  const [viewHeight, setViewHeight] = useState(window.innerHeight)
  const [scroll, setScroll] = useState( window.scrollY)
  const onScroll = () => {setViewHeight(window.innerHeight); setScroll(window.scrollY)}
  useEffect(()=> window.addEventListener("scroll", onScroll ), [])
  useEffect(() => setViewHeight(window.innerHeight), [window])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home viewHeight={viewHeight} scroll={scroll} />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/getstarted" element={<Getstarted />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/account/login" element={<Login />}></Route>
          <Route path="/account/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
