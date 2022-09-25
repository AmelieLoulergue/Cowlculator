import reductionEF_coeff from "../coeff/reductionEF_coeff.json";
import regions from "../coeff/regions.json";
import * as allFunctions from "./calculs/exportCalculsFunctions";

function calculs({ datasForm, results, setResults }) {
  console.log({ datasForm });
  const startDate = datasForm.find(
    (data) => data.id === "start_date"
  )?.response;

  //PERIOD SELECTED

  const endDate = datasForm.find((data) => data.id === "end_date")?.response;
  const state = datasForm.find((data) => data.id === "farm_state")?.response;
  // check on the existence of the 2 dates
  let time = 0;
  if (startDate && endDate) {
    time = allFunctions.funcTime({ startDate, endDate });
  }

  // ELECTRICITY
  const elec_total = datasForm.find(
    (data) => data.id === "elec_total"
  )?.response;
  const elec_generator = datasForm.find(
    (data) => data.id === "elec_generator"
  )?.response;
  const elec_generator_prod = datasForm.find(
    (data) => data.id === "elec_generator_prod"
  )?.response;

  // check on the existence of state value && elec_total
  let elecCO2 = 0;
  if (state && elec_total) {
    elecCO2 = allFunctions.funcElec({
      elec_total,
      elec_generator,
      elec_generator_prod,
      state,
    });
  }

  // GAS
  const gas_butane_cons = datasForm.find(
    (data) => data.id === "gas_butane_cons"
  )?.response;
  const gas_propane_cons = datasForm.find(
    (data) => data.id === "gas_propane_cons"
  )?.response;
  const gas_mix_cons = datasForm.find(
    (data) => data.id === "gas_mix_cons"
  )?.response;
  // check on the existence of at least one of the 3 values
  let gasCO2 = 0;
  if (gas_butane_cons || gas_propane_cons || gas_mix_cons) {
    gasCO2 = allFunctions.funcGas({
      gas_butane_cons,
      gas_propane_cons,
      gas_mix_cons,
    });
  }
  // NATURAL GAS
  const natgas = datasForm.find((data) => data.id === "natgas")?.response;
  const natgas_cons = datasForm.find(
    (data) => data.id === "natgas_cons"
  )?.response;
  // check on the existence of natgas value && natgas_cons
  let natGasCO2 = 0;
  if (natgas && natgas_cons) {
    natGasCO2 = allFunctions.funcNatGas({
      natgas_cons,
    });
  }

  // FUEL
  // CARS CHECK IF USE TRUE && DIESEL OR GASOLINE USE TRUE
  const vehicles_type_cars = datasForm.find(
    (data) => data.id === "vehicles_type_cars"
  )?.response;
  const vehicles_type_cars_gasoline = datasForm.find(
    (data) => data.id === "vehicles_type_cars_gasoline"
  )?.response;
  const vehicles_type_cars_diesel = datasForm.find(
    (data) => data.id === "vehicles_type_cars_diesel"
  )?.response;

  // TRUCKS CHECK IF USE TRUE && DIESEL OR GASOLINE USE TRUE
  const vehicles_type_trucks = datasForm.find(
    (data) => data.id === "vehicles_type_trucks"
  )?.response;
  const vehicles_type_trucks_gasoline = datasForm.find(
    (data) => data.id === "vehicles_type_trucks_gasoline"
  )?.response;
  const vehicles_type_trucks_diesel = datasForm.find(
    (data) => data.id === "vehicles_type_trucks_diesel"
  )?.response;

  // TRACTORS CHECK IF USE TRUE && DIESEL OR GASOLINE USE TRUE
  const vehicles_type_tractors = datasForm.find(
    (data) => data.id === "vehicles_type_tractors"
  )?.response;
  const vehicles_type_tractors_gasoline = datasForm.find(
    (data) => data.id === "vehicles_type_tractors_gasoline"
  )?.response;
  const vehicles_type_tractors_diesel = datasForm.find(
    (data) => data.id === "vehicles_type_tractors_diesel"
  )?.response;

  // check on the use of at least one of the 3 vehicles
  let fuelCO2 = 0;
  if (
    (vehicles_type_cars &&
      (vehicles_type_cars_diesel || vehicles_type_cars_gasoline)) ||
    (vehicles_type_tractors &&
      (vehicles_type_tractors_diesel || vehicles_type_tractors_gasoline)) ||
    (vehicles_type_trucks &&
      (vehicles_type_trucks_diesel || vehicles_type_trucks_gasoline))
  ) {
    const vehicles_type_cars_diesel_cons = datasForm.find(
      (data) => data.id === "vehicles_type_cars_diesel_cons"
    )?.response;
    const vehicles_type_cars_gasoline_cons = datasForm.find(
      (data) => data.id === "vehicles_type_cars_gasoline_cons"
    )?.response;
    const vehicles_type_trucks_diesel_cons = datasForm.find(
      (data) => data.id === "vehicles_type_trucks_diesel_cons"
    )?.response;
    const vehicles_type_trucks_gasoline_cons = datasForm.find(
      (data) => data.id === "vehicles_type_trucks_gasoline_cons"
    )?.response;
    const vehicles_type_tractors_diesel_cons = datasForm.find(
      (data) => data.id === "vehicles_type_tractors_diesel_cons"
    )?.response;
    const vehicles_type_tractors_gasoline_cons = datasForm.find(
      (data) => data.id === "vehicles_type_tractors_gasoline_cons"
    )?.response;
    fuelCO2 = allFunctions.funcFuel({
      vehicles_type_cars_diesel_cons,
      vehicles_type_cars_gasoline_cons,
      vehicles_type_trucks_diesel_cons,
      vehicles_type_trucks_gasoline_cons,
      vehicles_type_tractors_diesel_cons,
      vehicles_type_tractors_gasoline_cons,
    });
  }

  // WATER
  const water_drink_cons = datasForm.find(
    (data) => data.id === "water_drink_cons"
  )?.response;
  const water_waste_cons = datasForm.find(
    (data) => data.id === "water_waste_cons"
  )?.response;
  let water = 0;
  if (water_drink_cons || water_waste_cons) {
    water = allFunctions.funcWater({ water_drink_cons, water_waste_cons });
  }

  // OTHER
  const others = datasForm.filter((element) => element.id.includes("other"));
  let other = allFunctions.funcOther({ others });
  if (others.length > 0) {
    other = allFunctions.funcOther({ others });
  }

  // Emissions from enteric fermentation of dairies, beed and sheep
  // Emissions from manure of dairies, beed and sheep
  let entericFermentationCO2 = 0;
  let manureCO2 = 0;
  let numbTotalBeefDairy = 0;
  let mitigationEFImpFeedDairy = [0, 0];
  let mitigationEFImpFeedBeef = [0, 0];
  let mitigationEFImpFeedSheep = [0, 0];
  let mitigationEFAdditiveDairy = [0, 0];
  let mitigationEFAdditiveBeef = [0, 0];
  let mitigationEFAdditiveSheep = [0, 0];
  let mitigationEFLTBreedingDairy = [0, 0];
  let mitigationEFLTBreedingBeef = [0, 0];
  let mitigationEFLTBreedingSheep = [0, 0];
  let carbonCreditsAnimals = 0;
  if (datasForm.find((element) => element.id === "farm_animals")?.response) {
    entericFermentationCO2 = allFunctions.funcAnimalsEF({
      datasForm,
      regions,
      time: time,
      state,
    });
    manureCO2 = allFunctions.funcAnimalsManure({
      datasForm,
      time: time,
    });

    // Extract EFDairy, EFBeef, EFSheep
    let EFDairy =
      results &&
      results.entericFermentationCO2 &&
      results.entericFermentationCO2.EFDairy;
    let EFBeef =
      results &&
      results.entericFermentationCO2 &&
      results.entericFermentationCO2.EFBeef;
    let EFSheep =
      results &&
      results.entericFermentationCO2 &&
      results.entericFermentationCO2.EFSheep;

    if (EFDairy || EFBeef || EFSheep) {
      numbTotalBeefDairy = allFunctions.funcNumbTotalBeefDairy({ datasForm });
      mitigationEFImpFeedDairy = allFunctions.funcMitigationsImpFeedDairy({
        datasForm,
        EFDairy,
        cattleDairy: numbTotalBeefDairy?.cattleDairy,
      });
      mitigationEFImpFeedBeef = allFunctions.funcMitigationsImpFeedBeef({
        datasForm,
        EFBeef,
        cattleBeef: numbTotalBeefDairy?.cattleBeef,
      });
      mitigationEFImpFeedSheep = allFunctions.funcMitigationsImpFeedSheep({
        datasForm,
        EFSheep,
      });
      mitigationEFAdditiveDairy = allFunctions.funcMitigationsAdditiveDairy({
        datasForm,
        reductionEF_coeff,
        EFDairy,
        cattleDairy: numbTotalBeefDairy?.cattleDairy,
      });
      mitigationEFAdditiveBeef = allFunctions.funcMitigationsAdditiveBeef({
        datasForm,
        EFBeef,
        cattleBeef: numbTotalBeefDairy?.cattleBeef,
      });
      mitigationEFAdditiveSheep = allFunctions.funcMitigationsAdditiveSheep({
        datasForm,
        EFSheep,
      });
      mitigationEFLTBreedingDairy = allFunctions.funcMitigationsLTBreedingDairy(
        {
          datasForm,
          EFDairy,
          cattleDairy: numbTotalBeefDairy?.cattleDairy,
        }
      );
      mitigationEFLTBreedingBeef = allFunctions.funcMitigationsLTBreedingBeef({
        datasForm,
        EFBeef,
        cattleBeef: numbTotalBeefDairy?.cattleBeef,
      });
      mitigationEFLTBreedingSheep = allFunctions.funcMitigationsLTBreedingSheep(
        {
          datasForm,
          EFSheep,
        }
      );

      carbonCreditsAnimals = allFunctions.funcCarbonCreditsAnimals({
        mitigationEFImpFeedDairy,
        mitigationEFImpFeedBeef,
        mitigationEFImpFeedSheep,
        mitigationEFAdditiveBeef,
        mitigationEFAdditiveDairy,
        mitigationEFAdditiveSheep,
        mitigationEFLTBreedingBeef,
        mitigationEFLTBreedingDairy,
        mitigationEFLTBreedingSheep,
      });
    }
// FERTILIZER

const fertilizers = datasForm.filter((element) => element.id.includes("fertilizer"));
  if (fertilizers.length > 0) {
    setResults({
      ...results,
      fertilizer: allFunctions.funcFertilizer({ fertilizers }),
    });
  }

    // Mitigations from practices implemented in crops (t CO2e/time frame)
    // detailed, last values. First value=total
  }
  let carbonCreditsCrops = 0;
  let cropsMitigations = 0;
  let fertilizer = 0;
  if (datasForm.find((element) => element.id === "farm_crops")?.response) {
    cropsMitigations = allFunctions.funcCropsMitigations({
      datasForm,
      state,
      time: time,
    });
    carbonCreditsCrops = allFunctions.funcCarbonCreditsCrops({
      cropsMitigations,
    });
  }
  const farm_crops_fertilizer = datasForm.filter((element) =>
    element.id.includes("farm_crops_fertilizer")
  );
  if (
    datasForm.find((element) => element.id === "farm_crops_fertilizer")
      ?.response &&
    farm_crops_fertilizer.length > 0
  ) {
    fertilizer = allFunctions.funcFertilizer({ farm_crops_fertilizer });
  }
  // TO UPDATE WITH NEW OBJECT AMELIE
  // let carbonCreditsCrops = 0;
  // if (results && results.cropsMitigations) {
  //   setResults({
  //     ...results,
  //     carbonCreditsCrops: allFunctions.funcCarbonCreditsCrops({
  //       cropsMitigations: results.cropsMitigations,
  //     }),
  //   });
  // }
  // if (results && results.animalsMitigations) {
  //   setResults({
  //     ...results,
  //     carbonCreditsAnimals: allFunctions.funcCarbonCreditsAnimals({
  //       animalsMitigations: results.animalsMitigations,
  //     }),
  //   });
  // }

  setResults({
    ...results,
    time: time,
    elecCO2: elecCO2,
    water: water,
    gasCO2: gasCO2,
    natGasCO2: natGasCO2,
    fuelCO2,
    other: other,
    entericFermentationCO2: entericFermentationCO2,
    manureCO2: manureCO2,
    carbonCreditsAnimals: carbonCreditsAnimals,
    animals: {
      mitigationEFImpFeedDairy,
      mitigationEFImpFeedBeef,
      mitigationEFImpFeedSheep,
      mitigationEFAdditiveBeef,
      mitigationEFAdditiveDairy,
      mitigationEFAdditiveSheep,
      mitigationEFLTBreedingBeef,
      mitigationEFLTBreedingDairy,
      mitigationEFLTBreedingSheep,
    },
    carbonCreditsCrops: carbonCreditsCrops,
    cropsMitigations: cropsMitigations,
    totalCarbonCredits: carbonCreditsCrops + carbonCreditsAnimals,
    fertilizer: fertilizer,
    CO2emmited:
      entericFermentationCO2 && cropsMitigations
        ? (elecCO2 +
            natGasCO2 +
            gasCO2 +
            water +
            fuelCO2 +
            other +
            entericFermentationCO2?.EFtotal +
            manureCO2 +
            fertilizer -
            (mitigationEFImpFeedDairy[0] +
              mitigationEFImpFeedBeef[0] +
              mitigationEFImpFeedSheep[0] +
              mitigationEFAdditiveBeef[0] +
              mitigationEFAdditiveDairy[0] +
              mitigationEFAdditiveSheep[0] +
              mitigationEFLTBreedingBeef[0] +
              mitigationEFLTBreedingDairy[0] +
              mitigationEFLTBreedingSheep[0] +
              cropsMitigations?.mitigationCropsTotal)) /
          time
        : entericFermentationCO2
        ? (elecCO2 +
            natGasCO2 +
            gasCO2 +
            water +
            fuelCO2 +
            other +
            entericFermentationCO2?.EFtotal +
            manureCO2 +
            fertilizer -
            (mitigationEFImpFeedDairy[0] +
              mitigationEFImpFeedBeef[0] +
              mitigationEFImpFeedSheep[0] +
              mitigationEFAdditiveBeef[0] +
              mitigationEFAdditiveDairy[0] +
              mitigationEFAdditiveSheep[0] +
              mitigationEFLTBreedingBeef[0] +
              mitigationEFLTBreedingDairy[0] +
              mitigationEFLTBreedingSheep[0])) /
          time
        : cropsMitigations
        ? (elecCO2 +
            natGasCO2 +
            gasCO2 +
            water +
            fuelCO2 +
            other +
            manureCO2 +
            fertilizer -
            (mitigationEFImpFeedDairy[0] +
              mitigationEFImpFeedBeef[0] +
              mitigationEFImpFeedSheep[0] +
              mitigationEFAdditiveBeef[0] +
              mitigationEFAdditiveDairy[0] +
              mitigationEFAdditiveSheep[0] +
              mitigationEFLTBreedingBeef[0] +
              mitigationEFLTBreedingDairy[0] +
              mitigationEFLTBreedingSheep[0] +
              cropsMitigations?.mitigationCropsTotal)) /
          time
        : (elecCO2 +
            natGasCO2 +
            gasCO2 +
            water +
            fuelCO2 +
            other +
            manureCO2 +
            fertilizer -
            (mitigationEFImpFeedDairy[0] +
              mitigationEFImpFeedBeef[0] +
              mitigationEFImpFeedSheep[0] +
              mitigationEFAdditiveBeef[0] +
              mitigationEFAdditiveDairy[0] +
              mitigationEFAdditiveSheep[0] +
              mitigationEFLTBreedingBeef[0] +
              mitigationEFLTBreedingDairy[0] +
              mitigationEFLTBreedingSheep[0])) /
          time,
    CO2mitigated: cropsMitigations
      ? (mitigationEFImpFeedDairy[0] +
          mitigationEFImpFeedBeef[0] +
          mitigationEFImpFeedSheep[0] +
          mitigationEFAdditiveBeef[0] +
          mitigationEFAdditiveDairy[0] +
          mitigationEFAdditiveSheep[0] +
          mitigationEFLTBreedingBeef[0] +
          mitigationEFLTBreedingDairy[0] +
          mitigationEFLTBreedingSheep[0] +
          cropsMitigations?.mitigationCropsTotal) /
        time
      : (mitigationEFImpFeedDairy[0] +
          mitigationEFImpFeedBeef[0] +
          mitigationEFImpFeedSheep[0] +
          mitigationEFAdditiveBeef[0] +
          mitigationEFAdditiveDairy[0] +
          mitigationEFAdditiveSheep[0] +
          mitigationEFLTBreedingBeef[0] +
          mitigationEFLTBreedingDairy[0] +
          mitigationEFLTBreedingSheep[0]) /
        time,
    utilitiesGraph:
      elecCO2 / time + natGasCO2 / time + gasCO2 / time + water / time,
    fuelGraph: fuelCO2 / time,
    otherGraph: other / time,
    entericFermentationCO2Graph:
      (entericFermentationCO2.EFtotal -
        (mitigationEFImpFeedDairy[0] +
          mitigationEFImpFeedBeef[0] +
          mitigationEFImpFeedSheep[0] +
          mitigationEFAdditiveBeef[0] +
          mitigationEFAdditiveDairy[0] +
          mitigationEFAdditiveSheep[0] +
          mitigationEFLTBreedingBeef[0] +
          mitigationEFLTBreedingDairy[0] +
          mitigationEFLTBreedingSheep[0])) /
      time,
    manureCO2Graph: manureCO2 / time,
    cropsGraph: cropsMitigations
      ? (fertilizer - cropsMitigations?.mitigationCropsTotal) / time
      : fertilizer / time,
    totalEmissionsGraph: entericFermentationCO2
      ? (elecCO2 +
          natGasCO2 +
          gasCO2 +
          water +
          fuelCO2 +
          other +
          entericFermentationCO2?.EFtotal +
          manureCO2 +
          fertilizer) /
        time
      : (elecCO2 +
          natGasCO2 +
          gasCO2 +
          water +
          fuelCO2 +
          other +
          manureCO2 +
          fertilizer) /
        time,
    totalMitigatedEmissionsGraph:
      entericFermentationCO2 && cropsMitigations
        ? (elecCO2 +
            natGasCO2 +
            gasCO2 +
            water +
            fuelCO2 +
            other +
            entericFermentationCO2?.EFtotal +
            manureCO2 +
            fertilizer -
            (mitigationEFImpFeedDairy[0] +
              mitigationEFImpFeedBeef[0] +
              mitigationEFImpFeedSheep[0] +
              mitigationEFAdditiveBeef[0] +
              mitigationEFAdditiveDairy[0] +
              mitigationEFAdditiveSheep[0] +
              mitigationEFLTBreedingBeef[0] +
              mitigationEFLTBreedingDairy[0] +
              mitigationEFLTBreedingSheep[0] +
              cropsMitigations?.mitigationCropsTotal)) /
          time
        : entericFermentationCO2
        ? (elecCO2 +
            natGasCO2 +
            gasCO2 +
            water +
            fuelCO2 +
            other +
            entericFermentationCO2?.EFtotal +
            manureCO2 +
            fertilizer -
            (mitigationEFImpFeedDairy[0] +
              mitigationEFImpFeedBeef[0] +
              mitigationEFImpFeedSheep[0] +
              mitigationEFAdditiveBeef[0] +
              mitigationEFAdditiveDairy[0] +
              mitigationEFAdditiveSheep[0] +
              mitigationEFLTBreedingBeef[0] +
              mitigationEFLTBreedingDairy[0] +
              mitigationEFLTBreedingSheep[0])) /
          time
        : (elecCO2 +
            natGasCO2 +
            gasCO2 +
            water +
            fuelCO2 +
            other +
            manureCO2 +
            fertilizer -
            (mitigationEFImpFeedDairy[0] +
              mitigationEFImpFeedBeef[0] +
              mitigationEFImpFeedSheep[0] +
              mitigationEFAdditiveBeef[0] +
              mitigationEFAdditiveDairy[0] +
              mitigationEFAdditiveSheep[0] +
              mitigationEFLTBreedingBeef[0] +
              mitigationEFLTBreedingDairy[0] +
              mitigationEFLTBreedingSheep[0])) /
          time,
    totalMitigationsGraph: cropsMitigations
      ? (mitigationEFImpFeedDairy[0] +
          mitigationEFImpFeedBeef[0] +
          mitigationEFImpFeedSheep[0] +
          mitigationEFAdditiveBeef[0] +
          mitigationEFAdditiveDairy[0] +
          mitigationEFAdditiveSheep[0] +
          mitigationEFLTBreedingBeef[0] +
          mitigationEFLTBreedingDairy[0] +
          mitigationEFLTBreedingSheep[0] +
          cropsMitigations?.mitigationCropsTotal) /
        time
      : (mitigationEFImpFeedDairy[0] +
          mitigationEFImpFeedBeef[0] +
          mitigationEFImpFeedSheep[0] +
          mitigationEFAdditiveBeef[0] +
          mitigationEFAdditiveDairy[0] +
          mitigationEFAdditiveSheep[0] +
          mitigationEFLTBreedingBeef[0] +
          mitigationEFLTBreedingDairy[0] +
          mitigationEFLTBreedingSheep[0]) /
        time,
  });
}

export default calculs;

//function funcFertilizer(
