const getUserDatas = async ({ login, allResultsUser, setAllResultsUser }) => {
  console.log("getUseDatas");
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${login.token}`,
    },
  };
  const response = await fetch(
    `http://localhost:3000/api/result/${login.userId}`,
    requestOptions
  );
  const datas = await response.json();
  setAllResultsUser(datas.result.map((item) => item.result));
  return response.error ? false : datas;
};
export default getUserDatas;
