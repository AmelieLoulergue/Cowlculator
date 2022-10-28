import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewForm from "./components/NewForm";
import Login from "./components/logger/Login";
import Register from "./components/logger/Signup";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import getAllResults from "./utils/userDatas/getAllResults";
import saveUserDatas from "./utils/userDatas/saveUserDatas";
import updateUserDatas from "./utils/userDatas/updateUserDatas";
import Logger from "./components/logger/Logger";
import { CircularProgress } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [formIsCompleted, setFormIsCompleted] = useState(false);
  const [datasForm, setDatasForm] = useState([]);
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("");
  const [initForm, setInitForm] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [questionToDisplay, setQuestionToDisplay] = useState(null);
  const [indexQuestions, setIndexQuestions] = useState(0);
  const [counterQuestion, setCounterQuestion] = useState(0);

  const [results, setResults] = useState({});
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [login, setLogin] = useState(false);
  const [loggedUser, setLoggedUser] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: "",
    password: "",
  });
  const [farmName, setFarmName] = useState("");
  const [allResultsUser, setAllResultsUser] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [timer, setTimer] = useState(true);
  const goTimer = () => {
    console.log("timer");
    setTimeout(() => setTimer(false), 500);
  };
  useEffect(() => {
    if (login.userId && localStorage.getItem(`datasForm${login.userId}`)) {
      setDatasForm(
        JSON.parse(localStorage.getItem(`datasForm${login.userId}`))
      );
    }
    if (localStorage.getItem("indexQuestions")) {
      setIndexQuestions(Number(localStorage.getItem("indexQuestions")));
    }
    if (login.userId && localStorage.getItem(`results${login.userId}`)) {
      setResults(JSON.parse(localStorage.getItem(`results${login.userId}`)));
    }
    if (localStorage.getItem("allQuestions")) {
      setAllQuestions(JSON.parse(localStorage.getItem("allQuestions")));
    }
    if (localStorage.getItem("questions")) {
      setQuestions(JSON.parse(localStorage.getItem("questions")));
    } else {
      setQuestions(listOfQuestions.formQuestions);
    }
    if (localStorage.getItem("login")) {
      setLogin(JSON.parse(localStorage.getItem("login")));
    }
    if (localStorage.getItem("counterQuestion")) {
      setCounterQuestion(JSON.parse(localStorage.getItem("counterQuestion")));
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
    if (localStorage.getItem("initForm")) {
      setInitForm(
        JSON.parse(localStorage.getItem("initForm")) === "true" ? true : false
      );
    }
    if (timer) {
      goTimer();
    }
  }, []);
  useEffect(() => {
    if (
      questions.find((element) => element.id === "farm_name") &&
      !login?.farmName
    ) {
      setFarmName(
        questions.find((element) => element.id === "farm_name").response
      );
      updateUserDatas({
        login: login,
        farmName: questions.find((element) => element.id === "farm_name")
          .response,
        setLogin: setLogin,
      });
    }
  }, [questions]);
  useEffect(() => {
    if (!localStorage.getItem("allQuestions")) {
      const isAtLeastOneFieldGetLinkedQuestions = (questions) => {
        return questions.some((question) => !!question.linked_questions);
      };

      const getAllQuestionsRecursive = (currentValue, accumulatorQuestions) => {
        if (isAtLeastOneFieldGetLinkedQuestions(currentValue)) {
          const allLinkedQuestions = currentValue.reduce(
            (accumulator, value) => {
              if (value.linked_questions) {
                return [...accumulator, ...value.linked_questions];
              }
              return accumulator;
            },
            []
          );

          return getAllQuestionsRecursive(allLinkedQuestions, [
            ...accumulatorQuestions,
            ...allLinkedQuestions.map((value) => ({
              id: value.id,
              response: value.response,
              question: value.question,
            })),
          ]);
        }
        return accumulatorQuestions;
      };
      const result = listOfQuestions.formQuestions.reduce(
        (accumulator, currentValue) => {
          const totalQuestions = getAllQuestionsRecursive([currentValue], []);

          return [
            ...accumulator,
            {
              id: currentValue.id,
              response: currentValue.response,
              question: currentValue.question,
            },
            ...totalQuestions,
          ];
        },
        []
      );

      setAllQuestions(result);
    }
  }, [questions]);

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
  }, [questions, initForm]);
  useEffect(() => {
    if (indexQuestions !== 0) {
      localStorage.setItem("indexQuestions", JSON.stringify(indexQuestions));
    }
  }, [indexQuestions]);
  useEffect(() => {
    if (counterQuestion !== 0) {
      localStorage.setItem("counterQuestion", counterQuestion);
    }
  }, [counterQuestion]);
  useEffect(() => {
    if (initForm !== undefined) {
      localStorage.setItem("initForm", JSON.stringify(initForm));
    }
  }, [initForm]);
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
      localStorage.setItem(
        `datasForm${login.userId}`,
        JSON.stringify(datasForm)
      );
    }
  }, [datasForm]);
  useEffect(() => {
    if (login && login !== "false") {
      localStorage.setItem("login", JSON.stringify(login));
    }
  }, [login]);
  useEffect(() => {
    if (formIsCompleted) {
      if (login.userId) {
        localStorage.setItem(`results${login.userId}`, JSON.stringify(results));
      }
      saveUserDatas({ allQuestions, results, login }).then(() => {
        getUserDatas({ login })
          .then((result) => {
            if (result.result.length > 0) {
              setAllResultsUser(result.result.map((item) => item.result));
            }
          })
          // make sure to catch any error
          .catch(console.error);
        localStorage.removeItem(`results${login.userId}`);
        localStorage.removeItem("allQuestions");
        localStorage.removeItem("counterQuestion");
        localStorage.removeItem("formIsCompleted");
        localStorage.removeItem("indexQuestions");
        localStorage.setItem("initForm", "false");
        localStorage.removeItem("questionToDisplay");
        localStorage.removeItem("questions");
        localStorage.removeItem(`datasForm${login.userId}`);
        setFormIsCompleted(false);
        setDatasForm([]);
        setInitForm(false);
        setQuestionToDisplay(listOfQuestions.formQuestions[3]);
        setIndexQuestions(3);
        setCounterQuestion(3);

        setResults({});
        setQuestions(listOfQuestions.formQuestions);
        setAllQuestions([]);
      });
    }
  }, [formIsCompleted]);
  useEffect(() => {
    if (results !== {} && login.userId) {
      localStorage.setItem(`results${login.userId}`, JSON.stringify(results));
    }
  }, [results]);
  useEffect(() => {
    if (allQuestions.length > 0) {
      localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
    }
  }, [allQuestions]);
  useEffect(() => {
    getUserDatas({ login })
      .then((result) => {
        if (result?.result?.length > 0) {
          setAllResultsUser(result.result.map((item) => item.result));
        }
      })
      // make sure to catch any error
      .catch(console.error);
    getAllResults({ login })
      .then((result) => {
        setAllResults(
          result.result.map((item) => [
            { id: "userId", response: item.user },
            ...item.result,
          ])
        );
      })
      .catch(console.error);
  }, [login]);
  useEffect(() => {
    isLogin({ login, setLogin }).then((response) => setLoggedUser(response));
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
                  <Navbar
                    farmName={farmName}
                    login={login}
                    setLogin={setLogin}
                  ></Navbar>
                  <Home /> <Footer login={login} />
                </>
              }
            ></Route>
            <Route
              path="/form"
              element={
                loggedUser ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    ></Navbar>
                    <NewForm
                      login={login}
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
                      allQuestions={allQuestions}
                      setAllQuestions={setAllQuestions}
                      counterQuestion={counterQuestion}
                      setCounterQuestion={setCounterQuestion}
                      allResultsUser={allResultsUser}
                    />{" "}
                    <Footer login={login} />
                  </>
                ) : (
                  <>
                    {timer && (
                      <div
                        style={{
                          height: "100vh",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress />
                      </div>
                    )}
                    {!timer && (
                      <>
                        <Navbar
                          farmName={farmName}
                          login={login}
                          setLogin={setLogin}
                        ></Navbar>
                        <Home /> <Footer login={login} />
                      </>
                    )}
                  </>
                )
              }
            ></Route>
            <Route
              path="/account"
              element={
                !loggedUser ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Logger
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                      login={login}
                      setLogin={setLogin}
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />{" "}
                    <Footer login={login} />
                  </>
                ) : loggedUser && login.userType === "farmer" ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Dashboard allResultsUser={allResultsUser} />{" "}
                    <Footer login={login} />
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <ResearcherDatas allResults={allResults} login={login} />{" "}
                    <Footer login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/account/login"
              element={
                !loggedUser ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Login
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                      login={login}
                      setLogin={setLogin}
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />{" "}
                    <Footer login={login} />
                  </>
                ) : loggedUser && login.userType === "farmer" ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Dashboard allResultsUser={allResultsUser} />{" "}
                    <Footer login={login} />
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <ResearcherDatas allResults={allResults} login={login} />{" "}
                    <Footer login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/account/register"
              element={
                !loggedUser ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Register
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />{" "}
                    <Footer login={login} />
                  </>
                ) : loggedUser && login.userType === "farmer" ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Dashboard
                      login={login}
                      results={results}
                      formIsCompleted={formIsCompleted}
                      allResultsUser={allResultsUser}
                    />{" "}
                    <Footer login={login} />
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <ResearcherDatas allResults={allResults} login={login} />
                    <Footer login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                loggedUser ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Dashboard
                      login={login}
                      results={results}
                      formIsCompleted={formIsCompleted}
                      allResultsUser={allResultsUser}
                    />
                    <Footer login={login} />
                  </>
                ) : (
                  <>
                    {timer && (
                      <div
                        style={{
                          height: "100vh",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress />
                      </div>
                    )}
                    {!timer && (
                      <>
                        <Navbar
                          farmName={farmName}
                          login={login}
                          setLogin={setLogin}
                        ></Navbar>
                        <Login
                          userProfile={userProfile}
                          setUserProfile={setUserProfile}
                          login={login}
                          setLogin={setLogin}
                          setMessageAlert={setMessageAlert}
                          setSeverity={setSeverity}
                          setDisplayAlert={setDisplayAlert}
                        />
                        <Footer login={login} />
                      </>
                    )}
                  </>
                )
              }
            ></Route>
            <Route
              path="/datas"
              element={
                loggedUser ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <ResearcherDatas allResults={allResults} login={login} />
                    <Footer login={login} />
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Home />
                    <Footer login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/about"
              element={
                <>
                  <Navbar
                    farmName={farmName}
                    login={login}
                    setLogin={setLogin}
                  />
                  <About />
                  <Footer login={login} />
                </>
              }
            ></Route>

            <Route
              path="/confirm-email/:userId/:coucou"
              element={
                <>
                  <Navbar
                    farmName={farmName}
                    login={login}
                    setLogin={setLogin}
                  />
                  <ConfirmEmail
                    setMessageAlert={setMessageAlert}
                    setSeverity={setSeverity}
                    setDisplayAlert={setDisplayAlert}
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    login={login}
                    setLogin={setLogin}
                  />
                  <Footer login={login} />
                </>
              }
            />
            <Route
              path="/references"
              element={
                <>
                  <Navbar
                    farmName={farmName}
                    login={login}
                    setLogin={setLogin}
                  />
                  <References />
                  <Footer login={login} />
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
