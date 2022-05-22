import React from "react";

function BlocPlants({
  formDatas,
  handleChangeRadio,
  handleChangeSelect,
  handleChangeNumber,
  handleChangeCheckbox,
}) {
  return (
    <div id="block_plants_farming">
      {(formDatas.farm_type.crops || formDatas.farm_type.both) && (
        <fieldset>
          <legend>
            What plant(s) do you farm ? NB: in the time frame reported.
          </legend>

          {Object.entries(formDatas.farm_type_plants).map((choice) => {
            return (
              <div key={choice[0]}>
                <input
                  type="checkbox"
                  id={choice[0]}
                  name="farm_type_plants"
                  key={choice[0]}
                  value={choice[0]}
                  checked={choice[1]}
                  onChange={(event) => handleChangeRadio({ event: event })}
                />
                <label htmlFor={choice[0]} style={{ paddingRight: "2rem" }}>
                  {choice[0].replaceAll("_", " ")}
                </label>
              </div>
            );
          })}
          {Object.entries(formDatas.farm_type_plants).map((choice, index) => {
            if (formDatas[`farm_type_plants`][choice[0]]) {
              
              return (
                <>
                  <div key={index}>
                    <label htmlFor={`${choice[0]}`}>
                      Pick the unit used for the size of the
                      {choice[0].replaceAll("_", " ")} crop(s) that you will
                      report:
                    </label>
                    <select
                      name={[choice[0]]}
                      id={[choice[0]] + "_unit"}
                      onChange={(event) =>
                        handleChangeSelect({ event: event, plant: true })
                      }
                    >
                      {formDatas[choice[0]].unit.map((unit) => (
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
                      name={[choice[0]]}
                      value={
                        formDatas[[choice[0]]].size === 0
                          ? ""
                          : formDatas[[choice[0]]].size
                      }
                      onChange={(event) => handleChangeNumber(event, true)}
                    />{" "}
                  </div>
                  <label htmlFor="elec_generator">
                    Is it organically grown ?
                  </label>
                  <input
                    type="checkbox"
                    name={choice[0]}
                    defaultChecked={formDatas[choice[0]].orga}
                    onChange={(event) =>
                      handleChangeCheckbox({ event: event, plant: true })
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
