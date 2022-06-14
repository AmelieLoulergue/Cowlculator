import React from "react";
import { handleChange } from "../../utils/form_functions";
function BlocSoilTesting({ datasForm, setDatasForm }) {
  return (
    <div id="bloc_soil_testing">
      <label>
        Do you have your soil tested for its carbon content? e.g. dry combustion
        or elemental analysis
      </label>
      <input
        type="checkbox"
        name={"soil_testing.soil_test"}
        defaultChecked={datasForm.soil_testing.soil_test}
        onChange={(event) =>
          handleChange({
            event: event,
            datasForm: datasForm,
            setDatasForm: setDatasForm,
          })
        }
      />{" "}
      YES
      {datasForm.soil_testing.soil_test && (
        <div>
          <label>
            How many soil test result(s) including the carbon content of you
            soil do you have:
          </label>
          <input
            type="radio"
            name={"soil_testing.soil_test_number.one_test"}
            checked={datasForm.soil_testing.soil_test_number.one_test}
            onChange={(event) =>
              handleChange({
                event: event,
                datasForm: datasForm,
                setDatasForm: setDatasForm,
              })
            }
          />{" "}
          1
          <input
            type="radio"
            name={"soil_testing.soil_test_number.more_than_one_test"}
            checked={datasForm.soil_testing.soil_test_number.more_than_one_test}
            onChange={(event) =>
              handleChange({
                event: event,
                datasForm: datasForm,
                setDatasForm: setDatasForm,
              })
            }
          />{" "}
          More than 1
          {datasForm.soil_testing.soil_test_number.more_than_one_test && (
            <div>{datasForm.soil_testing.more_than_one_message}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default BlocSoilTesting;
