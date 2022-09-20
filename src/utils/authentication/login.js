import React from "react";
const TOKEN_KEY = "jwt";
const loginFunc = async ({
  userProfile,
  setUserProfile,
  login,
  setLogin,
  url,
  navigate,
  setMessageAlert,
  setSeverity,
  setDisplayAlert,
}) => {
  const response = await fetch(`${url}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(userProfile),
    headers: { "Content-Type": "application/json" },
  });
  const res = await response.json();
  if (!res.error) {
    setLogin(res.user);
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
    setTimeout(() => {
      setDisplayAlert(false);
    }, 3000);
  }
};

export default loginFunc;
