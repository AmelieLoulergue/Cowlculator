import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewForm from "./components/NewForm";
import Getstarted from "./components/Getstarted";
import Account from "./components/logger/Logger";
import Login from "./components/logger/Login";
import Register from "./components/logger/Signup";
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import calculs from "./utils/calculs";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [scroll, setScroll] = useState(window.scrollY);
  const [datasForm, setDatasForm] = useState([]);
  useEffect(() => setViewHeight(window.innerHeight), [window]);

  const [results, setResults] = useState({});
  const [questions, setQuestions] = useState([]);
  const [studyPeriod, setStudyPeriod] = useState(null);
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
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home viewHeight={viewHeight} scroll={scroll} />}
            ></Route>
            <Route
              path="/form"
              element={
                <NewForm
                  results={results}
                  setResults={setResults}
                  questions={questions}
                  setQuestions={setQuestions}
                  datasForm={datasForm}
                  setDatasForm={setDatasForm}
                  studyPeriod={studyPeriod}
                  setStudyPeriod={setStudyPeriod}
                />
              }
            ></Route>
            <Route path="/getstarted" element={<Getstarted />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/account/login" element={<Login />}></Route>
            <Route path="/account/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
