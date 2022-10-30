import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
import regions from "../../coeff/regions.json";
import * as allFunctions from "./exportCalculsFunctions";

function calculs({ formInformations, setFormInformations }) {
  console.log(formInformations);
  const startDate = formInformations?.datasform?.find(
    (data) => data.id === "start_date"
  )?.response;

  //PERIOD SELECTED

  const endDate = formInformations?.datasform?.find(
    (data) => data.id === "end_date"
  )?.response;
  const state = formInformations?.datasform?.find(
    (data) => data.id === "farm_state"
  )?.response;
  // check on the existence of the 2 dates
  let time = 0;
  if (startDate && endDate) {
    time = allFunctions.funcTime({ startDate, endDate });
  }

  // ELECTRICITY
  const elec_total = formInformations?.datasform?.find(
    (data) => data.id === "elec_total"
  )?.response;
  const elec_generator = formInformations?.datasform?.find(
    (data) => data.id === "elec_generator"
  )?.response;
  const elec_generator_prod = formInformations?.datasform?.find(
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
  const gas_butane_cons = formInformations?.datasform?.find(
    (data) => data.id === "gas_butane_cons"
  )?.response;
  const gas_propane_cons = formInformations?.datasform?.find(
    (data) => data.id === "gas_propane_cons"
  )?.response;
  const gas_mix_cons = formInformations?.datasform?.find(
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
  const natgas = formInformations?.datasform?.find(
    (data) => data.id === "natgas"
  )?.response;
  const natgas_cons = formInformations?.datasform?.find(
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
  const vehicles_type_cars = formInformations?.datasform?.find(
    (data) => data.id === "vehicles_type_cars"
  )?.response;
  const vehicles_type_cars_gasoline = formInformations?.datasform?.find(
    (data) => data.id === "vehicles_type_cars_gasoline"
  )?.response;
  const vehicles_type_cars_diesel = formInformations?.datasform?.find(
    (data) => data.id === "vehicles_type_cars_diesel"
  )?.response;

  // TRUCKS CHECK IF USE TRUE && DIESEL OR GASOLINE USE TRUE
  const vehicles_type_trucks = formInformations?.datasform?.find(
    (data) => data.id === "vehicles_type_trucks"
  )?.response;
  const vehicles_type_trucks_gasoline = formInformations?.datasform?.find(
    (data) => data.id === "vehicles_type_trucks_gasoline"
  )?.response;
  const vehicles_type_trucks_diesel = formInformations?.datasform?.find(
    (data) => data.id === "vehicles_type_trucks_diesel"
  )?.response;

  // TRACTORS CHECK IF USE TRUE && DIESEL OR GASOLINE USE TRUE
  const vehicles_type_tractors = formInformations?.datasform?.find(
    (data) => data.id === "vehicles_type_tractors"
  )?.response;
  const vehicles_type_tractors_gasoline = formInformations?.datasform?.find(
    (data) => data.id === "vehicles_type_tractors_gasoline"
  )?.response;
  const vehicles_type_tractors_diesel = formInformations?.datasform?.find(
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
    const vehicles_type_cars_diesel_cons = formInformations?.datasform?.find(
      (data) => data.id === "vehicles_type_cars_diesel_cons"
    )?.response;
    const vehicles_type_cars_gasoline_cons = formInformations?.datasform?.find(
      (data) => data.id === "vehicles_type_cars_gasoline_cons"
    )?.response;
    const vehicles_type_trucks_diesel_cons = formInformations?.datasform?.find(
      (data) => data.id === "vehicles_type_trucks_diesel_cons"
    )?.response;
    const vehicles_type_trucks_gasoline_cons =
      formInformations?.datasform?.find(
        (data) => data.id === "vehicles_type_trucks_gasoline_cons"
      )?.response;
    const vehicles_type_tractors_diesel_cons =
      formInformations?.datasform?.find(
        (data) => data.id === "vehicles_type_tractors_diesel_cons"
      )?.response;
    const vehicles_type_tractors_gasoline_cons =
      formInformations?.datasform?.find(
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
  const water_drink_cons = formInformations?.datasform?.find(
    (data) => data.id === "water_drink_cons"
  )?.response;
  const water_waste_cons = formInformations?.datasform?.find(
    (data) => data.id === "water_waste_cons"
  )?.response;
  let water = 0;
  if (water_drink_cons || water_waste_cons) {
    water = allFunctions.funcWater({ water_drink_cons, water_waste_cons });
  }

  // OTHER
  const others = formInformations?.datasform?.filter((element) =>
    element.id.includes("other")
  );
  let other = allFunctions.funcOther({ others });
  if (others.length > 0) {
    other = allFunctions.funcOther({ others });
  }

  // Emissions from enteric fermentation of dairies, beed and sheep
  // Emissions from manure of dairies, beed and sheep
  let entericFermentationCO2 = 0;
  let entericFermentationCO2Total = 0;
  let manureCO2 = 0;
  let numbTotalBeefDairy = 0;
  let mitigationEFImpFeedDairy = 0;
  let mitigationEFImpFeedBeef = 0;
  let mitigationEFImpFeedSheep = 0;
  let mitigationEFAdditiveDairy = 0;
  let mitigationEFAdditiveBeef = 0;
  let mitigationEFAdditiveSheep = 0;
  let mitigationEFLTBreedingDairy = 0;
  let mitigationEFLTBreedingBeef = 0;
  let mitigationEFLTBreedingSheep = 0;
  let carbonCreditsAnimals = 0;
  if (
    formInformations?.datasform?.find(
      (element) => element.id === "farm_animals"
    )?.response
  ) {
    entericFermentationCO2 = allFunctions.funcAnimalsEF({
      datasForm: formInformations?.datasform,
      regions,
      time: time,
      state,
    });
    entericFermentationCO2Total = Object.values(entericFermentationCO2).reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    manureCO2 = allFunctions.funcAnimalsManure({
      datasForm: formInformations?.datasform,
      time: time,
    });

    // Extract EFDairy, EFBeef, EFSheep
    let EFDairy =
      formInformations?.results &&
      formInformations?.results.entericFermentationCO2 &&
      formInformations?.results.entericFermentationCO2.EFDairy;
    let EFBeef =
      formInformations?.results &&
      formInformations?.results.entericFermentationCO2 &&
      formInformations?.results.entericFermentationCO2.EFBeef;
    let EFSheep =
      formInformations?.results &&
      formInformations?.results.entericFermentationCO2 &&
      formInformations?.results.entericFermentationCO2.EFSheep;

    if (EFDairy || EFBeef || EFSheep) {
      numbTotalBeefDairy = allFunctions.funcNumbTotalBeefDairy({
        datasForm: formInformations?.datasform,
      });
      mitigationEFImpFeedDairy = allFunctions.funcMitigationsImpFeedDairy({
        datasForm: formInformations?.datasform,
        EFDairy,
        cattleDairy: numbTotalBeefDairy?.cattleDairy,
      });
      mitigationEFImpFeedBeef = allFunctions.funcMitigationsImpFeedBeef({
        datasForm: formInformations?.datasform,
        EFBeef,
        cattleBeef: numbTotalBeefDairy?.cattleBeef,
      });
      mitigationEFImpFeedSheep = allFunctions.funcMitigationsImpFeedSheep({
        datasForm: formInformations?.datasform,
        EFSheep,
      });
      mitigationEFAdditiveDairy = allFunctions.funcMitigationsAdditiveDairy({
        datasForm: formInformations?.datasform,
        reductionEF_coeff,
        EFDairy,
        cattleDairy: numbTotalBeefDairy?.cattleDairy,
      });
      mitigationEFAdditiveBeef = allFunctions.funcMitigationsAdditiveBeef({
        datasForm: formInformations?.datasform,
        EFBeef,
        cattleBeef: numbTotalBeefDairy?.cattleBeef,
      });
      mitigationEFAdditiveSheep = allFunctions.funcMitigationsAdditiveSheep({
        datasForm: formInformations?.datasform,
        EFSheep,
      });
      mitigationEFLTBreedingDairy = allFunctions.funcMitigationsLTBreedingDairy(
        {
          datasForm: formInformations?.datasform,
          EFDairy,
          cattleDairy: numbTotalBeefDairy?.cattleDairy,
        }
      );
      mitigationEFLTBreedingBeef = allFunctions.funcMitigationsLTBreedingBeef({
        datasForm: formInformations?.datasform,
        EFBeef,
        cattleBeef: numbTotalBeefDairy?.cattleBeef,
      });
      mitigationEFLTBreedingSheep = allFunctions.funcMitigationsLTBreedingSheep(
        {
          datasForm: formInformations?.datasform,
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

    const fertilizers = formInformations?.datasform?.filter((element) =>
      element.id.includes("fertilizer")
    );
    if (fertilizers.length > 0) {
      setFormInformations({
        ...formInformations,
        results: {
          ...formInformations?.results,
          fertilizer: allFunctions.funcFertilizer({ fertilizers }),
        },
      });
    }

    // Mitigations from practices implemented in crops (t CO2e/time frame)
    // detailed, last values. First value=total
  }
  let carbonCreditsCrops = 0;
  let cropsMitigations = 0;
  let cropsMitigationsTotal = 0;
  let fertilizer = 0;
  if (
    formInformations?.datasform?.find((element) => element.id === "farm_crops")
      ?.response
  ) {
    cropsMitigations = allFunctions.funcCropsMitigations({
      datasForm: formInformations?.datasform,
      state,
      time: time,
    });

    cropsMitigationsTotal = Object.values(cropsMitigations).reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    carbonCreditsCrops = allFunctions.funcCarbonCreditsCrops({
      cropsMitigationsTotal,
    });
  }
  const farm_crops_fertilizer = formInformations?.datasform?.filter((element) =>
    element.id.includes("farm_crops_fertilizer")
  );
  if (
    formInformations?.datasform?.find(
      (element) => element.id === "farm_crops_fertilizer"
    )?.response &&
    farm_crops_fertilizer.length > 0
  ) {
    fertilizer = allFunctions.funcFertilizer({ farm_crops_fertilizer });
  }
  setFormInformations({
    ...formInformations,
    results: {
      ...formInformations?.results,
      state: state,
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

      mitigationEFImpFeedDairy: mitigationEFImpFeedDairy,
      mitigationEFImpFeedBeef: mitigationEFImpFeedBeef,
      mitigationEFImpFeedSheep: mitigationEFImpFeedSheep,
      mitigationEFAdditiveBeef: mitigationEFAdditiveBeef,
      mitigationEFAdditiveDairy: mitigationEFAdditiveDairy,
      mitigationEFAdditiveSheep: mitigationEFAdditiveSheep,
      mitigationEFLTBreedingBeef: mitigationEFLTBreedingBeef,
      mitigationEFLTBreedingDairy: mitigationEFLTBreedingDairy,
      mitigationEFLTBreedingSheep: mitigationEFLTBreedingSheep,

      carbonCreditsCrops: carbonCreditsCrops,
      mitigationCropAgro: cropsMitigations?.mitigationCropAgro || 0,
      mitigationCropNut: cropsMitigations?.mitigationCropNut || 0,
      mitigationCropTillage: cropsMitigations?.mitigationCropTillage || 0,
      mitigationCropWater: cropsMitigations?.mitigationCropWater || 0,
      mitigationCropLUC: cropsMitigations?.mitigationCropLUC || 0,
      mitigationCropAgrofo: cropsMitigations?.mitigationCropAgrofo || 0,
      mitigationGrassGraz: cropsMitigations?.mitigationGrassGraz || 0,
      mitigationDegResto: cropsMitigations?.mitigationDegResto || 0,
      mitigationManureApp: cropsMitigations?.mitigationManureApp || 0,
      mitigationCropsTotal: cropsMitigations?.mitigationCropsTotal || 0,
      totalCarbonCredits: carbonCreditsCrops + carbonCreditsAnimals,
      fertilizer: fertilizer,
      CO2emmited:
        (elecCO2 +
          natGasCO2 +
          gasCO2 +
          water +
          fuelCO2 +
          other +
          entericFermentationCO2Total +
          manureCO2 +
          fertilizer -
          (mitigationEFImpFeedDairy +
            mitigationEFImpFeedBeef +
            mitigationEFImpFeedSheep +
            mitigationEFAdditiveDairy +
            mitigationEFAdditiveBeef +
            mitigationEFAdditiveSheep +
            mitigationEFLTBreedingDairy +
            mitigationEFLTBreedingBeef +
            mitigationEFLTBreedingSheep +
            cropsMitigationsTotal)) /
        time,
      CO2mitigated:
        (mitigationEFImpFeedDairy +
          mitigationEFImpFeedBeef +
          mitigationEFImpFeedSheep +
          mitigationEFAdditiveDairy +
          mitigationEFAdditiveBeef +
          mitigationEFAdditiveSheep +
          mitigationEFLTBreedingDairy +
          mitigationEFLTBreedingBeef +
          mitigationEFLTBreedingSheep +
          cropsMitigationsTotal) /
        time,
      utilitiesGraph:
        elecCO2 / time + natGasCO2 / time + gasCO2 / time + water / time,
      fuelGraph: fuelCO2 / time,
      otherGraph: other / time,
      entericFermentationCO2Graph:
        entericFermentationCO2Total -
        (mitigationEFImpFeedDairy +
          mitigationEFImpFeedBeef +
          mitigationEFImpFeedSheep +
          mitigationEFAdditiveBeef +
          mitigationEFAdditiveDairy +
          mitigationEFAdditiveSheep +
          mitigationEFLTBreedingBeef +
          mitigationEFLTBreedingDairy +
          mitigationEFLTBreedingSheep) /
          time,
      manureCO2Graph: manureCO2 / time,
      cropsGraph: formInformations?.results?.cropsMitigations
        ?.mitigationCropsTotal
        ? (fertilizer -
            formInformations?.results?.cropsMitigations?.mitigationCropsTotal) /
          time
        : fertilizer / time,
      totalEmissionsGraph:
        (elecCO2 +
          natGasCO2 +
          gasCO2 +
          water +
          fuelCO2 +
          other +
          entericFermentationCO2Total +
          manureCO2 +
          fertilizer) /
        time,
      totalMitigationsGraph:
        (mitigationEFImpFeedDairy +
          mitigationEFImpFeedBeef +
          mitigationEFImpFeedSheep +
          mitigationEFAdditiveBeef +
          mitigationEFAdditiveDairy +
          mitigationEFAdditiveSheep +
          mitigationEFLTBreedingBeef +
          mitigationEFLTBreedingDairy +
          mitigationEFLTBreedingSheep +
          cropsMitigationsTotal) /
        time,
    },
  });
}

export default calculs;

//function funcFertilizer(
