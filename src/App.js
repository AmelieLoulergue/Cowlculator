import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewForm from "./components/NewForm";
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
import calculs from "./utils/calculs";
import AlertComponent from "./components/alerts/Alert";
import ConfirmEmail from "./utils/authentication/ConfirmEmail";
import { isLogin } from "./utils/authentication/controlLog";
import ResearcherDatas from "./components/ResearcherDatas";
import References from "./components/References";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [scroll, setScroll] = useState(window.scrollY);
  const [datasForm, setDatasForm] = useState([]);
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("");

  const [displayAlert, setDisplayAlert] = useState(false);
  useEffect(() => setViewHeight(window.innerHeight), [window]);

  const [results, setResults] = useState({});
  const [questions, setQuestions] = useState([]);
  const [login, setLogin] = useState(
    localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login"))
      : false
  );
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    setDatasForm(
      questions.reduce((accumulator, currentValue) => {
        if (currentValue.response) {
          return [
            ...accumulator,
            { id: currentValue.id, response: currentValue.response },
          ];
        }
        return accumulator;
      }, [])
    );
  }, [questions]);
  useEffect(() => {
    calculs({ datasForm, results, setResults });
  }, [datasForm]);
  useEffect(() => {
    console.log(results);
  }, [results]);
  useEffect(() => {
    if (login && login !== "false") {
      localStorage.setItem("login", JSON.stringify(login));
    }
  }, [login]);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        {displayAlert && (
          <AlertComponent severity={severity} messageAlert={messageAlert} />
        )}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar login={login} setLogin={setLogin}></Navbar>
                  <Home viewHeight={viewHeight} scroll={scroll} />
                </>
              }
            ></Route>
            <Route
              path="/form"
              element={
                isLogin({ login }) ? (
                  <>
                    <Navbar login={login} setLogin={setLogin}></Navbar>
                    <NewForm
                      results={results}
                      setResults={setResults}
                      questions={questions}
                      setQuestions={setQuestions}
                      datasForm={datasForm}
                      setDatasForm={setDatasForm}
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />
                  </>
                ) : (
                  <>
                    <Navbar login={login} setLogin={setLogin}></Navbar>
                    <Home viewHeight={viewHeight} scroll={scroll} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/getstarted"
              element={
                !isLogin({ login }) ? (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <Getstarted />
                  </>
                ) : isLogin({ login }) && login.userType === "farmer" ? (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <Dashboard login={login} />
                  </>
                ) : (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <ResearcherDatas login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/account"
              element={
                <>
                  <Navbar login={login} setLogin={setLogin} />
                  <Account />
                </>
              }
            ></Route>
            <Route
              path="/account/login"
              element={
                !isLogin({ login }) ? (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <Login
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                      login={login}
                      setLogin={setLogin}
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />
                  </>
                ) : isLogin({ login }) && login.userType === "farmer" ? (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <Dashboard login={login} />
                  </>
                ) : (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <ResearcherDatas login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/account/register"
              element={
                !isLogin({ login }) ? (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <Register
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />
                  </>
                ) : isLogin({ login }) && login.userType === "farmer" ? (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <Dashboard login={login} />
                  </>
                ) : (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <ResearcherDatas login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                isLogin({ login }) ? (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <Dashboard login={login} />
                  </>
                ) : (
                  <>
                    <Navbar login={login} setLogin={setLogin}></Navbar>
                    <Home viewHeight={viewHeight} scroll={scroll} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/datas"
              element={
                isLogin({ login }) ? (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <ResearcherDatas login={login} />
                  </>
                ) : (
                  <>
                    <Navbar login={login} setLogin={setLogin} />
                    <Home />
                  </>
                )
              }
            ></Route>
            <Route
              path="/about"
              element={
                <>
                  <Navbar login={login} setLogin={setLogin} />
                  <About />
                </>
              }
            ></Route>

            <Route
              path="/confirm-email/:userId/:resetToken"
              element={
                <>
                  <Navbar login={login} setLogin={setLogin} />
                  <ConfirmEmail
                    setMessageAlert={setMessageAlert}
                    setSeverity={setSeverity}
                    setDisplayAlert={setDisplayAlert}
                  />
                </>
              }
            />
            <Route
              path="/references"
              element={
                <>
                  <Navbar login={login} setLogin={setLogin} />
                  <References />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
        <Bg></Bg>
      </div>
    </ThemeProvider>
  );
}

export default App;
