function funcCarbonCreditsCrops({ cropsMitigationsTotal }) {
  let carbonCreditsCrops = Number(cropsMitigationsTotal) * 15;
  return carbonCreditsCrops;
}
export default funcCarbonCreditsCrops;
