function funcMitigationsImpFeedBeef(
  datasForm,
  reductionEF_coeff,
  EFBeef,
  cattleBeef
) {
  //Coeff
  let coeffImpFeedBeef = reductionEF_coeff[1].Improved_feeding;

  // Proportion of beef included in the practice improved feeding

  let numbBeefPractices = 0;
  if (
    cattleBeef === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbBeefPractices = 0;
  } else {
    if (datasForm.practices.practice_anim[0].beef_cattle.all_of_them === true) {
      numbBeefPractices = 1;
    } else {
      if (
        datasForm.practices.practice_anim[0].beef_cattle.portion_of_them ===
        true
      ) {
        let portionBeef =
          datasForm.practices.practice_anim[0].beef_cattle.portion_numb / 100;
        numbBeefPractices = portionBeef;
      }
    }
  }

  // EF emissions mitigated by the practice improved feeding

  let EFBeefImpFeed = 0;
  if (datasForm.practices.practice_anim[0].beef_cattle.selected === true) {
    EFBeefImpFeed = numbBeefPractices * EFBeef * coeffImpFeedBeef;
  } else {
    EFBeefImpFeed = 0;
  }
  // Mitigation percentage
  let mitigationPercentageBeefImpFeed = (EFBeefImpFeed * 100) / EFBeef;
  // Total EF emissions after mitigation
  let mitigatedEFBeefImpFeed = EFBeefImpFeed + (1 - numbBeefPractices) * EFBeef;

  return [mitigatedEFBeefImpFeed, mitigationPercentageBeefImpFeed];
}
export default funcMitigationsImpFeedBeef;
