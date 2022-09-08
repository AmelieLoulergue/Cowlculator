function funcMitigationsImpFeedSheep(datasForm, reductionEF_coeff, EFSheep) {
  //Coeff
  let coeffImpFeedSheep = reductionEF_coeff[2].Improved_feeding;

  // Proportion of sheep included in the practice improved feeding

  let numbSheepPractices = 0;
  if (
    datasForm.farm_sheeps_matur_numb.value === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbSheepPractices = 0;
  } else {
    if (datasForm.practices.practice_anim[0].sheeps.all_of_them === true) {
      numbSheepPractices = 1;
    } else {
      if (
        datasForm.practices.practice_anim[0].sheeps.portion_of_them === true
      ) {
        let portionSheep =
          datasForm.practices.practice_anim[0].sheeps.portion_numb / 100;
        numbSheepPractices = portionSheep;
      }
    }
  }

  //EF emissions from cattle portion concerned by improved feeding
  let EFSheepImpFeed = 0;
  if (datasForm.practices.practice_anim[0].sheeps.selected === true) {
    EFSheepImpFeed = numbSheepPractices * EFSheep * coeffImpFeedSheep;
  } else {
    EFSheepImpFeed = 0;
  }
  // Mitigation percentage
  let mitigationPercentageSheepImpFeed = (EFSheepImpFeed * 100) / EFSheep;
  // Total EF emissions after mitigation
  let mitigatedEFSheepImpFeed =
    EFSheepImpFeed + (1 - numbSheepPractices) * EFSheep;

  return [mitigatedEFSheepImpFeed, mitigationPercentageSheepImpFeed];
}
export default funcMitigationsImpFeedSheep;
