export const profileTypeVerifier = (alignment) => {
  if (alignment === "") {
    return "Proszę wybrać typ profilu";
  } else {
    return "";
  }
};
export const repeatPasswordVerifier = (password, repeatPassword) => {
  if (repeatPassword === "") {
    return "Proszę wpisać hasło";
  } else if (password !== repeatPassword) {
    return "Hasło nie jest takie same";
  } else return "";
};

export const detailsVerifier = (
  firstName,
  lastName,
  sex,
  country,
  region,
  city,
  image
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
  } else return "";
};
