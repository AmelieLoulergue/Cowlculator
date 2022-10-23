const getUserDatas = async ({ login }) => {
  if (login.userId) {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${login.token}`,
      },
    };
    const response = await fetch(
      `https://cowlculatorback.herokuapp.com/api/result/user/${login.userId}`,
      requestOptions
    );
    const datas = await response.json();
    return datas;
  }
};
export default getUserDatas;
