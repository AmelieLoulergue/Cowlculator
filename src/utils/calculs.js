import reductionEF_coeff from "../coeff/reductionEF_coeff.json";
import regions from "../coeff/regions.json";

import coeff_reduction_ghg from "../coeff/coeff_reduction_ghg.json";
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
  if (startDate && endDate) {
    setResults({
      ...results,
      time: allFunctions.funcTime({ startDate, endDate }),
    });
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
  if (state && elec_total) {
    setResults({
      ...results,
      elecCO2: allFunctions.funcElec({
        elec_total,
        elec_generator,
        elec_generator_prod,
        state,
      }),
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
  if (gas_butane_cons || gas_propane_cons || gas_mix_cons) {
    setResults({
      ...results,
      gasCO2: allFunctions.funcGas({
        gas_butane_cons,
        gas_propane_cons,
        gas_mix_cons,
      }),
    });
  }
  // NATURAL GAS
  const natgas = datasForm.find((data) => data.id === "natgas")?.response;
  const natgas_cons = datasForm.find(
    (data) => data.id === "natgas_cons"
  )?.response;
  // check on the existence of natgas value && natgas_cons
  if (natgas && natgas_cons) {
    setResults({
      ...results,
      natGasCO2: allFunctions.funcNatGas({
        natgas_cons,
      }),
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
    setResults({
      ...results,
      fuelCO2: allFunctions.funcFuel({
        vehicles_type_cars_diesel_cons,
        vehicles_type_cars_gasoline_cons,
        vehicles_type_trucks_diesel_cons,
        vehicles_type_trucks_gasoline_cons,
        vehicles_type_tractors_diesel_cons,
        vehicles_type_tractors_gasoline_cons,
      }),
    });
  }

  // WATER
  const water_drink_cons = datasForm.find(
    (data) => data.id === "water_drink_cons"
  )?.response;
  const water_waste_cons = datasForm.find(
    (data) => data.id === "water_waste_cons"
  )?.response;
  if (water_drink_cons || water_waste_cons) {
    setResults({
      ...results,
      water: allFunctions.funcWater({ water_drink_cons, water_waste_cons }),
    });
  }

  // OTHER
  const others = datasForm.filter((element) => element.id.includes("other"));
  if (others.length > 0) {
    setResults({
      ...results,
      other: allFunctions.funcOther({ others }),
    });
  }

  // Emissions from enteric fermentation of dairies, beed and sheep
  // Emissions from manure of dairies, beed and sheep
  if (datasForm.find((element) => element.id === "farm_animals")?.response) {
    console.log("je rentre avant la fonction animalsEF");
    setResults({
      ...results,
      entericFermentationCO2: allFunctions.funcAnimalsEF({
        datasForm,
        regions,
        time: results.time,
        state,
      }),
      manureCO2: allFunctions.funcAnimalsManure({
        datasForm,
        time: results.time,
      }),
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
      setResults({
        ...results,
        numbTotalBeefDairy: allFunctions.funcNumbTotalBeefDairy({ datasForm }),
        animalsMitigations: {
          mitigationEFImpFeedDairy: allFunctions.funcMitigationsImpFeedDairy({
            datasForm,
            EFDairy,
            cattleDairy: allFunctions.funcNumbTotalBeefDairy({ datasForm })
              ?.cattleDairy,
          }),
          mitigationEFImpFeedBeef: allFunctions.funcMitigationsImpFeedBeef({
            datasForm,
            EFBeef,
            cattleBeef: allFunctions.funcNumbTotalBeefDairy({ datasForm })
              ?.cattleBeef,
          }),
          mitigationEFImpFeedSheep: allFunctions.funcMitigationsImpFeedSheep({
            datasForm,
            EFSheep,
          }),
          mitigationEFAdditiveDairy: allFunctions.funcMitigationsAdditiveDairy({
            datasForm,
            reductionEF_coeff,
            EFDairy,
            cattleDairy: allFunctions.funcNumbTotalBeefDairy({ datasForm })
              ?.cattleDairy,
          }),
          mitigationEFAdditiveBeef: allFunctions.funcMitigationsAdditiveBeef({
            datasForm,
            EFBeef,
            cattleBeef: allFunctions.funcNumbTotalBeefDairy({ datasForm })
              ?.cattleBeef,
          }),
          mitigationEFAdditiveSheep: allFunctions.funcMitigationsAdditiveSheep({
            datasForm,
            EFSheep,
          }),
          mitigationEFLTBreedingDairy:
            allFunctions.funcMitigationsLTBreedingDairy({
              datasForm,
              EFDairy,
              cattleDairy: allFunctions.funcNumbTotalBeefDairy({ datasForm })
                ?.cattleDairy,
            }),
          mitigationEFLTBreedingBeef:
            allFunctions.funcMitigationsLTBreedingBeef({
              datasForm,
              EFBeef,
              cattleBeef: allFunctions.funcNumbTotalBeefDairy({ datasForm })
                ?.cattleBeef,
            }),
          mitigationEFLTBreedingSheep:
            allFunctions.funcMitigationsLTBreedingSheep({
              datasForm,
              EFSheep,
            }),
        },
        carbonCreditsAnimals: allFunctions.funcCarbonCreditsAnimals({
          mitigationEFImpFeedDairy: allFunctions.funcMitigationsImpFeedDairy({
            datasForm,
            EFDairy,
            cattleDairy: allFunctions.funcNumbTotalBeefDairy({ datasForm })
              ?.cattleDairy,
          }),
          mitigationEFImpFeedBeef: allFunctions.funcMitigationsImpFeedBeef({
            datasForm,
            EFBeef,
            cattleBeef: allFunctions.funcNumbTotalBeefDairy({ datasForm })
              ?.cattleBeef,
          }),
          mitigationEFImpFeedSheep: allFunctions.funcMitigationsImpFeedSheep({
            datasForm,
            EFSheep,
          }),
          mitigationEFAdditiveDairy: allFunctions.funcMitigationsAdditiveDairy({
            datasForm,
            reductionEF_coeff,
            EFDairy,
            cattleDairy: allFunctions.funcNumbTotalBeefDairy({ datasForm })
              ?.cattleDairy,
          }),
          mitigationEFAdditiveBeef: allFunctions.funcMitigationsAdditiveBeef({
            datasForm,
            EFBeef,
            cattleBeef: allFunctions.funcNumbTotalBeefDairy({ datasForm })
              ?.cattleBeef,
          }),
          mitigationEFAdditiveSheep: allFunctions.funcMitigationsAdditiveSheep({
            datasForm,
            EFSheep,
          }),
          mitigationEFLTBreedingDairy:
            allFunctions.funcMitigationsLTBreedingDairy({
              datasForm,
              EFDairy,
              cattleDairy: allFunctions.funcNumbTotalBeefDairy({ datasForm })
                ?.cattleDairy,
            }),
          mitigationEFLTBreedingBeef:
            allFunctions.funcMitigationsLTBreedingBeef({
              datasForm,
              EFBeef,
              cattleBeef: allFunctions.funcNumbTotalBeefDairy({ datasForm })
                ?.cattleBeef,
            }),
          mitigationEFLTBreedingSheep:
            allFunctions.funcMitigationsLTBreedingSheep({
              datasForm,
              EFSheep,
            }),
        }),
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
  if (datasForm.find((element) => element.id === "farm_crops")?.response) {
    setResults({
      ...results,
      cropsMitigations: allFunctions.funcCropsMitigations({
        datasForm,
        state,
        time: results.time,
      }),
      carbonCreditsCrops: allFunctions.funcCarbonCreditsCrops({
        cropsMitigations:
          allFunctions.funcCropsMitigations({
            datasForm,
            state,
            time: results.time,
          }).mitigationCropsTotal || carbonCreditsCrops,
      }),
    });
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

  // let carbonCreditsAnimals = funcCarbonCreditsAnimals(
  //   mitigationEFImpFeedDairy,
  //   mitigationEFImpFeedBeef,
  //   mitigationEFImpFeedSheep,
  //   mitigationEFAdditiveDairy,
  //   mitigationEFAdditiveSheep,
  //   mitigationEFAdditiveBeef,
  //   mitigationEFLTBreedingSheep,
  //   mitigationEFLTBreedingDairy,
  //   mitigationEFLTBreedingBeef
  // );
}

export default calculs;

//function funcFertilizer(
