import { createContext, useContext, useState } from "react";
const AlertContext = createContext();

export function AlertContextWrapper({ children }) {
  const [alertInformations, setAlertInformations] = useState({
    messageAlert: "",
    severity: "",
    displayAlert: false,
  });
  
  let sharedState = {
    alertInformations: alertInformations,
    setAlertInformations: setAlertInformations,
  };
  return (
    <AlertContext.Provider value={sharedState}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  return useContext(AlertContext);
}
