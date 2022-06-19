import React from "react";
import { handleChange } from "../../utils/form_functions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import { FormControl } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
function BlocElectricity({ datasForm, setDatasForm }) {
  return (
    <div id="block_electricity">
      <div className="columns is-multiline is-vcentered">
        <div className="column is-7 is-12-mobile ">
          <label htmlFor="elec_total">
            What is your total electricity consumption? <br />
            <small>(Leave blank if non applicable)</small>
          </label>
        </div>

        <div className="column is-5 is-12-mobile ">
          <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
            <Input
              id="standard-adornment-weight"
              type="number"
              min="0"
              name="elec_total"
              value={
                datasForm.elec_total.value === 0
                  ? ""
                  : datasForm.elec_total.value
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
                  {datasForm.elec_total.unit}
                </InputAdornment>
              }
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <FormHelperText id="standard-weight-helper-text">
              Electricity consumption
            </FormHelperText>
          </FormControl>
        </div>
        <div className="column is-10 has-text-centered">
          <label htmlFor="elec_generator">
            Do you produce electricity from renewable energy (solar, wind...) ?
          </label>
        </div>
        <div className="column is-2">
          <FormControlLabel
            label="YES"
            control={
              <Checkbox
                type="checkbox"
                checked={datasForm.elec_generator}
                name="elec_generator"
                onChange={(event) =>
                  handleChange({
                    event: event,
                    datasForm: datasForm,
                    setDatasForm: setDatasForm,
                  })
                }
              />
            }
          />
        </div>
        {datasForm.elec_generator && (
          <>
            <div className="column is-7 is-12-mobile ">
              <label htmlFor="elec_generator_prod">
                How much kWh of electricity do you produce ?
              </label>
            </div>
            <div className="column is-5 is-12-mobile ">
              <FormControl sx={{ m: 1, width: "10rem" }} variant="filled">
                <Input
                  id="standard-adornment-weight"
                  type="number"
                  min="0"
                  name="elec_generator_prod.value"
                  value={
                    datasForm.elec_generator_prod.value === 0
                      ? ""
                      : datasForm.elec_generator_prod.value
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
                      {datasForm.elec_total.unit}
                    </InputAdornment>
                  }
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
                <FormHelperText id="standard-weight-helper-text">
                  Electricity production
                </FormHelperText>
              </FormControl>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BlocElectricity;
