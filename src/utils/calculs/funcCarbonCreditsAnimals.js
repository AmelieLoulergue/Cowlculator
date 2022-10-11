function funcCarbonCreditsAnimals({
  mitigationEFImpFeedDairy,
  mitigationEFImpFeedBeef,
  mitigationEFImpFeedSheep,
  mitigationEFAdditiveDairy,
  mitigationEFAdditiveSheep,
  mitigationEFAdditiveBeef,
  mitigationEFLTBreedingSheep,
  mitigationEFLTBreedingDairy,
  mitigationEFLTBreedingBeef,
}) {
  let carbonCreditsAnimals =
    (mitigationEFImpFeedDairy +
      mitigationEFImpFeedBeef +
      mitigationEFImpFeedSheep +
      mitigationEFAdditiveDairy +
      mitigationEFAdditiveSheep +
      mitigationEFAdditiveBeef +
      mitigationEFLTBreedingSheep +
      mitigationEFLTBreedingDairy +
      mitigationEFLTBreedingBeef) *
    73.05;
  return carbonCreditsAnimals;
}
export default funcCarbonCreditsAnimals;
