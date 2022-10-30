import { createContext, useContext, useState, useEffect } from "react";
import {
  localStorageSetItems,
  localStorageGetItems,
} from "../utils/localStorage/localStorageFunctions";
const AuthContext = createContext();

export function AuthContextWrapper({ children }) {
  const [authInformations, setAuthInformations] = useState({
    login: false,
    loggedUser: false,
  });
  useEffect(() => {
    if (authInformations?.login) {
      localStorageSetItems({
        items: {
          login: authInformations?.login,
          loggedUser: authInformations?.loggedUser,
        },
        userId: authInformations?.login.userId,
      });
    }
  }, [authInformations]);
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
