export const profileTypeVerifier = (alignment) => {
  if (alignment === "") {
    return "Proszę wybrać typ profilu";
  } else {
    return "";
  }
};
export const passwordVerifier = (password, state, setState) => {
  if (password === "") {
    return "Proszę wpisać hasło";
  } else
    setState({
      ...state,
      passwordError: "",
    });
  return "";
};
export const repeatPasswordVerifier = (
  password,
  repeatPassword,
  state,
  setState
) => {
  if (repeatPassword === "") {
    return "Proszę wpisać hasło";
  } else if (password !== repeatPassword) {
    return "Hasło nie jest takie same";
  } else
    setState({
      ...state,
      passwordError: "",
    });
  return "";
};

export const detailsVerifier = (
  firstName,
  lastName,
  sex,
  country,
  region,
  city,
  image,
  state,
  setState
) => {
  if (
    firstName === "" ||
    lastName === "" ||
    sex === "" ||
    country === "" ||
    region === "" ||
    city === "" ||
    image === ""
  ) {
    return "Wszystkie pola muszą zostać wypełnione";
  } else
    setState({
      ...state,
      detailsError: "",
    });
  return "";
};
