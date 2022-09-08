// Function sheep: mitigations additives

function funcMitigationsAdditiveSheep(datasForm, reductionEF_coeff, EFSheep) {
  //Coeff
  let coeffAdditiveSheep = reductionEF_coeff[2].Spec_agents_and_diet_additives;

  // Proportion of sheep included in the practice additives

  let numbSheepPracticesAdditive = 0;
  if (
    datasForm.farm_sheeps_matur_numb.value === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbSheepPracticesAdditive = 0;
  } else {
    if (datasForm.practices.practice_anim[1].sheeps.all_of_them === true) {
      numbSheepPracticesAdditive = 1;
    } else {
      if (
        datasForm.practices.practice_anim[1].sheeps.portion_of_them === true
      ) {
        let portionSheepAdditive =
          datasForm.practices.practice_anim[1].sheeps.portion_numb / 100;
        numbSheepPracticesAdditive = portionSheepAdditive;
      }
    }
  }

  //EF emissions from cattle portion concerned by additives
  let EFSheepAdditive = 0;
  if (datasForm.practices.practice_anim[1].sheeps.selected === true) {
    EFSheepAdditive = numbSheepPracticesAdditive * EFSheep * coeffAdditiveSheep;
  } else {
    EFSheepAdditive = 0;
  }
  // Mitigation percentage
  let mitigationPercentageSheepAdditive = (EFSheepAdditive * 100) / EFSheep;
  // Total EF emissions after mitigation
  let mitigatedEFSheepAdditive =
    EFSheepAdditive + (1 - numbSheepPracticesAdditive) * EFSheep;

  return [mitigatedEFSheepAdditive, mitigationPercentageSheepAdditive];
}
export default funcMitigationsAdditiveSheep;
