import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import NewForm from "./components/NewForm";
import Form_design from "./components/Form_design";
import Getstarted from "./components/Getstarted";
import Account from "./components/logger/Logger";
import Login from "./components/logger/Login";
import Register from "./components/logger/Signup";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Bg from "./components/Bg";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [scroll, setScroll] = useState(window.scrollY);
  useEffect(() => setViewHeight(window.innerHeight), [window]);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Navbar></Navbar>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home viewHeight={viewHeight} scroll={scroll} />}
            ></Route>
            <Route path="/form" element={<NewForm />}></Route>
            <Route path="/getstarted" element={<Getstarted />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/account/login" element={<Login />}></Route>
            <Route path="/account/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </BrowserRouter>
        <Bg></Bg>
      </div>
    </ThemeProvider>
  );
}

export default App;
