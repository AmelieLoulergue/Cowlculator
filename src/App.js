import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewForm from "./components/NewForm";
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
import getAllResults from "./utils/userDatas/getAllResults";
import saveUserDatas from "./utils/userDatas/saveUserDatas";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [formIsCompleted, setFormIsCompleted] = useState(false);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
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
  const [counterQuestion, setCounterQuestion] = useState(0);
  useEffect(() => setViewHeight(window.innerHeight), [window]);

  const [results, setResults] = useState({});
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [login, setLogin] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: "",
    password: "",
  });
  const [farmName, setFarmName] = useState("");
  const [allResultsUser, setAllResultsUser] = useState([]);
  const [allResults, setAllResults] = useState([]);
  useEffect(() => {
    console.log({ allResultsUser });
  }, [allResultsUser]);
  useEffect(() => {
    console.log({ allResults });
  }, [allResults]);
  useEffect(() => {
    if (localStorage.getItem("datasForm")) {
      setDatasForm(JSON.parse(localStorage.getItem("datasForm")));
    }
    if (localStorage.getItem("results")) {
      setResults(JSON.parse(localStorage.getItem("results")));
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
  }, []);
  // useEffect(
  //   () => console.log(allQuestions, questions),
  //   [allQuestions, questions]
  // );
  useEffect(() => {
    if (questions.find((element) => element.id === "farm_name")) {
      setFarmName(
        questions.find((element) => element.id === "farm_name").response
      );
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
  }, []);

  // console.log({ allQuestions });
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
    localStorage.setItem("counterQuestion", counterQuestion);
  }, [counterQuestion]);
  useEffect(() => {
    localStorage.setItem("initForm", initForm);
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
      localStorage.setItem("datasForm", JSON.stringify(datasForm));
    }
  }, [datasForm]);
  useEffect(() => {
    if (login && login !== "false") {
      localStorage.setItem("login", JSON.stringify(login));
    }
  }, [login]);
  useEffect(() => {
    if (formIsCompleted) {
      console.log({ results }, { datasForm }, { questions });
      localStorage.setItem("results", JSON.stringify(results));
      saveUserDatas({ allQuestions, results, login }).then(() => {
        getUserDatas({ login })
          .then((result) => {
            if (result.result.length > 0) {
              setAllResultsUser(result.result.map((item) => item.result));
            }
          })
          // make sure to catch any error
          .catch(console.error);
        localStorage.removeItem("results");
        localStorage.removeItem("allQuestions");
        localStorage.removeItem("counterQuestion");
        localStorage.removeItem("formIsCompleted");
        localStorage.removeItem("indexQuestions");
        localStorage.removeItem("initForm");
        localStorage.removeItem("questionToDisplay");
        localStorage.removeItem("questions");
        localStorage.removeItem("datasForm");
        setFormIsCompleted(false);
        setDatasForm([]);
        setInitForm(false);
        setQuestionToDisplay(null);
        setIndexQuestions(0);
        setCounterQuestion(0);

        setResults({});
        setQuestions([]);
        setAllQuestions([]);
      });
    }
    localStorage.setItem("formIsCompleted", formIsCompleted);
  }, [formIsCompleted]);
  useEffect(() => {
    console.log({ results });
    if (results !== {}) {
      localStorage.setItem("results", JSON.stringify(results));
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
        if (result.result.length > 0) {
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
      .catch(console.error); // call the function
    // console.log(test);
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
                  <Home />
                </>
              }
            ></Route>
            <Route
              path="/form"
              element={
                isLogin({ login }) ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    ></Navbar>
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
                      allQuestions={allQuestions}
                      setAllQuestions={setAllQuestions}
                      counterQuestion={counterQuestion}
                      setCounterQuestion={setCounterQuestion}
                    />
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    ></Navbar>
                    <Home />
                  </>
                )
              }
            ></Route>
            <Route
              path="/account"
              element={
                <>
                  <Navbar
                    farmName={farmName}
                    login={login}
                    setLogin={setLogin}
                  />
                  <Account />
                </>
              }
            ></Route>
            <Route
              path="/account/login"
              element={
                !isLogin({ login }) ? (
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
                    />
                  </>
                ) : isLogin({ login }) && login.userType === "farmer" ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Dashboard
                      login={login}
                      results={results}
                      allResultsUser={allResultsUser}
                      formIsCompleted={formIsCompleted}
                      datasForm={datasForm}
                    />
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <ResearcherDatas allResults={allResults} login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/account/register"
              element={
                !isLogin({ login }) ? (
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
                    />
                  </>
                ) : isLogin({ login }) && login.userType === "farmer" ? (
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
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <ResearcherDatas allResults={allResults} login={login} />
                  </>
                )
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                isLogin({ login }) ? (
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
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    ></Navbar>
                    <Home />
                  </>
                )
              }
            ></Route>
            <Route
              path="/datas"
              element={
                isLogin({ login }) ? (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <ResearcherDatas allResults={allResults} login={login} />
                  </>
                ) : (
                  <>
                    <Navbar
                      farmName={farmName}
                      login={login}
                      setLogin={setLogin}
                    />
                    <Home />
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
                </>
              }
            ></Route>

            <Route
              path="/confirm-email/:userId/:resetToken"
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
                  />
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
