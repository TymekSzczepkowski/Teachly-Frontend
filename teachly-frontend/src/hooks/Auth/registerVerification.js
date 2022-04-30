export const validateProfileType = (profileType) => {
  if (profileType === "") {
    return "Proszę wybrać typ profilu";
  } else {
    return "";
  }
};
export const validateRepeatPassowrd = (password, repeatPassword) => {
  if (repeatPassword === "") {
    return "Proszę wpisać powtórzone hasło";
  } else if (password !== repeatPassword) {
    return "Hasło nie jest takie same";
  } else return "";
};

export const validateDetails = (firstName, lastName, sex, country, region, city, image) => {
  if (firstName === "" || lastName === "" || sex === "" || country === "" || region === "" || city === "" || image === "") {
    return "Wszystkie pola muszą zostać wypełnione";
  } else return "";
};
export const validateFileTypeUpload = (fileName) => {
  const allowedExtensions = new Array("jpg", "png", "jpeg");
  let fileExtension = fileName.split(".").pop().toLowerCase();

  return allowedExtensions.includes(fileExtension);
};
export const validateFileSizeUpload = (fileName) => {
  let fileSize = (fileName = Math.round(fileName / 1024 / 1024));
  //3MB
  if (fileSize <= 3) {
    return true;
  }
  return false;
};
