export const validateProfileType = (alignment) => {
  if (alignment === "") {
    return "Proszę wybrać typ profilu";
  } else {
    return "";
  }
};
export const validateRepeatPassowrd = (password, repeatPassword) => {
  if (repeatPassword === "") {
    return "Proszę wpisać hasło";
  } else if (password !== repeatPassword) {
    return "Hasło nie jest takie same";
  } else return "";
};

export const validateDetails = (firstName, lastName, sex, country, region, city, image) => {
  if (firstName === "" || lastName === "" || sex === "" || country === "" || region === "" || city === "" || image === "") {
    return "Wszystkie pola muszą zostać wypełnione";
  } else return "";
};

export const validateFileUpload = (fileName) => {
  const allowedExtensions = new Array("jpg", "png", "jpeg");
  let fileExtension = fileName.split(".").pop().toLowerCase(); // split function will split the filename by dot(.), and pop function will pop the last element from the array which will give you the extension as well. If there will be no extension then it will return the filename.

  for (let i = 0; i <= allowedExtensions.length; i++) {
    if (allowedExtensions[i] == fileExtension) {
      return true;
    }
  }
  return false;
};
