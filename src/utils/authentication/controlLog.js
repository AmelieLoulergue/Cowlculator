const TOKEN_KEY = "jwt";

export const logout = ({ setAuthInformations, setResultInformations }) => {
  setAuthInformations((currentAuthInformations) => ({
    ...currentAuthInformations,
    loggedUser: false,
    login: false,
  }));
  setResultInformations({ allResultsUser: [], allResults: [] });
};

export const isLogin = async ({ authInformations, setAuthInformations }) => {
  let logInformations = null;
  if (!authInformations?.token && !authInformations?.userId) {
    let localStorageItems = JSON.parse(localStorage.getItem("cowlculator"));
    let isUser = localStorageItems?.find((item) => item.loggedUser);
    if (isUser.loggedUser) {
      logInformations = isUser.login;
    }
  } else {
    logInformations = authInformations?.login;
  }
  if (logInformations) {
    console.log(logInformations);
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
      setAuthInformations({
        ...authInformations,
        login: false,
        loggedUser: false,
      });
      return false;
    }
    setAuthInformations({
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
