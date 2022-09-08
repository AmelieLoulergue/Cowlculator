import React from "react";
import enteric_EF from "../coeff/enteric_EF.json";
import fuel_coeff from "../coeff/fuel_coeff.json";

import manure from "../coeff/manure.json";
import other_coeff from "../coeff/other_coeff.json";
import reductionEF_coeff from "../coeff/reductionEF_coeff.json";
import regions from "../coeff/regions.json";

import coeff_reduction_ghg from "../coeff/coeff_reduction_ghg.json";
import * as allFunctions from "./calculs/exportCalculsFunctions";
function calculs({ datasForm, results, setResults }) {
  console.log(datasForm);
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
  console.log(natgas, natgas_cons);
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
  console.log(others);
  if (others.length > 0) {
    setResults({
      ...results,
      other: allFunctions.funcOther({ others }),
    });
  }
  // let other = allFunctions.funcOther(datasForm, other_coeff);
  // console.log(other);

  // Emissions from enteric fermentation of dairies, beed and sheep
  // let entericFermentationCO2 = allFunctions.funcAnimalsEF(
  //   datasForm,
  //   enteric_EF,
  //   regions,
  //   results.time
  // );
  // console.log(entericFermentationCO2);

  // Emissions from manure of dairies, beed and sheep

  // let manureCO2 = allFunctions.funcAnimalsManure(
  //   datasForm,
  //   manure,
  //   results.time
  // );
  // console.log(manureCO2);

  // let numbDairyPractices = 0;

  // if (cattleDairy === 0 || datasForm.practices.practice_anim[3].selected===true) {
  //   numbDairyPractices = 0;
  // } else {
  //   if (datasForm.practices.practice_anim[0].dairy_cow.all_of_them === true) {
  //     numbDairyPractices = 1;
  //   } else {
  //     if (
  //       datasForm.practices.practice_anim[0].dairy_cow.portion_of_them === true
  //     ) {
  //       let portionDairy =
  //         datasForm.practices.practice_anim[0].dairy_cow.portion_numb / 100;
  //       numbDairyPractices = portionDairy;
  //     }
  //   }
  // }
  // console.log(numbDairyPractices);

  // Extract EFDairy, EFBeef, EFSheep
  // let EFDairy = entericFermentationCO2[0];
  // let EFBeef = entericFermentationCO2[1];
  // let EFSheep = entericFermentationCO2[2];

  //numb total beef and dairies
  // let numbTotal = allFunctions.funcNumbTotalBeefDairy(datasForm);
  // let cattleDairy = numbTotal[0];
  // let cattleBeef = numbTotal[1];
  // console.log(cattleDairy);
  // console.log(cattleBeef);

  // Mitigation EF from Imp Feed Dairy
  // let mitigationEFImpFeedDairy = allFunctions.funcMitigationsImpFeedDairy(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFDairy
  // );
  // console.log(mitigationEFImpFeedDairy);

  // Mitigation EF from Imp Feed Beef
  // let mitigationEFImpFeedBeef = allFunctions.funcMitigationsImpFeedBeef(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFBeef
  // );
  // console.log(mitigationEFImpFeedBeef);

  // Mitigation EF from Imp Feed Sheep
  // let mitigationEFImpFeedSheep = allFunctions.funcMitigationsImpFeedSheep(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFSheep
  // );
  // console.log(mitigationEFImpFeedSheep);

  //Mitigation EF from Additive Dairy
  // let mitigationEFAdditiveDairy = allFunctions.funcMitigationsAdditiveDairy(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFDairy,
  //   cattleDairy
  // );
  // console.log(mitigationEFAdditiveDairy);

  //Mitigation EF from Additive Beef
  // let mitigationEFAdditiveBeef = allFunctions.funcMitigationsAdditiveBeef(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFBeef,
  //   cattleBeef
  // );
  // console.log(mitigationEFAdditiveBeef);

  //Mitigation EF from Additive Sheep
  // let mitigationEFAdditiveSheep = allFunctions.funcMitigationsAdditiveSheep(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFSheep
  // );
  // console.log(mitigationEFAdditiveSheep);

  //Mitigation EF from LTBreedingDairy
  // let mitigationEFLTBreedingDairy = allFunctions.funcMitigationsLTBreedingDairy(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFDairy,
  //   cattleDairy
  // );
  // console.log(mitigationEFLTBreedingDairy);

  //Mitigation EF from LTBreedingBeef
  // let mitigationEFLTBreedingBeef = allFunctions.funcMitigationsLTBreedingBeef(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFBeef,
  //   cattleBeef
  // );
  // console.log(mitigationEFLTBreedingBeef);

  //Mitigation EF from LTBreeding Sheep
  // let mitigationEFLTBreedingSheep = allFunctions.funcMitigationsLTBreedingSheep(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFSheep
  // );
  // console.log(mitigationEFLTBreedingSheep);

  // console.log("toutes les datas", datasForm);
}

export default calculs;
