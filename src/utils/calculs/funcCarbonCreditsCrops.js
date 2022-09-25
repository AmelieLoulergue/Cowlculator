function funcCarbonCreditsCrops({ cropsMitigations }) {
  console.log(cropsMitigations);
  let carbonCreditsCrops = Number(cropsMitigations.mitigationCropsTotal) * 15;
  return carbonCreditsCrops;
}
export default funcCarbonCreditsCrops;
