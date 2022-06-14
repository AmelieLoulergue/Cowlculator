import React from "react";
import { handleChange } from "../../utils/form_functions";

import Input from "@mui/material/Input";
import { FormControl } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
function BlocGas({ datasForm, setDatasForm }) {
  return (
    <div id="block_gas" className="columns is-multiline is-vcentered">
      <div className="column is-7">
        <label htmlFor="gas_butane_cons">
          What is the butane consumption ?
        </label>
      </div>
      <div className="column is-5 is-12-mobile ">
        <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
          <Input
            id="standard-adornment-weight"
            type="number"
            min="0"
            name="gas_butane_cons.value"
            value={
              datasForm.gas_butane_cons.value === 0
                ? ""
                : datasForm.gas_butane_cons.value
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
            Butane consumption
          </FormHelperText>
        </FormControl>
      </div>
      <div className="column is-7">
        <label htmlFor="gas_propane_cons">
          What is the propane consumption ?
        </label>
      </div>
      <div className="column is-5 is-12-mobile ">
        <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
          <Input
            id="standard-adornment-weight"
            type="number"
            min="0"
            name="gas_propane_cons.value"
            value={
              datasForm.gas_propane_cons.value === 0
                ? ""
                : datasForm.gas_propane_cons.value
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
            Propane consumption
          </FormHelperText>
        </FormControl>
      </div>
      <div className="column is-7">
        <label htmlFor="gas_mix_cons">
          What is the mix butane/propane consumption ?
        </label>
      </div>
      <div className="column is-5 is-12-mobile ">
        <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
          <Input
            id="standard-adornment-weight"
            type="number"
            min="0"
            name="gas_mix_cons.value"
            value={
              datasForm.gas_mix_cons.value === 0
                ? ""
                : datasForm.gas_mix_cons.value
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
            Mix butane/propane consumption
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
}

export default BlocGas;
