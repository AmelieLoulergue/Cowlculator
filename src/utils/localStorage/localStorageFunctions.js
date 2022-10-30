const localStorageSetItems = ({ items, userId }) => {
  if (userId) {
    const valuesToNotSave = [null, undefined, "null", "undefined", "[]", "{}"];
    const datasForLocalStorage = Object.entries(items);
    const initialDatasToStoreInLocalStorage = [];
    const datasToStoreInLocalStorage = datasForLocalStorage.reduce(
      (previousValue, item) => {
        if (!valuesToNotSave.includes(item[1])) {
          if (
            (typeof item[1] === "object" && Object.keys(item[1]).length > 0) ||
            typeof item[1] !== "object"
          ) {
            return { ...previousValue, [item[0]]: item[1] };
          }
          return previousValue;
        }
        return previousValue;
      },
      initialDatasToStoreInLocalStorage
    );
    console.log(datasToStoreInLocalStorage);
    let currentLocalStorage = null;
    if (localStorage.getItem("cowlculator")) {
      currentLocalStorage = JSON.parse(localStorage.getItem("cowlculator"));
    }
    if (currentLocalStorage) {
      if (
        currentLocalStorage.find((element) => element.login?.userId === userId)
      ) {
        localStorage.setItem(
          "cowlculator",
          JSON.stringify(
            [
              currentLocalStorage.map((element) =>
                element.login?.userId === userId
                  ? Object.assign(element, datasToStoreInLocalStorage)
                  : element
              ),
            ].flat()
          )
        );
      } else if (
        Object.keys(datasToStoreInLocalStorage).find((key) => key === "login")
      ) {
        localStorage.setItem(
          "cowlculator",
          JSON.stringify([...currentLocalStorage, datasToStoreInLocalStorage])
        );
      }
    } else {
      console.log("pas de cowlculator LCOALSTORAG");
      localStorage.setItem(
        "cowlculator",
        JSON.stringify([datasToStoreInLocalStorage])
      );
    }
  }
};
const localStorageRemoveItems = ({ items, userId }) => {
  if (userId) {
    const datasToDeleteInLocalStorage = items;
    const initialDatasToDeleteLocalStorage = [];
    const datasToBeDeletedFromLocalStorage = datasToDeleteInLocalStorage.reduce(
      (previousValue, item) => {
        if (localStorage.getItem(item + userId)) {
          return [...previousValue, item + userId];
        }
        return previousValue;
      },
      initialDatasToDeleteLocalStorage
    );
    datasToBeDeletedFromLocalStorage.forEach((data) => {
      localStorage.removeItem(data);
      console.log(localStorage.getItem(data));
    });
  }
};
const localStorageGetItems = ({ items, userId }) => {
  if (
    userId &&
    JSON.parse(localStorage.getItem("cowlculator")).find(
      (item) => item.loggedUser && item.login?.userId === userId
    )
  ) {
    let localStorageItem = JSON.parse(
      localStorage.getItem("cowlculator")
    )?.find((item) => item.loggedUser && item.login?.userId === userId);
    const datasToFindInLocalStorage = items;
    const initialDatasFromLocalStorage = [];
    const datasFromLocalStorage = datasToFindInLocalStorage.reduce(
      (previousValue, item) => {
        if (localStorageItem[`${item}`]) {
          return {
            ...previousValue,
            [item]: localStorageItem[`${item}`],
          };
        }
        return previousValue;
      },
      initialDatasFromLocalStorage
    );
    return datasFromLocalStorage;
  }
};
export { localStorageGetItems, localStorageSetItems, localStorageRemoveItems };
