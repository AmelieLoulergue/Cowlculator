import React from "react";
import { handleChange } from "../../utils/form_functions";
import regions from "../../coeff/regions.json";
import { FormControl, Checkbox, Select, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
function BlocDemographic({ datasForm, setDatasForm }) {
  const regionsCode = regions.map((region) => region.Code);
  let datas = regionsCode.map((region, index) => (
    <MenuItem
      value={region}
      selected={datasForm.demographics.state === region ? true : false}
      key={region + index}
    >
      {region}
    </MenuItem>
  ));
  return (
    <>
      <div>
        <label htmlFor="demographics.address">
          Please enter the farm address (street, city)
        </label>
        <input
          type="text"
          name="demographics.address"
          value={datasForm.demographics.address}
          onChange={(event) =>
            handleChange({
              event: event,
              datasForm: datasForm,
              setDatasForm: setDatasForm,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="demographics.zip_code">Please enter the zip code</label>
        <input
          type="text"
          name="demographics.zip_code"
          value={datasForm.demographics.zip_code}
          onChange={(event) =>
            handleChange({
              event: event,
              datasForm: datasForm,
              setDatasForm: setDatasForm,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="demographics.state">
          What is the state ? (2 letters code and capital letters)
        </label>
        <FormControl variant="standard" sx={{ m: 1, maxWidth: 120 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            type="select-one"
            name={"demographics.state"}
            value={datasForm.demographics.state}
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
      </div>
      <div>
        Enter your contact information:
        <div>
          <label htmlFor="demographics.contact_info_website">Website</label>
          <input
            type="text"
            name="demographics.contact_info_website"
            value={datasForm.demographics.contact_info_website}
            onChange={(event) =>
              handleChange({
                event: event,
                datasForm: datasForm,
                setDatasForm: setDatasForm,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="demographics.contact_info_email">Email</label>
          <input
            type="text"
            name="demographics.contact_info_email"
            value={datasForm.demographics.contact_info_email}
            onChange={(event) =>
              handleChange({
                event: event,
                datasForm: datasForm,
                setDatasForm: setDatasForm,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="demographics.contact_info_phone">Phone</label>
          <input
            type="text"
            name="demographics.contact_info_phone"
            value={datasForm.demographics.contact_info_phone}
            onChange={(event) =>
              handleChange({
                event: event,
                datasForm: datasForm,
                setDatasForm: setDatasForm,
              })
            }
          />
        </div>
      </div>
    </>
  );
}

export default BlocDemographic;
