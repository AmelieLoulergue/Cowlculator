import React from "react";

function BlocAnimals({
  formDatas,
  handleChange,
  handleChangeNumber,
  handleChangeRadio,
}) {
  return (
    <div id="block_animals_farming">
      <div>
        <label htmlFor="farm_name">What is the name of the farm ?</label>
        <input
          type="text"
          name="farm_name"
          value={formDatas.farm_name}
          onChange={(event) => handleChange(event)}
        />{" "}
      </div>
      <fieldset>
        <legend>What type of products, do you produce ?</legend>

        {Object.entries(formDatas.farm_type).map((choice) => (
          <div>
            <input
              type="checkbox"
              id={choice[0]}
              name="farm_type"
              key={choice[0]}
              value={choice[0]}
              checked={choice[1]}
              onChange={(event) =>
                handleChangeRadio({ event: event, both: true })
              }
            />
            <label htmlFor={choice[0]} style={{ paddingRight: "2rem" }}>
              {choice[0].replaceAll("_", " ")}
            </label>
          </div>
        ))}
      </fieldset>
      {(formDatas.farm_type.animals || formDatas.farm_type.both) && (
        <fieldset>
          <legend>
            What animal(s) do you farm ? NB: in the time frame reported.
          </legend>

          {Object.entries(formDatas.farm_type_animals).map((choice) => {
            //console.log(choice);
            if (choice[0] !== "other") {
              return (
                <div key={choice[0]}>
                  <input
                    type="checkbox"
                    id={choice[0]}
                    name="farm_type_animals"
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
            } else {
              return (
                <div>
                  <input
                    type="checkbox"
                    id={choice[0]}
                    name="farm_type_animals"
                    key={choice[0]}
                    value={choice[1].value}
                    checked={choice[1].selected}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, other: true })
                    }
                  />
                  <label htmlFor={choice[0]} style={{ paddingRight: "2rem" }}>
                    {choice[0]}
                  </label>
                  {choice[1].selected && (
                    <input
                      type="text"
                      id={choice[0]}
                      name="farm_type_animals"
                      key={choice[0]}
                      value={choice[1].value}
                      onChange={(event) => handleChange({ event: event })}
                    />
                  )}
                </div>
              );
            }
          })}
        </fieldset>
      )}
      {Object.entries(formDatas.farm_type_animals).map((choice, index) => {
        if (
          formDatas[`farm_type_animals`][choice[0]] &&
          choice[0] !== "other" &&
          choice[0] !== "beef_cattle"
        ) {
          return (
            <div key={index}>
              <label htmlFor={`farm_${choice[0]}`}>
                Select all animals composing your{" "}
                {choice[0].replaceAll("_", " ")} in the time frame reported :
                <br />
                NB: A portion of the offspring are retained to replace mature
                cows that die or are removed from the herd (culled) each year.
                Those represents a very fast movement of cattle called
                "replacements".
              </label>
              <div>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_rep12_numb`}
                  checked={formDatas[`farm_${choice[0]}_rep12_numb`].selected}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_rep12_numb`}>
                  Replacements 0-12mois
                </label>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_rep24_numb`}
                  checked={formDatas[`farm_${choice[0]}_rep24_numb`].selected}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_rep24_numb`}>
                  Replacements 0-24mois
                </label>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_matur_numb`}
                  checked={formDatas[`farm_${choice[0]}_matur_numb`].selected}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_matur_numb`}>
                  Mature cows
                </label>
              </div>
              {formDatas[`farm_${choice[0]}_rep12_numb`].selected ? (
                <div>
                  <label>
                    How many heads of replacements 0-12mois do you farm? NB: in
                    the time frame reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_rep12_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_rep12_numb`]["value"] === 0
                        ? ""
                        : formDatas[`farm_${choice[0]}_rep12_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
              {formDatas[`farm_${choice[0]}_rep24_numb`].selected ? (
                <div>
                  <label>
                    How many heads of replacements 12-24mois do you farm? NB: in
                    the time frame reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_rep24_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_rep24_numb`]["value"] === 0
                        ? ""
                        : formDatas[`farm_${choice[0]}_rep24_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
              {formDatas[`farm_${choice[0]}_matur_numb`].selected ? (
                <div>
                  <label>
                    How many heads of mature cows do you farm? NB: in the time
                    frame reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_matur_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_matur_numb`]["value"] === 0
                        ? ""
                        : formDatas[`farm_${choice[0]}_matur_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
            </div>
          );
        } else if (
          formDatas[`farm_type_animals`][choice[0]] &&
          choice[0] !== "other" &&
          choice[0] === "beef_cattle"
        ) {
          //console.log(choice[0]);
          return (
            <div key={index}>
              <label htmlFor={`farm_${choice[0]}`}>
                Select all animals composing your{" "}
                {choice[0].replaceAll("_", " ")} in the time frame reported :
                <br />
                NB: A portion of the offspring are retained to replace mature
                cows that die or are removed from the herd (culled) each year.
                Those represents a very fast movement of cattle called
                "replacements".
              </label>
              <div>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_rep12_numb`}
                  checked={formDatas[`farm_${choice[0]}_rep12_numb`].selected}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_rep12_numb`}>
                  Replacements 0-12mois
                </label>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_rep24_numb`}
                  checked={formDatas[`farm_${choice[0]}_rep24_numb`].selected}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_rep24_numb`}>
                  Replacements 0-24mois
                </label>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_matur_numb`}
                  checked={formDatas[`farm_${choice[0]}_matur_numb`].selected}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_matur_numb`}>
                  Mature cows
                </label>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_weanling_numb`}
                  checked={
                    formDatas[`farm_${choice[0]}_weanling_numb`].selected
                  }
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_weanling_numb`}>
                  Weanling system steers/heifers
                </label>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_yearling_numb`}
                  checked={
                    formDatas[`farm_${choice[0]}_yearling_numb`].selected
                  }
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_yearling_numb`}>
                  Yearling system steers/heifers
                </label>
                <input
                  type="checkbox"
                  name={`farm_${choice[0]}_bulls_numb`}
                  checked={formDatas[`farm_${choice[0]}_bulls_numb`].selected}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, animal: true })
                  }
                />{" "}
                <label htmlFor={`farm_${choice[0]}_bulls_numb`}>Bulls</label>
              </div>
              {formDatas[`farm_${choice[0]}_rep12_numb`].selected ? (
                <div>
                  <label>
                    How many heads of replacements 0-12mois do you farm? NB: in
                    the time frame reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_rep12_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_rep12_numb`]["value"] === 0
                        ? ""
                        : formDatas[`farm_${choice[0]}_rep12_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
              {formDatas[`farm_${choice[0]}_rep24_numb`].selected ? (
                <div>
                  <label>
                    How many heads of replacements 12-24mois do you farm? NB: in
                    the time frame reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_rep24_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_rep24_numb`]["value"] === 0
                        ? ""
                        : formDatas[`farm_${choice[0]}_rep24_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
              {formDatas[`farm_${choice[0]}_matur_numb`].selected ? (
                <div>
                  <label>
                    How many heads of mature cows do you farm? NB: in the time
                    frame reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_matur_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_matur_numb`]["value"] === 0
                        ? ""
                        : formDatas[`farm_${choice[0]}_matur_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
              {formDatas[`farm_${choice[0]}_weanling_numb`].selected ? (
                <div>
                  <label>
                    How many heads of weanling system steers/heifers do you
                    farm? NB: in the time frame reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_weanling_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_weanling_numb`]["value"] ===
                      0
                        ? ""
                        : formDatas[`farm_${choice[0]}_weanling_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
              {formDatas[`farm_${choice[0]}_yearling_numb`].selected ? (
                <div>
                  <label>
                    How many heads of yearling system steers/heifers do you
                    farm? NB: in the time frame reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_yearling_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_yearling_numb`]["value"] ===
                      0
                        ? ""
                        : formDatas[`farm_${choice[0]}_yearling_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
              {formDatas[`farm_${choice[0]}_bulls_numb`].selected ? (
                <div>
                  <label>
                    How many heads of bulls do you farm? NB: in the time frame
                    reported
                  </label>
                  <input
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_bulls_numb`}
                    value={
                      formDatas[`farm_${choice[0]}_bulls_numb`]["value"] === 0
                        ? ""
                        : formDatas[`farm_${choice[0]}_bulls_numb`]["value"]
                    }
                    onChange={(event) => handleChangeNumber({ event: event })}
                  />{" "}
                </div>
              ) : (
                false
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default BlocAnimals;
