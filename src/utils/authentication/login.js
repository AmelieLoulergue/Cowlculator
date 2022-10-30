const TOKEN_KEY = "jwt";
const loginFunc = async ({
  url,
  navigate,
  setAlertInformations,
  userProfile,
  setAuthInformations,
}) => {
  const response = await fetch(`${url}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(userProfile),
    headers: { "Content-Type": "application/json" },
  });
  const res = await response.json();
  if (!res.error) {
    setAuthInformations((currentAuthInformations) => ({
      ...currentAuthInformations,
      login: res.user,
      loggedUser: true,
    }));
    localStorage.setItem(TOKEN_KEY, res.user.token);
    setAlertInformations({
      severity: "success",
      messageAlert: "Great to see you !",
      displayAlert: true,
    });
    setTimeout(() => {
      setAlertInformations({
        severity: "",
        messageAlert: "",
        displayAlert: false,
      });
    }, 3000);
    if (res.user.userType === "farmer") {
      navigate("/dashboard");
    } else if (res.user.userType === "researcher") {
      navigate("/datas");
    }
  }
  if (res.error) {
    setAlertInformations({
      severity: "error",
      messageAlert: "Seems to be invalid user ...",
      displayAlert: true,
    });
    setTimeout(() => {
      setAlertInformations({
        severity: "",
        messageAlert: "",
        displayAlert: false,
      });
    }, 3000);
    setAuthInformations((currentAuthInformations) => ({
      ...currentAuthInformations,
      login: false,
      loggedUser: false,
    }));
  }
};

export default loginFunc;
