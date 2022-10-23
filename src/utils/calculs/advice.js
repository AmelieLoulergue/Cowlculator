import coeff_reduction_ghg from "../../coeff/coeff_reduction_ghg.json";
import regions from "../../coeff/regions.json";
const advices = ({ result }) => {
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
  let cattleBeef =
    farm_animals_beef_cattle_rep12_numb +
    farm_animals_beef_cattle_rep24_numb +
    farm_animals_beef_cattle_matur_numb +
    farm_animals_beef_cattle_weanling_numb +
    farm_animals_beef_cattle_yearling_numb +
    farm_animals_beef_cattle_bulls_numb;
  let EFDairy =
    result &&
    result.entericFermentationCO2 &&
    result.entericFermentationCO2.EFDairy;
  let EFBeef =
    result &&
    result.entericFermentationCO2 &&
    result.entericFermentationCO2.EFBeef;
  let EFSheep =
    result &&
    result.entericFermentationCO2 &&
    result.entericFermentationCO2.EFSheep;
  const advices = [];
  if (
    cattleDairy !== 0 &&
    !result.find(
      (data) => data.id === "farm_animals_dairy_cattle_feeding_practice"
    )?.response
  ) {
    advices.push(
      `If you implement improved feeding practices e.g.  replacing roughage with concentrate, feeding, extra dietary oil, for your dairy cattle you could mitigate ${
        EFDairy * 0.16
      } tonnes of CO₂ per year which represents $${
        EFDairy * 0.16 * 73.05
      } per year`
    );
  }
  if (
    cattleDairy !== 0 &&
    !result.find(
      (data) => data.id === "farm_animals_dairy_cattle_specific_agent_practice"
    )?.response
  ) {
    advices.push(
      `If you implement the use of specific agents and dietary additives e.g.  bST, growth hormones, ionophores, propionate precursors, for your dairy cattle you could mitigate ${
        EFDairy * 0.11
      } tonnes of CO₂ per year which represents $ ${
        EFDairy * 0.11 * 73.05
      } per year`
    );
  }
  if (
    cattleBeef !== 0 &&
    !result.find(
      (data) => data.id === "farm_animals_beef_cattle_feeding_practice"
    )?.response
  ) {
    advices.push(
      `If you implement improved feeding practices e.g.  replacing roughage with concentrate, feeding, extra dietary oil, for your beef cattle you could mitigate ${
        EFBeef * 0.11
      } tonnes of CO₂ per year which represents $ ${
        EFBeef * 0.11 * 73.05
      } per year`
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
      `If you implement degraded land restoration on your crops you could mitigate up to ${
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
        deg_resto_coeff
      } tonnes of CO₂ per year which represents $ ${
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
        deg_resto_coeff *
        15
      } per year`
    );
  }
  let manure_bios_coeff = coeff_crops[9].GHG;
  if (
    result.find((element) => element.id === "farm_crops")?.response &&
    !result.find((element) => element.id === "farm_crops_manure_practice")
      ?.response
  ) {
    advices.push(
      `If you apply manure and biosolids on your crops you could mitigate up to ${
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
        manure_bios_coeff
      } tonnes of CO₂ per year which represents $ ${
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
        manure_bios_coeff *
        15
      } per year`
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
      ` If you implement set aside and lad-use change i.e. allow or encourage the reversion of croplamd to another land cover, typically one similar to the native vegetation on your crops you could mitigate up to ${
        (grassland_size +
          grain_size +
          forage_size +
          fv_size +
          flowers_size +
          herbs_size) *
        crop_LUC_coeff
      } tonnes of CO₂ per year which represents $ ${
        (grain_size + forage_size + fv_size + flowers_size + herbs_size) *
        crop_LUC_coeff *
        15
      } per year`
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
