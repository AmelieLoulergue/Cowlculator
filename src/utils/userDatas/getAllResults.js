const getAllResults = async ({ login, filters }) => {
  console.log(filters);
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${login.token}`,
    },
  };
  const response = await fetch(
    `https://cowlculatorback.herokuapp.com/api/result/researcher/`,
    requestOptions
  );
  const datas = await response.json();
  console.log(datas);
  return datas;
};
export default getAllResults;
