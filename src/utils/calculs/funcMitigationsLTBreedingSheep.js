// Function sheep: mitigations LTBreeding

function funcMitigationsLTBreedingSheep(datasForm, reductionEF_coeff, EFSheep) {
  //Coeff
  let coeffLTBreedingSheep = reductionEF_coeff[2].longterm_change_and_breeding;

  // Proportion of sheep included in the practice LTBreeding

  let numbSheepPracticesLTBreeding = 0;
  if (
    datasForm.farm_sheeps_matur_numb.value === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbSheepPracticesLTBreeding = 0;
  } else {
    if (datasForm.practices.practice_anim[2].sheeps.all_of_them === true) {
      numbSheepPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.practices.practice_anim[2].sheeps.portion_of_them === true
      ) {
        let portionSheepLTBreeding =
          datasForm.practices.practice_anim[2].sheeps.portion_numb / 100;
        numbSheepPracticesLTBreeding = portionSheepLTBreeding;
      }
    }
  }

  //EF emissions from cattle portion concerned by LTBreeding
  let EFSheepLTBreeding = 0;
  if (datasForm.practices.practice_anim[2].sheeps.selected === true) {
    EFSheepLTBreeding =
      numbSheepPracticesLTBreeding * EFSheep * coeffLTBreedingSheep;
  } else {
    EFSheepLTBreeding = 0;
  }
  // Mitigation percentage
  let mitigationPercentageSheepLTBreeding = (EFSheepLTBreeding * 100) / EFSheep;
  // Total EF emissions after mitigation
  let mitigatedEFSheepLTBreeding =
    EFSheepLTBreeding + (1 - numbSheepPracticesLTBreeding) * EFSheep;

  return [mitigatedEFSheepLTBreeding, mitigationPercentageSheepLTBreeding];
}
export default funcMitigationsLTBreedingSheep;
