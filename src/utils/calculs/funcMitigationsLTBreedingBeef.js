// Function beef: mitigations Long Term Breeding

function funcMitigationsLTBreedingBeef(
  datasForm,
  reductionEF_coeff,
  EFBeef,
  cattleBeef
) {
  //Coeff
  let coeffLTBreedingBeef = reductionEF_coeff[1].longterm_change_and_breeding;

  // Proportion of beef included in the practice LTBreeding

  let numbBeefPracticesLTBreeding = 0;
  if (
    cattleBeef === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbBeefPracticesLTBreeding = 0;
  } else {
    if (datasForm.practices.practice_anim[2].beef_cattle.all_of_them === true) {
      numbBeefPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.practices.practice_anim[2].beef_cattle.portion_of_them ===
        true
      ) {
        let portionBeefLTBreeding =
          datasForm.practices.practice_anim[2].beef_cattle.portion_numb / 100;
        numbBeefPracticesLTBreeding = portionBeefLTBreeding;
      }
    }
  }

  // EF emissions mitigated by the practice LTBreeding

  let EFBeefLTBreeding = 0;
  if (datasForm.practices.practice_anim[2].beef_cattle.selected === true) {
    EFBeefLTBreeding =
      numbBeefPracticesLTBreeding * EFBeef * coeffLTBreedingBeef;
  } else {
    EFBeefLTBreeding = 0;
  }
  // Mitigation percentage
  let mitigationPercentageBeefLTBreeding = (EFBeefLTBreeding * 100) / EFBeef;
  // Total EF emissions after mitigation
  let mitigatedEFBeefLTBreeding =
    EFBeefLTBreeding + (1 - numbBeefPracticesLTBreeding) * EFBeef;

  return [mitigatedEFBeefLTBreeding, mitigationPercentageBeefLTBreeding];
}
export default funcMitigationsLTBreedingBeef;
