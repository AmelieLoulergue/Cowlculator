import React from "react";
import { useState } from "react";
import calculs from "../utils/calculs";
import BlocElectricity from "./form_components/BlocElectricity";
import BlocGas from "./form_components/BlocGas";
import BlocNaturalGas from "./form_components/BlocNaturalGas";
import BlocFuel from "./form_components/BlocFuel";
import BlocWater from "./form_components/BlocWater";
import BlocOther from "./form_components/BlocOther";
import BlocAnimals from "./form_components/BlocAnimals";
import BlocPlants from "./form_components/BlocPlants";
import BlocPractices from "./form_components/BlocPractices";
import BlocSoilTesting from "./form_components/BlocSoilTesting";
import coeff_reduction_ghg from "../coeff/coeff_reduction_ghg.json";
import elec_state_coeff from "../coeff/elec_state_coeff.json";
import enteric_EF from "../coeff/enteric_EF.json";
import fuel_coeff from "../coeff/fuel_coeff.json";
import gas_coeff from "../coeff/gas_coeff.json";
import manure from "../coeff/manure.json";
import natgas_coeff from "../coeff/natgas_coeff.json";
import other_coeff from "../coeff/other_coeff.json";
import reductionEF_coeff from "../coeff/reductionEF_coeff.json";
import regions from "../coeff/regions.json";
import water_coeff from "../coeff/water_coeff.json";
import BlocDemographic from "./form_components/BlocDemographic";
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
    farm_type_plants: {
      farm_grassland: false,
      farm_grain: false,
      farm_forage: false,
      farm_fv: false,
      farm_flowers: false,
      farm_herbs: false,
    },
    farm_grassland: {
      unit: [
        { value: "acre", selected: true },
        { value: "sq feet", selected: false },
      ],
      size: 0,
      orga: false,
    },
    farm_grain: {
      unit: [
        { value: "acre", selected: true },
        { value: "sq feet", selected: false },
      ],
      size: 0,
      orga: false,
    },
    farm_forage: {
      unit: [
        { value: "acre", selected: true },
        { value: "sq feet", selected: false },
      ],
      size: 0,
      orga: false,
    },
    farm_fv: {
      unit: [
        { value: "acre", selected: true },
        { value: "sq feet", selected: false },
      ],
      size: 0,
      orga: false,
    },
    farm_flowers: {
      unit: [
        { value: "acre", selected: true },
        { value: "sq feet", selected: false },
      ],
      size: 0,
      orga: false,
    },
    farm_herbs: {
      unit: [
        { value: "acre", selected: true },
        { value: "sq feet", selected: false },
      ],
      size: 0,
      orga: false,
    },
    soil_testing: {
      soil_test: false,
      soil_test_number: { one_test: true, more_than_one_test: false },
      more_than_one_message:
        "Contact us to work out how much carbon you are storing. climateresearchgnv2@gmail.com. Please, include the name of the farm in the email subject : 'carbon storage _ farm name'",
    },
    practices: {
      practice_anim: [
        {
          value:
            "Improved feeding practice e.g. replacing roughage with concentrate, feeding, extra dietary oil",
          selected: false,
          dairy_cow: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          beef_cattle: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          sheeps: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value:
            "Specific agents and dietary additives e.g. bST, growth hormones, ionophores, propionate precursors",
          selected: false,
          dairy_cow: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          beef_cattle: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          sheeps: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value:
            "Long term structural/management and animal breeding e.g. lifetime management of beef cattle, improved productivity through animal breeding",
          selected: false,
          dairy_cow: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          beef_cattle: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          sheeps: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        { value: "none", selected: false },
      ],
      practice_plant: [
        {
          value:
            "Agronomy i.e cover crops, crops rotations, perennial crops(applies for croplands)",
          selected: false,
          croplands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          grasslands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          organic_soils: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value:
            "Nutrient management i.e. adjusting application rates, slow- or controlled-release fertilizer forms or nitrification inhibitors (applies for croplands)",
          selected: false,
          croplands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          grasslands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          organic_soils: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value:
            "Tillage and residue management i.e. reduced or no tillage (apply for croplands)",
          selected: false,
          croplands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          grasslands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          organic_soils: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value:
            "Water management i.e. more effective irrigation measures  (applies for croplands)",
          selected: false,
          croplands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          grasslands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          organic_soils: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value:
            "Set aside and LUC (land-use change) i.e. allow or encourage the reversion of cropland to another land cover, typically one similar to the native vegetation. (apply for croplands)",
          selected: false,
          croplands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          grasslands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          organic_soils: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value:
            "Agro forestry i.e. production of livestock or food crops on land that also grows trees for timber, fire- wood, or other tree products (applies for croplands)",
          selected: false,
          croplands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          grasslands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          organic_soils: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value:
            "Grazing (adapted intensity and timing of grazing), fertilization (alleviating nutrient deficiencies by fertilizer or organic amendments), no fire (apply for grasslands)",
          selected: false,
          croplands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          grasslands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          organic_soils: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
        },
        {
          value: "Restoration ( applies to degraded lands)",
          selected: false,
          croplands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          grasslands: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          organic_soils: {
            selected: false,
            all_of_them: true,
            portion_of_them: false,
            portion_numb: 0,
          },
          unit: [
            { value: "acre", selected: true },
            { value: "sq feet", selected: false },
          ],
          size: 0,
        },
        {
          value: "Application of manure/biosolids",
          selected: false,
          unit: [
            { value: "acre", selected: true },
            { value: "sq feet", selected: false },
          ],
          size: 0,
        },
        {
          value: "Soils under bio-energy",
          selected: false,
          unit: [
            { value: "acre", selected: true },
            { value: "sq feet", selected: false },
          ],
          size: 0,
        },
        { value: "none", selected: false },
      ],
    },
    demographics: {
      address: "",
      zip_code: "",
      state: "AK",
      contact_info: { website: "", email: "", phone: "" },
    },
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
  const handleChange = ({ event, other, state }) => {
    if (other) {
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          other: {
            ...formDatas[event.target.name]["other"],
            value: event.target.value,
          },
        },
      });
    } else if (state) {
      setFormDatas({
        ...formDatas,
        [event.target.name.split(".")[0]]: {
          ...formDatas[event.target.name.split(".")[0]],
          [event.target.name.split(".")[1]]: event.target.value,
        },
      });
    } else {
      setFormDatas({
        ...formDatas,
        [event.target.name]: event.target.value,
      });
    }
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
  const handleChangeCheckbox = ({ event, plant, soil }) => {
    if (plant) {
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          orga: event.target.checked,
        },
      });
    } else if (soil) {
      // console.log(event.target.name, event.target.value, event.target.data);
      // console.log(event.target.value.split("."));
      if (
        event.target.value.split(".")[1] === "one_test" ||
        event.target.value.split(".")[1] === "more_than_one_test"
      ) {
        // console.log("premier cas");
        setFormDatas({
          ...formDatas,
          [event.target.name]: {
            ...formDatas[event.target.name],
            [event.target.value.split(".")[0]]: {
              ...formDatas[`${event.target.name}`][
                event.target.value.split(".")[0]
              ],
              [event.target.value.split(".")[1]]: event.target.checked,
            },
          },
        });
      } else {
        // console.log("deuxieme cas");
        setFormDatas({
          ...formDatas,
          [event.target.name]: {
            ...formDatas[event.target.name],
            [event.target.value]: event.target.checked,
          },
        });
      }
    } else {
      setFormDatas({
        ...formDatas,
        [event.target.name]: event.target.checked,
      });
    }
  };
  const handleChangeSelect = ({ event, plant }) => {
    if (plant) {
      // console.log(event.target.name, formDatas[event.target.name].unit);
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          unit: formDatas[event.target.name]["unit"].map((element) =>
            element.value === event.target.value
              ? { value: element.value, selected: true }
              : { value: element.value, selected: false }
          ),
        },
      });
    } else {
      setFormDatas({
        ...formDatas,
        [event.target.name]: formDatas[event.target.name].map((element) =>
          element.value === event.target.value
            ? { value: element.value, selected: true }
            : { value: element.value, selected: false }
        ),
      });
    }
  };
  const handleChangeNumber = ({ event, size, natgas }) => {
    if (size) {
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          size: Number(event.target.value),
        },
      });
    } else if (natgas) {
      setFormDatas({
        ...formDatas,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setFormDatas({
        ...formDatas,
        [event.target.name]: {
          ...formDatas[event.target.name],
          value: Number(event.target.value),
        },
      });
    }
  };
  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    //console.log(formDatas);
    calculs(
      formDatas,
      coeff_reduction_ghg,
      elec_state_coeff,
      enteric_EF,
      fuel_coeff,
      gas_coeff,
      manure,
      natgas_coeff,
      other_coeff,
      reductionEF_coeff,
      regions,
      water_coeff
    );
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
        <BlocElectricity
          handleChangeNumber={handleChangeNumber}
          formDatas={formDatas}
          handleChangeCheckbox={handleChangeCheckbox}
        />
        <BlocGas
          formDatas={formDatas}
          handleChangeNumber={handleChangeNumber}
        />
        <BlocNaturalGas
          handleChangeNumber={handleChangeNumber}
          handleChangeSelect={handleChangeSelect}
          formDatas={formDatas}
        />
        <BlocFuel
          handleChangeNumber={handleChangeNumber}
          handleChangeSelect={handleChangeSelect}
          formDatas={formDatas}
        />
        <BlocWater
          formDatas={formDatas}
          handleChangeNumber={handleChangeNumber}
        />
        <BlocOther
          formDatas={formDatas}
          handleChangeNumber={handleChangeNumber}
          handleChangeRadio={handleChangeRadio}
        />
        <div id="block_farm_information">
          <BlocAnimals
            formDatas={formDatas}
            handleChange={handleChange}
            handleChangeNumber={handleChangeNumber}
            handleChangeRadio={handleChangeRadio}
          />
          <BlocPlants
            formDatas={formDatas}
            handleChangeRadio={handleChangeRadio}
            handleChangeSelect={handleChangeSelect}
            handleChangeNumber={handleChangeNumber}
            handleChangeCheckbox={handleChangeCheckbox}
          />
        </div>
        <BlocSoilTesting
          formDatas={formDatas}
          handleChangeCheckbox={handleChangeCheckbox}
          setFormDatas={setFormDatas}
        />
        <BlocPractices
          formDatas={formDatas}
          handleChangeRadio={handleChangeRadio}
          handleChangeSelect={handleChangeSelect}
          handleChangeNumber={handleChangeNumber}
          handleChangeCheckbox={handleChangeCheckbox}
          setFormDatas={setFormDatas}
        />
        <BlocDemographic
          formDatas={formDatas}
          handleChange={handleChange}
          handleChangeRadio={handleChangeRadio}
          handleChangeSelect={handleChangeSelect}
          handleChangeNumber={handleChangeNumber}
          handleChangeCheckbox={handleChangeCheckbox}
          setFormDatas={setFormDatas}
        />
        <div>
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </>
  );
}

export default Form;
