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
  console.log(login);
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
        <Navbar login={login} setLogin={setLogin}></Navbar>
        {displayAlert && (
          <AlertComponent severity={severity} messageAlert={messageAlert} />
        )}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home viewHeight={viewHeight} scroll={scroll} />}
            ></Route>
            <Route
              path="/form"
              element={
                isLogin({ validUserType: "farmer", login }) ? (
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
                ) : (
                  <Home />
                )
              }
            ></Route>
            <Route path="/getstarted" element={<Getstarted />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route
              path="/account/login"
              element={
                <Login
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  login={login}
                  setLogin={setLogin}
                  setMessageAlert={setMessageAlert}
                  setSeverity={setSeverity}
                  setDisplayAlert={setDisplayAlert}
                />
              }
            ></Route>
            <Route
              path="/account/register"
              element={
                <Register
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  setMessageAlert={setMessageAlert}
                  setSeverity={setSeverity}
                  setDisplayAlert={setDisplayAlert}
                />
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                isLogin({ validUserType: "farmer", login }) ? (
                  <Dashboard login={login} />
                ) : (
                  <Home />
                )
              }
            ></Route>
            <Route
              path="/datas"
              element={
                isLogin({ validUserType: "researcher", login }) ? (
                  <ResearcherDatas login={login} />
                ) : (
                  <Home />
                )
              }
            ></Route>
            <Route path="/about" element={<About />}></Route>

            <Route
              path="/confirm-email/:userId/:resetToken"
              element={
                <ConfirmEmail
                  setMessageAlert={setMessageAlert}
                  setSeverity={setSeverity}
                  setDisplayAlert={setDisplayAlert}
                />
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
