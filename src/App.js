import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Form,
  GetStarted,
  Home,
  Login,
  References,
  Register,
  Researcher,
  Dashboard,
} from "./pages/index";
import Bg from "./components/layout/Bg";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AlertComponent from "./components/alerts/Alert";
import { isLogin } from "./utils/authentication/controlLog";
import { useAuthContext } from "./context/authContext";
import { useAlertContext } from "./context/alertContext";
import { ResultContextWrapper } from "./context/resultContext";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const { authInformations, setAuthInformations } = useAuthContext();
  const { alertInformations } = useAlertContext();

  useEffect(() => {
    if (!authInformations.loggedUser) {
      if (!authInformations.login) {
        isLogin({
          setAuthInformations,
        });
      }
    }
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        {alertInformations?.displayAlert && (
          <AlertComponent
            severity={alertInformations?.severity}
            messageAlert={alertInformations?.messageAlert}
          />
        )}
        <ResultContextWrapper authInformations={authInformations}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/references" element={<References />} />
              <Route path="/form" element={<Form />} />
              <Route path="/account" element={<GetStarted />} />
              <Route path="/account/login" element={<Login />} />
              <Route path="/account/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/datas" element={<Researcher />} />
              <Route
                path="/confirm-email/:userId/:coucou"
                element={<Login />}
              />
            </Routes>
          </BrowserRouter>
        </ResultContextWrapper>
        <Bg />
      </div>
    </ThemeProvider>
  );
}

export default App;
