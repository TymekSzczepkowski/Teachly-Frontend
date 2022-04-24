export default function registerVerification(
  alignment,
  setErrorInfo,
  errorInfo,
  state
) {
  const profileTypeVerifier = () => {
    if (alignment === "") {
      setErrorInfo({
        ...errorInfo,
        profileTypeError: "Proszę wybrać typ profilu",
      });
      return false;
    } else {
      return true;
    }
  };

  const passwordVerifier = () => {
    if (state.password === "") {
      setErrorInfo({ ...errorInfo, passwordError: "Proszę wpisać hasło" });
      return false;
    } else if (state.repeatPassword === "") {
      setErrorInfo({
        ...errorInfo,
        repeatPasswordError: "Powtórz hasło",
      });
      return false;
    } else if (state.password !== state.repeatPassword) {
      setErrorInfo({
        ...errorInfo,
        passwordError: "Hasła nie są takie same",
      });
      return false;
    } else
      setErrorInfo({
        ...errorInfo,
        repeatPasswordError: "",
        passwordError: "",
      });
    return true;
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
      setErrorInfo({
        ...errorInfo,
        detailsError: "Wszystkie pola muszą zostać wypełnione",
      });
      return false;
    } else
      setErrorInfo({
        ...errorInfo,
        detailsError: "",
      });
    return true;
  };
  return { profileTypeVerifier, passwordVerifier, detailsVerifier };
}
