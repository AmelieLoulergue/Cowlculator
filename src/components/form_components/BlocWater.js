import React from "react";
import { handleChange } from "../../utils/form_functions";
import Input from "@mui/material/Input";
import { FormControl } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
function BlocWater({ datasForm, setDatasForm }) {
  return (
    <div id="block_water" className="columns is-multiline">
      <div className="column is-6">
        <label htmlFor="water_drink_cons">
          What is the tap water consumption ?
        </label>
      </div>
      <div className="column is-6">
        <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
          <Input
            id="standard-adornment-weight"
            type="number"
            min="0"
            name="water_drink_cons.value"
            value={
              datasForm.water_drink_cons.value === 0
                ? ""
                : datasForm.water_drink_cons.value
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
                {datasForm.water_drink_cons.unit}
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
          <FormHelperText id="standard-weight-helper-text">
            Tap water consumption
          </FormHelperText>
        </FormControl>
      </div>
      <div className="column is-12 is-paddingless">
        <label htmlFor="water_drink_cons">
          <small>
            NB: this data can be found on the utility bill or from meters.{" "}
            <br />
            If you have a well and the date about you well water flow, do not
            include them in this total, leave blank.
          </small>
          <br />
          <small>
            e.g if your well water covers the totality of your water needs,
            leave blank.
          </small>
          <br />
        </label>
      </div>
      <div className="column is-6 is-12-mobile">
        <label htmlFor="water_waste_cons">
          What quantity of wastewater is treated? leave blank if non applicable.
        </label>
      </div>
      <div className="column is-6">
        <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
          <Input
            id="standard-adornment-weight"
            type="number"
            min="0"
            name="water_waste_cons.value"
            value={
              datasForm.water_waste_cons.value === 0
                ? ""
                : datasForm.water_waste_cons.value
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
                {datasForm.water_waste_cons.unit}
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
          <FormHelperText id="standard-weight-helper-text">
            Treated wastewater
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
}

export default BlocWater;
