const TOKEN_KEY = "jwt";

export const logout = ({ login, setLogin }) => {
  localStorage.removeItem(TOKEN_KEY);
  setLogin(false);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
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
  const response = await fetch(
    `${url}/api/auth/confirm-email/${userId}/${resetToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
  const res = await response.json();
  if (res.error) {
    setMessageAlert(
      "There seems to be an error, invalid link or already confirmed 🧐"
    );
    setSeverity("error");
    setDisplayAlert(true);
    setTimeout(() => setDisplayAlert(false), 3000);
  }
  if (res.message) {
    setMessageAlert(
      "Congratulations and welcome! Your account is confirmed, you can sign in 🤩"
    );
    setSeverity("success");
    setDisplayAlert(true);
    setTimeout(() => setDisplayAlert(false), 3000);
  }
  navigate("/account/login");
};
