import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Getstarted from "./components/Getstarted";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
