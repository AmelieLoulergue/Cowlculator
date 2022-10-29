const saveUserDatas = async ({ allQuestions, results, authInformations }) => {
  let newResults = Object.entries(results)
    .map((value) => {
      return { id: value[0], response: value[1] };
    })
    .flat();

  const resultToSend = [
    ...allQuestions.filter((element) => element.id !== "farm_name"),
    ...newResults,
  ];
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
