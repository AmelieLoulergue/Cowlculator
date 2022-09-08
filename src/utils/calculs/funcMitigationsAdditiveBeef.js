// Function beef: mitigations additives

function funcMitigationsAdditiveBeef(
    datasForm,
    reductionEF_coeff,
    EFBeef,
    cattleBeef
  ) {
    //Coeff
    let coeffAdditiveBeef = reductionEF_coeff[1].Spec_agents_and_diet_additives;
  
    // Proportion of beef included in the practice additives
  
    let numbBeefPracticesAdditive = 0;
    if (
      cattleBeef === 0 ||
      datasForm.practices.practice_anim[3].selected === true
    ) {
      numbBeefPracticesAdditive = 0;
    } else {
      if (datasForm.practices.practice_anim[1].beef_cattle.all_of_them === true) {
        numbBeefPracticesAdditive = 1;
      } else {
        if (
          datasForm.practices.practice_anim[1].beef_cattle.portion_of_them ===
          true
        ) {
          let portionBeefAdditive =
            datasForm.practices.practice_anim[1].beef_cattle.portion_numb / 100;
          numbBeefPracticesAdditive = portionBeefAdditive;
        }
      }
    }
  
    // EF emissions mitigated by the practice additives
  
    let EFBeefAdditive = 0;
    if (datasForm.practices.practice_anim[1].beef_cattle.selected === true) {
      EFBeefAdditive = numbBeefPracticesAdditive * EFBeef * coeffAdditiveBeef;
    } else {
      EFBeefAdditive = 0;
    }
    // Mitigation percentage
    let mitigationPercentageBeefAdditive = (EFBeefAdditive * 100) / EFBeef;
    // Total EF emissions after mitigation
    let mitigatedEFBeefAdditive =
      EFBeefAdditive + (1 - numbBeefPracticesAdditive) * EFBeef;
  
    return [mitigatedEFBeefAdditive, mitigationPercentageBeefAdditive];
  }
  export default funcMitigationsAdditiveBeef