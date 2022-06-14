import React from "react";
import { handleChange } from "../../utils/form_functions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, Checkbox } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
function BlocNaturalGas({ datasForm, setDatasForm }) {
  let datas = datasForm.natgas_unit.map((unit) =>
    unit.value !== "No natural gas consumption" ? (
      <MenuItem value={unit.value} selected={unit.selected} key={unit.value}>
        {unit.value}
      </MenuItem>
    ) : (
      false
    )
  );
  return (
    <div id="block_natural_gas" className="columns is-multiline is-vcentered">
      <div className="column is-12">
        <label htmlFor="natgas_unit">Natural gas consumption</label>

        <Checkbox
          type="checkbox"
          checked={datasForm.natgas}
          name="natgas_unit.selected"
          onChange={(event) =>
            handleChange({
              event: event,
              datasForm: datasForm,
              setDatasForm: setDatasForm,
            })
          }
        />
      </div>
      {datasForm.natgas && (
        <>
          <div className="column is-6 is-12-mobile">
            <label htmlFor="natgas_cons">
              What is the natural gas consumption ?
            </label>
          </div>
          <div className="column is-5 is-12-mobile">
            <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
              <Input
                id="standard-adornment-weight"
                type="number"
                min="0"
                name="natgas_cons"
                value={datasForm.natgas_cons === 0 ? "" : datasForm.natgas_cons}
                onChange={(event) =>
                  handleChange({
                    event: event,
                    datasForm: datasForm,
                    setDatasForm: setDatasForm,
                  })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, maxWidth: 120 }}
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          datasForm.natgas_unit.find((el) => el.selected).value
                        }
                        label="Unity gas consumption"
                        name="natgas_unit.selected"
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      >
                        {datas}
                      </Select>
                    </FormControl>
                  </InputAdornment>
                }
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              <FormHelperText id="standard-weight-helper-text">
                Natural gas consumption
              </FormHelperText>
            </FormControl>
          </div>
        </>
      )}
    </div>
  );
}

export default BlocNaturalGas;
