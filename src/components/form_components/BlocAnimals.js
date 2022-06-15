import React from "react";
import { handleChange } from "../../utils/form_functions";
import Input from "@mui/material/Input";
import {
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function BlocAnimals({ datasForm, setDatasForm }) {
  return (
    <div id="block_animals_farming" className="columns is-multiline">
      <div className="column is-6 is-12-mobile">
        <label htmlFor="water_waste_cons">What is the name of the farm ?</label>
      </div>
      <div className="column is-6 is-12-mobile">
        <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
          <Input
            id="standard-adornment-weight"
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
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
          <FormHelperText id="standard-weight-helper-text">
            Farm name
          </FormHelperText>
        </FormControl>
      </div>
      <div className="column is-12">
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">
            What type of products, do you produce ?
          </FormLabel>
          <FormGroup>
            {Object.entries(datasForm.farm_type).map((choice) => (
              <FormControlLabel
                control={
                  <Checkbox
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
                }
                label={choice[0].replaceAll("_", " ")}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
      {(datasForm.farm_type.animals || datasForm.farm_type.both) && (
        <div className="column is-12 has-text-centered">
          <legend style={{ paddingBottom: "1rem" }}>
            What animal(s) do you farm ? NB: in the time frame reported.
          </legend>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">Animals</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={Object.entries(datasForm.other_choice).find(
                (element, index) => element[1] === true
              )}
              onChange={(event) =>
                handleChange({
                  event: event,
                  datasForm: datasForm,
                  setDatasForm: setDatasForm,
                })
              }
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {console.log(datasForm.other_choice)}
                  {Object.entries(datasForm.farm_type_animals).map((value) =>
                    value[1] ? (
                      <Chip
                        key={"farm_type_animals." + value[0]}
                        name={"farm_type_animals." + value[0]}
                        label={value[0].replaceAll("_", " ")}
                      />
                    ) : (
                      ""
                    )
                  )}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Object.entries(datasForm.farm_type_animals).map((choice) => {
                if (choice[0] !== "other") {
                  return (
                    <MenuItem
                      key={choice}
                      value={choice}
                      name={"farm_type_animals." + choice[0]}
                    >
                      <Checkbox
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
                      <ListItemText primary={choice[0].replaceAll("_", " ")} />
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>
        </div>
      )}
      {Object.entries(datasForm.farm_type_animals).map((choice, index) => {
        if (
          datasForm[`farm_type_animals`][choice[0]] &&
          choice[0] !== "other" &&
          choice[0] !== "beef_cattle" &&
          choice[0] !== "dairy_cattle"
        ) {
          return (
            <>
              <div className="column is-6">
                <label>
                  How many heads of {choice[0].replaceAll("_", " ")} do you
                  farm? NB: in the time frame reported
                </label>
              </div>
              <div className="column is-6 is-12-mobile">
                <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
                  <Input
                    id="standard-adornment-weight"
                    type="number"
                    min="0"
                    name={`farm_${choice[0]}_matur_numb.value`}
                    value={
                      datasForm[`farm_${choice[0]}_matur_numb`]["value"] === 0
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
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    {choice[0].replaceAll("_", " ")} heads
                  </FormHelperText>
                </FormControl>
              </div>
            </>
          );
        }
      })}
      {(datasForm.farm_type.animals || datasForm.farm_type.both) && (
        <>
          {Object.entries(datasForm.farm_type_animals).map((choice, index) => {
            if (
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
