const getAllResults = async ({ login, filters }) => {
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${login.token}`,
    },
  };
  const response = await fetch(
    `http://localhost:3000/api/result/researcher/`,
    requestOptions
  );
  const datas = await response.json();
  return datas;
};
export default getAllResults;
