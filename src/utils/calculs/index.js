import regions from "../../coeff/regions.json";
import * as allFunctions from "./exportCalculsFunctions";
import findResponseElementById from "../global/findResponseElementById";
import funcAnimalsMitigations from "./funcAnimalsMitigations";
import saveCompletedForm from "../formFunctions/saveCompletedForm";
function calculs({
  authInformations,
  setAuthInformations,
  setResultInformations,
  setFormInformations,
}) {
  const datasForm = JSON.parse(localStorage.getItem("cowlculator"))?.find(
    (element) =>
      element.login?.userId === authInformations?.login?.userId &&
      element.loggedUser
  )?.datasForm;

  const datasFormContainIdsProvided = (array) => {
    filterElementsByIds(array);
    return array?.length <= filterElementsByIds(array)?.length;
  };
  const datasFormContainAtLeastOneOfIdsProvided = (array) => {
    filterElementsByIds(array);
    return filterElementsByIds(array).length >= 1;
  };
  const filterElementsByIds = (idsToFind) => {
    if (typeof idsToFind === "object") {
      return datasForm?.filter((element) => idsToFind?.includes(element.id));
    }
  };
  if (datasForm.length > 0) {
    const state = findResponseElementById(datasForm, "farm_state");
    // check on the existence of the 2 dates
    let time = 0;
    if (datasFormContainIdsProvided(["start_date", "end_date"])) {
      time = allFunctions.funcTime({
        startDate: findResponseElementById(datasForm, "start_date"),
        endDate: findResponseElementById(datasForm, "end_date"),
      });
    }

    // ELECTRICITY
    let elecCO2 = 0;
    if (state && datasFormContainIdsProvided(["elec_total"])) {
      elecCO2 = allFunctions.funcElec({
        elec_total: findResponseElementById(datasForm, "elec_total"),
        elec_generator: findResponseElementById(datasForm, "elec_generator"),
        elec_generator_prod: findResponseElementById(
          datasForm,
          "elec_generator_prod"
        ),
        state,
      });
    }

    // GAS
    let gasCO2 = 0;
    if (
      datasFormContainAtLeastOneOfIdsProvided([
        "gas_butane_cons",
        "gas_propane_cons",
        "gas_mix_cons",
      ])
    ) {
      gasCO2 = allFunctions.funcGas({
        gas_butane_cons: findResponseElementById(datasForm, "gas_butane_cons"),
        gas_propane_cons: findResponseElementById(
          datasForm,
          "gas_propane_cons"
        ),
        gas_mix_cons: findResponseElementById(datasForm, "gas_mix_cons"),
      });
    }
    let natGasCO2 = 0;
    if (datasFormContainIdsProvided(["natgas", "natgas_cons"])) {
      natGasCO2 = allFunctions.funcNatGas({
        natgas_cons: findResponseElementById(datasForm, "natgas_cons"),
      });
    }

    // FUEL
    let fuelCO2 = 0;
    if (
      (datasFormContainIdsProvided(["vehicles_type_cars"]) &&
        datasFormContainAtLeastOneOfIdsProvided([
          "vehicles_type_cars_diesel_cons",
          "vehicles_type_cars_gasoline_cons",
        ])) ||
      (datasFormContainIdsProvided(["vehicles_type_trucks"]) &&
        datasFormContainAtLeastOneOfIdsProvided([
          "vehicles_type_trucks_diesel_cons",
          "vehicles_type_trucks_gasoline_cons",
        ])) ||
      (datasFormContainIdsProvided(["vehicles_type_tractors"]) &&
        datasFormContainAtLeastOneOfIdsProvided([
          "vehicles_type_tractors_diesel_cons",
          "vehicles_type_tractors_gasoline_cons",
        ]))
    ) {
      fuelCO2 = allFunctions.funcFuel({
        vehicles_type_cars_diesel_cons: findResponseElementById(
          datasForm,
          "vehicles_type_cars_diesel_cons"
        ),
        vehicles_type_cars_gasoline_cons: findResponseElementById(
          datasForm,
          "vehicles_type_cars_gasoline_cons"
        ),
        vehicles_type_trucks_diesel_cons: findResponseElementById(
          datasForm,
          "vehicles_type_trucks_diesel_cons"
        ),
        vehicles_type_trucks_gasoline_cons: findResponseElementById(
          datasForm,
          "vehicles_type_trucks_gasoline_cons"
        ),
        vehicles_type_tractors_diesel_cons: findResponseElementById(
          datasForm,
          "vehicles_type_tractors_diesel_cons"
        ),
        vehicles_type_tractors_gasoline_cons: findResponseElementById(
          datasForm,
          "vehicles_type_tractors_gasoline_cons"
        ),
      });
    }
    let water = 0;
    if (
      datasFormContainAtLeastOneOfIdsProvided([
        "water_drink_cons",
        "water_waste_cons",
      ])
    ) {
      water = allFunctions.funcWater({
        water_drink_cons: findResponseElementById(
          datasForm,
          "water_drink_cons"
        ),
        water_waste_cons: findResponseElementById(
          datasForm,
          "water_waste_cons"
        ),
      });
    }
    // OTHER

    const others = datasForm?.filter((element) => element.id.includes("other"));
    let other = allFunctions.funcOther({ others });
    if (others.length > 0) {
      other = allFunctions.funcOther({ others });
    }
    // Emissions from enteric fermentation of dairies, beed and sheep
    // Emissions from manure of dairies, beed and sheep

    let entericFermentationCO2 = 0;
    let entericFermentationCO2Total = 0;
    if (datasFormContainIdsProvided(["farm_animals"])) {
      entericFermentationCO2 = allFunctions.funcAnimalsEF({
        datasForm,
        regions,
        time,
        state,
      });
      entericFermentationCO2Total = Object.values(
        entericFermentationCO2
      ).reduce((partialSum, a) => partialSum + a, 0);
    }

    let manureCO2 = 0;
    manureCO2 = allFunctions.funcAnimalsManure({
      datasForm,
      time,
    });

    let animalsMitigations = 0;
    if (entericFermentationCO2 !== 0) {
      animalsMitigations = funcAnimalsMitigations({
        datasForm,
        animalsEF: entericFermentationCO2,
      });
    }
    let carbonCreditsAnimals = 0;
    if (animalsMitigations !== 0) {
      carbonCreditsAnimals =
        allFunctions.funcCarbonCreditsAnimals(animalsMitigations);
    }

    // FERTILIZER

    const fertilizers = datasForm?.filter((element) =>
      element.id.includes("fertilizer")
    );
    const fertilizerCO2 = allFunctions.funcFertilizer({ fertilizers });

    // Mitigations from practices implemented in crops (t CO2e/time frame)
    // detailed, last values. First value=total

    let carbonCreditsCrops = 0;
    let cropsMitigations = 0;
    let cropsMitigationsTotal = 0;
    if (datasForm?.find((element) => element.id === "farm_crops")?.response) {
      cropsMitigations = allFunctions.funcCropsMitigations({
        datasForm: datasForm,
        state,
        time: time,
      });
      const { coeffs, size, ...cropMitigationsToSum } = cropsMitigations;
      cropsMitigationsTotal = Object.values(cropMitigationsToSum).reduce(
        (partialSum, a) => partialSum + a,
        0
      );
      carbonCreditsCrops = allFunctions.funcCarbonCreditsCrops({
        cropsMitigationsTotal,
      });
    }

    const totalEmissionsGraph =
      (elecCO2 +
        natGasCO2 +
        gasCO2 +
        water +
        fuelCO2 +
        other +
        entericFermentationCO2Total +
        manureCO2 +
        fertilizerCO2) /
      time;
    const CO2emmited =
      (elecCO2 +
        natGasCO2 +
        gasCO2 +
        water +
        fuelCO2 +
        other +
        entericFermentationCO2Total +
        manureCO2 +
        fertilizerCO2 -
        (animalsMitigations + cropsMitigationsTotal)) /
      time;
    const CO2mitigated = (animalsMitigations + cropsMitigationsTotal) / time;
    const totalCarbonCredits = carbonCreditsAnimals + carbonCreditsCrops;
    const utilitiesGraph =
      elecCO2 / time + natGasCO2 / time + gasCO2 / time + water / time;
    const fuelGraph = fuelCO2 / time;
    const otherGraph = other / time;
    const entericFermentationCO2Graph =
      entericFermentationCO2Total - animalsMitigations / time;
    const manureCO2Graph = manureCO2 / time;
    const cropsGraph = cropsMitigationsTotal
      ? (fertilizerCO2 - cropsMitigationsTotal) / time
      : fertilizerCO2 / time;
    saveCompletedForm({
      results: [
        ...datasForm,
        { id: "totalEmissionsGraph", response: totalEmissionsGraph },
        { id: "CO2emmited", response: CO2emmited },
        { id: "CO2mitigated", response: CO2mitigated },
        { id: "totalCarbonCredits", response: totalCarbonCredits },
        { id: "utilitiesGraph", response: utilitiesGraph },
        { id: "fuelGraph", response: fuelGraph },
        { id: "otherGraph", response: otherGraph },
        {
          id: "entericFermentationCO2Graph",
          response: entericFermentationCO2Graph,
        },
        {
          id: "manureCO2Graph",
          response: manureCO2Graph,
        },
        {
          id: "cropsGraph",
          response: cropsGraph,
        },
      ],
      authInformations,
      setAuthInformations,
      setResultInformations,
      setFormInformations,
    });
  }
}

export default calculs;
