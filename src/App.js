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
import listOfQuestions from "./utils/listOfQuestions";
import getUserDatas from "./utils/userDatas/getUserDatas";
import saveUserDatas from "./utils/userDatas/saveUserDatas";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [formIsCompleted, setFormIsCompleted] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [scroll, setScroll] = useState(window.scrollY);
  const [datasForm, setDatasForm] = useState([]);
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("");
  const [initForm, setInitForm] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [questionToDisplay, setQuestionToDisplay] = useState(null);
  const [indexQuestions, setIndexQuestions] = useState(
    localStorage.getItem("indexQuestions")
      ? Number(localStorage.getItem("indexQuestions"))
      : 0
  );
  useEffect(() => setViewHeight(window.innerHeight), [window]);

  const [results, setResults] = useState({});
  const [questions, setQuestions] = useState([]);
  const [login, setLogin] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("datasForm")) {
      setDatasForm(JSON.parse(localStorage.getItem("datasForm")));
    }
    if (localStorage.getItem("results")) {
      setResults(JSON.parse(localStorage.getItem("results")));
    }
    if (localStorage.getItem("questions")) {
      setQuestions(JSON.parse(localStorage.getItem("questions")));
    } else {
      setQuestions(listOfQuestions.formQuestions);
    }
    if (localStorage.getItem("login")) {
      setLogin(JSON.parse(localStorage.getItem("login")));
    }
    if (localStorage.getItem("questionToDisplay")) {
      setQuestionToDisplay(
        localStorage.getItem("questionToDisplay") === "undefined"
          ? ""
          : JSON.parse(localStorage.getItem("questionToDisplay"))
      );
    } else {
      setQuestionToDisplay(listOfQuestions.formQuestions[0]);
    }
    if (localStorage.getItem("formIsCompleted")) {
      setFormIsCompleted(
        JSON.parse(localStorage.getItem("formIsCompleted")) === "true"
          ? true
          : false
      );
    }
  }, []);
  useEffect(() => {
    if (initForm) {
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
    }
    if (questions.length > 0) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, [questions]);
  useEffect(() => {
    localStorage.setItem("indexQuestions", indexQuestions);
  }, [indexQuestions]);
  useEffect(() => {
    if (questionToDisplay !== null) {
      localStorage.setItem(
        "questionToDisplay",
        JSON.stringify(questionToDisplay)
      );
    }
  }, [questionToDisplay]);
  useEffect(() => {
    calculs({ datasForm, results, setResults });
    if (datasForm.length > 0) {
      localStorage.setItem("datasForm", JSON.stringify(datasForm));
    }
  }, [datasForm]);
  useEffect(() => {
    console.log({ results }, { datasForm });
  }, [results]);
  useEffect(() => {
    if (login && login !== "false") {
      localStorage.setItem("login", JSON.stringify(login));
    }
  }, [login]);
  useEffect(() => {
    if (formIsCompleted) {
      console.log({ results }, { datasForm }, { questions });
      document.getElementById("stringify").innerHTML =
        JSON.stringify(datasForm);
      localStorage.setItem("results", JSON.stringify(results));
      saveUserDatas();
    }
    localStorage.setItem("formIsCompleted", formIsCompleted);
  }, [formIsCompleted]);
  useEffect(() => {
    if (results !== {}) {
      localStorage.setItem("results", JSON.stringify(results));
    }
  }, [results]);
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
                      formIsCompleted={formIsCompleted}
                      setFormIsCompleted={setFormIsCompleted}
                      initForm={initForm}
                      setInitForm={setInitForm}
                      questionToDisplay={questionToDisplay}
                      setQuestionToDisplay={setQuestionToDisplay}
                      indexQuestions={indexQuestions}
                      setIndexQuestions={setIndexQuestions}
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
                    <Dashboard
                      login={login}
                      results={results}
                      formIsCompleted={formIsCompleted}
                      datasForm={datasForm}
                    />
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
                    <Dashboard
                      login={login}
                      results={results}
                      formIsCompleted={formIsCompleted}
                    />
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
                    <Dashboard
                      login={login}
                      results={results}
                      formIsCompleted={formIsCompleted}
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
