const listOfQuestions = {
  formQuestions: [
    {
      id: "start_date",
      bloc_name: "project_presentation",
      index_id: 0,
      question: "Choose a start date for the period study :",
      formInput: { type: "date", label: "You chose :" },
      userValue: Date.now(),
    },
    {
      id: "end_date",
      index_id: 1,
      question: "Choose a end date for the period study :",
      formInput: { type: "date" },
      userValue: Date.now(),
    },
    {
      id: "elec_total",
      bloc_name: "electricity",
      index_id: 2,
      question: "What is your total electricity consumption? ",
      formInput: { type: "number" },
      userValue: { value: 0, unit: "kWh" },
    },
    {
      id: "elec_generator",
      index_id: 3,
      question:
        "Do you produce electricity from renewable energy (solar, wind...) ?",
      formInput: { type: "checkbox" },
      userValue: { value: true },
      linked_questions: [
        {
          answerParentQuestion: true,
          id: "elec_generator_prod",
          question_id: "bloc_1-question_2",
          index_id: 4,
          dependant_question_number: 0,
          question_class: "is-hidden",
          question: "How much renewable energy do you produce ?",
          formInput: { type: "number" },
          userValue: { value: 0, unit: "kWh" },
        },
      ],
    },
    {
      id: "gas_butane_cons",
      index_id: 5,
      bloc_name: "gas",
      question_id: "bloc_2-question_0",
      dependant_question_number: 0,
      question: "What is the butane consumption ?",
      formInput: { type: "number" },
      userValue: { value: 0, unit: "kWh" },
    },
    {
      id: "gas_propane_cons",
      index_id: 6,
      dependant_question_number: 0,
      question_id: "bloc_2-question_1",
      question: "What is the propane consumption ?",
      formInput: { type: "number" },
      userValue: { value: 0, unit: "kWh" },
    },
    {
      id: "gas_mix_cons",
      index_id: 7,
      question_id: "bloc_2-question_2",
      dependant_question_number: 0,
      question: "What is the mix butane/propane consumption ?",
      formInput: { type: "number" },
      userValue: { value: 0, unit: "kWh" },
    },
    {
      id: "natgas_unit",
      index_id: 8,
      question_id: "bloc_2-question_3",
      dependant_question_number: 1,
      question: "Natural gas consumption ?",
      formInput: { type: "checkbox" },
      userValue: { value: true },
      linked_questions: [
        {
          answerParentQuestion: true,
          id: "natgas_cons",
          index_id: 9,
          question: "What is the natural gas consumption ?",
          question_class: "is-hidden",
          formInput: { type: "number" },
          userValue: {
            value: 0,
            unit: ["kWh", "Therm", "Ccf", "MMBtu", "Gj", "m3"],
          },
        },
      ],
    },

    {
      id: "vehicles_type_cars",
      index_id: 10,
      question:
        "Do you use cars on your production, transformation, distribution business area?",
      formInput: { type: "checkbox" },
      userValue: { value: true },
      linked_questions: [
        {
          answerParentQuestion: true,
          id: "vehicles_type_cars_gasoline",
          index_id: 11,
          question: "For the car(s), do you use gasoline ?",
          formInput: { type: "checkbox" },
          userValue: { value: true },
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "cars_type_gasoline_cons",
              index_id: 12,
              question: "Gasoline car consumption",
              question_class: "",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "vehicles_type_cars_diesel",
          index_id: 13,
          question_id: "bloc_3-question_2",
          dependant_question_number: 1,
          question: "For the car(s), do you use diesel ?",
          formInput: { type: "checkbox" },
          userValue: { value: false },
          linked_questions: [
            {
              id: "cars_type_diesel_cons",
              index_id: 14,
              question_id: "bloc_3-question_3-cars",
              dependant_question_number: 0,
              question_class: "",
              question: "Diesel car consumption",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
      ],
    },

    // {
    //   id: "vehicles_type_trucks",
    //   index_id: 15,
    //   question_id: "bloc_3-question_0",
    //   dependant_question_number: 4,
    //   question:
    //     "Do you use trucks on your production, transformation, distribution business area?",
    //   formInput: { type: "checkbox" },
    //   userValue: { value: false },
    // },
    // {
    //   id: "vehicles_type_trucks_gasoline",
    //   index_id: 16,
    //   question_id: "bloc_3-question_1",
    //   dependant_question_number: 1,
    //   question: "For the truck(s), do you use gasoline ?",
    //   formInput: { type: "checkbox" },
    //   userValue: { value: false },
    // },
    // {
    //   id: "trucks_type_gasoline_cons",
    //   index_id: 17,
    //   question_id: "bloc_3-question_2-trucks",
    //   dependant_question_number: 0,
    //   question: "Gasoline truck consumption",
    //   question_class: "",
    //   formInput: { type: "number" },
    //   userValue: { value: 0, unit: "Gal" },
    // },
    // {
    //   id: "vehicles_type_trucks_diesel",
    //   index_id: 18,
    //   question_id: "bloc_3-question_2",
    //   dependant_question_number: 1,
    //   question: "For the truck(s), do you use diesel ?",
    //   formInput: { type: "checkbox" },
    //   userValue: { value: false },
    // },
    // {
    //   id: "trucks_type_diesel_cons",
    //   index_id: 19,
    //   question_id: "bloc_3-question_3-trucks",
    //   dependant_question_number: 0,
    //   question_class: "",
    //   question: "Diesel truck consumption",
    //   formInput: { type: "number" },
    //   userValue: { value: 0, unit: "Gal" },
    // },
    // {
    //   id: "vehicles_type_tractors",
    //   index_id: 20,
    //   question_id: "bloc_3-question_0",
    //   dependant_question_number: 4,
    //   question:
    //     "Do you use tractors on your production, transformation, distribution business area?",
    //   formInput: { type: "checkbox" },
    //   userValue: { value: false },
    // },
    // {
    //   id: "vehicles_type_tractors_gasoline",
    //   index_id: 21,
    //   question_id: "bloc_3-question_2",
    //   dependant_question_number: 1,
    //   question: "For the tractor(s), do you use gasoline ?",
    //   formInput: { type: "checkbox" },
    //   userValue: { value: false },
    // },
    // {
    //   id: "tractors_type_gasoline_cons",
    //   index_id: 22,
    //   question_id: "bloc_3-question_2-tractors",
    //   dependant_question_number: 0,
    //   question: "Gasoline tractor consumption",
    //   question_class: "",
    //   formInput: { type: "number" },
    //   userValue: { value: 0, unit: "Gal" },
    // },
    // {
    //   id: "vehicles_type_tractors_diesel",
    //   index_id: 23,
    //   question_id: "bloc_3-question_2",
    //   dependant_question_number: 1,
    //   question: "For the tractor(s), do you use diesel ?",
    //   formInput: { type: "checkbox" },
    //   userValue: { value: false },
    // },

    // {
    //   id: "tractors_type_diesel_cons",
    //   index_id: 24,
    //   question_id: "bloc_3-question_3-tractors",
    //   dependant_question_number: 0,
    //   question_class: "",
    //   question: "Diesel tractor consumption",
    //   formInput: { type: "number" },
    //   userValue: { value: 0, unit: "Gal" },
    // },
    // {
    //   bloc_name: "water",
    //   questions: [
    //     {
    //       id: "water_drink_cons",
    //       question_id: "question_21",
    //       question: "What is the tap water consumption ?",
    //       nb: "NB: this data can be found on the utility bill or from meters. If you have a well and the date about you well water flow, do not include them in this total, leave blank. e.g if your well water covers the totality of your water needs, leave blank.",
    //       formInput: { type: "number" },
    //       userValue: { value: 0, unit: "Gal" },
    //     },
    //     {
    //       id: "water_waste_cons",
    //       question_id: "question_22",
    //       question: "What quantity of wastewater is treated?",
    //       nb: "leave blank if non applicable.",
    //       formInput: { type: "number" },
    //       userValue: { value: 0, unit: "Gal" },
    //     },
    //   ],
    // },
    // {
    //   bloc_name: "other",
    //   questions: [
    //     {
    //       id: "other",
    //       question_id: "question_23",
    //       question:
    //         "Select any other carbon dioxide sources you use from the list :",
    //       formInput: {
    //         type: "select",
    //         options: "multiple",
    //         none: true,
    //         both: false,
    //       },
    //       userValue: {
    //         kerosene: true,
    //         coal: false,
    //         residual_heating_fuel: false,
    //         jet_fuel: false,
    //         aviation_gas: false,
    //         flared_natural_gas: false,
    //         petroleum_coke: false,
    //         petroleum_and_miscellaneous: false,
    //         asphalt_and_road_oil: false,
    //         lubricants: false,
    //         petrochemical_feedstocks: false,
    //         special_naphthas_solvents: false,
    //         waxes: false,
    //         anthracite: false,
    //         bituminous: false,
    //         subbituminous: false,
    //         lignite: false,
    //         coke: false,
    //         geothermal: false,
    //         municiple_solid_waste: false,
    //         tire_derived_fuel: false,
    //         waste_oil: false,
    //         none: true,
    //       },
    //       sub_questions: [
    //         {
    //           id: "kerosene_cons",
    //           question_id: "question_24",
    //           question: "What is the kerosene consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "coal_cons",
    //           question_id: "question_25",
    //           question: "What is the coal consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "short ton" },
    //         },
    //         {
    //           id: "residual_heating_fuel_cons",
    //           question_id: "question_26",
    //           question: "What is the residual heating fuel consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "jet_fuel_cons",
    //           question_id: "question_27",
    //           question: "What is the jet fuel consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "aviation_gas_cons",
    //           question_id: "question_28",
    //           question: "What is the aviation gas consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "flared_natural_gas_cons",
    //           question_id: "question_29",
    //           question: "What is the flared natural gas consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "thousand cubes feet" },
    //         },
    //         {
    //           id: "petroleum_coke_cons",
    //           question_id: "question_30",
    //           question: "What is the petroleum coke consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "petroleum_and_miscellaneous_cons",
    //           question_id: "question_31",
    //           question: "What is the petroleum & miscellaneous consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "asphalt_and_road_oil_cons",
    //           question_id: "question_32",
    //           question: "What is the asphalt & road oil consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "lubricants_cons",
    //           question_id: "question_33",
    //           question: "What is the lubricants consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "petrochemical_feedstocks_cons",
    //           question_id: "question_34",
    //           question: "What is the petrochemical feedstocks consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "special_naphthas_solvents_cons",
    //           question_id: "question_35",
    //           question: "What is the special naphthas solvents consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "waxes_cons",
    //           question_id: "question_36",
    //           question: "What is the waxes consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "Gal" },
    //         },
    //         {
    //           id: "anthracite_cons",
    //           question_id: "question_37",
    //           question: "What is the anthracite consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "short ton" },
    //         },
    //         {
    //           id: "bituminous_cons",
    //           question_id: "question_38",
    //           question: "What is the bituminous consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "short ton" },
    //         },
    //         {
    //           id: "subbituminous_cons",
    //           question_id: "question_39",
    //           question: "What is the subbituminous consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "short ton" },
    //         },
    //         {
    //           id: "lignite_cons",
    //           question_id: "question_40",
    //           question: "What is the lignite consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "short ton" },
    //         },
    //         {
    //           id: "coke_cons",
    //           question_id: "question_41",
    //           question: "What is the coke consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "short ton" },
    //         },
    //         {
    //           id: "geothermal_cons",
    //           question_id: "question_42",
    //           question: "What is the geothermal consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "" },
    //         },
    //         {
    //           id: "municiple_solid_waste_cons",
    //           question_id: "question_43",
    //           question: "What is the municiple solide waste consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "short ton" },
    //         },
    //         {
    //           id: "tire_derived_fuel_cons",
    //           question_id: "question_44",
    //           question: "What is the tire derived fuel consumption ?",
    //           formInput: { type: "number" },
    //           userValue: { value: 0, unit: "short ton" },
    //         },
    //         {
    //           id: "waste_oil_cons",
    //           question_id: "question_45",
    //           question: "What is the waste oil consumption ?",
    //           formInput: { type: "number" },
    //           userValue: {
    //             value: 0,
    //             unit: "barrel (1 oil barrel = 42 US gal)",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   bloc_name: "farm_information",
    //   questions: [
    //     {
    //       id: "farm_name",
    //       question_id: "question_46",
    //       question: "What is the name of ther farm ?",
    //       formInput: {
    //         type: "text",
    //       },
    //       userValue: "",
    //     },
    //     {
    //       id: "farm_type",
    //       question_id: "question_47",
    //       question: "What type of products, do you produce ?",
    //       formInput: {
    //         type: "select",
    //         options: "multiple",
    //         none: false,
    //         both: true,
    //       },
    //       userValue: {
    //         crops: true,
    //         animals: false,
    //         both: false,
    //       },
    //       sub_questions: [
    //         {
    //           id: "crops_type",
    //           question_id: "question_48",
    //           question:
    //             "What plant(s) do you farm ? NB: in the time frame reported.",
    //           formInput: {
    //             type: "select",
    //             options: "multiple",
    //             none: false,
    //             both: false,
    //           },
    //           userValue: {
    //             grassland: true,
    //             grain: false,
    //             forage: false,
    //             fv: false,
    //             flowers: false,
    //             herbs: true,
    //           },
    //           sub_questions: [
    //             {
    //               id: "grassland_size",
    //               question_id: "question_49",
    //               question: "What is the size of the farm grassland ?",
    //               formInput: { type: "number" },
    //               userValue: {
    //                 unit: [
    //                   { value: "acre", selected: true },
    //                   { value: "sq feet", selected: false },
    //                 ],
    //                 value: 0,
    //                 organic: true,
    //               },
    //               sub_questions: [
    //                 {
    //                   id: "organic_grown",
    //                   question_id: "question_50",
    //                   question: "Is it organically grown ?",
    //                   formInput: { type: "checkbox" },
    //                   userValue: false,
    //                 },
    //               ],
    //             },
    //             {
    //               id: "grain_size",
    //               question_id: "question_51",
    //               question: "What is the size of the farm grain ?",
    //               formInput: { type: "number" },
    //               userValue: {
    //                 unit: [
    //                   { value: "acre", selected: true },
    //                   { value: "sq feet", selected: false },
    //                 ],
    //                 value: 0,
    //                 organic: false,
    //               },
    //               sub_questions: [
    //                 {
    //                   id: "organic_grown",
    //                   question_id: "question_52",
    //                   question: "Is it organically grown ?",
    //                   formInput: { type: "checkbox" },
    //                   userValue: false,
    //                 },
    //               ],
    //             },
    //             {
    //               id: "forage_size",
    //               question_id: "question_53",
    //               question: "What is the size of the farm forage?",
    //               formInput: { type: "number" },
    //               userValue: {
    //                 unit: [
    //                   { value: "acre", selected: true },
    //                   { value: "sq feet", selected: false },
    //                 ],
    //                 value: 0,
    //                 organic: false,
    //               },
    //               sub_questions: [
    //                 {
    //                   id: "organic_grown",
    //                   question_id: "question_54",
    //                   question: "Is it organically grown ?",
    //                   formInput: { type: "checkbox" },
    //                   userValue: false,
    //                 },
    //               ],
    //             },
    //             {
    //               id: "fv_size",
    //               question_id: "question_55",
    //               question: "What is the size of the farm fv?",
    //               formInput: { type: "number" },
    //               userValue: {
    //                 unit: [
    //                   { value: "acre", selected: true },
    //                   { value: "sq feet", selected: false },
    //                 ],
    //                 value: 0,
    //                 organic: false,
    //               },
    //               sub_questions: [
    //                 {
    //                   id: "organic_grown",
    //                   question_id: "question_56",
    //                   question: "Is it organically grown ?",
    //                   formInput: { type: "checkbox" },
    //                   userValue: false,
    //                 },
    //               ],
    //             },
    //             {
    //               id: "flowers_size",
    //               question_id: "question_57",
    //               question: "What is the size of the farm flowers?",
    //               formInput: { type: "number" },
    //               userValue: {
    //                 unit: [
    //                   { value: "acre", selected: true },
    //                   { value: "sq feet", selected: false },
    //                 ],
    //                 value: 0,
    //                 organic: false,
    //               },
    //               sub_questions: [
    //                 {
    //                   id: "organic_grown",
    //                   question_id: "question_58",
    //                   question: "Is it organically grown ?",
    //                   formInput: { type: "checkbox" },
    //                   userValue: false,
    //                 },
    //               ],
    //             },
    //             {
    //               id: "herbs_size",
    //               question_id: "question_59",
    //               question: "What is the size of the farm herbs?",
    //               formInput: { type: "number" },
    //               userValue: {
    //                 unit: [
    //                   { value: "acre", selected: true },
    //                   { value: "sq feet", selected: false },
    //                 ],
    //                 value: 0,
    //                 organic: false,
    //               },
    //               sub_questions: [
    //                 {
    //                   id: "organic_grown",
    //                   question_id: "question_60",
    //                   question: "Is it organically grown ?",
    //                   formInput: { type: "checkbox" },
    //                   userValue: false,
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           id: "animals_type",
    //           question_id: "question_61",
    //           question:
    //             "What plant(s) do you farm ? NB: in the time frame reported.",
    //           formInput: {
    //             type: "select",
    //             options: "multiple",
    //             none: false,
    //             both: false,
    //           },
    //           userValue: {
    //             dairy_cattle: false,
    //             beef_cattle: false,
    //             sheeps: false,
    //             goats: false,
    //             swine: false,
    //             horses: false,
    //             mules: false,
    //             water_buffalo: false,
    //             poultry: false,
    //             american_bison: false,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // { bloc_name: "soil_testing" },
    // { bloc_name: "practices" },
    // { bloc_name: "demographics" },
  ],
  auth: {},
};

export default listOfQuestions;
