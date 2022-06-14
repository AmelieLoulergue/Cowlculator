import React from "react";
import { handleChange } from "../../utils/form_functions";
function BlocAnimals({ datasForm, setDatasForm }) {
  return (
    <div id="block_animals_farming">
      <div>
        <label htmlFor="farm_name">What is the name of the farm ?</label>
        <input
          type="text"
          name="farm_name"
          value={datasForm.farm_name}
          onChange={(event) =>
            handleChange({
              event: event,
              datasForm: datasForm,
              setDatasForm: setDatasForm,
            })
          }
        />{" "}
      </div>
      <div>
        <fieldset>
          <legend>What type of products, do you produce ?</legend>

          {Object.entries(datasForm.farm_type).map((choice) => (
            <div key={"key_" + choice[0]}>
              <input
                type="checkbox"
                id={choice[0]}
                name={"farm_type." + choice[0]}
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
          ))}
        </fieldset>
      </div>
      {(datasForm.farm_type.animals || datasForm.farm_type.both) && (
        <>
          <fieldset>
            <legend>
              What animal(s) do you farm ? NB: in the time frame reported.
            </legend>

            {Object.entries(datasForm.farm_type_animals).map((choice) => {
              //console.log(choice);
              if (choice[0] !== "other") {
                return (
                  <div key={choice[0]}>
                    <input
                      type="checkbox"
                      name={"farm_type_animals." + choice[0]}
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
              } else {
                return (
                  <div>
                    <input
                      type="checkbox"
                      name={"farm_type_animals." + choice[0]}
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
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
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    )}
                  </div>
                );
              }
            })}
          </fieldset>
          {Object.entries(datasForm.farm_type_animals).map((choice, index) => {
            if (
              datasForm[`farm_type_animals`][choice[0]] &&
              choice[0] !== "other" &&
              choice[0] !== "beef_cattle" &&
              choice[0] !== "dairy_cattle"
            ) {
              return (
                <div key={index}>
                  <label htmlFor={`farm_${choice[0]}`}>
                    Select all animals composing your{" "}
                    {choice[0].replaceAll("_", " ")} in the time frame reported
                    :
                    <br />
                    NB: A portion of the offspring are retained to replace
                    mature cows that die or are removed from the herd (culled)
                    each year. Those represents a very fast movement of cattle
                    called "replacements".
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_matur_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_matur_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_matur_numb`}>
                      Mature cows
                    </label>
                  </div>
                  {datasForm[`farm_${choice[0]}_matur_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of mature cows do you farm? NB: in the
                        time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_matur_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_matur_numb`]["value"] ===
                          0
                            ? ""
                            : datasForm[`farm_${choice[0]}_matur_numb`]["value"]
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
                  ) : (
                    false
                  )}
                </div>
              );
            } else if (
              datasForm[`farm_type_animals`][choice[0]] &&
              choice[0] !== "other" &&
              choice[0] === "beef_cattle"
            ) {
              return (
                <div key={index}>
                  <label htmlFor={`farm_${choice[0]}`}>
                    Select all animals composing your{" "}
                    {choice[0].replaceAll("_", " ")} in the time frame reported
                    :
                    <br />
                    <small>
                      NB: A portion of the offspring are retained to replace
                      mature cows that die or are removed from the herd (culled)
                      each year. Those represents a very fast movement of cattle
                      called "replacements".
                    </small>
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_rep12_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_rep12_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_rep12_numb`}>
                      Replacements 0-12mois
                    </label>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_rep24_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_rep24_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_rep24_numb`}>
                      Replacements 0-24mois
                    </label>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_matur_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_matur_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_matur_numb`}>
                      Mature cows
                    </label>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_weanling_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_weanling_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_weanling_numb`}>
                      Weanling system steers/heifers
                    </label>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_yearling_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_yearling_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_yearling_numb`}>
                      Yearling system steers/heifers
                    </label>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_bulls_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_bulls_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_bulls_numb`}>
                      Bulls
                    </label>
                  </div>
                  {datasForm[`farm_${choice[0]}_rep12_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of replacements 0-12mois do you farm? NB:
                        in the time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_rep12_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_rep12_numb`]["value"] ===
                          0
                            ? ""
                            : datasForm[`farm_${choice[0]}_rep12_numb`]["value"]
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
                  ) : (
                    false
                  )}
                  {datasForm[`farm_${choice[0]}_rep24_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of replacements 12-24mois do you farm?
                        NB: in the time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_rep24_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_rep24_numb`]["value"] ===
                          0
                            ? ""
                            : datasForm[`farm_${choice[0]}_rep24_numb`]["value"]
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
                  ) : (
                    false
                  )}
                  {datasForm[`farm_${choice[0]}_matur_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of mature cows do you farm? NB: in the
                        time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_matur_numb`}
                        value={
                          datasForm[`farm_${choice[0]}_matur_numb`]["value"] ===
                          0
                            ? ""
                            : datasForm[`farm_${choice[0]}_matur_numb`]["value"]
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
                  ) : (
                    false
                  )}
                  {datasForm[`farm_${choice[0]}_weanling_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of weanling system steers/heifers do you
                        farm? NB: in the time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_weanling_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_weanling_numb`][
                            "value"
                          ] === 0
                            ? ""
                            : datasForm[`farm_${choice[0]}_weanling_numb`][
                                "value"
                              ]
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
                  ) : (
                    false
                  )}
                  {datasForm[`farm_${choice[0]}_yearling_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of yearling system steers/heifers do you
                        farm? NB: in the time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_yearling_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_yearling_numb`][
                            "value"
                          ] === 0
                            ? ""
                            : datasForm[`farm_${choice[0]}_yearling_numb`][
                                "value"
                              ]
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
                  ) : (
                    false
                  )}
                  {datasForm[`farm_${choice[0]}_bulls_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of bulls do you farm? NB: in the time
                        frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_bulls_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_bulls_numb`]["value"] ===
                          0
                            ? ""
                            : datasForm[`farm_${choice[0]}_bulls_numb`]["value"]
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
                  ) : (
                    false
                  )}
                </div>
              );
            } else if (
              datasForm[`farm_type_animals`][choice[0]] &&
              choice[0] !== "other" &&
              choice[0] === "dairy_cattle"
            ) {
              //console.log(choice[0]);
              return (
                <div key={index}>
                  <label htmlFor={`farm_${choice[0]}`}>
                    Select all animals composing your{" "}
                    {choice[0].replaceAll("_", " ")} in the time frame reported
                    :
                    <br />
                    <small>
                      NB: A portion of the offspring are retained to replace
                      mature cows that die or are removed from the herd (culled)
                      each year. Those represents a very fast movement of cattle
                      called "replacements".
                    </small>
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_rep12_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_rep12_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_rep12_numb`}>
                      Replacements 0-12mois
                    </label>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_rep24_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_rep24_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_rep24_numb`}>
                      Replacements 0-24mois
                    </label>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_matur_numb.selected`}
                      checked={
                        datasForm[`farm_${choice[0]}_matur_numb`].selected
                      }
                      onChange={(event) =>
                        handleChange({
                          event: event,
                          datasForm: datasForm,
                          setDatasForm: setDatasForm,
                        })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_matur_numb`}>
                      Mature cows
                    </label>
                  </div>
                  {datasForm[`farm_${choice[0]}_rep12_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of replacements 0-12mois do you farm? NB:
                        in the time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_rep12_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_rep12_numb`]["value"] ===
                          0
                            ? ""
                            : datasForm[`farm_${choice[0]}_rep12_numb`]["value"]
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
                  ) : (
                    false
                  )}
                  {datasForm[`farm_${choice[0]}_rep24_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of replacements 12-24mois do you farm?
                        NB: in the time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_rep24_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_rep24_numb`]["value"] ===
                          0
                            ? ""
                            : datasForm[`farm_${choice[0]}_rep24_numb`]["value"]
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
                  ) : (
                    false
                  )}
                  {datasForm[`farm_${choice[0]}_matur_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of mature cows do you farm? NB: in the
                        time frame reported
                      </label>
                      <input
                        type="number"
                        min="0"
                        name={`farm_${choice[0]}_matur_numb.value`}
                        value={
                          datasForm[`farm_${choice[0]}_matur_numb`]["value"] ===
                          0
                            ? ""
                            : datasForm[`farm_${choice[0]}_matur_numb`]["value"]
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
                  ) : (
                    false
                  )}
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
}

export default BlocAnimals;
