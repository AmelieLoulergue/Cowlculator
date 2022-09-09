function funcCarbonCreditsAnimals(
  mitigationEFImpFeedDairy,
  mitigationEFImpFeedBeef,
  mitigationEFImpFeedSheep,
  mitigationEFAdditiveDairy,
  mitigationEFAdditiveSheep,
  mitigationEFAdditiveBeef,
  mitigationEFLTBreedingSheep,
  mitigationEFLTBreedingDairy,
  mitigationEFLTBreedingBeef
) {
  let carbonCreditsAnimals =
    (mitigationEFImpFeedDairy[0] +
      mitigationEFImpFeedBeef[0] +
      mitigationEFImpFeedSheep[0] +
      mitigationEFAdditiveDairy[0] +
      mitigationEFAdditiveSheep[0] +
      mitigationEFAdditiveBeef[0] +
      mitigationEFLTBreedingSheep[0] +
      mitigationEFLTBreedingDairy[0] +
      mitigationEFLTBreedingBeef[0]) *
    73.05;
  return carbonCreditsAnimals;
}
export default funcCarbonCreditsAnimals;
