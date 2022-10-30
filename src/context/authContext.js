import { createContext, useContext, useState, useEffect } from "react";
import { localStorageSetItems } from "../utils/localStorage/localStorageFunctions";
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
  useEffect(
    () =>
      localStorageSetItems({
        items: {
          login: authInformations?.login,
          allResultsUser: authInformations?.allResultsUser,
          allResults: authInformations?.allResults,
        },
        userId: authInformations?.login.userId,
      }),
    [authInformations]
  );
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
