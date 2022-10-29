const TOKEN_KEY = "jwt";
const loginFunc = async ({
  url,
  navigate,
  setMessageAlert,
  setSeverity,
  setDisplayAlert,
  authInformations,
  setAuthInformations,
}) => {
  console.log(authInformations);
  const response = await fetch(`${url}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(authInformations?.userProfile),
    headers: { "Content-Type": "application/json" },
  });
  const res = await response.json();
  if (!res.error) {
    setAuthInformations({
      ...authInformations,
      login: res.user,
      loggedUser: true,
      userProfile: {
        email: "",
        password: "",
      },
    });
    localStorage.setItem(TOKEN_KEY, res.user.token);
    setMessageAlert("Great to see you !");
    setSeverity("success");
    setDisplayAlert(true);
    setTimeout(() => {
      setDisplayAlert(false);
    }, 3000);

    res.user.userType === "farmer"
      ? navigate("/dashboard")
      : navigate("/datas");
  }
  if (res.error) {
    setMessageAlert("Seems to be invalid user ...");
    setSeverity("error");
    setDisplayAlert(true);
    setAuthInformations({
      ...authInformations,
      login: false,
      loggedUser: false,
    });
    setTimeout(() => {
      setDisplayAlert(false);
    }, 3000);
  }
};

export default loginFunc;
