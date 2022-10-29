const getUserDatas = async ({ login, authInformations }) => {
  if (authInformations?.login?.userId) {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authInformations?.login?.token}`,
      },
    };
    const response = await fetch(
      `https://cowlculatorback.herokuapp.com/api/result/user/${authInformations?.login?.userId}`,
      requestOptions
    );
    const datas = await response.json();
    return datas;
  }
};
export default getUserDatas;
