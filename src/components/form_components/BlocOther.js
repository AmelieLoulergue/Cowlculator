import React from "react";
import { handleChange } from "../../utils/form_functions";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import {
  InputLabel,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  ListItemText,
  Select,
  Chip,
  Box,
} from "@mui/material";
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
function BlocOther({ datasForm, setDatasForm }) {
  let datas = Object.entries(datasForm.other_choice).map(
    (choice, index) => choice[0]
  );
  return (
    <div id="block_other">
      <div className="columns is-multiline">
        <div className="column is-12 has-text-centered">
          <legend style={{ paddingBottom: "1rem" }}>
            Select any other carbon dioxide sources you use from the list :
          </legend>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">
              Carbon dioxide sources
            </InputLabel>
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
                  {Object.entries(datasForm.other_choice).map((value) =>
                    value[1] ? (
                      <Chip
                        key={`other_choice.${value}`}
                        name={`other_choice.${value[0]}`}
                        label={value[0].replaceAll("_", " ")}
                      />
                    ) : (
                      false
                    )
                  )}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Object.entries(datasForm.other_choice).map((choice) => (
                <MenuItem
                  key={choice}
                  value={choice}
                  name={"other_choice." + choice[0]}
                >
                  <Checkbox
                    type="checkbox"
                    id={choice[0]}
                    name={"other_choice." + choice[0]}
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
                  <ListItemText primary={choice[0].replaceAll("_", " ")} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <>
          {Object.entries(datasForm.other_choice).map((choice, index) => {
            if (
              datasForm[`other_${choice[0]}_cons`] &&
              datasForm.other_choice[choice[0]]
            ) {
              return (
                <>
                  <div
                    key={"choice_1_" + index}
                    className="column is-6 is-12-mobile"
                  >
                    <label htmlFor={`other_${choice[0]}_cons`}>
                      What is the {choice[0].replaceAll("_", " ")} consumption ?
                    </label>
                  </div>{" "}
                  <div className="column is-6 is-12-mobile">
                    <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
                      <Input
                        id="standard-adornment-weight"
                        type="number"
                        min="0"
                        name={`other_${choice[0]}_cons.value`}
                        value={
                          datasForm[`other_${choice[0]}_cons`]["value"] === 0
                            ? ""
                            : datasForm[`other_${choice[0]}_cons`]["value"]
                        }
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            {datasForm[`other_${choice[0]}_cons`]["unit"]}
                          </InputAdornment>
                        }
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                      <FormHelperText id="standard-weight-helper-text">
                        {choice[0].replaceAll("_", " ")} consumption
                      </FormHelperText>
                    </FormControl>
                  </div>
                </>
              );
            }
          })}
        </>
      </div>
    </div>
  );
}

export default BlocOther;
