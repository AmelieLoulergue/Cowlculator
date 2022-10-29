import "./App.css";
import { FormContextWrapper } from "./context/formContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewForm from "./components/Form";
import Login from "./components/logger/Login";
import Register from "./components/logger/Signup";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Bg from "./components/layout/Bg";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
import {
  localStorageGetItems,
  localStorageRemoveItems,
  localStorageSetItems,
} from "./utils/localStorage/localStorageFunctions";
import { useAuthContext } from "./context/authContext";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [formInformations, setFormInformations] = useState({
    formIsCompleted: false,
    datasForm: [],
    initForm: false,
    questionToDisplay: null,
    indexQuestions: 0,
    counterQuestion: 0,
    questions: [],
    allQuestions: [],
  });
  const {authInformations, setAuthInformations } = useAuthContext();
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
  const [allResultsUser, setAllResultsUser] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [timer, setTimer] = useState(true);
  useEffect(() => {
    console.log("initApp");

    if (!authInformations.loggedUser) {
      console.log("function contrôle connexion user");
      if (!authInformations.login) {
        console.log("il n'y a pas de login, on regarde le localstorage");
        isLogin({
          setAuthInformations,
        });
      }
    }
  }, []);
  useEffect(() => {
    if (formIsCompleted) {
      if (
        questions.find((element) => element.id === "farm_name") &&
        !authInformations.login?.farmName
      ) {
        updateUserDatas({
          farmName: questions.find((element) => element.id === "farm_name")
            .response,
          authInformations,
          setAuthInformations,
        });
      }
      saveUserDatas({ allQuestions, results, authInformations }).then(() => {
        getUserDatas({ authInformations })
          .then((result) => {
            if (result.result.length > 0) {
              setAllResultsUser(result.result.map((item) => item.result));
            }
          })
          // make sure to catch any error
          .catch(console.error);
        localStorageRemoveItems({
          items: [
            "results",
            "allQuestions",
            "counterQuestion",
            "formIsCompleted",
            "indexQuestions",
            "initForm",
            "questionToDisplay",
            "questions",
            "dataForms",
          ],
          userId: authInformations?.login?.userId,
        });
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
  }, [formIsCompleted, allResultsUser]);
  useEffect(() => {
    if (
      questions.find((element) => element.id === "farm_name") &&
      !authInformations?.login?.farmName &&
      formIsCompleted
    ) {
      updateUserDatas({
        farmName: questions.find((element) => element.id === "farm_name")
          .response,
        authInformations,
        setAuthInformations,
      });
      console.log(authInformations?.loggedUser);
    }
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
  useEffect(
    () =>
      localStorageSetItems({
        items: {
          datasForm: datasForm,
          indexQuestions: indexQuestions,
          results: results,
          allQuestions: allQuestions,
          questions: questions,
          login: authInformations?.login,
          counterQuestion: counterQuestion,
          formIsCompleted: formIsCompleted,
          initForm: initForm,
        },
        userId: authInformations?.login.userId,
      }),
    [
      datasForm,
      indexQuestions,
      questionToDisplay,
      results,
      allQuestions,
      questions,
      authInformations.login,
      counterQuestion,
      formIsCompleted,
      initForm,
      allResults,
      allResultsUser,
    ]
  );
  useEffect(() => {
    console.log("l'utilisateur est loggué :", authInformations?.loggedUser);
    if (
      authInformations?.CircularProgressloggedUser &&
      authInformations?.login
    ) {
      getUserDatas({ authInformations })
        .then((result) => {
          if (result?.result?.length > 0) {
            setAllResultsUser(result.result.map((item) => item.result));
          }
        })
        // make sure to catch any error
        .catch(console.error);
      getAllResults({ authInformations })
        .then((result) => {
          setAllResults(
            result.result.map((item) => [
              { id: "userId", response: item.user },
              ...item.result,
            ])
          );
        })
        .catch(console.error);
      setFormInformations((currentFormInformations) => ({
        ...currentFormInformations,
        ...localStorageGetItems({
          items: [
            "datasForm",
            "indexQuestions",
            "results",
            "allQuestions",
            "questions",
            "questionToDisplay",
            "counterQuestion",
            "formIsCompleted",
            "initForm",
          ],
          userId: authInformations?.login.userId,
        }),
      }));
    }
  }, [
    authInformations?.loggedUser,
    authInformations?.login,
    authInformations?.login?.userId,
    authInformations,
  ]);
  useEffect(() => console.log(formInformations), [formInformations]);
  // useEffect(() => console.log(datasForm), [datasForm]);
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
                  <Navbar></Navbar>
                  <Home /> <Footer />
                </>
              }
            ></Route>
            <Route
              path="/form"
              element={
                authInformations?.loggedUser ? (
                  <>
                    <Navbar></Navbar>

                    <FormContextWrapper>
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
                        allResultsUser={allResultsUser}
                      />
                    </FormContextWrapper>

                    <Footer />
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
                        <Navbar></Navbar>
                        <Home /> <Footer />
                      </>
                    )}
                  </>
                )
              }
            ></Route>
            <Route
              path="/account"
              element={
                !authInformations?.loggedUser ? (
                  <>
                    <Navbar />
                    <Logger
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />{" "}
                    <Footer />
                  </>
                ) : authInformations?.loggedUser &&
                  authInformations?.login.userType === "farmer" ? (
                  <>
                    <Navbar />
                    <Dashboard allResultsUser={allResultsUser} /> <Footer />
                  </>
                ) : (
                  <>
                    <Navbar />
                    <ResearcherDatas allResults={allResults} /> <Footer />
                  </>
                )
              }
            ></Route>
            <Route
              path="/account/login"
              element={
                !authInformations?.loggedUser ? (
                  <>
                    <Navbar />
                    <Login
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />{" "}
                    <Footer />
                  </>
                ) : authInformations?.loggedUser &&
                  authInformations?.login.userType === "farmer" ? (
                  <>
                    <Navbar />
                    <Dashboard allResultsUser={allResultsUser} /> <Footer />
                  </>
                ) : (
                  <>
                    <Navbar />
                    <ResearcherDatas allResults={allResults} /> <Footer />
                  </>
                )
              }
            ></Route>
            <Route
              path="/account/register"
              element={
                !authInformations?.loggedUser ? (
                  <>
                    <Navbar />
                    <Register
                      setMessageAlert={setMessageAlert}
                      setSeverity={setSeverity}
                      setDisplayAlert={setDisplayAlert}
                    />{" "}
                    <Footer />
                  </>
                ) : authInformations?.loggedUser &&
                  authInformations?.login.userType === "farmer" ? (
                  <>
                    <Navbar />
                    <Dashboard
                      results={results}
                      formIsCompleted={formIsCompleted}
                      allResultsUser={allResultsUser}
                    />{" "}
                    <Footer />
                  </>
                ) : (
                  <>
                    <Navbar />
                    <ResearcherDatas allResults={allResults} />
                    <Footer />
                  </>
                )
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                authInformations?.loggedUser ? (
                  <>
                    <Navbar />

                    <Dashboard
                      results={results}
                      formIsCompleted={formIsCompleted}
                      allResultsUser={allResultsUser}
                    />
                    <Footer />
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
                        <Navbar></Navbar>

                        <Login
                          setMessageAlert={setMessageAlert}
                          setSeverity={setSeverity}
                          setDisplayAlert={setDisplayAlert}
                        />

                        <Footer />
                      </>
                    )}
                  </>
                )
              }
            ></Route>
            <Route
              path="/datas"
              element={
                authInformations?.loggedUser ? (
                  <>
                    <Navbar />
                    <ResearcherDatas allResults={allResults} />
                    <Footer />
                  </>
                ) : (
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                )
              }
            ></Route>
            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  <About />
                  <Footer />
                </>
              }
            ></Route>

            <Route
              path="/confirm-email/:userId/:coucou"
              element={
                <>
                  <Navbar />
                  <ConfirmEmail
                    setMessageAlert={setMessageAlert}
                    setSeverity={setSeverity}
                    setDisplayAlert={setDisplayAlert}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/references"
              element={
                <>
                  <Navbar />
                  <References />
                  <Footer />
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
