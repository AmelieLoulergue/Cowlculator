const saveUserDatas = async ({ allQuestions, results, login }) => {
  let newResults = Object.entries(results)
    .map((value, index) => {
      console.log(value);
      return { id: value[0], response: value[1] };
    })
    .flat();

  const resultToSend = [
    ...allQuestions.filter((element) => element.id !== "farm_name"),
    ...newResults,
  ];
  console.log(JSON.stringify(resultToSend));
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
  console.log(datas);
  return response.error ? false : datas;
};
export default saveUserDatas;
// export default async function fetchAllDatas({ jwtToken }) {
//   if (jwtToken) {
//     let requestOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${jwtToken.token}`,
//       },
//     };
//     const response = await fetch(
//       "https://backpowerroad.herokuapp.com/items",
//       requestOptions
//     );
//     const datas = await response.json();
//     return response.error ? false : datas;
//   } else {
//     return false;
//   }
// }
