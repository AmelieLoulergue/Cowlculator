const localStorageSetItems = ({ items, userId }) => {
  if (!userId && localStorage.getItem("login")) {
    userId = JSON.parse(localStorage.getItem("login"))?.userId;
  }
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
          return { ...previousValue, [item[0] + userId]: item[1] };
        }
        return previousValue;
      }
      return previousValue;
    },
    initialDatasToStoreInLocalStorage
  );
  Object.entries(datasToStoreInLocalStorage).forEach((value) => {
    if (!value[0].includes("undefined")) {
      localStorage.setItem(value[0], JSON.stringify(value[1]));
    }
  });
};
const localStorageRemoveItems = ({ items, userId }) => {
  if (!userId && localStorage.getItem("login")) {
    userId = JSON.parse(localStorage.getItem("login"))?.userId;
  }
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
};
const localStorageGetItems = ({ items, userId }) => {
  if (!userId && localStorage.getItem("login")) {
    userId = JSON.parse(localStorage.getItem("login"))?.userId;
  }
  const datasToFindInLocalStorage = items;
  const initialDatasFromLocalStorage = [];
  const datasFromLocalStorage = datasToFindInLocalStorage.reduce(
    (previousValue, item) => {
      if (localStorage.getItem(item + userId)) {
        return {
          ...previousValue,
          [item]: JSON.parse(localStorage.getItem(item + userId)),
        };
      }
      return previousValue;
    },
    initialDatasFromLocalStorage
  );

  return datasFromLocalStorage;
};
export { localStorageGetItems, localStorageSetItems, localStorageRemoveItems };
