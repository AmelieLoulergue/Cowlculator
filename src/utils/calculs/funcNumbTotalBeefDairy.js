// Function number total beef and dairies
function funcNumbTotalBeefDairy(datasForm) {
  //Number total dairies
  let cattleDairy =
    datasForm.farm_dairy_cattle_rep12_numb.value +
    datasForm.farm_dairy_cattle_rep24_numb.value +
    datasForm.farm_dairy_cattle_matur_numb.value;

  let cattleBeef =
    datasForm.farm_beef_cattle_rep12_numb.value +
    datasForm.farm_beef_cattle_rep24_numb.value +
    datasForm.farm_beef_cattle_matur_numb.value +
    datasForm.farm_beef_cattle_weanling_numb.value +
    datasForm.farm_beef_cattle_yearling_numb.value +
    datasForm.farm_beef_cattle_bulls_numb.value;

  return [cattleDairy, cattleBeef];
}
export default funcNumbTotalBeefDairy;
