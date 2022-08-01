const listOfQuestions = {
  formQuestions: [
    {
      bloc_id: "project_presentation",
      questions: [
        {
          id: "start_date",
          question: "Choose a start date for the period study :",
          formInput: { type: "date", label: "You choosed :" },
          userValue: Date.now(),
        },
        {
          id: "end_date",
          question: "Choose a end date for the period study :",
          formInput: { type: "date" },
          userValue: Date.now(),
        },
      ],
    },
    {
      bloc_id: "electricity",
      questions: [
        {
          id: "elec_total",
          question: "What is your total electricity consumption? ",
          formInput: { type: "number" },
          userValue: { value: 0, unit: "kWh" },
        },
        {
          id: "elec_generator",
          question:
            "Do you produce electricity from renewable energy (solar, wind...) ?",
          formInput: { type: "checkbox" },
          userValue: false,
          sub_questions: [
            {
              id: "elec_generator_prod",
              question: "How much renewable energy do you produce ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "kWh" },
            },
          ],
        },
      ],
    },
    {
      bloc_id: "gas",
      questions: [
        {
          id: "gas_butane_cons",
          question: "What is the butane consumption ?",
          formInput: { type: "number" },
          userValue: { value: 0, unit: "kWh" },
        },
        {
          id: "gas_propane_cons",
          question: "What is the propane consumption ?",
          formInput: { type: "number" },
          userValue: { value: 0, unit: "kWh" },
        },
        {
          id: "gas_mix_cons",
          question: "What is the mix butane/propane consumption ?",
          formInput: { type: "number" },
          userValue: { value: 0, unit: "kWh" },
        },
        {
          id: "natgas_unit",
          question: "Natural gas consumption ?",
          formInput: { type: "checkbox" },
          userValue: false,
          sub_questions: [
            {
              id: "natgas_cons",
              question: "What is the natural gas consumption ?",
              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: ["kWh", "Therm", "Ccf", "MMBtu", "Gj", "m3"],
              },
            },
          ],
        },
      ],
    },
    {
      bloc_id: "fuel",
      questions: [
        {
          id: "vehicles_type",
          question:
            "Select all the vehicles used on your production, transformation, distribution business area:",
          formInput: {
            type: "select",
            options: "multiple",
            none: true,
            both: false,
          },
          userValue: {
            cars: true,
            trucks: false,
            tractors: false,
            none: true,
          },
          sub_questions: [
            {
              id: "cars_type",
              question: "For the car(s), do you use :",
              formInput: {
                type: "select",
                options: "multiple",
                none: false,
                both: true,
              },
              userValue: {
                gasoline: true,
                diesel: false,
                both: false,
              },
              sub_questions: [
                {
                  id: "gasoline_cons",
                  question: "Gasoline car consumption",
                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "Gal" },
                },
                {
                  id: "diesel_cons",
                  question: "Diesel car consumption",
                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "Gal" },
                },
              ],
            },
            {
              id: "trucks_type",
              question: "For the truck(s), do you use :",
              formInput: {
                type: "select",
                options: "multiple",
                none: false,
                both: true,
              },
              userValue: {
                gasoline: false,
                diesel: false,
                both: false,
              },
              sub_questions: [
                {
                  id: "gasoline_cons",
                  question: "Gasoline truck consumption",
                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "Gal" },
                },
                {
                  id: "diesel_cons",
                  question: "Diesel truck consumption",
                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "Gal" },
                },
              ],
            },
            {
              id: "tractors_type",
              question: "For the tractor(s), do you use :",
              formInput: {
                type: "select",
                options: "multiple",
                none: false,
                both: true,
              },
              userValue: {
                gasoline: false,
                diesel: false,
                both: false,
              },
              sub_questions: [
                {
                  id: "gasoline_cons",
                  question: "Gasoline tractor consumption",
                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "Gal" },
                },
                {
                  id: "diesel_cons",
                  question: "Diesel tractor consumption",
                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "Gal" },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      bloc_id: "water",
      questions: [
        {
          id: "water_drink_cons",
          question: "What is the tap water consumption ?",
          nb: "NB: this data can be found on the utility bill or from meters. If you have a well and the date about you well water flow, do not include them in this total, leave blank. e.g if your well water covers the totality of your water needs, leave blank.",
          formInput: { type: "number" },
          userValue: { value: 0, unit: "Gal" },
        },
        {
          id: "water_waste_cons",
          question: "What quantity of wastewater is treated?",
          nb: "leave blank if non applicable.",
          formInput: { type: "number" },
          userValue: { value: 0, unit: "Gal" },
        },
      ],
    },
    {
      bloc_id: "other",
      questions: [
        {
          id: "other",
          question:
            "Select any other carbon dioxide sources you use from the list :",
          formInput: {
            type: "select",
            options: "multiple",
            none: true,
            both: false,
          },
          userValue: {
            kerosene: true,
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
          sub_questions: [
            {
              id: "kerosene_cons",
              question: "What is the kerosene consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "coal_cons",
              question: "What is the coal consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
            {
              id: "residual_heating_fuel_cons",
              question: "What is the residual heating fuel consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "jet_fuel_cons",
              question: "What is the jet fuel consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "aviation_gas_cons",
              question: "What is the aviation gas consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "flared_natural_gas_cons",
              question: "What is the flared natural gas consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "thousand cubes feet" },
            },
            {
              id: "petroleum_coke_cons",
              question: "What is the petroleum coke consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "petroleum_and_miscellaneous_cons",
              question: "What is the petroleum & miscellaneous consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "asphalt_and_road_oil_cons",
              question: "What is the asphalt & road oil consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "lubricants_cons",
              question: "What is the lubricants consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "petrochemical_feedstocks_cons",
              question: "What is the petrochemical feedstocks consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "special_naphthas_solvents_cons",
              question: "What is the special naphthas solvents consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "waxes_cons",
              question: "What is the waxes consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
            {
              id: "anthracite_cons",
              question: "What is the anthracite consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
            {
              id: "bituminous_cons",
              question: "What is the bituminous consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
            {
              id: "subbituminous_cons",
              question: "What is the subbituminous consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
            {
              id: "lignite_cons",
              question: "What is the lignite consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
            {
              id: "coke_cons",
              question: "What is the coke consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
            {
              id: "geothermal_cons",
              question: "What is the geothermal consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "" },
            },
            {
              id: "municiple_solid_waste_cons",
              question: "What is the municiple solide waste consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
            {
              id: "tire_derived_fuel_cons",
              question: "What is the tire derived fuel consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
            {
              id: "waste_oil_cons",
              question: "What is the waste oil consumption ?",
              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: "barrel (1 oil barrel = 42 US gal)",
              },
            },
          ],
        },
      ],
    },
    {
      bloc_id: "farm_information",
      questions: [
        {
          id: "farm_name",
          question: "What is the name of ther farm ?",
          formInput: {
            type: "text",
          },
          userValue: "",
        },
        {
          id: "farm_type",
          question: "What type of products, do you produce ?",
          formInput: {
            type: "select",
            options: "multiple",
            none: false,
            both: true,
          },
          userValue: {
            crops: true,
            animals: false,
            both: false,
          },
          sub_questions: [
            {
              id: "crops_type",
              question:
                "What plant(s) do you farm ? NB: in the time frame reported.",
              formInput: {
                type: "select",
                options: "multiple",
                none: false,
                both: false,
              },
              userValue: {
                grassland: true,
                grain: false,
                forage: false,
                fv: false,
                flowers: false,
                herbs: true,
              },
              sub_questions: [
                {
                  id: "grassland_size",
                  question: "What is the size of the farm grassland ?",
                  formInput: { type: "number" },
                  userValue: {
                    unit: [
                      { value: "acre", selected: true },
                      { value: "sq feet", selected: false },
                    ],
                    value: 0,
                    organic: true,
                  },
                  sub_questions: [
                    {
                      id: "organic_grown",
                      question: "Is it organically grown ?",
                      formInput: { type: "checkbox" },
                      userValue: false,
                    },
                  ],
                },
                {
                  id: "grain_size",
                  question: "What is the size of the farm grain ?",
                  formInput: { type: "number" },
                  userValue: {
                    unit: [
                      { value: "acre", selected: true },
                      { value: "sq feet", selected: false },
                    ],
                    value: 0,
                    organic: false,
                  },
                  sub_questions: [
                    {
                      id: "organic_grown",
                      question: "Is it organically grown ?",
                      formInput: { type: "checkbox" },
                      userValue: false,
                    },
                  ],
                },
                {
                  id: "forage_size",
                  question: "What is the size of the farm forage?",
                  formInput: { type: "number" },
                  userValue: {
                    unit: [
                      { value: "acre", selected: true },
                      { value: "sq feet", selected: false },
                    ],
                    value: 0,
                    organic: false,
                  },
                  sub_questions: [
                    {
                      id: "organic_grown",
                      question: "Is it organically grown ?",
                      formInput: { type: "checkbox" },
                      userValue: false,
                    },
                  ],
                },
                {
                  id: "fv_size",
                  question: "What is the size of the farm fv?",
                  formInput: { type: "number" },
                  userValue: {
                    unit: [
                      { value: "acre", selected: true },
                      { value: "sq feet", selected: false },
                    ],
                    value: 0,
                    organic: false,
                  },
                  sub_questions: [
                    {
                      id: "organic_grown",
                      question: "Is it organically grown ?",
                      formInput: { type: "checkbox" },
                      userValue: false,
                    },
                  ],
                },
                {
                  id: "flowers_size",
                  question: "What is the size of the farm flowers?",
                  formInput: { type: "number" },
                  userValue: {
                    unit: [
                      { value: "acre", selected: true },
                      { value: "sq feet", selected: false },
                    ],
                    value: 0,
                    organic: false,
                  },
                  sub_questions: [
                    {
                      id: "organic_grown",
                      question: "Is it organically grown ?",
                      formInput: { type: "checkbox" },
                      userValue: false,
                    },
                  ],
                },
                {
                  id: "herbs_size",
                  question: "What is the size of the farm herbs?",
                  formInput: { type: "number" },
                  userValue: {
                    unit: [
                      { value: "acre", selected: true },
                      { value: "sq feet", selected: false },
                    ],
                    value: 0,
                    organic: false,
                  },
                  sub_questions: [
                    {
                      id: "organic_grown",
                      question: "Is it organically grown ?",
                      formInput: { type: "checkbox" },
                      userValue: false,
                    },
                  ],
                },
              ],
            },
            {
              id: "animals_type",
              question:
                "What plant(s) do you farm ? NB: in the time frame reported.",
              formInput: {
                type: "select",
                options: "multiple",
                none: false,
                both: false,
              },
              userValue: {
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
              },
            },
          ],
        },
      ],
    },
    // { bloc_id: "soil_testing" },
    // { bloc_id: "practices" },
    // { bloc_id: "demographics" },
  ],
  auth: {},
};

export default listOfQuestions;
