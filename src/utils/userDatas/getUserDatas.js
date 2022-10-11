const getUserDatas = async ({ login }) => {
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${login.token}`,
    },
  };
  const response = await fetch(
    `https://cowlculatorback.herokuapp.com/api/result/${login.userId}`,
    requestOptions
  );
  const datas = await response.json();
  return datas;
};
export default getUserDatas;
