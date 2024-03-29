const listOfQuestions = {
  formQuestions: [
    {
      id: "farm_name",
      bloc_name: "Farm information",
      question: "What is the name of the farm ?",
      formInput: {
        type: "text",
      },
      userValue: "",
    },

    {
      id: "farm_state",

      question:
        "Please indicate the state where the farm is. (2 letters code and capital letters)",
      formInput: { type: "select" },
      userValue: "",
    },
    {
      id: "farm_zip_code",
      question: "Please enter the zip code",
      formInput: { type: "text" },
      userValue: "",
    },
    {
      id: "start_date",

      question: "Choose a start date for the period study :",
      formInput: { type: "date", label: "You chose :" },
      userValue: Date.now(),
    },
    {
      id: "end_date",
      question: "Choose a end date for the period study :",
      formInput: { type: "date" },
      userValue: Date.now(),
    },
    {
      id: "elec_total",
      bloc_name: "Electricity",
      index_id: 2,
      question: "What is your total electricity consumption? ",
      formInput: { type: "number" },
      userValue: { value: 0, unit: "kWh" },
    },
    {
      id: "elec_generator",
      question:
        "Do you produce electricity from renewable energy (solar, wind...) ?",
      formInput: { type: "checkbox" },
      userValue: true,
      linked_questions: [
        {
          answerParentQuestion: true,
          parentId: "elec_generator",
          id: "elec_generator_prod",
          question: "How much renewable energy do you produce ?",
          formInput: { type: "number" },
          userValue: { value: 0, unit: "kWh" },
        },
      ],
    },
    {
      id: "gas_butane_cons",
      bloc_name: "Gas",
      question: "What is the butane consumption ?",
      formInput: { type: "number" },
      userValue: { value: 0, unit: "Gal" },
    },
    {
      id: "gas_propane_cons",
      question: "What is the propane consumption ?",
      formInput: { type: "number" },
      userValue: { value: 0, unit: "Gal" },
    },
    {
      id: "gas_mix_cons",
      question: "What is the mix butane/propane consumption ?",
      formInput: { type: "number" },
      userValue: { value: 0, unit: "Gal" },
    },
    {
      id: "natgas",
      question: "Natural gas consumption ?",
      formInput: { type: "checkbox" },
      userValue: true,
      linked_questions: [
        {
          answerParentQuestion: true,
          parentId: "natgas",
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
    {
      id: "vehicles_type_cars",
      bloc_name: "Fuel",
      question:
        "Do you use cars on your production, transformation, distribution business area?",
      formInput: { type: "checkbox" },
      userValue: true,
      linked_questions: [
        {
          answerParentQuestion: true,
          id: "vehicles_type_cars_gasoline",
          parentId: "vehicles_type_cars",
          question: "For the car(s), do you use gasoline ?",
          formInput: { type: "checkbox" },
          userValue: true,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "vehicles_type_cars_gasoline_cons",
              parentId: "vehicles_type_cars_gasoline",
              index_id: 12,
              question: "Gasoline car consumption",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "vehicles_type_cars_diesel",
          parentId: "vehicles_type_cars",
          question: "For the car(s), do you use diesel ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "vehicles_type_cars_diesel_cons",
              parentId: "vehicles_type_cars_diesel",
              question: "Diesel car consumption",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
      ],
    },
    {
      id: "vehicles_type_trucks",
      question:
        "Do you use trucks on your production, transformation, distribution business area?",
      formInput: { type: "checkbox" },
      userValue: true,
      linked_questions: [
        {
          answerParentQuestion: true,
          id: "vehicles_type_trucks_gasoline",
          parentId: "vehicles_type_trucks",
          question: "For the truck(s), do you use gasoline ?",
          formInput: { type: "checkbox" },
          userValue: true,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "vehicles_type_trucks_gasoline",
              id: "vehicles_type_trucks_gasoline_cons",
              question: "Gasoline truck consumption",
              question_class: "",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "vehicles_type_trucks_diesel",
          parentId: "vehicles_type_trucks",
          question: "For the truck(s), do you use diesel ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "vehicles_type_trucks_diesel_cons",
              parentId: "vehicles_type_trucks_diesel",
              question: "Diesel truck consumption",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
      ],
    },
    {
      id: "vehicles_type_tractors",
      question:
        "Do you use tractors on your production, transformation, distribution business area?",
      formInput: { type: "checkbox" },
      userValue: true,
      linked_questions: [
        {
          answerParentQuestion: true,
          id: "vehicles_type_tractors_gasoline",
          parentId: "vehicles_type_tractors",
          question: "For the tractor(s), do you use gasoline ?",
          formInput: { type: "checkbox" },
          userValue: true,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "vehicles_type_tractors_gasoline_cons",
              parentId: "vehicles_type_tractors",
              question: "Gasoline tractor consumption",
              question_class: "",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "vehicles_type_tractors_diesel",
          parentId: "vehicles_type_tractors",
          question: "For the tractor(s), do you use diesel ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "vehicles_type_tractors_diesel",
              id: "vehicles_type_tractors_diesel_cons",
              question: "Diesel tractor consumption",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
      ],
    },
    {
      id: "water_drink_cons",
      bloc_name: "Water",
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
    {
      id: "other",
      bloc_name: "Other",
      question:
        "Do you use other sources of energy that would lead to co2 emissions? e.g. kerosene, coal, residual heating fuel...",
      formInput: { type: "checkbox" },
      userValue: false,
      linked_questions: [
        {
          answerParentQuestion: true,
          id: "other_kerosene",
          parentId: "other",
          question: "Do you use kerosene?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_kerosene",
              id: "other_kerosene_cons",
              question: "What is the kerosene consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_coal",
          question: "Do you use coal?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_coal",
              id: "other_coal_cons",
              question: "What is the coal consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_residual_heating_fuel",
          question: "Do you use residual heating fuel?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_residual_heating_fuel",
              id: "other_residual_heating_fuel_cons",
              question: "What is the residual heating fuel consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_jet_fuel",
          question: "Do you use jet fuel?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_jet_fuel",
              id: "other_jet_fuel_cons",
              question: "What is jet fuel consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_aviation_gas",
          question: "Do you use aviation gas?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_aviation_gas",
              id: "other_aviation_gas_cons",
              question: "What is aviation gas consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_flared_natural_gas",
          question: "Do you use flared natural gas?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_flared_natural_gas",
              id: "other_flared_natural_gas_cons",
              index_id: 36,
              question: "What is flared natural gas consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "thousand cubes feet" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_petroleum_coke",
          question: "Do you use petroleum coke?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_petroleum_coke",
              id: "other_petroleum_coke_cons",
              question: "What is petroleum coke consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_petroleum_and_miscellaneous",
          question: "Do you use petroleum and miscellaneous?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_petroleum_and_miscellaneous",
              id: "other_petroleum_and_miscellaneous_cons",
              question: "What is petroleum and miscellaneous consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_asphalt_and_road_oil",
          question: "Do you use asphalt and road oil?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_asphalt_and_road_oil",
              id: "other_asphalt_and_road_oil_cons",
              question: "What is asphalt and road oil consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_lubricants",
          question: "Do you use lubricants?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_lubricants",
              id: "other_lubricants_cons",
              question: "What is the lubricants consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          parentId: "other",
          id: "other_petrochemical_feedstocks",
          question: "Do you use petrochemical feedstocks?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_petrochemical_feedstocks",
              id: "other_petrochemical_feedstocks_cons",
              question: "What is the petrochemical feedstocks consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          parentId: "other",
          id: "other_special_naphthas_solvents",
          question: "Do you use special naphthas solvents?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_special_naphthas_solvents",
              id: "other_special_naphthas_solvents_cons",
              question: "What is the special naphthas solvents consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          parentId: "other",
          id: "other_waxes",
          question: "Do you use waxes?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_waxes",
              id: "other_waxes_cons",
              question: "What is the waxes consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "Gal" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_anthracite",
          question: "Do you use anthracite?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_anthracite",
              id: "other_anthracite_cons",
              question: "What is the anthracite consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_bituminous",
          question: "Do you use bituminous?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_bituminous",
              id: "other_bituminous_cons",
              question: "What is the bituminous consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_subbituminous",
          question: "Do you use subbituminous?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_subbituminous",
              id: "other_subbituminous_cons",
              question: "What is the subbituminous consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_lignite",
          question: "Do you use lignite?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_lignite",
              id: "other_lignite_cons",
              question: "What is the lignite consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_coke",
          question: "Do you use coke?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_coke",
              id: "other_coke_cons",
              question: "What is the coke consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_geothermal",
          question: "Do you use geothermal?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_geothermal",
              id: "other_geothermal_cons",
              question: "What is the geothermal consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: " " },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_municiple_solid_waste",
          question: "Do you use municiple solid waste?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_municiple_solid_waste",
              id: "other_municiple_solid_waste_cons",
              question: "What is the municiple solid waste consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_tire_derived_fuel",
          question: "Do you use tire derived fuel?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_tire_derived_fuel",
              id: "other_tire_derived_fuel_cons",
              question: "What is the tire derived fuel consumption ?",
              formInput: { type: "number" },
              userValue: { value: 0, unit: "short ton" },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "other",
          id: "other_waste_oil",
          question: "Do you use waste oil?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "other_waste_oil",
              id: "other_waste_oil_cons",
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
      id: "farm_crops",
      bloc_name: "Crops",
      question: "Do you produce crops?",
      formInput: { type: "checkbox" },
      userValue: false,
      linked_questions: [
        {
          answerParentQuestion: true,
          parentId: "farm_crops",
          id: "farm_crops_grassland",
          question: "Is there grassland on the farm?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_grassland_size",
              parentId: "farm_crops_grassland",
              question: "What is the size of the farm's grassland ?",
              formInput: { type: "number" },
              userValue: {
                unit: ["acre", "sq feet"],
              },
            },
            {
              answerParentQuestion: true,
              id: "farm_crops_grassland_grazing_practice",
              parentId: "farm_crops_grassland",
              question:
                "For your crop(s), have you implemented grazing practices (adapted intensity and timing of grazing), fertilization (alleviating nutrient deficiencies by fertilizer or organic amendments), no fire (apply for grasslands) to reduce emissions & increase sequestration?",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_grassland_grazing_practice",
                  id: "farm_crops_grassland_grazing_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId: "farm_crops_grassland_grazing_practice_portion",
                      id: "farm_crops_grassland_grazing_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_grain",
          parentId: "farm_crops",
          question: "Do you produce grain?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_grain_size",
              parentId: "farm_crops_grain",
              question: "What is the size of the grain crops?",
              formInput: { type: "number" },
              userValue: {
                unit: ["acre", "sq feet"],
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_forage",
          parentId: "farm_crops",
          question: "Do you produce forage?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_forage_size",
              parentId: "farm_crops_forage",
              question: "What is the size of the forage crops?",
              formInput: { type: "number" },
              userValue: {
                unit: ["acre", "sq feet"],
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_fv",
          parentId: "farm_crops",
          question: "Do you produce fruits and vegetables?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_fv_size",
              parentId: "farm_crops_fv",
              question: "What is the size of the fruits & vegetables crops ?",
              formInput: { type: "number" },
              userValue: {
                unit: ["acre", "sq feet"],
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_flowers",
          parentId: "farm_crops",
          question: "Do you produce flowers?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_flowers_size",
              parentId: "farm_crops_flowers",
              question: "What is the size of the flowers crops?",
              formInput: { type: "number" },
              userValue: {
                unit: ["acre", "sq feet"],
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_herbs",
          parentId: "farm_crops",
          question: "Do you produce herbs?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_herbs_size",
              parentId: "farm_crops_herbs",
              question: "What is the size of the herbs crops?",
              formInput: { type: "number" },
              userValue: {
                unit: ["acre", "sq feet"],
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_agronomy_practice",
          parentId: "farm_crops",
          question:
            "For your crop(s), have you implemented agronomy practices i.e cover crops, crops rotations, perennial crops(applies for crops) to reduce emissions & increase sequestration?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_agronomy_practice_portion",
              parentId: "farm_crops_agronomy_practice",
              question: "Did you implement this/these practice(s) for:",

              formInput: { type: "select" },
              userValue: ["A portion of them", "All of them"],
              linked_questions: [
                {
                  answerParentQuestion: "A portion of them",
                  parentId: "farm_crops_agronomy_practice_portion",
                  id: "farm_crops_agronomy_practice_portion_numb",
                  question: "% of them",

                  formInput: { type: "number" },
                  userValue: { value: "100", unit: "%" },
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_nutrient_management_practice",
          parentId: "farm_crops",
          question:
            "For your crop(s), have you implemented nutrient management i.e. adjusting application rates, slow- or controlled-release fertilizer forms or nitrification inhibitors (applies for crops) to reduce emissions & increase sequestration?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_nutrient_management_practice_portion",
              parentId: "farm_crops_nutrient_management_practice",
              question: "Did you implement this/these practice(s) for:",

              formInput: { type: "select" },
              userValue: ["A portion of them", "All of them"],
              linked_questions: [
                {
                  answerParentQuestion: "A portion of them",
                  id: "farm_crops_nutrient_management_practice_portion_numb",
                  parentId: "farm_crops_nutrient_management_practice_portion",
                  question: "% of them",

                  formInput: { type: "number" },
                  userValue: { value: "100", unit: "%" },
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_residue_management_practice",
          parentId: "farm_crops",
          question:
            "For your crop(s), have you implemented tillage and residue management i.e. reduced or no tillage (apply for crops) to reduce emissions & increase sequestration?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_residue_management_practice_portion",
              parentId: "farm_crops_residue_management_practice",
              question: "Did you implement this/these practice(s) for:",

              formInput: { type: "select" },
              userValue: ["A portion of them", "All of them"],
              linked_questions: [
                {
                  answerParentQuestion: "A portion of them",
                  id: "farm_crops_residue_management_practice_portion_numb",
                  parentId: "farm_crops_residue_management_practice_portion",
                  question: "% of them",

                  formInput: { type: "number" },
                  userValue: { value: "100", unit: "%" },
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_water_management_practice",
          parentId: "farm_crops",
          question:
            "For your crop(s), have you implemented water management i.e. more effective irrigation measures (applies for crops) to reduce emissions & increase sequestration?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_water_management_practice_portion",
              parentId: "farm_crops_water_management_practice",
              question: "Did you implement this/these practice(s) for:",

              formInput: { type: "select" },
              userValue: ["A portion of them", "All of them"],
              linked_questions: [
                {
                  answerParentQuestion: "A portion of them",
                  id: "farm_crops_water_management_practice_portion_numb",
                  parentId: "farm_crops_water_management_practice_portion",
                  question: "% of them",

                  formInput: { type: "number" },
                  userValue: { value: "100", unit: "%" },
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_land_use_change_practice",
          parentId: "farm_crops",
          question:
            "For your crop(s), have you implemented Set aside and LUC (land-use change) i.e. allow or encourage the reversion of cropland to another land cover, typically one similar to the native vegetation. (apply for crops) to reduce emissions & increase sequestration?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_land_use_change_practice_portion",
              parentId: "farm_crops_land_use_change_practice",
              question: "Did you implement this/these practice(s) for:",

              formInput: { type: "select" },
              userValue: ["A portion of them", "All of them"],
              linked_questions: [
                {
                  answerParentQuestion: "A portion of them",
                  id: "farm_crops_land_use_change_practice_portion_numb",
                  parentId: "farm_crops_land_use_change_practice_portion",
                  question: "% of them",

                  formInput: { type: "number" },
                  userValue: { value: "100", unit: "%" },
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_agroforestry_practice",
          parentId: "farm_crops",
          question:
            "For your crop(s), have you implemented agro forestry i.e. production of livestock or food crops on land that also grows trees for timber, fire- wood, or other tree products (applies for crops) to reduce emissions & increase sequestration?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_crops_agroforestry_practice",
              id: "farm_crops_agroforestry_practice_portion",
              question: "Did you implement this/these practice(s) for:",

              formInput: { type: "select" },
              userValue: ["A portion of them", "All of them"],
              linked_questions: [
                {
                  answerParentQuestion: "A portion of them",
                  parentId: "farm_crops_agroforestry_practice_portion",
                  id: "farm_crops_agroforestry_practice_portion_numb",
                  question: "% of them",

                  formInput: { type: "number" },
                  userValue: { value: "100", unit: "%" },
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          id: "farm_crops_degraded_lands_restoration_practice",
          parentId: "farm_crops",
          question:
            "For your crop(s), have you implemented restoration (applies to degraded lands) to reduce emissions & increase sequestration?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_crops_degraded_lands_restoration_practice",
              id: "farm_crops_degraded_lands_restoration_practice_size",
              question: "What is the size of your degraded lands ? ",
              formInput: { type: "number" },
              userValue: {
                unit: ["acre", "sq feet"],
              },
            },
          ],
        },

        {
          answerParentQuestion: true,
          id: "farm_crops_manure_practice",
          parentId: "farm_crops",
          question:
            "For your crop(s), do you apply manure/biosolids to reduce emissions & increase sequestration?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_crops_manure_practice",
              id: "farm_crops_manure_practice_size",
              question: "What is the size of lands where you applied manure? ",
              formInput: { type: "number" },
              userValue: {
                unit: ["acre", "sq feet"],
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_crops",
          bloc_name: "Fertilizer",
          id: "farm_crops_fertilizer",
          question: "Do you apply synthetic fertilizer?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              id: "farm_crops_fertilizer_ammonia_anhydrous",
              parentId: "farm_crops_fertilizer",
              question: "Do you use ammonia anhydrous ?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_ammonia_anhydrous",
                  id: "farm_crops_fertilizer_ammonia_anhydrous_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammonia anhydrous did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              id: "farm_crops_fertilizer_ammonia_aqua",
              parentId: "farm_crops_fertilizer",
              question: "Do you use ammonia aqua ?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_ammonia_aqua",
                  id: "farm_crops_fertilizer_ammonia_aqua_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammonia aqua did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_ammonia_nitrate",
              question: "Do you use ammonia nitrate ?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_ammonia_nitrate",
                  id: "farm_crops_fertilizer_ammonia_nitrate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammonia nitrate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_ammonium_nitrate_limestone_mixtures",
              question: "Do you use ammonium nitrate limestone mixtures ?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId:
                    "farm_crops_fertilizer_ammonium_nitrate_limestone_mixtures",
                  id: "farm_crops_fertilizer_ammonium_nitrate_limestone_mixtures_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammonium nitrate limestone mixtures did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_ammonium_sulfate",
              question: "Do you use ammonium sulfate ?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_ammonium_sulfate",
                  id: "farm_crops_fertilizer_ammonium_sulfate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammonium sulfate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_ammonium_sulfate_nitrate",
              question: "Do you use ammonium sulfate nitrate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_ammonium_sulfate_nitrate",
                  id: "farm_crops_fertilizer_ammonium_sulfate_nitrate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammonium sulfate nitrate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_calcium_cyanamide",
              question: "Do you use calcium cyanamide?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  id: "farm_crops_fertilizer_calcium_cyanamide_cons",
                  parentId: "farm_crops_fertilizer_calcium_cyanamide",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of calcium cyanamide did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_calcium_nitrate",
              question: "Do you use calcium nitrate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  id: "farm_crops_fertilizer_calcium_nitrate_cons",
                  parentId: "farm_crops_fertilizer_calcium_nitrate",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of calcium nitrate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_nitrogen_solutions",
              question: "Do you use nitrogen solutions?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_nitrogen_solutions",
                  id: "farm_crops_fertilizer_nitrogen_solutions_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of nitrogen solutions  did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_sodium_nitrate",
              question: "Do you use sodium nitrate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_sodium_nitrate",
                  id: "farm_crops_fertilizer_sodium_nitrate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of sodium nitrate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_urea",
              question: "Do you use urea?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_urea",
                  id: "farm_crops_fertilizer_urea_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of urea did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_urea_form",
              question: "Do you use urea form?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_urea_form",
                  id: "farm_crops_fertilizer_urea_form_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of urea form did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },

            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_bone_meal",
              question: "Do you use bone meal?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_bone_meal",
                  id: "farm_crops_fertilizer_bone_meal_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of bone meal did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },

            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_ammoniated_superphosphate",
              question: "Do you use ammoniated superphosphate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_ammoniated_superphosphate",
                  id: "farm_crops_fertilizer_ammoniated_superphosphate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammoniated superphosphate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_ammonium_phosphate_nitrate",
              question: "Do you use ammonium phosphate nitrate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_ammonium_phosphate_nitrate",
                  id: "farm_crops_fertilizer_ammonium_phosphate_nitrate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammonium phosphate nitrate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_ammonium_phosphate_sulfate",
              question: "Do you use ammonium phosphate sulfate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_ammonium_phosphate_sulfate",
                  id: "farm_crops_fertilizer_ammonium_phosphate_sulfate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of ammonium phosphate sulfate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_diammonium_phosphate",
              question: "Do you use diammonium phosphate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_diammonium_phosphate",
                  id: "farm_crops_fertilizer_diammonium_phosphate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of diammonium phosphate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_monoammonium_phosphate",
              question: "Do you use monoammonium phosphate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_monoammonium_phosphate",
                  id: "farm_crops_fertilizer_monoammonium_phosphate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of monoammonium phosphate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_nitric_phosphate",
              question: "Do you use nitric phosphate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_nitric_phosphate",
                  id: "farm_crops_fertilizer_nitric_phosphate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of nitric phosphate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_nitrate_of_soda_potash",
              question: "Do you use Nitrate of soda potash?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_nitrate_of_soda_potash",
                  id: "farm_crops_fertilizer_nitrate_of_soda_potash_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of Nitrate of soda potash did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_crops_fertilizer",
              id: "farm_crops_fertilizer_potassium_nitrate",
              question: "Do you use Potassium nitrate?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_crops_fertilizer_potassium_nitrate",
                  id: "farm_crops_fertilizer_potassium_nitrate_cons",
                  question:
                    "During the period of time indicated at the beginning of this questionnaire, how many tons of potassium nitrate did you apply?",

                  formInput: { type: "number" },
                  userValue: { value: 0, unit: "ton" },
                },
              ],
            },
          ],
        },
      ],
    },

    {
      id: "farm_animals",
      bloc_name: "Animals",
      question: "Do you produce animals?",
      formInput: { type: "checkbox" },
      userValue: false,
      linked_questions: [
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_dairy_cattle",
          question: "Do you produce dairy cattle ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_dairy_cattle",
              id: "farm_animals_dairy_cattle_rep12",
              question:
                "Do you have replacements 0-12 months composing your dairy cattle in the time frame reported? NB: A portion of the offspring are retained to replace mature cows that die or are removed from the herd (culled) each year. Those represents a very fast movement of cattle called 'replacements'.",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_dairy_cattle_rep12",
                  id: "farm_animals_dairy_cattle_rep12_numb",
                  question:
                    "How many heads of replacements 0-12 months do you farm? NB: in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_dairy_cattle",
              id: "farm_animals_dairy_cattle_rep24",
              question:
                "Do you have replacements 12-24 months composing your dairy cattle in the time frame reported? NB:A portion of the offspring are retained to replace mature cows that die or are removed from the herd (culled) each year. Those represents a very fast movement of cattle called 'replacements'.",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_dairy_cattle_rep24",
                  id: "farm_animals_dairy_cattle_rep24_numb",
                  question:
                    "How many heads of replacements 12-24 months do you farm? NB:in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_dairy_cattle",
              id: "farm_animals_dairy_cattle_matur",
              question:
                "Do you have mature cows composing your dairy cattle in the time frame reported?",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_dairy_cattle_matur",
                  id: "farm_animals_dairy_cattle_matur_numb",
                  question:
                    "How many heads of mature cows do you farm? NB:in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_dairy_cattle",
              id: "farm_animals_dairy_cattle_feeding_practice",
              question:
                "For your dairy cattle, have you improved feeding practice e.g. replacing roughage with concentrate, feeding, extra dietary oil",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_dairy_cattle_feeding_practice",
                  id: "farm_animals_dairy_cattle_feeding_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId:
                        "farm_animals_dairy_cattle_feeding_practice_portion",
                      id: "farm_animals_dairy_cattle_feeding_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_dairy_cattle",
              id: "farm_animals_dairy_cattle_specific_agent_practice",
              question:
                "For your dairy cattle, do you use specific agents and dietary additives e.g. bST, growth hormones, ionophores, propionate precursors",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_dairy_cattle_specific_agent_practice",
                  id: "farm_animals_dairy_cattle_specific_agent_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId:
                        "farm_animals_dairy_cattle_specific_agent_practice_portion",
                      id: "farm_animals_dairy_cattle_specific_agent_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_dairy_cattle",
              id: "farm_animals_dairy_cattle_animal_breeding_practice",
              question:
                "For your dairy cattle, do you improved Long term structural/management and animal breeding e.g. lifetime management of beef cattle, improved productivity through animal breeding",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId:
                    "farm_animals_dairy_cattle_animal_breeding_practice",
                  id: "farm_animals_dairy_cattle_animal_breeding_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId:
                        "farm_animals_dairy_cattle_animal_breeding_practice_portion",
                      id: "farm_animals_dairy_cattle_animal_breeding_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_beef_cattle",
          question: "Do you produce beef cattle ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_rep12",
              question:
                "Do you have replacements 0-12 months composing your beef cattle in the time frame reported? NB:A portion of the offspring are retained to replace mature cows that die or are removed from the herd (culled) each year. Those represents a very fast movement of cattle called 'replacements'.",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_rep12",
                  id: "farm_animals_beef_cattle_rep12_numb",
                  question:
                    "How many heads of replacements 0-12 months do you farm? NB: in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_rep24",
              question:
                "Do you have replacements 12-24 months composing your beef cattle in the time frame reported? NB:A portion of the offspring are retained to replace mature cows that die or are removed from the herd (culled) each year. Those represents a very fast movement of cattle called 'replacements'.",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_rep24",
                  id: "farm_animals_beef_cattle_rep24_numb",
                  question:
                    "How many heads of replacements 12-24 months do you farm? NB: in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_matur",
              question:
                "Do you have mature cows composing your beef cattle in the time frame reported? ",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_matur",
                  id: "farm_animals_beef_cattle_matur_numb",
                  question:
                    "How many heads of mature cows do you farm? NB: in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_weanling",
              question:
                "Do you have weanling system steers/heifers composing your beef cattle in the time frame reported? ",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_weanling",
                  id: "farm_animals_beef_cattle_weanling_numb",
                  question:
                    "How many heads of weanling system steers/heifers do you farm? NB: in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_yearling",
              question:
                "Do you have yearling system steers/heifers composing your beef cattle in the time frame reported? ",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_yearling",
                  id: "farm_animals_beef_cattle_yearling_numb",
                  question:
                    "How many heads of yearling system steers/heifers do you farm? NB: in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_bulls",
              question:
                "Do you have bulls composing your beef cattle in the time frame reported? ",

              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_bulls",
                  id: "farm_animals_beef_cattle_bulls_numb",
                  question:
                    "How many heads of bulls do you farm? NB: in the time frame reported",
                  formInput: { type: "number" },
                  userValue: {
                    value: 0,
                    unit: " ",
                  },
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_feeding_practice",
              question:
                "For your beef cattle, have you improved feeding practice e.g. replacing roughage with concentrate, feeding, extra dietary oil",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_feeding_practice",
                  id: "farm_animals_beef_cattle_feeding_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId:
                        "farm_animals_beef_cattle_feeding_practice_portion",
                      id: "farm_animals_beef_cattle_feeding_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_specific_agent_practice",
              question:
                "For your beef cattle, do you use specific agents and dietary additives e.g. bST, growth hormones, ionophores, propionate precursors",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_specific_agent_practice",
                  id: "farm_animals_beef_cattle_specific_agent_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId:
                        "farm_animals_beef_cattle_specific_agent_practice_portion",
                      id: "farm_animals_beef_cattle_specific_agent_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_beef_cattle",
              id: "farm_animals_beef_cattle_breeding_practice",
              index_id: 126,
              question:
                "For your beef cattle, do you improved Long term structural/management and animal breeding e.g. lifetime management of beef cattle, improved productivity through animal breeding",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_beef_cattle_breeding_practice",
                  id: "farm_animals_beef_cattle_breeding_practice_portion",
                  index_id: 127,
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId:
                        "farm_animals_beef_cattle_breeding_practice_portion",
                      id: "farm_animals_beef_cattle_breeding_practice_portion_numb",
                      index_id: 127,
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_sheeps",
          question: "Do you produce sheep?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_sheeps",
              id: "farm_animals_sheeps_numb",
              question:
                "How many heads of sheep do you farm? NB: in the time frame reported",

              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: " ",
              },
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_sheeps",
              id: "farm_animals_sheeps_feeding_practice",
              question:
                "For your sheep, have you improved feeding practice e.g. replacing roughage with concentrate, feeding, extra dietary oil",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_sheeps_feeding_practice",
                  id: "farm_animals_sheeps_feeding_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId: "farm_animals_sheeps_feeding_practice_portion",
                      id: "farm_animals_sheeps_feeding_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_sheeps",
              id: "farm_animals_sheeps_specific_agent_practice",
              question:
                "For your sheep, do you use specific agents and dietary additives e.g. bST, growth hormones, ionophores, propionate precursors",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_sheeps_specific_agent_practice",
                  id: "farm_animals_sheeps_specific_agent_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId:
                        "farm_animals_sheeps_specific_agent_practice_portion",
                      id: "farm_animals_sheeps_specific_agent_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
            {
              answerParentQuestion: true,
              parentId: "farm_animals_sheeps",
              id: "farm_animals_sheeps_breeding_practice",
              question:
                "For your sheep, do you improved Long term structural/management and animal breeding e.g. lifetime management of beef cattle, improved productivity through animal breeding",
              formInput: { type: "checkbox" },
              userValue: false,
              linked_questions: [
                {
                  answerParentQuestion: true,
                  parentId: "farm_animals_sheeps_breeding_practice",
                  id: "farm_animals_sheeps_breeding_practice_portion",
                  question: "Did you implement this/these practice(s) for:",

                  formInput: { type: "select" },
                  userValue: ["A portion of them", "All of them"],
                  linked_questions: [
                    {
                      answerParentQuestion: "A portion of them",
                      parentId: "farm_animals_sheeps_breeding_practice_portion",
                      id: "farm_animals_sheeps_breeding_practice_portion_numb",
                      question: "% of them",

                      formInput: { type: "number" },
                      userValue: { value: "100", unit: "%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_goats",
          question: "Do you produce goats ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_goats",
              id: "farm_animals_goats_numb",
              question:
                "How many heads of goats do you farm? NB: in the time frame reported",

              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: " ",
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_swine",
          question: "Do you produce swine ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_swine",
              id: "farm_animals_swine_numb",
              question:
                "How many heads of swine do you farm? NB: in the time frame reported",

              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: " ",
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_horses",
          question: "Do you produce horses ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_horses",
              id: "farm_animals_horses_numb",
              question:
                "How many heads of horses do you farm? NB: in the time frame reported",

              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: " ",
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_mules",
          question: "Do you produce mules ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_mules",
              id: "farm_animals_mules_numb",
              question:
                "How many heads of mules do you farm? NB: in the time frame reported",

              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: " ",
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_water_buffalo",
          question: "Do you produce water buffalo ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_water_buffalo",
              id: "farm_animals_water_buffalo_numb",
              question:
                "How many heads of water buffalo do you farm? NB: in the time frame reported",

              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: " ",
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_poultry",
          question: "Do you produce poultry ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_poultry",
              id: "farm_animals_poultry_numb",
              question:
                "How many heads of poultry do you farm? NB: in the time frame reported",

              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: " ",
              },
            },
          ],
        },
        {
          answerParentQuestion: true,
          parentId: "farm_animals",
          id: "farm_animals_american_bison",
          question: "Do you produce american bison ?",
          formInput: { type: "checkbox" },
          userValue: false,
          linked_questions: [
            {
              answerParentQuestion: true,
              parentId: "farm_animals_american_bison",
              id: "farm_animals_american_bison_numb",
              question:
                "How many heads of american bison do you farm? NB: in the time frame reported",

              formInput: { type: "number" },
              userValue: {
                value: 0,
                unit: " ",
              },
            },
          ],
        },
      ],
    },
  ],
  auth: {},
};

export default listOfQuestions;
