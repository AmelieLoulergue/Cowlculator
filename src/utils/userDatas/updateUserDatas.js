const updateUserDatas = async ({
  farmName,
  authInformations,
  setAuthInformations,
}) => {
  if (
    authInformations?.login?.userId &&
    authInformations?.login?.token &&
    farmName
  ) {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authInformations.login.token}`,
      },
      body: JSON.stringify({ farmName: farmName }),
    };
    const response = await fetch(
      `https://cowlculatorback.herokuapp.com/api/auth/user/${authInformations.login.userId}`,
      requestOptions
    );
    const datas = await response.json();
    if (!datas.error) {
      setAuthInformations({
        ...authInformations,
        login: { ...authInformations.login, farmName: datas.farmName },
      });
    }
    return datas;
  }
};
export default updateUserDatas;
