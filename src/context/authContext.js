import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function AuthContextWrapper({ children }) {
  const [authInformations, setAuthInformations] = useState({
    login: false,
    loggedUser: false,
    userProfile: {
      email: "",
      password: "",
    },
    allResultsUser: [],
    allResults: [],
  });
  let sharedState = {
    authInformations: authInformations,
    setAuthInformations: setAuthInformations,
  };
  useEffect(() => console.log(authInformations), [authInformations]);
  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
