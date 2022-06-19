const handleChange = ({ event, datasForm, setDatasForm }) => {
  const setValuesToFalse = (datas) => {
    let test = {};
    for (const [key, value] of Object.entries(datas)) {
      key === "none" || key === "both"
        ? Object.assign(test, { [key]: true })
        : Object.assign(test, { [key]: false });
    }
    return test;
  };
  const setValuesToTrue = (datas) => {
    let test = {};
    for (const [key, value] of Object.entries(datas)) {
      Object.assign(test, { [key]: true });
    }
    return test;
  };
  console.log(event.target);
  let type = event.target.type;
  let name = event.target.name.split(".");
  let value =
    type === "text" || type === "select-one"
      ? event.target.value
      : type === "number"
      ? Number(event.target.value)
      : type === "date"
      ? event.target.value.split("-")[1] +
        "/" +
        event.target.value.split("-")[2] +
        "/" +
        event.target.value.split("-")[0]
      : event.target.checked;

  let none = Object.entries(datasForm[name[0]]).find(
    (object) => object[0] === "none"
  )
    ? true
    : false;
  let both = Object.entries(datasForm[name[0]]).find(
    (object) => object[0] === "both"
  )
    ? true
    : false;
  console.log("ici");
  if (name.length === 1) {
    setDatasForm({
      ...datasForm,
      [name[0]]: value,
    });
  } else if (name.length === 2) {
    if (none) {
      setDatasForm({
        ...datasForm,
        [name[0]]: {
          ...datasForm[name[0]],
          ...(name[1] === "none" && event.target.checked
            ? {
                [name[1]]: true,
                ...setValuesToFalse(datasForm[name[0]]),
              }
            : {
                [name[1]]: event.target.checked,
                none: false,
              }),
        },
      });
    } else if (both) {
      setDatasForm({
        ...datasForm,
        [name[0]]: {
          ...datasForm[name[0]],
          ...(name[1] === "both" && event.target.checked
            ? {
                ...setValuesToTrue(datasForm[name[0]]),
              }
            : name[1] === "both"
            ? {
                ...setValuesToFalse(datasForm[name[0]]),
                both: false,
              }
            : event.target.value !== "both" && event.target.checked
            ? {
                [name[1]]: event.target.checked,
                both: false,
              }
            : { [name[1]]: event.target.checked }),
        },
      });
    } else if (name[0] === "natgas_unit") {
      console.log(value, event);
      type === "checkbox"
        ? setDatasForm({
            ...datasForm,
            natgas: value,
            natgas_cons: 0,
          })
        : setDatasForm({
            ...datasForm,
            [name[0]]: Array.from(datasForm[name[0]]).map((element) =>
              element.value.toString() === event.target.value.toString()
                ? { ...element, [name[1]]: true }
                : { ...element, [name[1]]: false }
            ),
          });
    } else if (name[1] === "unit") {
      setDatasForm({
        ...datasForm,
        [name[0]]: {
          ...datasForm[name[0]],
          [name[1]]: Array.from(datasForm[name[1]]).map((element) =>
            element.value.toString() === value.toString()
              ? { ...element, [event.target.value]: true }
              : { ...element, [event.target.value]: false }
          ),
        },
      });
    } else if (name[1] === "state") {
      console.log(event.target.value, name[0], name[1]);
      console.log("ici");
      setDatasForm({
        ...datasForm,
        [name[0]]: { ...datasForm[name[0]], [name[1]]: event.target.value },
      });
    } else {
      setDatasForm({
        ...datasForm,
        [name[0]]: { ...datasForm[name[0]], [name[1]]: value },
      });
    }
  } else if (name.length === 3) {
    console.log("here", type, datasForm[name[0]], datasForm[name[0]][name[1]]);
    type === "radio"
      ? setDatasForm({
          ...datasForm,
          [name[0]]: {
            ...datasForm[name[0]],
            [name[1]]: {
              ...(name[2] === "one_test" && value === true
                ? { one_test: true, more_than_one_test: false }
                : { one_test: false, more_than_one_test: true }),
            },
          },
        })
      : setDatasForm({
          ...datasForm,
          [name[0]]: {
            ...datasForm[name[0]],
            [name[1]]: { ...datasForm[name[0]][name[1]], [name[2]]: value },
          },
        });
  }
};

export { handleChange };
