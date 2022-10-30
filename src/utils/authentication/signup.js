const signup = async ({
  userProfile: { passwordConfirmation, ...rest },
  setAlertInformations,
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
    "https://cowlculatorback.herokuapp.com/api/auth/signup",
    requestOptions
  );
  if (response.status === 200) {
    setAlertInformations({
      severity: "success",
      displayAlert: true,
      messageAlert:
        "We are almost there ! Confirm your email via your mailbox and log in",
    });
    setTimeout(
      () =>
        setAlertInformations({
          severity: "",
          displayAlert: false,
          messageAlert: "",
        }),
      3000
    );
    navigate("/account/login");
  } else if (response.status === 400) {
    setAlertInformations({
      severity: "error",
      displayAlert: true,
      messageAlert:
        "Email incorrect or already used! Please enter another email 🧐",
    });
    setTimeout(
      () =>
        setAlertInformations({
          severity: "",
          displayAlert: false,
          messageAlert: "",
        }),
      3000
    );
  }
};
export default signup;
