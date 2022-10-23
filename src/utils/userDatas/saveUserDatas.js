const saveUserDatas = async ({ allQuestions, results, login }) => {
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
      Authorization: `Bearer ${login.token}`,
    },
    body: JSON.stringify({ result: resultToSend }),
  };
  const response = await fetch(
    "http://localhost:3000/api/result",
    requestOptions
  );
  const datas = await response.json();
  return response.error ? false : datas;
};
export default saveUserDatas;
