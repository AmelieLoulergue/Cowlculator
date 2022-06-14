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
function BlocFuel({ datasForm, setDatasForm }) {
  return (
    <div id="block_fuel" className="columns is-multiline">
      <div className="column is-12">
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">
            Select all the vehicles used on your production, transformation,
            distribution business area:
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  type="checkbox"
                  id="Cars"
                  name="fuel_vehicles.cars"
                  value="cars"
                  checked={datasForm.fuel_vehicles.cars}
                  onChange={(event) =>
                    handleChange({
                      event: event,
                      datasForm: datasForm,
                      setDatasForm: setDatasForm,
                    })
                  }
                />
              }
              label="Car(s)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  type="checkbox"
                  id="Trucks"
                  name="fuel_vehicles.trucks"
                  value="trucks"
                  checked={datasForm.fuel_vehicles.trucks}
                  onChange={(event) =>
                    handleChange({
                      event: event,
                      datasForm: datasForm,
                      setDatasForm: setDatasForm,
                    })
                  }
                />
              }
              label="Truck(s)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  type="checkbox"
                  id="Tractors"
                  name="fuel_vehicles.tractors"
                  value="tractors"
                  checked={datasForm.fuel_vehicles.tractors}
                  onChange={(event) =>
                    handleChange({
                      event: event,
                      datasForm: datasForm,
                      setDatasForm: setDatasForm,
                    })
                  }
                />
              }
              label="Tractor(s)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  type="checkbox"
                  id="None"
                  name="fuel_vehicles.none"
                  value="none"
                  checked={datasForm.fuel_vehicles.none}
                  onChange={(event) =>
                    handleChange({
                      event: event,
                      datasForm: datasForm,
                      setDatasForm: setDatasForm,
                    })
                  }
                />
              }
              label="None"
            />
          </FormGroup>
        </FormControl>
      </div>
      <>
        {datasForm.fuel_vehicles.cars && (
          <>
            <div className="column is-6">
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">
                  For the car(s), do you use :
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        id="gasoline"
                        name="fuel_car_type.gasoline"
                        value="gasoline"
                        checked={datasForm.fuel_car_type.gasoline}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Gasoline"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        id="diesel"
                        name="fuel_car_type.diesel"
                        value="diesel"
                        checked={datasForm.fuel_car_type.diesel}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Diesel"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        name="fuel_car_type.both"
                        value="both"
                        checked={datasForm.fuel_car_type.both}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Both"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <div className="column is-6 is-flex is-flex-column justify-content-center">
              {(datasForm.fuel_car_type.both ||
                datasForm.fuel_car_type.gasoline) && (
                <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
                  <Input
                    id="standard-adornment-weight"
                    type="number"
                    min="0"
                    name="fuel_car_gaso_cons.value"
                    value={
                      datasForm.fuel_car_gaso_cons.value === 0
                        ? ""
                        : Number(datasForm.fuel_car_gaso_cons.value)
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
                        {datasForm.fuel_car_gaso_cons.unit}
                      </InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Gasoline car consumption
                  </FormHelperText>
                </FormControl>
              )}
              {(datasForm.fuel_car_type.both ||
                datasForm.fuel_car_type.diesel) && (
                <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
                  <Input
                    id="standard-adornment-weight"
                    type="number"
                    min="0"
                    name="fuel_car_dies_cons.value"
                    value={
                      datasForm.fuel_car_dies_cons.value === 0
                        ? ""
                        : datasForm.fuel_car_dies_cons.value
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
                        {datasForm.fuel_car_dies_cons.unit}
                      </InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Diesel car consumption
                  </FormHelperText>
                </FormControl>
              )}
            </div>
          </>
        )}

        {datasForm.fuel_vehicles.trucks && (
          <>
            <div className="column is-6">
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">
                  For the truck(s), do you use :
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        id="gasoline"
                        name="fuel_truck_type.gasoline"
                        value="gasoline"
                        checked={datasForm.fuel_truck_type.gasoline}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Gasoline"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        id="diesel"
                        name="fuel_truck_type.diesel"
                        value="diesel"
                        checked={datasForm.fuel_truck_type.diesel}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Diesel"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        id="both"
                        name="fuel_truck_type.both"
                        value="both"
                        checked={datasForm.fuel_truck_type.both}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Both"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <div className="column is-6 is-flex is-flex-column justify-content-center">
              {(datasForm.fuel_truck_type.both ||
                datasForm.fuel_truck_type.gasoline) && (
                <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
                  <Input
                    id="standard-adornment-weight"
                    type="number"
                    min="0"
                    name="fuel_truck_gaso_cons.value"
                    value={
                      datasForm.fuel_truck_gaso_cons.value === 0
                        ? ""
                        : datasForm.fuel_truck_gaso_cons.value
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
                        {datasForm.fuel_truck_gaso_cons.unit}
                      </InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Gasoline truck consumption
                  </FormHelperText>
                </FormControl>
              )}
              {(datasForm.fuel_truck_type.both ||
                datasForm.fuel_truck_type.diesel) && (
                <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
                  <Input
                    id="standard-adornment-weight"
                    type="number"
                    min="0"
                    name="fuel_truck_dies_cons.value"
                    value={
                      datasForm.fuel_truck_dies_cons.value === 0
                        ? ""
                        : datasForm.fuel_truck_dies_cons.value
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
                        {datasForm.fuel_truck_dies_cons.unit}
                      </InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Diesel truck consumption
                  </FormHelperText>
                </FormControl>
              )}
            </div>
          </>
        )}

        {datasForm.fuel_vehicles.tractors && (
          <>
            <div className="column is-6">
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">
                  For the tractor(s), do you use :
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        id="gasoline"
                        name="fuel_tract_type.gasoline"
                        value="gasoline"
                        checked={datasForm.fuel_tract_type.gasoline}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Gasoline"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        id="diesel"
                        name="fuel_tract_type.diesel"
                        value="diesel"
                        checked={datasForm.fuel_tract_type.diesel}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Diesel"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        type="checkbox"
                        id="both"
                        name="fuel_tract_type.both"
                        value="both"
                        checked={datasForm.fuel_tract_type.both}
                        onChange={(event) =>
                          handleChange({
                            event: event,
                            datasForm: datasForm,
                            setDatasForm: setDatasForm,
                          })
                        }
                      />
                    }
                    label="Both"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <div className="column is-6 is-flex is-flex-column justify-content-center">
              {(datasForm.fuel_tract_type.both ||
                datasForm.fuel_tract_type.gasoline) && (
                <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
                  <Input
                    id="standard-adornment-weight"
                    type="number"
                    min="0"
                    name="fuel_tract_gaso_cons.value"
                    value={
                      datasForm.fuel_tract_gaso_cons.value === 0
                        ? ""
                        : datasForm.fuel_tract_gaso_cons.value
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
                        {datasForm.fuel_tract_gaso_cons.unit}
                      </InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Gasoline tractor consumption
                  </FormHelperText>
                </FormControl>
              )}
              {(datasForm.fuel_tract_type.both ||
                datasForm.fuel_tract_type.diesel) && (
                <FormControl sx={{ m: 1, width: "20ch" }} variant="filled">
                  <Input
                    id="standard-adornment-weight"
                    type="number"
                    min="0"
                    name="fuel_tract_dies_cons.value"
                    value={
                      datasForm.fuel_tract_dies_cons.value === 0
                        ? ""
                        : datasForm.fuel_tract_dies_cons.value
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
                        {datasForm.fuel_tract_dies_cons.unit}
                      </InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Diesel tractor consumption
                  </FormHelperText>
                </FormControl>
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default BlocFuel;
