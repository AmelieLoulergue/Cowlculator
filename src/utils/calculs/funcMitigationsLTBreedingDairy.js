// Function dairy: long term breeding

function funcMitigationsLTBreedingDairy(
  datasForm,
  reductionEF_coeff,
  EFDairy,
  cattleDairy
) {
  //Coeff
  let coeffLTBreedingDairy = reductionEF_coeff[0].longterm_change_and_breeding;
  // Proportion of animals included in the practice LTBreeding

  let numbDairyPracticesLTBreeding = 0;

  if (
    cattleDairy === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbDairyPracticesLTBreeding = 0;
  } else {
    if (datasForm.practices.practice_anim[2].dairy_cow.all_of_them === true) {
      numbDairyPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.practices.practice_anim[2].dairy_cow.portion_of_them === true
      ) {
        let portionDairyLTBreeding =
          datasForm.practices.practice_anim[2].dairy_cow.portion_numb / 100;
        numbDairyPracticesLTBreeding = portionDairyLTBreeding;
      }
    }
  }

  //EF emissions from cattle portion concerned by LTBreeding
  let EFDairyLTBreeding = 0;
  if (datasForm.practices.practice_anim[2].dairy_cow.selected === true) {
    EFDairyLTBreeding =
      numbDairyPracticesLTBreeding * EFDairy * coeffLTBreedingDairy;
  } else {
    EFDairyLTBreeding = 0;
  }
  // Mitigation percentage
  let mitigationPercentageDairyLTBreeding = (EFDairyLTBreeding * 100) / EFDairy;
  // Total EF emissions after mitigation
  let mitigatedEFDairyLTBreeding =
    EFDairyLTBreeding + (1 - numbDairyPracticesLTBreeding) * EFDairy;

  return [mitigatedEFDairyLTBreeding, mitigationPercentageDairyLTBreeding];
}
export default funcMitigationsLTBreedingDairy;
