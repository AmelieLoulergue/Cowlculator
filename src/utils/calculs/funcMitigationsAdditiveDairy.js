// Function dairy: mitigations additives

function funcMitigationsAdditiveDairy(
  datasForm,
  reductionEF_coeff,
  EFDairy,
  cattleDairy
) {
  //Coeff
  let coeffAdditiveDairy = reductionEF_coeff[0].Spec_agents_and_diet_additives;

  // Proportion of animals included in the practice additives

  let numbDairyPracticesAdditive = 0;

  if (
    cattleDairy === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbDairyPracticesAdditive = 0;
  } else {
    if (datasForm.practices.practice_anim[1].dairy_cow.all_of_them === true) {
      numbDairyPracticesAdditive = 1;
    } else {
      if (
        datasForm.practices.practice_anim[1].dairy_cow.portion_of_them === true
      ) {
        let portionDairyAdditive =
          datasForm.practices.practice_anim[1].dairy_cow.portion_numb / 100;
        numbDairyPracticesAdditive = portionDairyAdditive;
      }
    }
  }

  //EF emissions from cattle portion concerned by additives
  let EFDairyAdditive = 0;
  if (datasForm.practices.practice_anim[1].dairy_cow.selected === true) {
    EFDairyAdditive = numbDairyPracticesAdditive * EFDairy * coeffAdditiveDairy;
  } else {
    EFDairyAdditive = 0;
  }
  // Mitigation percentage
  let mitigationPercentageDairyAdditive = (EFDairyAdditive * 100) / EFDairy;
  // Total EF emissions after mitigation
  let mitigatedEFDairyAdditive =
    EFDairyAdditive + (1 - numbDairyPracticesAdditive) * EFDairy;

  return [mitigatedEFDairyAdditive, mitigationPercentageDairyAdditive];
}
export default funcMitigationsAdditiveDairy;
