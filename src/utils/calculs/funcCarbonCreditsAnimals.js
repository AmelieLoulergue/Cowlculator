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
  console.log(
    mitigationEFImpFeedDairy.mitigatedEFDairyImpFeed,
    mitigationEFImpFeedBeef.mitigatedEFBeefImpFeed,
    mitigationEFImpFeedSheep.mitigatedEFSheepImpFeed,
    mitigationEFAdditiveDairy.mitigatedEFDairyAdditive,
    mitigationEFAdditiveSheep.mitigatedEFSheepAdditive,
    mitigationEFAdditiveBeef.mitigatedEFBeefAdditive,
    mitigationEFLTBreedingSheep.mitigatedEFSheepLTBreeding,
    mitigationEFLTBreedingDairy.mitigatedEFDairyLTBreeding,
    mitigationEFLTBreedingBeef.mitigatedEFBeefLTBreeding
  );
  let carbonCreditsAnimals =
    (mitigationEFImpFeedDairy.mitigatedEFDairyImpFeed +
      mitigationEFImpFeedBeef.mitigatedEFBeefImpFeed +
      mitigationEFImpFeedSheep.mitigatedEFSheepImpFeed +
      mitigationEFAdditiveDairy.mitigatedEFDairyAdditive +
      mitigationEFAdditiveSheep.mitigatedEFSheepAdditive +
      mitigationEFAdditiveBeef.mitigatedEFBeefAdditive +
      mitigationEFLTBreedingSheep.mitigatedEFSheepLTBreeding +
      mitigationEFLTBreedingDairy.mitigatedEFDairyLTBreeding +
      mitigationEFLTBreedingBeef.mitigatedEFBeefLTBreeding) *
    73.05;
  return carbonCreditsAnimals;
}
export default funcCarbonCreditsAnimals;
