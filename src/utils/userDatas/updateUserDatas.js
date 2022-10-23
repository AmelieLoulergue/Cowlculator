const updateUserDatas = async ({ login, farmName, setLogin }) => {
  if (login.userId && farmName) {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${login.token}`,
      },
      body: JSON.stringify({ farmName: farmName }),
    };
    const response = await fetch(
      `http://localhost:3000/api/auth/user/${login.userId}`,
      requestOptions
    );
    const datas = await response.json();
    console.log(datas);
    if (!datas.error) {
      setLogin(datas);
    }
    return datas;
  }
};
export default updateUserDatas;
