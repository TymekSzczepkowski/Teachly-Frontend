export const validatePassword = (password) => {
  if (password === "") {
    return "Proszę wpisać hasło";
  } else {
    return "";
  }
};
