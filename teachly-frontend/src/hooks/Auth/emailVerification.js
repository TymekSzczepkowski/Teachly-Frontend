export function validateEmail(email) {
  if (email === "") {
    return "Proszę podać email";
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return "";
  }
  return "Email jest niepoprawny";
}
