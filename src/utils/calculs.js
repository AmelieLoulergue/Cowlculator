import React from "react";

function calculs(datasForm) {
  console.log("toutes les datas", datasForm);
  console.log("date de fin", datasForm.endDate);
  console.log("date de début", datasForm.startDate);
  console.log(
    "nombre de bisons matures",
    datasForm.farm_american_bison_matur_numb.value
  );
  console.log(
    "natgas unit Therm",
    datasForm.natgas_unit[0].value,
    datasForm.natgas_unit[0].selected
  );
  // tu peux boucler sur des tableaux
  datasForm.natgas_unit.map((unit, index) => {
    console.log(unit.value, unit.selected, index);
  });
  // tu peux trouver un élement avec une condition
  const unit_selected = datasForm.natgas_unit.find(
    (unit) => unit.selected === true
  );
  console.log(unit_selected);
}

export default calculs;
