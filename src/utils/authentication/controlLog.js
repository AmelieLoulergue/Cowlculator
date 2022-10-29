const TOKEN_KEY = "jwt";

export const logout = ({ login, setLogin }) => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("login");
  setLogin(false);
};

export const isLogin = async ({ authInformations, setAuthInformation }) => {
  let logInformations = null;
  if (!authInformations?.token && !authInformations?.userId) {
    logInformations = JSON.parse(localStorage.getItem("login"));
  } else {
    logInformations = authInformations;
  }
  if (logInformations) {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logInformations.token}`,
      },
    };
    const response = await fetch(
      `https://cowlculatorback.herokuapp.com/api/result/user/${logInformations.userId}`,
      requestOptions
    );
    const datas = await response.json();
    if (datas.error) {
      setAuthInformation({
        ...authInformations,
        login: false,
        loggedUser: false,
      });
      return false;
    }
    setAuthInformation({
      ...authInformations,
      login: logInformations,
      loggedUser: true,
    });
    return true;
  }
  return false;
};

export const confirmEmail = async ({ url, userId, resetToken, navigate }) => {
  await fetch(`${url}/api/auth/confirm-email/${userId}/${resetToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  navigate("/account/login");
};
