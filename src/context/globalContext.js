import { createContext, useContext, useState, useEffect } from "react";
import { calculus } from "../utils/calculs";
const GlobalContext = createContext();

export function GlobalContextWrapper({ children }) {
  let dateNow = new Date().toISOString().split("T")[0].split("-");
  const [datasForm, setDatasForm] = useState({
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
      { value: "Therm", selected: true },
      { value: "Ccf", selected: false },
      { value: "MMBtu", selected: false },
      { value: "Gj", selected: false },
      { value: "m3", selected: false },
      { value: "No natural gas consumption", selected: false },
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

    farm_sheeps_matur_numb: { value: 0, selected: false },

    farm_goats_matur_numb: { value: 0, selected: false },

    farm_swine_matur_numb: { value: 0, selected: false },

    farm_horses_matur_numb: { value: 0, selected: false },

    farm_mules_matur_numb: { value: 0, selected: false },

    farm_water_buffalo_matur_numb: { value: 0, selected: false },

    farm_poultry_matur_numb: { value: 0, selected: false },

    farm_american_bison_matur_numb: { value: 0, selected: false },

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
        },
        {
          value:
            "Nutrient management i.e. adjusting application rates, slow- or controlled-release fertilizer forms or nitrification inhibitors (applies for croplands)",
          selected: false,
        },
        {
          value:
            "Tillage and residue management i.e. reduced or no tillage (apply for croplands)",
          selected: false,
        },
        {
          value:
            "Water management i.e. more effective irrigation measures  (applies for croplands)",
          selected: false,
        },
        {
          value:
            "Set aside and LUC (land-use change) i.e. allow or encourage the reversion of cropland to another land cover, typically one similar to the native vegetation. (apply for croplands)",
          selected: false,
        },
        {
          value:
            "Agro forestry i.e. production of livestock or food crops on land that also grows trees for timber, fire- wood, or other tree products (applies for croplands)",
          selected: false,
        },
        {
          value:
            "Grazing (adapted intensity and timing of grazing), fertilization (alleviating nutrient deficiencies by fertilizer or organic amendments), no fire (apply for grasslands)",
          selected: false,
        },
        {
          value: "Restoration ( applies for organic soils)",
          selected: false,
        },

        {
          value: "Restoration ( applies to degraded lands)",
          selected: false,
        },
        {
          value: "Soils under bio-energy",
          selected: false,
        },
        {
          value: "Application of manure/biosolids",
          selected: false,
        },
        { value: "none", selected: false },
      ],
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
      degraded_lands: {
        unit: [
          { value: "acre", selected: true },
          { value: "sq feet", selected: false },
        ],
        size: 0,
      },
      manure: {
        unit: [
          { value: "acre", selected: true },
          { value: "sq feet", selected: false },
        ],
        size: 0,
      },
      bionrj: {
        unit: [
          { value: "acre", selected: true },
          { value: "sq feet", selected: false },
        ],
        size: 0,
      },
    },
    demographics: {
      address: "",
      zip_code: "",
      state: "AK",
      contact_info_website: "",
      contact_info_email: "",
      contact_info_phone: "",
    },
  });
  let sharedState = {
    datasForm: datasForm,
    setDatasForm: setDatasForm,
  };

  return (
    <GlobalContext.Provider value={sharedState}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
