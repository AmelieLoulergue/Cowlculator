import regions from "../../coeff/regions.json";
import funcTime from "./funcTime";
import findResponseElementById from "../global/findResponseElementById";
import { getCattleDairy, getCattleBeef } from "./getCattleAnimals";
import { getEFBeef, getEFDairy } from "./getEFAnimals";
import getCoeffAnimals from "./getCoeffAnimals";
import funcCropsMitigations from "./funcCropsMitigations";
import round from "./round";
const Advices = ({ result }) => {
  const advices = [];
  if (result) {
    let time = 0;
    const state = findResponseElementById(result, "farm_state");
    const endDate = findResponseElementById(result, "end_date");

    const startDate = findResponseElementById(result, "start_date");
    if (startDate && endDate) {
      time = funcTime({ startDate, endDate });
    }
    let region = regions.find(
      (region) => region.Code === findResponseElementById(result, "farm_state")
    );
    region = region?.Regions_EPA.replace(" ", "_");
    const { coeffs, size } = funcCropsMitigations({
      datasForm: result,
      state,
      time,
      cropsMitigationsTotal: result.cropsGraph,
    });
    const { deg_resto_coeff, crop_LUC_coeff, manure_bios_coeff } = coeffs;
    const {
      grassland_size,
      forage_size,
      fv_size,
      grain_size,
      flowers_size,
      herbs_size,
    } = size;
    const sumCrops =
      grassland_size +
      forage_size +
      fv_size +
      grain_size +
      flowers_size +
      herbs_size;
    const {
      coeffDairyRep12EF,
      coeffDairyRep24EF,
      coeffDairyMatureEF,
      coeffBeefRep12EF,
      coeffBeefRep24EF,
      coeffBeefMatureEF,
      coeffBeefWeanEF,
      coeffBeefYearnEF,
      coeffBeefBullsEF,
    } = getCoeffAnimals({ datasForm: result, region });

    const EFDairy = getEFDairy({
      datasForm: result,
      coeffDairyRep12EF,
      coeffDairyRep24EF,
      coeffDairyMatureEF,
      time,
    });
    const cattleDairy = getCattleDairy({ datasForm: result });
    const EFBeef = getEFBeef({
      datasForm: result,
      coeffBeefRep12EF,
      coeffBeefRep24EF,
      coeffBeefMatureEF,
      coeffBeefWeanEF,
      coeffBeefYearnEF,
      coeffBeefBullsEF,
      time,
    });
    const cattleBeef = getCattleBeef({ datasForm: result });

    if (
      cattleDairy !== 0 &&
      findResponseElementById(
        result,
        "farm_animals_dairy_cattle_feeding_practice"
      ) === "NO"
    ) {
      advices.push({
        firstText:
          "If you implement improved feeding practices e.g.  replacing roughage with concentrate, feeding, extra dietary oil, for your dairy cattle you could mitigate",
        mitigatedCo2: `${round(EFDairy * 0.16, 0)} tonnes of CO₂`,
        secondText: "per year which represents ",
        money: `$${(EFDairy * 0.16 * 73.05, 0)}`,
        thirdText: "per year",
      });
    }

    if (
      cattleDairy !== 0 &&
      findResponseElementById(
        result,
        "farm_animals_dairy_cattle_specific_agent_practice"
      ) === "NO"
    ) {
      advices.push({
        firstText:
          "If you implement the use of specific agents and dietary additives e.g.  bST, growth hormones, ionophores, propionate precursors, for your dairy cattle you could mitigate",
        mitigatedCo2: `${round(EFDairy * 0.11, 0)} tonnes of CO₂`,
        secondText: " per year which represents ",
        money: `$${round(EFDairy * 0.11 * 73.05, 0)}`,
        thirdText: "per year",
      });
    }
    if (
      cattleBeef !== 0 &&
      findResponseElementById(
        result,
        "farm_animals_beef_cattle_feeding_practice"
      ) === "NO"
    ) {
      advices.push({
        firstText:
          "If you implement improved feeding practices e.g.  replacing roughage with concentrate, feeding, extra dietary oil, for your beef cattle you could mitigate",
        mitigatedCo2: `${round(EFBeef * 0.11, 0)} tonnes of CO₂ `,
        secondText: "per year which represents ",
        money: `$${round(EFBeef * 0.11 * 73.05, 0)}`,
        thirdText: "per year",
      });
    }

    if (
      result.find((element) => element.id === "farm_crops")?.response &&
      result.find((element) => element.id === "farm_crops")?.response !==
        "NO" &&
      result.find(
        (element) =>
          element.id === "farm_crops_degraded_land_restoration_practice"
      )?.response === "NO"
    ) {
      advices.push({
        firstText:
          "If you implement degraded land restoration on your crops you could mitigate up to",
        mitigatedCo2: `${round(sumCrops * deg_resto_coeff, 0)} tonnes of CO₂`,
        secondText: " per year which represents ",
        money: `$${round(sumCrops * deg_resto_coeff * 15, 0)}`,
        thirdText: "per year",
      });
    }
    if (
      result.find((element) => element.id === "farm_crops")?.response &&
      result.find((element) => element.id === "farm_crops")?.response !==
        "NO" &&
      result.find((element) => element.id === "farm_crops_manure_practice")
        ?.response === "NO"
    ) {
      advices.push({
        firstText:
          "If you apply manure and biosolids on your crops you could mitigate up to",
        mitigatedCo2: `${round(sumCrops * manure_bios_coeff, 0)} tonnes of CO₂`,
        secondText: " per year which represents ",
        money: `$${round(sumCrops * manure_bios_coeff * 15, 0)}`,
        thirdText: "per year",
      });
    }
    if (
      result.find((element) => element.id === "farm_crops")?.response &&
      result.find((element) => element.id === "farm_crops")?.response !==
        "NO" &&
      result.find(
        (element) => element.id === "farm_crops_land_use_change_practice"
      )?.response === "NO"
    ) {
      advices.push({
        firstText:
          "If you implement set aside and land-use change i.e. allow or encourage the reversion of cropland to another land cover, typically one similar to the native vegetation on your crops you could mitigate up to",
        mitigatedCo2: `${round(sumCrops * crop_LUC_coeff, 0)} tonnes of CO₂`,
        secondText: " per year which represents ",
        money: `$${round(sumCrops * crop_LUC_coeff * 15, 0)}`,
        thirdText: "per year",
      });
    }
    if (
      result.find((element) => element.id === "farm_crops_fertilizer")
        ?.response !== "NO" &&
      result.find((element) => element.id === "farm_crops")?.response !== "NO"
    ) {
      advices.push({
        firstText: `Reducing your use of synthetic fertilizer would reduce your CO₂ emissions.`,
      });
    }
  }
  return (
    <div className={advices.length ? "" : "is-hidden"}>
      <h1 className={"primaryTitle"} id="recommendations">
        Recommendations
      </h1>
      <div className="card-section">
        {advices.map((advice, index) => (
          <div className="card " key={index}>
            {advice.mitigatedCo2 ? (
              <div>
                {advice.firstText}
                <span style={{ color: "#20bfa9", padding: "0 0.7rem" }}>
                  {advice.mitigatedCo2}
                </span>
                {advice.secondText}
                <span style={{ color: "#fdb95a", padding: "0 0.7rem" }}>
                  {advice.money}
                </span>
                {advice.thirdText}
              </div>
            ) : (
              <>{advice.firstText}</>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Advices;
