const TOKEN_KEY = "jwt";

export const logout = ({ login, setLogin }) => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("login");
  setLogin(false);
};

export const isLogin = async ({ login, setLogin }) => {
  if (localStorage.getItem(TOKEN_KEY) && login?.userId) {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };
    const response = await fetch(
      `https://cowlculatorback.herokuapp.com/api/result/user/${login.userId}`,
      requestOptions
    );
    const datas = await response.json();
    if (datas.error) {
      setLogin(false);
      return false;
    }
    return true;
  }

  return false;
};

export const confirmEmail = async ({
  url,
  userId,
  resetToken,
  navigate,
  setMessageAlert,
  setSeverity,
  setDisplayAlert,
}) => {
  console.log("ici");
  const response = await fetch(
    `${url}/api/auth/confirm-email/${userId}/${resetToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
  const res = await response.json();
  // console.log(res);
  // if (res.error) {
  //   setMessageAlert(
  //     "There seems to be an error, invalid link or already confirmed 🧐"
  //   );
  //   setSeverity("error");
  //   setDisplayAlert(true);
  //   setTimeout(() => setDisplayAlert(false), 3000);
  // }
  // if (res.message) {
  //   setMessageAlert(
  //     "Congratulations and welcome! Your account is confirmed, you can sign in 🤩"
  //   );
  //   setSeverity("success");
  //   setDisplayAlert(true);
  //   setTimeout(() => setDisplayAlert(false), 3000);
  // }
  navigate("/account/login");
};
