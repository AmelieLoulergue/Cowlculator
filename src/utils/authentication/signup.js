const signup = async ({
  userProfile: { passwordConfirmation, ...rest },
  setMessageAlert,
  setSeverity,
  setDisplayAlert,
  navigate,
}) => {
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rest),
  };
  const response = await fetch(
    "https://cowlculatorback.herokuapp.com" + "/api/auth/signup",
    requestOptions
  );
  if (response.status === 200) {
    const datas = await response.json();
    setDisplayAlert(true);
    setSeverity("success");
    setMessageAlert(
      "We are almost there ! Confirm your email via your mailbox and log in"
    );
    setTimeout(() => setDisplayAlert(false), 3000);
    navigate("/account/login");
  } else if (response.status === 400) {
    setDisplayAlert(true);
    setSeverity("error");
    setMessageAlert(
      "Email incorrect or already used! Please enter another email 🧐"
    );
    setTimeout(() => setDisplayAlert(false), 3000);
  }
};
export default signup;
