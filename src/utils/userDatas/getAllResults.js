const getAllResults = async ({ login, filters, authInformations }) => {
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authInformations?.login?.token}`,
    },
  };
  const response = await fetch(
    `https://cowlculatorback.herokuapp.com/api/result/researcher/`,
    requestOptions
  );
  const datas = await response.json();
  return datas;
};
export default getAllResults;
