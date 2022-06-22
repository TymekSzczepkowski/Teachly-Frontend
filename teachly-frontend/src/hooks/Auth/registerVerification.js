export const validateProfileType = (profileType) => {
  if (profileType === "") {
    return "Proszę wybrać typ profilu";
  } else {
    return "";
  }
};
export const validateRepeatInput = (password, repeatPassword) => {
  if (repeatPassword === "") {
    return "Proszę powtórzyć dane";
  } else if (password !== repeatPassword) {
    return "Dane nie są takie same";
  } else return "";
};

export const validateDetails = (firstName, lastName, sex, country, region, city, image) => {
  if (firstName === "" || lastName === "" || sex === "" || country === "" || region === "" || city === "" || image === "" || country === null || region === null || city === null) {
    return false;
  } else return true;
};
export const validateFileTypeUpload = (fileName) => {
  const allowedExtensions = new Array("jpg", "png", "jpeg");
  let fileExtension = fileName.split(".").pop().toLowerCase();

  return allowedExtensions.includes(fileExtension);
};
export const validateFileSizeUpload = (fileName) => {
  let fileSize = (fileName = Math.round(fileName / 1024 / 1024));
  if (fileSize <= 3) {
    return true;
  }
  return false;
};
