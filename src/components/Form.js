import React from "react";
import { useState } from "react";
import calculs from "../utils/calculs";
function Form(props) {
  let dateNow = new Date().toISOString().split("T")[0].split("-");
  const [formDatas, setFormDatas] = useState({
    startDate: dateNow[1] + "/" + dateNow[2] + "/" + dateNow[0],
    endDate: dateNow[1] + "/" + dateNow[2] + "/" + dateNow[0],
    elec_total: { value: 0, unit: "kWh" },
    elec_generator: false,
    elec_generator_prod: { value: 0, unit: "kWh" },
    gas_butane_cons: { value: 0, unit: "Gal" },
    gas_propane_cons: { value: 0, unit: "Gal" },
    gas_mix_cons: { value: 0, unit: "Gal" },
    natgas: false,
    natgas_unit: [
      { value: "Therm", selected: false },
      { value: "Ccf", selected: false },
      { value: "MMBtu", selected: false },
      { value: "Gj", selected: false },
      { value: "m3", selected: false },
      { value: "No natural gas consumption", selected: true },
    ],
    natgas_cons: 0,
    fuel_vehicles: { cars: false, trucks: false, tractors: false, none: true },
    fuel_car_type: { gasoline: false, diesel: false, both: false },
    fuel_car_gaso_cons: { value: 0, unit: "Gal" },
    fuel_car_dies_cons: { value: 0, unit: "Gal" },
    fuel_truck_type: { gasoline: false, diesel: false, both: false },
    fuel_truck_gaso_cons: { value: 0, unit: "Gal" },
    fuel_truck_dies_cons: { value: 0, unit: "Gal" },
    fuel_tract_type: { gasoline: false, diesel: false, both: false },
    fuel_tract_gaso_cons: { value: 0, unit: "Gal" },
    fuel_tract_dies_cons: { value: 0, unit: "Gal" },
    water_drink_cons: { value: 0, unit: "Gal" },
    water_waste_cons: { value: 0, unit: "Gal" },
    other_choice: {
      kerosene: false,
      coal: false,
      residual_heating_fuel: false,
      jet_fuel: false,
      aviation_gas: false,
      flared_natural_gas: false,
      petroleum_coke: false,
      petroleum_and_miscellaneous: false,
      asphalt_and_road_oil: false,
      lubricants: false,
      petrochemical_feedstocks: false,
      special_naphthas_solvents: false,
      waxes: false,
      anthracite: false,
      bituminous: false,
      subbituminous: false,
      lignite: false,
      coke: false,
      geothermal: false,
      municiple_solid_waste: false,
      tire_derived_fuel: false,
      waste_oil: false,
      none: true,
    },
    other_kerosene_cons: { value: 0, unit: "Gal" },
    other_coal_cons: { value: 0, unit: "short ton" },
    other_residual_heating_fuel_cons: { value: 0, unit: "Gal" },
    other_jet_fuel_cons: { value: 0, unit: "Gal" },
    other_aviation_gas_cons: { value: 0, unit: "Gal" },
    other_flared_natural_gas_cons: { value: 0, unit: "thousand cubes feet" },
    other_petroleum_coke_cons: { value: 0, unit: "Gal" },
    other_petroleum_and_miscellaneous_cons: { value: 0, unit: "Gal" },
    other_asphalt_and_road_oil: { value: 0, unit: "Gal" },
    other_lubricants_cons: { value: 0, unit: "Gal" },
    other_petrochemical_feedstocks: { value: 0, unit: "Gal" },
    other_special_naphthas_solvents: { value: 0, unit: "Gal" },
    other_waxes_cons: { value: 0, unit: "Gal" },
    other_anthracite_cons: { value: 0, unit: "short ton" },
    other_bituminous_cons: { value: 0, unit: "short ton" },
    other_subbituminous_cons: { value: 0, unit: "short ton" },
    other_lignite_cons: { value: 0, unit: "short ton" },
    other_coke_cons: { value: 0, unit: "short ton" },
    other_geothermal_cons: { value: 0, unit: "" },
    other_municiple_solid_waste_cons: { value: 0, unit: "short ton" },
    other_tire_derived_fuel_cons: { value: 0, unit: "short ton" },
    other_waste_oil_cons: {
      value: 0,
      unit: "barrel (1 oil barrel = 42 US gal)",
    },
    farm_name: "",
    farm_type: { crops: false, animals: false, both: false },
    farm_type_animals: {
      dairy_cattle: false,
      beef_cattle: false,
      sheeps: false,
      goats: false,
      swine: false,
      horses: false,
      mules: false,
      water_buffalo: false,
      poultry: false,
      american_bison: false,
      other: { value: "", selected: false },
    },

    farm_dairy_cattle_rep12_numb: { value: 0, selected: false },
    farm_dairy_cattle_rep24_numb: { value: 0, selected: false },
    farm_dairy_cattle_matur_numb: { value: 0, selected: false },

    farm_beef_cattle_rep12_numb: { value: 0, selected: false },
    farm_beef_cattle_rep24_numb: { value: 0, selected: false },
    farm_beef_cattle_matur_numb: { value: 0, selected: false },
    farm_beef_cattle_weanling_numb: { value: 0, selected: false },
    farm_beef_cattle_yearling_numb: { value: 0, selected: false },
    farm_beef_cattle_bulls_numb: { value: 0, selected: false },

    farm_sheeps_rep12_numb: { value: 0, selected: false },
    farm_sheeps_rep24_numb: { value: 0, selected: false },
    farm_sheeps_matur_numb: { value: 0, selected: false },

    farm_goats_rep12_numb: { value: 0, selected: false },
    farm_goats_rep24_numb: { value: 0, selected: false },
    farm_goats_matur_numb: { value: 0, selected: false },

    farm_swine_rep12_numb: { value: 0, selected: false },
    farm_swine_rep24_numb: { value: 0, selected: false },
    farm_swine_matur_numb: { value: 0, selected: false },

    farm_horses_rep12_numb: { value: 0, selected: false },
    farm_horses_rep24_numb: { value: 0, selected: false },
    farm_horses_matur_numb: { value: 0, selected: false },

    farm_mules_rep12_numb: { value: 0, selected: false },
    farm_mules_rep24_numb: { value: 0, selected: false },
    farm_mules_matur_numb: { value: 0, selected: false },

    farm_water_buffalo_rep12_numb: { value: 0, selected: false },
    farm_water_buffalo_rep24_numb: { value: 0, selected: false },
    farm_water_buffalo_matur_numb: { value: 0, selected: false },

    farm_poultry_rep12_numb: { value: 0, selected: false },
    farm_poultry_rep24_numb: { value: 0, selected: false },
    farm_poultry_matur_numb: { value: 0, selected: false },

    farm_american_bison_rep12_numb: { value: 0, selected: false },
    farm_american_bison_rep24_numb: { value: 0, selected: false },
    farm_american_bison_matur_numb: { value: 0, selected: false },

    farm_other_rep12_numb: { value: 0, selected: false },
    farm_other_rep24_numb: { value: 0, selected: false },
    farm_other_matur_numb: { value: 0, selected: false },
  });
  const handleChangeDate = (event) => {
    let date = event.target.value.split("-");
    setFormDatas({
      ...formDatas,
      [event.target.name]: date[1] + "/" + date[2] + "/" + date[0],
    });
  };
  const transformDate = (dateValue) => {
    let date = dateValue.split("/");
    return date[2] + "-" + date[0] + "-" + date[1];
  };
  const handleChange = ({ event, other }) => {
    !other
      ? setFormDatas({
          ...formDatas,
          [event.target.name]: event.target.value,
        })
      : setFormDatas({
          ...formDatas,
          [event.target.name]: {
            ...formDatas[event.target.name],
            other: {
              ...formDatas[event.target.name]["other"],
              value: event.target.value,
            },
          },
        });
  };

  const setValuesToFalse = (datas) => {
    let test = {};
    for (const [key, value] of Object.entries(datas)) {
      key === "none" || key === "both"
        ? Object.assign(test, { [key]: true })
        : Object.assign(test, { [key]: false });
    }
    return test;
  };
  const setValuesToTrue = (datas) => {
    let test = {};
    for (const [key, value] of Object.entries(datas)) {
      Object.assign(test, { [key]: true });
    }
    return test;
  };

  const handleChangeRadio = ({ event, none, other, both, animal }) => {
    if (none) {
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          ...(event.target.value === "none" && event.target.checked
            ? {
                [event.target.value]: true,
                ...setValuesToFalse(formDatas[event.target.name]),
              }
            : {
                [event.target.value]: event.target.checked,
                none: false,
              }),
        },
      });
    }
    if (other) {
      //console.log(event);
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          other: {
            ...formDatas[event.target.name]["other"],
            selected: event.target.checked,
          },
        },
      });
    }
    if (both) {
      //console.log(formDatas[event.target.name]);
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          ...(event.target.value === "both" && event.target.checked
            ? {
                ...setValuesToTrue(formDatas[event.target.name]),
              }
            : event.target.value === "both"
            ? {
                ...setValuesToFalse(formDatas[event.target.name]),
                [event.target.value]: false,
              }
            : event.target.value !== "both" && !event.target.checked
            ? {
                [event.target.value]: event.target.checked,
                both: false,
              }
            : { [event.target.value]: event.target.checked }),
        },
      });
    }
    if (animal) {
      //console.log(event.target.name, event.target.value);
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          selected: event.target.checked,
        },
      });
    }
    if (!both && !other && !none && !animal) {
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          [event.target.value]: event.target.checked,
        },
      });
    }
  };
  const handleChangeCheckbox = (event) => {
    setFormDatas({
      ...formDatas,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeSelect = ({ event }) => {
    setFormDatas({
      ...formDatas,
      [event.target.name]: formDatas[event.target.name].map((element) =>
        element.value === event.target.value
          ? { value: element.value, selected: true }
          : { value: element.value, selected: false }
      ),
    });
  };
  const handleChangeNumber = (event) => {
    setFormDatas({
      ...formDatas,
      [event.target.name]: {
        ...formDatas[event.target.name],
        value: Number(event.target.value),
      },
    });
  };
  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    //console.log(formDatas);
    calculs(formDatas);
  };
  return (
    <>
      <form
        onSubmit={(event) => handleSubmit(event)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div id="block_project_presentation">
          <div>
            <label htmlFor="startDate">Start date:</label>
            <input
              type="date"
              name="startDate"
              value={transformDate(formDatas.startDate)}
              onChange={(event) => handleChangeDate(event)}
            />
          </div>
          <div>
            <label htmlFor="endDate">End date:</label>
            <input
              type="date"
              name="endDate"
              value={transformDate(formDatas.endDate)}
              onChange={(event) => handleChangeDate(event)}
            />
          </div>
        </div>
        <div id="block_electricity">
          <div>
            <label htmlFor="elec_total">
              What is your total electricity consumption? (Leave blank if non
              applicable)
            </label>
            <input
              type="number"
              name="elec_total"
              value={
                formDatas.elec_total.value === 0
                  ? ""
                  : formDatas.elec_total.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />
            {formDatas.elec_total.unit}
          </div>
          <div>
            <label htmlFor="elec_generator">
              Do you produce electricity from renewable energy (solar, wind...)
              ?
            </label>
            <input
              type="checkbox"
              name="elec_generator"
              defaultChecked={formDatas.elec_generator}
              onChange={(event) => handleChangeCheckbox(event)}
            />{" "}
            YES
          </div>

          {formDatas.elec_generator && (
            <div>
              <label htmlFor="elec_generator_prod">
                How much kWh of electricity do you produce ?
              </label>
              <input
                type="number"
                name="elec_generator_prod"
                value={
                  formDatas.elec_generator_prod.value === 0
                    ? ""
                    : formDatas.elec_generator_prod.value
                }
                onChange={(event) => handleChangeNumber(event)}
              />{" "}
              {formDatas.elec_generator_prod.unit}
            </div>
          )}
        </div>
        <div id="block_gas">
          <div>
            <label htmlFor="gas_butane_cons">
              What is the butane consumption ?
            </label>
            <input
              type="number"
              name="gas_butane_cons"
              value={
                formDatas.gas_butane_cons.value === 0
                  ? ""
                  : formDatas.gas_butane_cons.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />{" "}
            {formDatas.gas_butane_cons.unit}
          </div>
          <div>
            <label htmlFor="gas_propane_cons">
              What is the propane consumption ?
            </label>
            <input
              type="number"
              name="gas_propane_cons"
              value={
                formDatas.gas_propane_cons.value === 0
                  ? ""
                  : formDatas.gas_propane_cons.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />{" "}
            {formDatas.gas_propane_cons.unit}
          </div>
          <div>
            <label htmlFor="gas_mix_cons">
              What is the mix butane/propane consumption ?
            </label>
            <input
              type="number"
              name="gas_mix_cons"
              value={
                formDatas.gas_mix_cons.value === 0
                  ? ""
                  : formDatas.gas_mix_cons.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />{" "}
            {formDatas.gas_mix_cons.unit}
          </div>
        </div>
        <div id="block_natural_gas">
          <div>
            <label htmlFor="natgas_unit">
              What is the propane consumption ?
            </label>
            <select
              name="natgas_unit"
              id="natgaz_unit"
              onChange={(event) => handleChangeSelect({ event: event })}
            >
              {formDatas.natgas_unit.map((unit) => (
                <option
                  value={unit.value}
                  selected={unit.selected}
                  key={unit.value}
                >
                  {unit.value}
                </option>
              ))}
            </select>
          </div>
          {formDatas.natgas_unit.find(
            (unit) =>
              unit.selected && unit.value !== "No natural gas consumption"
          ) && (
            <div>
              <label htmlFor="natgas_cons">
                What is the natural gas consumption ?
              </label>
              <input
                type="number"
                name="natgas_cons"
                value={formDatas.natgas_cons === 0 ? "" : formDatas.natgas_cons}
                onChange={(event) => handleChangeNumber(event)}
              />{" "}
              {formDatas.natgas_unit.find((unit) => unit.selected).value}
            </div>
          )}
        </div>
        <div id="block_fuel">
          <div>
            <fieldset>
              <legend>
                Select all the vehicles used on your production, transformation,
                distribution business area:
              </legend>

              <div>
                <input
                  type="checkbox"
                  id="Cars"
                  name="fuel_vehicles"
                  value="cars"
                  checked={formDatas.fuel_vehicles.cars}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, none: true })
                  }
                />
                <label htmlFor="Cars">Car(s)</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="Trucks"
                  name="fuel_vehicles"
                  value="trucks"
                  checked={formDatas.fuel_vehicles.trucks}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, none: true })
                  }
                />
                <label htmlFor="Trucks">Truck(s)</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="Tractors"
                  name="fuel_vehicles"
                  value="tractors"
                  checked={formDatas.fuel_vehicles.tractors}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, none: true })
                  }
                />
                <label htmlFor="Tractors">Tractor(s)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="None"
                  name="fuel_vehicles"
                  value="none"
                  checked={formDatas.fuel_vehicles.none}
                  onChange={(event) =>
                    handleChangeRadio({ event: event, none: true })
                  }
                />
                <label htmlFor="None">None</label>
              </div>
            </fieldset>
          </div>

          {formDatas.fuel_vehicles.cars && (
            <div>
              <fieldset>
                <legend>For the car(s), do you use :</legend>

                <div>
                  <input
                    type="checkbox"
                    id="gasoline"
                    name="fuel_car_type"
                    value="gasoline"
                    checked={formDatas.fuel_car_type.gasoline}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="gasoline">Gasoline</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="diesel"
                    name="fuel_car_type"
                    value="diesel"
                    checked={formDatas.fuel_car_type.diesel}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="diesel">Diesel</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="both"
                    name="fuel_car_type"
                    value="both"
                    checked={formDatas.fuel_car_type.both}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="both">Both</label>
                </div>
              </fieldset>
            </div>
          )}
          {(formDatas.fuel_car_type.both ||
            formDatas.fuel_car_type.gasoline) && (
            <div>
              <label htmlFor="fuel_car_gaso_cons">
                What is the gasoline consumption for the car(s) ?
              </label>
              <input
                type="number"
                name="fuel_car_gaso_cons"
                value={
                  formDatas.fuel_car_gaso_cons.value === 0
                    ? ""
                    : formDatas.fuel_car_gaso_cons.value
                }
                onChange={(event) => handleChangeNumber(event)}
              />{" "}
              {formDatas.fuel_car_gaso_cons.unit}
            </div>
          )}
          {(formDatas.fuel_car_type.both || formDatas.fuel_car_type.diesel) && (
            <div>
              <label htmlFor="fuel_car_dies_cons">
                What is the diesel consumption for the car(s) ?
              </label>
              <input
                type="number"
                name="fuel_car_dies_cons"
                value={
                  formDatas.fuel_car_dies_cons.value === 0
                    ? ""
                    : formDatas.fuel_car_dies_cons.value
                }
                onChange={(event) => handleChangeNumber(event)}
              />{" "}
              {formDatas.fuel_car_dies_cons.unit}
            </div>
          )}
          {formDatas.fuel_vehicles.trucks && (
            <div>
              <fieldset>
                <legend>For the truck(s), do you use :</legend>

                <div>
                  <input
                    type="checkbox"
                    id="gasoline"
                    name="fuel_truck_type"
                    value="gasoline"
                    checked={formDatas.fuel_truck_type.gasoline}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="gasoline">Gasoline</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="diesel"
                    name="fuel_truck_type"
                    value="diesel"
                    checked={formDatas.fuel_truck_type.diesel}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="diesel">Diesel</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="both"
                    name="fuel_truck_type"
                    value="both"
                    checked={formDatas.fuel_truck_type.both}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="both">Both</label>
                </div>
              </fieldset>
            </div>
          )}
          {(formDatas.fuel_truck_type.both ||
            formDatas.fuel_truck_type.gasoline) && (
            <div>
              <label htmlFor="fuel_truck_gaso_cons">
                What is the gasoline consumption for the truck(s) ?
              </label>
              <input
                type="number"
                name="fuel_truck_gaso_cons"
                value={
                  formDatas.fuel_truck_gaso_cons.value === 0
                    ? ""
                    : formDatas.fuel_truck_gaso_cons.value
                }
                onChange={(event) => handleChangeNumber(event)}
              />{" "}
              {formDatas.fuel_truck_gaso_cons.unit}
            </div>
          )}
          {(formDatas.fuel_truck_type.both ||
            formDatas.fuel_truck_type.diesel) && (
            <div>
              <label htmlFor="fuel_truck_dies_cons">
                What is the diesel consumption for the truck(s) ?
              </label>
              <input
                type="number"
                name="fuel_truck_dies_cons"
                value={
                  formDatas.fuel_truck_dies_cons.value === 0
                    ? ""
                    : formDatas.fuel_truck_dies_cons.value
                }
                onChange={(event) => handleChangeNumber(event)}
              />{" "}
              {formDatas.fuel_truck_dies_cons.unit}
            </div>
          )}
          {formDatas.fuel_vehicles.tractors && (
            <div>
              <fieldset>
                <legend>For the tractor(s), do you use :</legend>

                <div>
                  <input
                    type="checkbox"
                    id="gasoline"
                    name="fuel_tract_type"
                    value="gasoline"
                    checked={formDatas.fuel_tract_type.gasoline}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="gasoline">Gasoline</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="diesel"
                    name="fuel_tract_type"
                    value="diesel"
                    checked={formDatas.fuel_tract_type.diesel}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="diesel">Diesel</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="both"
                    name="fuel_tract_type"
                    value="both"
                    checked={formDatas.fuel_tract_type.both}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, both: true })
                    }
                  />
                  <label htmlFor="both">Both</label>
                </div>
              </fieldset>
            </div>
          )}
          {(formDatas.fuel_tract_type.both ||
            formDatas.fuel_tract_type.gasoline) && (
            <div>
              <label htmlFor="fuel_tract_gaso_cons">
                What is the gasoline consumption for the tractor(s) ?
              </label>
              <input
                type="number"
                name="fuel_tract_gaso_cons"
                value={
                  formDatas.fuel_tract_gaso_cons.value === 0
                    ? ""
                    : formDatas.fuel_tract_gaso_cons.value
                }
                onChange={(event) => handleChangeNumber(event)}
              />{" "}
              {formDatas.fuel_tract_gaso_cons.unit}
            </div>
          )}
          {(formDatas.fuel_tract_type.both ||
            formDatas.fuel_tract_type.diesel) && (
            <div>
              <label htmlFor="fuel_tract_dies_cons">
                What is the diesel consumption for the tractor(s) ?
              </label>
              <input
                type="number"
                name="fuel_tract_dies_cons"
                value={
                  formDatas.fuel_tract_dies_cons.value === 0
                    ? ""
                    : formDatas.fuel_tract_dies_cons.value
                }
                onChange={(event) => handleChangeNumber(event)}
              />{" "}
              {formDatas.fuel_tract_dies_cons.unit}
            </div>
          )}
        </div>
        <div id="block_water">
          <div>
            <label htmlFor="water_drink_cons">
              What is the tap water consumption ? <br />
              NB: this data can be found on the utility bill or from meters.{" "}
              <br />
              If you have a well and the date about you well water flow, do not
              include them in this total, leave blank.
              <br />
              e.g if your well water covers the totality of your water needs,
              leave blank.
              <br />
            </label>
            <input
              type="number"
              name="water_drink_cons"
              value={
                formDatas.water_drink_cons.value === 0
                  ? ""
                  : formDatas.water_drink_cons.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />{" "}
            {formDatas.water_drink_cons.unit}
          </div>
          <div>
            <label htmlFor="water_waste_cons">
              What quantity of wastewater is treated? leave blank if non
              applicable.
            </label>
            <input
              type="number"
              name="water_waste_cons"
              value={
                formDatas.water_waste_cons.value === 0
                  ? ""
                  : formDatas.water_waste_cons.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />{" "}
            {formDatas.water_waste_cons.unit}
          </div>
        </div>
        <div id="block_other">
          <div>
            <fieldset>
              <legend>
                Select any other carbon dioxide sources you use from the list :
              </legend>

              {Object.entries(formDatas.other_choice).map((choice) => (
                <div>
                  <input
                    type="checkbox"
                    id={choice[0]}
                    name="other_choice"
                    key={choice[0]}
                    value={choice[0]}
                    checked={choice[1]}
                    onChange={(event) =>
                      handleChangeRadio({ event: event, none: true })
                    }
                  />
                  <label htmlFor={choice[0]} style={{ paddingRight: "2rem" }}>
                    {choice[0].replaceAll("_", " ")}
                  </label>
                </div>
              ))}
            </fieldset>
            {Object.entries(formDatas.other_choice).map((choice) => {
              if (
                formDatas[`other_${choice[0]}_cons`] &&
                formDatas.other_choice[choice[0]]
              )
                return (
                  <div>
                    <label htmlFor={`other_${choice[0]}_cons`}>
                      What is the {choice[0].replaceAll("_", " ")} consumption ?
                    </label>
                    <input
                      type="number"
                      name={`other_${choice[0]}_cons`}
                      value={
                        formDatas[`other_${choice[0]}_cons`]["value"] === 0
                          ? ""
                          : formDatas[`other_${choice[0]}_cons`]["value"]
                      }
                      onChange={(event) => handleChangeNumber(event)}
                    />{" "}
                    {formDatas[`other_${choice[0]}_cons`]["unit"]}
                  </div>
                );
            })}
          </div>
        </div>
        <div id="block_farm_information">
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
                        onChange={(event) =>
                          handleChangeRadio({ event: event })
                        }
                      />
                      <label
                        htmlFor={choice[0]}
                        style={{ paddingRight: "2rem" }}
                      >
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
                      <label
                        htmlFor={choice[0]}
                        style={{ paddingRight: "2rem" }}
                      >
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
                    {choice[0].replaceAll("_", " ")} in the time frame reported
                    :<br />
                    NB: A portion of the offspring are retained to replace
                    mature cows that die or are removed from the herd (culled)
                    each year. Those represents a very fast movement of cattle
                    called "replacements".
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_rep12_numb`}
                      checked={
                        formDatas[`farm_${choice[0]}_rep12_numb`].selected
                      }
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
                      checked={
                        formDatas[`farm_${choice[0]}_rep24_numb`].selected
                      }
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
                      checked={
                        formDatas[`farm_${choice[0]}_matur_numb`].selected
                      }
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
                        How many heads of replacements 0-12mois do you farm? NB:
                        in the time frame reported
                      </label>
                      <input
                        type="number"
                        name={`farm_${choice[0]}_rep12_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_rep12_numb`]["value"] ===
                          0
                            ? ""
                            : formDatas[`farm_${choice[0]}_rep12_numb`]["value"]
                        }
                        onChange={(event) => handleChangeNumber(event)}
                      />{" "}
                    </div>
                  ) : (
                    false
                  )}
                  {formDatas[`farm_${choice[0]}_rep24_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of replacements 12-24mois do you farm?
                        NB: in the time frame reported
                      </label>
                      <input
                        type="number"
                        name={`farm_${choice[0]}_rep24_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_rep24_numb`]["value"] ===
                          0
                            ? ""
                            : formDatas[`farm_${choice[0]}_rep24_numb`]["value"]
                        }
                        onChange={(event) => handleChangeNumber(event)}
                      />{" "}
                    </div>
                  ) : (
                    false
                  )}
                  {formDatas[`farm_${choice[0]}_matur_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of mature cows do you farm? NB: in the
                        time frame reported
                      </label>
                      <input
                        type="number"
                        name={`farm_${choice[0]}_matur_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_matur_numb`]["value"] ===
                          0
                            ? ""
                            : formDatas[`farm_${choice[0]}_matur_numb`]["value"]
                        }
                        onChange={(event) => handleChangeNumber(event)}
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
                    {choice[0].replaceAll("_", " ")} in the time frame reported
                    :<br />
                    NB: A portion of the offspring are retained to replace
                    mature cows that die or are removed from the herd (culled)
                    each year. Those represents a very fast movement of cattle
                    called "replacements".
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      name={`farm_${choice[0]}_rep12_numb`}
                      checked={
                        formDatas[`farm_${choice[0]}_rep12_numb`].selected
                      }
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
                      checked={
                        formDatas[`farm_${choice[0]}_rep24_numb`].selected
                      }
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
                      checked={
                        formDatas[`farm_${choice[0]}_matur_numb`].selected
                      }
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
                      checked={
                        formDatas[`farm_${choice[0]}_bulls_numb`].selected
                      }
                      onChange={(event) =>
                        handleChangeRadio({ event: event, animal: true })
                      }
                    />{" "}
                    <label htmlFor={`farm_${choice[0]}_bulls_numb`}>
                      Bulls
                    </label>
                  </div>
                  {formDatas[`farm_${choice[0]}_rep12_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of replacements 0-12mois do you farm? NB:
                        in the time frame reported
                      </label>
                      <input
                        type="number"
                        name={`farm_${choice[0]}_rep12_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_rep12_numb`]["value"] ===
                          0
                            ? ""
                            : formDatas[`farm_${choice[0]}_rep12_numb`]["value"]
                        }
                        onChange={(event) => handleChangeNumber(event)}
                      />{" "}
                    </div>
                  ) : (
                    false
                  )}
                  {formDatas[`farm_${choice[0]}_rep24_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of replacements 12-24mois do you farm?
                        NB: in the time frame reported
                      </label>
                      <input
                        type="number"
                        name={`farm_${choice[0]}_rep24_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_rep24_numb`]["value"] ===
                          0
                            ? ""
                            : formDatas[`farm_${choice[0]}_rep24_numb`]["value"]
                        }
                        onChange={(event) => handleChangeNumber(event)}
                      />{" "}
                    </div>
                  ) : (
                    false
                  )}
                  {formDatas[`farm_${choice[0]}_matur_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of mature cows do you farm? NB: in the
                        time frame reported
                      </label>
                      <input
                        type="number"
                        name={`farm_${choice[0]}_matur_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_matur_numb`]["value"] ===
                          0
                            ? ""
                            : formDatas[`farm_${choice[0]}_matur_numb`]["value"]
                        }
                        onChange={(event) => handleChangeNumber(event)}
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
                        name={`farm_${choice[0]}_weanling_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_weanling_numb`][
                            "value"
                          ] === 0
                            ? ""
                            : formDatas[`farm_${choice[0]}_weanling_numb`][
                                "value"
                              ]
                        }
                        onChange={(event) => handleChangeNumber(event)}
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
                        name={`farm_${choice[0]}_yearling_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_yearling_numb`][
                            "value"
                          ] === 0
                            ? ""
                            : formDatas[`farm_${choice[0]}_yearling_numb`][
                                "value"
                              ]
                        }
                        onChange={(event) => handleChangeNumber(event)}
                      />{" "}
                    </div>
                  ) : (
                    false
                  )}
                  {formDatas[`farm_${choice[0]}_bulls_numb`].selected ? (
                    <div>
                      <label>
                        How many heads of bulls do you farm? NB: in the time
                        frame reported
                      </label>
                      <input
                        type="number"
                        name={`farm_${choice[0]}_bulls_numb`}
                        value={
                          formDatas[`farm_${choice[0]}_bulls_numb`]["value"] ===
                          0
                            ? ""
                            : formDatas[`farm_${choice[0]}_bulls_numb`]["value"]
                        }
                        onChange={(event) => handleChangeNumber(event)}
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
        <div>
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </>
  );
}

export default Form;
