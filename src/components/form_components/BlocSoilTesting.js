import React from "react";

function BlocSoilTesting({ formDatas, setFormDatas, handleChangeCheckbox }) {
  const handleChangeRadio = ({ event, soil }) => {
    if (soil) {
      console.log(event.target.name, event.target.value, event.target.data);
      console.log(event.target.value.split("."));
      if (
        event.target.value.split(".")[1] === "one_test" ||
        event.target.value.split(".")[1] === "more_than_one_test"
      ) {
        console.log("premier cas");
        setFormDatas({
          ...formDatas,
          [event.target.name]: {
            ...formDatas[event.target.name],
            [event.target.value.split(".")[0]]: {
              ...formDatas[`${event.target.name}`][
                event.target.value.split(".")[0]
              ],
              ...(event.target.value.split(".")[1] === "one_test"
                ? {
                    [event.target.value.split(".")[1]]: event.target.checked,
                    more_than_one_test: false,
                  }
                : {
                    [event.target.value.split(".")[1]]: event.target.checked,
                    one_test: false,
                  }),
            },
          },
        });
      }
    }
  };
  return (
    <div id="bloc_soil_testing">
      <label>
        Do you have your soil tested for its carbon content? e.g. dry combustion
        or elemental analysis
      </label>
      <input
        type="checkbox"
        name={"soil_testing"}
        value={"soil_test"}
        defaultChecked={formDatas.soil_testing.soil_test}
        onChange={(event) => handleChangeCheckbox({ event: event, soil: true })}
      />{" "}
      YES
      {formDatas.soil_testing.soil_test && (
        <div>
          <label>
            How many soil test result(s) including the carbon content of you
            soil do you have:
          </label>
          <input
            type="radio"
            name={"soil_testing"}
            value={"soil_test_number.one_test"}
            defaultChecked={formDatas.soil_testing.soil_test_number.one_test}
            onChange={(event) =>
              handleChangeRadio({ event: event, soil: true })
            }
          />{" "}
          1
          <input
            type="radio"
            name={"soil_testing"}
            value={"soil_test_number.more_than_one_test"}
            defaultChecked={
              formDatas.soil_testing.soil_test_number.more_than_one_test
            }
            onChange={(event) =>
              handleChangeRadio({ event: event, soil: true })
            }
          />{" "}
          More than 1
          {formDatas.soil_testing.soil_test_number.more_than_one_test && (
            <div>{formDatas.soil_testing.more_than_one_message}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default BlocSoilTesting;
