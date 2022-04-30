export const validatePassword = (password) => {
  const passwordMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (password === "") {
    return "Proszę wpisać hasło";
  } else if (!password.match(passwordMatch)) {
    return "Hasło musi posiadać minimum 8 znaków, 1 wielką literę, 1 małą literę, 1 cyfrę oraz 1 znak specjalny";
  } else {
    return "";
  }
};
