export default function registerVerification(
  alignment,
  setErrorInfo,
  errorInfo,
  state
) {
  const profileTypeVerifier = () => {
    if (alignment === "") {
      return "Proszę wybrać typ profilu";
    } else {
      return "";
    }
  };

  const passwordVerifier = () => {
    if (state.password === "") {
      return "Proszę wpisać hasło";
    } else
      setErrorInfo({
        ...errorInfo,
        passwordError: "",
      });
    return "";
  };

  const repeatPasswordVerifier = () => {
    if (state.repeatPassword === "") {
      return "Proszę wpisać hasło";
    } else if (state.password !== state.repeatPassword) {
      return "Hasło nie jest takie same";
    } else
      setErrorInfo({
        ...errorInfo,
        passwordError: "",
      });
    return "";
  };

  const detailsVerifier = () => {
    if (
      state.firstName === "" ||
      state.lastName === "" ||
      state.sex === "" ||
      state.country === "" ||
      state.region === "" ||
      state.city === "" ||
      state.image === ""
    ) {
      return "Wszystkie pola muszą zostać wypełnione";
    } else
      setErrorInfo({
        ...errorInfo,
        detailsError: "",
      });
    return "";
  };
  return {
    profileTypeVerifier,
    passwordVerifier,
    detailsVerifier,
    repeatPasswordVerifier,
  };
}
