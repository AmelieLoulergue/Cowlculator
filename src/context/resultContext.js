import { createContext, useContext, useEffect, useState } from "react";
import { localStorageSetItems } from "../utils/localStorage/localStorageFunctions";
import getUserDatas from "../utils/userDatas/getUserDatas";
import getAllResults from "../utils/userDatas/getAllResults";
const ResultContext = createContext();

export function ResultContextWrapper({ children, authInformations }) {
  const [resultInformations, setResultInformations] = useState({
    allResultsUser: [],
    allResults: [],
  });
  useEffect(() => {
    if (
      authInformations?.login?.userId &&
      (resultInformations?.allResultsUser?.length > 0 ||
        resultInformations?.allResults?.length > 0)
    )
      localStorageSetItems({
        items: {
          allResultsUser: resultInformations?.allResultsUser,
          allResults: resultInformations?.allResults,
        },
        userId: authInformations?.login.userId,
      });
  }, [
    authInformations?.login?.userId,
    resultInformations?.allResults,
    resultInformations?.allResultsUser,
  ]);
  useEffect(() => {
    if (authInformations?.loggedUser && authInformations?.login) {
      if (authInformations?.login.userType === "farmer") {
        getUserDatas({ authInformations })
          .then((result) => {
            if (result?.result?.length > 0) {
              setResultInformations((currentResultInformations) => ({
                ...currentResultInformations,
                allResultsUser: result.result.map((item) => item.result),
              }));
            }
          })
          // make sure to catch any error
          .catch(console.error);
      }
      if (authInformations?.login.userType === "researcher") {
        getAllResults({ authInformations })
          .then((result) => {
            setResultInformations((currentResultInformations) => ({
              ...currentResultInformations,
              allResults: result.result.map((item) => [
                { id: "userId", response: item.user },
                ...item.result,
              ]),
            }));
          })
          .catch(console.error);
      }
    }
  }, [authInformations, setResultInformations]);
  let sharedState = {
    resultInformations: resultInformations,
    setResultInformations: setResultInformations,
  };

  return (
    <ResultContext.Provider value={sharedState}>
      {children}
    </ResultContext.Provider>
  );
}

export function useResultContext() {
  return useContext(ResultContext);
}
