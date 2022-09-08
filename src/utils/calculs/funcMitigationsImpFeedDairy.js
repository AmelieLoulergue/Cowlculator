// Function dairy: mitigations improved feeding

function funcMitigationsImpFeedDairy(
    datasForm,
    reductionEF_coeff,
    EFDairy,
    cattleDairy
  ) {
    //Coeff
    let coeffImpFeedDairy = reductionEF_coeff[0].Improved_feeding;
  
    // Proportion of animals included in the practice improved feeding
  
    //Dairy
    let numbDairyPractices = 0;
  
    if (
      cattleDairy === 0 ||
      datasForm.practices.practice_anim[3].selected === true
    ) {
      numbDairyPractices = 0;
    } else {
      if (datasForm.practices.practice_anim[0].dairy_cow.all_of_them === true) {
        numbDairyPractices = 1;
      } else {
        if (
          datasForm.practices.practice_anim[0].dairy_cow.portion_of_them === true
        ) {
          let portionDairy =
            datasForm.practices.practice_anim[0].dairy_cow.portion_numb / 100;
          numbDairyPractices = portionDairy;
        }
      }
    }
  
    //EF emissions from cattle portion concerned by improved feeding
    let EFDairyImpFeed = 0;
    if (datasForm.practices.practice_anim[0].dairy_cow.selected === true) {
      EFDairyImpFeed = numbDairyPractices * EFDairy * coeffImpFeedDairy;
    } else {
      EFDairyImpFeed = 0;
    }
    // Mitigation percentage
    let mitigationPercentageDairyImpFeed = (EFDairyImpFeed * 100) / EFDairy;
    // Total EF emissions after mitigation
    let mitigatedEFDairyImpFeed =
      EFDairyImpFeed + (1 - numbDairyPractices) * EFDairy;
  
    return [mitigatedEFDairyImpFeed, mitigationPercentageDairyImpFeed];
  }
  export default funcMitigationsImpFeedDairy