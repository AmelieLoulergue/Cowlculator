const saveUserDatas = async ({ results, authInformations }) => {
  const resultToSend = results.filter((element) => element.id !== "farm_name");

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authInformations?.login?.token}`,
    },
    body: JSON.stringify({ result: resultToSend }),
  };
  const response = await fetch(
    "https://cowlculatorback.herokuapp.com/api/result",
    requestOptions
  );
  const datas = await response.json();
  return response.error ? false : datas;
};
export default saveUserDatas;
