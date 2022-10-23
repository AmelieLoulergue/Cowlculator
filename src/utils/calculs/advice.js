import coeff_reduction_ghg from "../../coeff/coeff_reduction_ghg.json";
import regions from "../../coeff/regions.json";
import enteric_EF from "../../coeff/enteric_EF.json";
function funcTime({ startDate, endDate }) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let time = round(
    (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 7 * 52.25),
    1
  );

  return time;
}
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
const advices = ({ result }) => {
  const endDate = result.find((data) => data.id === "end_date")?.response;
  // check on the existence of the 2 dates
  let time = 0;
  const startDate = result.find((data) => data.id === "start_date")?.response;
  if (startDate && endDate) {
    time = funcTime({ startDate, endDate });
  }

  let region = regions.find(
    (region) =>
      region.Code === result.find((element) => element.id === "state").response
  );
  let climate = region.Climate.replace(" ", "_");
  let coeff_crops = coeff_reduction_ghg.map((element) => {
    let climate_coeff = element.climate.replace(" ", "_");
    if (climate_coeff === climate) {
      return { practice: element.practice, GHG: element.GHG };
    }
  });
  coeff_crops = coeff_crops.filter((element) => element !== undefined);
  const findAnimal = (animal) => {
    return result.find((data) => data.id === animal)?.response;
  };
  let farm_animals_dairy_cattle_rep12_numb = findAnimal(
    "farm_animals_dairy_cattle_rep12_numb"
  )?.value
    ? Number(findAnimal("farm_animals_dairy_cattle_rep12_numb").value)
    : 0;
  let farm_animals_dairy_cattle_rep24_numb = findAnimal(
    "farm_animals_dairy_cattle_rep24_numb"
  )?.value
    ? Number(findAnimal("farm_animals_dairy_cattle_rep24_numb").value)
    : 0;
  let farm_animals_dairy_cattle_matur_numb = findAnimal(
    "farm_animals_dairy_cattle_matur_numb"
  )?.value
    ? Number(findAnimal("farm_animals_dairy_cattle_matur_numb").value)
    : 0;
  let cattleDairy =
    farm_animals_dairy_cattle_rep12_numb +
    farm_animals_dairy_cattle_rep24_numb +
    farm_animals_dairy_cattle_matur_numb;
  let farm_animals_beef_cattle_rep12_numb = findAnimal(
    "farm_animals_beef_cattle_rep12_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_rep12_numb").value)
    : 0;
  let farm_animals_beef_cattle_rep24_numb = findAnimal(
    "farm_animals_beef_cattle_rep24_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_rep24_numb").value)
    : 0;
  let farm_animals_beef_cattle_matur_numb = findAnimal(
    "farm_animals_beef_cattle_matur_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_matur_numb").value)
    : 0;
  let farm_animals_beef_cattle_weanling_numb = findAnimal(
    "farm_animals_beef_cattle_wealing_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_wealing_numb").value)
    : 0;
  let farm_animals_beef_cattle_yearling_numb = findAnimal(
    "farm_animals_beef_cattle_yearling_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_yearling_numb").value)
    : 0;
  let farm_animals_beef_cattle_bulls_numb = findAnimal(
    "farm_animals_beef_cattle_bulls_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_bulls_numb").value)
    : 0;

  region = region?.Regions_EPA.replace(" ", "_");
  // keep only the coeff for the region
  let coeffEF = [];
  enteric_EF.map((selectRegion) =>
    Object.entries(selectRegion).map((key, value) => {
      if (key[0] !== "name" && key[0] === region) {
        coeffEF.push({ name: selectRegion.name, coeff: key[1] });
      }
    })
  );
  let coeffEFNatAv = [];
  enteric_EF.map((changeRegion) =>
    Object.entries(changeRegion).map((key, value) => {
      if (key[0] !== "name" && key[0] === "National_Average") {
        coeffEFNatAv.push({ name: changeRegion.name, coeff: key[1] });
      }
    })
  );
  //Extract animals' coeff based on the region
  let coeffDairyRep12EF =
    findAnimal("farm_animals_dairy_cattle") &&
    findAnimal("farm_animals_dairy_cattle_rep12")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_rep12"
          ).coeff
        )
      : 0;
  let coeffDairyRep24EF =
    findAnimal("farm_animals_dairy_cattle") &&
    findAnimal("farm_animals_dairy_cattle_rep24")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_rep24"
          ).coeff
        )
      : 0;
  let coeffDairyMatureEF =
    findAnimal("farm_animals_dairy_cattle") &&
    findAnimal("farm_animals_dairy_cattle_matur")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_matur"
          ).coeff
        )
      : 0;
  let coeffBeefRep12EF =
    findAnimal("farm_animals_beef_cattle") &&
    findAnimal("farm_animals_beef_cattle_rep12")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_rep12"
          ).coeff
        )
      : 0;
  let coeffBeefRep24EF =
    findAnimal("farm_animals_beef_cattle") &&
    findAnimal("farm_animals_beef_cattle_rep24")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_rep24"
          ).coeff
        )
      : 0;
  let coeffBeefMatureEF =
    findAnimal("farm_animals_beef_cattle") &&
    findAnimal("farm_animals_beef_cattle_matur")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_matur"
          ).coeff
        )
      : 0;
  let coeffBeefWeanEF = coeffEF.find(
    (element) => element.name === "farm_animals_beef_cattle_wealing"
  ).coeff
    ? Number(
        coeffEF.find(
          (element) => element.name === "farm_animals_beef_cattle_wealing"
        ).coeff
      )
    : Number(
        coeffEFNatAv.find(
          (element) => element.name === "farm_animals_beef_cattle_wealing"
        ).coeff
      );
  let coeffBeefYearnEF = coeffEF.find(
    (element) => element.name === "farm_animals_beef_cattle_yearling"
  ).coeff
    ? Number(
        coeffEF.find(
          (element) => element.name === "farm_animals_beef_cattle_yearling"
        ).coeff
      )
    : Number(
        coeffEFNatAv.find(
          (element) => element.name === "farm_animals_beef_cattle_yearling"
        ).coeff
      );

  let coeffBeefBullsEF = Number(
    coeffEFNatAv.find(
      (element) => element.name === "farm_animals_beef_cattle_bulls"
    ).coeff
  );
  let cattleBeef =
    farm_animals_beef_cattle_rep12_numb +
    farm_animals_beef_cattle_rep24_numb +
    farm_animals_beef_cattle_matur_numb +
    farm_animals_beef_cattle_weanling_numb +
    farm_animals_beef_cattle_yearling_numb +
    farm_animals_beef_cattle_bulls_numb;
  let EFDairy =
    ((farm_animals_dairy_cattle_rep12_numb * coeffDairyRep12EF * 25 +
      farm_animals_dairy_cattle_rep24_numb * coeffDairyRep24EF * 25 +
      farm_animals_dairy_cattle_matur_numb * coeffDairyMatureEF * 25) /
      1000) *
    time;
  let EFBeef =
    ((farm_animals_beef_cattle_rep12_numb * coeffBeefRep12EF * 25 +
      farm_animals_beef_cattle_rep24_numb * coeffBeefRep24EF * 25 +
      farm_animals_beef_cattle_matur_numb * coeffBeefMatureEF * 25 +
      farm_animals_beef_cattle_weanling_numb * coeffBeefWeanEF * 25 +
      farm_animals_beef_cattle_yearling_numb * coeffBeefYearnEF * 25 +
      farm_animals_beef_cattle_bulls_numb * coeffBeefBullsEF * 25) /
      1000) *
    time;
  const advices = [];
  console.log(EFDairy);
  if (
    cattleDairy !== 0 &&
    !result.find(
      (data) => data.id === "farm_animals_dairy_cattle_feeding_practice"
    )?.response
  ) {
    advices.push(
      `If you implement improved feeding practices e.g.  replacing roughage with concentrate, feeding, extra dietary oil, for your dairy cattle you could mitigate ${round(
        EFDairy * 0.16,
        1
      )} tonnes of CO₂ per year which represents $${round(
        EFDairy * 0.16 * 73.05,
        1
      )} per year`
    );
  }
  if (
    cattleDairy !== 0 &&
    !result.find(
      (data) => data.id === "farm_animals_dairy_cattle_specific_agent_practice"
    )?.response
  ) {
    advices.push(
      `If you implement the use of specific agents and dietary additives e.g.  bST, growth hormones, ionophores, propionate precursors, for your dairy cattle you could mitigate ${round(
        EFDairy * 0.11,
        1
      )} tonnes of CO₂ per year which represents $ ${round(
        EFDairy * 0.11 * 73.05,
        1
      )} per year`
    );
  }
  if (
    cattleBeef !== 0 &&
    !result.find(
      (data) => data.id === "farm_animals_beef_cattle_feeding_practice"
    )?.response
  ) {
    advices.push(
      `If you implement improved feeding practices e.g.  replacing roughage with concentrate, feeding, extra dietary oil, for your beef cattle you could mitigate ${round(
        EFBeef * 0.11,
        1
      )} tonnes of CO₂ per year which represents $ ${round(
        EFBeef * 0.11 * 73.05,
        1
      )} per year`
    );
  }
  let acre_to_ha = 0.404686;
  let sqfeet_to_ha = 0.000009290304;
  let deg_resto_coeff = coeff_crops[8].GHG;
  let grassland_size = 0;
  if (
    result.find((element) => element.id === "farm_crops_grassland")?.response &&
    result.find((element) => element.id === "farm_crops_grassland_size")
      ?.response?.unit === "acre"
  ) {
    grassland_size = result.find(
      (element) => element.id === "farm_crops_grassland_size"
    )?.response?.value
      ? Number(
          result.find((element) => element.id === "farm_crops_grassland_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      result.find((element) => element.id === "farm_crops_grassland")
        ?.response &&
      result.find((element) => element.id === "farm_crops_grassland_size")
        ?.response?.unit === "sq feet"
    ) {
      grassland_size = grassland_size = result.find(
        (element) => element.id === "farm_crops_grassland_size"
      )?.response?.value
        ? Number(
            (grassland_size = result.find(
              (element) => element.id === "farm_crops_grassland_size"
            ).response.value)
          ) * sqfeet_to_ha
        : 0;
    }
  }
  let grain_size = 0;
  if (
    result.find((element) => element.id === "farm_crops_grain")?.response &&
    result.find((element) => element.id === "farm_crops_grain_size")?.response
      ?.unit === "acre"
  ) {
    grain_size = result.find(
      (element) => element.id === "farm_crops_grain_size"
    )?.response?.value
      ? Number(
          result.find((element) => element.id === "farm_crops_grain_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      result.find((element) => element.id === "farm_crops_grain")?.response &&
      result.find((element) => element.id === "farm_crops_grain_size")?.response
        ?.unit === "sq feet"
    ) {
      grain_size = result.find(
        (element) => element.id === "farm_crops_grain_size"
      )?.response?.value
        ? Number(
            result.find((element) => element.id === "farm_crops_grain_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let forage_size = 0;
  if (
    result.find((element) => element.id === "farm_crops_forage")?.response &&
    result.find((element) => element.id === "farm_crops_forage_size")?.response
      ?.unit === "acre"
  ) {
    forage_size = result.find(
      (element) => element.id === "farm_crops_forage_size"
    )?.response?.value
      ? Number(
          result.find((element) => element.id === "farm_crops_forage_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      result.find((element) => element.id === "farm_crops_forage")?.response &&
      result.find((element) => element.id === "farm_crops_forage_size")
        ?.response?.unit === "sq feet"
    ) {
      forage_size = result.find(
        (element) => element.id === "farm_crops_forage_size"
      )?.response?.value
        ? Number(
            result.find((element) => element.id === "farm_crops_forage_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let fv_size = 0;
  if (
    result.find((element) => element.id === "farm_crops_fv")?.response &&
    result.find((element) => element.id === "farm_crops_fv_size")?.response
      ?.unit === "acre"
  ) {
    fv_size = result.find((element) => element.id === "farm_crops_fv_size")
      ?.response?.value
      ? Number(
          result.find((element) => element.id === "farm_crops_fv_size").response
            .value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      result.find((element) => element.id === "farm_crops_fv")?.response &&
      result.find((element) => element.id === "farm_crops_fv_size")?.response
        ?.unit === "sq feet"
    ) {
      fv_size = result.find((element) => element.id === "farm_crops_fv_size")
        ?.response?.value
        ? Number(
            result.find((element) => element.id === "farm_crops_fv_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let flowers_size = 0;
  if (
    result.find((element) => element.id === "farm_crops_flowers")?.response &&
    result.find((element) => element.id === "farm_crops_flowers_size")?.response
      ?.unit === "acre"
  ) {
    flowers_size = result.find(
      (element) => element.id === "farm_crops_flowers_size"
    )?.response?.value
      ? Number(
          result.find((element) => element.id === "farm_crops_flowers_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      result.find((element) => element.id === "farm_crops_flowers")?.response &&
      result.find((element) => element.id === "farm_crops_flowers_size")
        ?.response?.unit === "sq feet"
    ) {
      flowers_size = result.find(
        (element) => element.id === "farm_crops_flowers_size"
      )?.response?.value
        ? Number(
            result.find((element) => element.id === "farm_crops_flowers_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let herbs_size = 0;
  if (
    result.find((element) => element.id === "farm_crops_herbs")?.response &&
    result.find((element) => element.id === "farm_crops_herbs_size")?.response
      ?.unit === "acre"
  ) {
    herbs_size = result.find(
      (element) => element.id === "farm_crops_herbs_size"
    )?.response?.value
      ? Number(
          result.find((element) => element.id === "farm_crops_herbs_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      result.find((element) => element.id === "farm_crops_herbs")?.response &&
      result.find((element) => element.id === "farm_crops_herbs_size")?.response
        ?.unit === "sq feet"
    ) {
      herbs_size = result.find(
        (element) => element.id === "farm_crops_herbs_size"
      )?.response?.value
        ? Number(
            result.find((element) => element.id === "farm_crops_herbs_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }
  if (
    result.find((element) => element.id === "farm_crops")?.response &&
    !result.find(
      (element) =>
        element.id === "farm_crops_degraded_land_restoration_practice"
    )?.response
  ) {
    advices.push(
      `If you implement degraded land restoration on your crops you could mitigate up to ${round(
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
          deg_resto_coeff,
        1
      )} tonnes of CO₂ per year which represents $ ${round(
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
          deg_resto_coeff *
          15,
        1
      )} per year`
    );
  }
  let manure_bios_coeff = coeff_crops[9].GHG;
  if (
    result.find((element) => element.id === "farm_crops")?.response &&
    !result.find((element) => element.id === "farm_crops_manure_practice")
      ?.response
  ) {
    advices.push(
      `If you apply manure and biosolids on your crops you could mitigate up to ${round(
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
          manure_bios_coeff,
        1
      )} tonnes of CO₂ per year which represents $ ${round(
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
          manure_bios_coeff *
          15,
        1
      )} per year`
    );
  }
  let crop_LUC_coeff = coeff_crops[4].GHG;
  if (
    result.find((element) => element.id === "farm_crops")?.response &&
    !result.find(
      (element) => element.id === "farm_crops_land_use_change_practice"
    )?.response
  ) {
    advices.push(
      ` If you implement set aside and lad-use change i.e. allow or encourage the reversion of croplamd to another land cover, typically one similar to the native vegetation on your crops you could mitigate up to ${round(
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
          crop_LUC_coeff,
        1
      )} tonnes of CO₂ per year which represents $ ${round(
        (grain_size + forage_size + fv_size + flowers_size + herbs_size) *
          crop_LUC_coeff *
          15,
        1
      )} per year`
    );
  }
  if (
    result.find((element) => element.id === "farm_crops_fertilizer")?.response
  ) {
    advices.push(
      `Reducing your use of synthetic fertilizer would reduce your CO₂ emissions.`
    );
  }
  return advices;
};
export default advices;
