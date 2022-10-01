function funcCarbonCreditsCrops({ cropsMitigations }) {
  let carbonCreditsCrops = Number(cropsMitigations.mitigationCropsTotal) * 15;
  return carbonCreditsCrops;
}
export default funcCarbonCreditsCrops;
