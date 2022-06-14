import React from "react";
import { handleChange } from "../../utils/form_functions";
function BlocPlants({ datasForm, setDatasForm }) {
  return (
    <div id="block_plants_farming">
      {(datasForm.farm_type.crops || datasForm.farm_type.both) && (
        <fieldset>
          <legend>
            What plant(s) do you farm ? NB: in the time frame reported.
          </legend>

          {Object.entries(datasForm.farm_type_plants).map((choice) => {
            return (
              <div key={choice[0]}>
                <input
                  type="checkbox"
                  id={choice[0]}
                  name={"farm_type_plants." + choice[0]}
                  key={choice[0]}
                  value={choice[0]}
                  checked={choice[1]}
                  onChange={(event) =>
                    handleChange({
                      event: event,
                      datasForm: datasForm,
                      setDatasForm: setDatasForm,
                    })
                  }
                />
                <label htmlFor={choice[0]} style={{ paddingRight: "2rem" }}>
                  {choice[0].replaceAll("_", " ")}
                </label>
              </div>
            );
          })}
          {Object.entries(datasForm.farm_type_plants).map((choice, index) => {
            if (datasForm[`farm_type_plants`][choice[0]]) {
              return (
                <>
                  <div key={index}>
                    <label htmlFor={`${choice[0]}`}>
                      Pick the unit used for the size of the
                      {choice[0].replaceAll("_", " ")} crop(s) that you will
                      report:
                    </label>
                    <select
                      defaultValue=""
                      name={[choice[0]] + ".unit"}
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    >
                      {datasForm[choice[0]].unit.map((unit) => (
                        <option
                          value={unit.value}
                          selected={unit.selected}
                          key={unit.value}
                        >
                          {unit.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>
                      What is the size of the {choice[0].replaceAll("_", " ")}{" "}
                      crop(s)? In the unit previously selected.
                    </label>
                    <input
                      type="number"
                      min="0"
                      name={[choice[0]] + ".size"}
                      value={
                        datasForm[[choice[0]]].size === 0
                          ? ""
                          : datasForm[[choice[0]]].size
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                  </div>
                  <label htmlFor="elec_generator">
                    Is it organically grown ?
                  </label>
                  <input
                    type="checkbox"
                    name={[choice[0]] + ".orga"}
                    defaultChecked={datasForm[choice[0]].orga}
                    onChange={(event) =>
                      handleChange({
                        event: event,
                        datasForm: datasForm,
                        setDatasForm: setDatasForm,
                      })
                    }
                  />{" "}
                  YES
                </>
              );
            }
          })}
        </fieldset>
      )}
    </div>
  );
}

export default BlocPlants;
