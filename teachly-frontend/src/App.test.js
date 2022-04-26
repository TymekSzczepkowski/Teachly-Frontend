import { render, screen } from "@testing-library/react";
import Register from "../src/pages/Auth/Register/Register";
import { validatePassword } from "./hooks/Auth/passwordVerification";
import { validateEmail } from "./hooks/Auth/emailVerification";
import { validateProfileType, validateRepeatPassowrd, validateDetails, validateFileTypeUpload, validateFileSizeUpload } from "./hooks/Auth/registerVerification";

describe("Login validation form", () => {
  test("Validate email function should pass with correct email", () => {
    const sampleEmail = "example@gmail.com";
    expect(validateEmail(sampleEmail)).toBe("");
  });
  test("Validate email function should not pass with incorrect email", () => {
    const sampleIncorrectEmail = "more unusual”example.com";
    expect(validateEmail(sampleIncorrectEmail)).toBe("Email jest niepoprawny");
  });
  test("Validate email function should not pass with no typed email", () => {
    const sampleIncorrectEmail = "";
    expect(validateEmail(sampleIncorrectEmail)).toBe("Proszę podać email");
  });

  test("Validate password function should pass with correct password", () => {
    const samplePassword = "password";
    expect(validatePassword(samplePassword)).toBe("");
  });
  test("Validate password function should not pass with incorrect password", () => {
    const sampleIncorrectPassword = "";
    expect(validatePassword(sampleIncorrectPassword)).toBe("Proszę wpisać hasło");
  });
});
describe("Register validation form", () => {
  test("Validate profileType function should pass with selected profileType", () => {
    const alignment = "Uczeń";
    expect(validateProfileType(alignment)).toBe("");
  });
  test("Validate profileType function should not pass with no selected profileType", () => {
    const alignment = "";
    expect(validateProfileType(alignment)).toBe("Proszę wybrać typ profilu");
  });
  test("Validate passwords function should pass with the same typed passwords", () => {
    const samplePassword = "example";
    const sampleRepeatPassword = "example";
    expect(validateRepeatPassowrd(samplePassword, sampleRepeatPassword)).toBe("");
  });
  test("Validate passwords function should not pass with not the same typed passwords", () => {
    const samplePassword = "example";
    const sampleRepeatPassword = "example2";
    expect(validateRepeatPassowrd(samplePassword, sampleRepeatPassword)).toBe("Hasło nie jest takie same");
  });
  test("Validate passwords function should not pass with not typed repeat password", () => {
    const samplePassword = "";
    const sampleRepeatPassword = "";
    expect(validateRepeatPassowrd(samplePassword, sampleRepeatPassword)).toBe("Proszę wpisać hasło");
  });
  test("Validate details function should pass with all typed details inputs", () => {
    const firstName = "John";
    const lastName = "Doe";
    const sex = "Mężczyzna";
    const city = "Warsaw";
    const region = "Mazowieckie";
    const country = "Poland";
    expect(validateDetails(firstName, lastName, sex, city, region, country)).toBe("");
  });
  test("Validate details function should not pass with one not typed input in details form", () => {
    const firstName = "John";
    const lastName = "Doe";
    const sex = "Mężczyzna";
    const city = "Warsaw";
    const region = "Mazowieckie";
    const country = "";
    expect(validateDetails(firstName, lastName, sex, city, region, country)).toBe("Wszystkie pola muszą zostać wypełnione");
  });
  test("Validate file upload function should pass with file with correct extension", () => {
    const filename = "filename.jpg";
    const filename2 = "filename.png";
    const filename3 = "filename.jpeg";
    expect(validateFileTypeUpload(filename)).toBe(true);
    expect(validateFileTypeUpload(filename2)).toBe(true);
    expect(validateFileTypeUpload(filename3)).toBe(true);
  });
  test("Validate file upload function should not pass with file with incorrect extension", () => {
    const filename = "filename.gif";
    const filename2 = "filename.xml";
    const filename3 = "filename.tiff";
    expect(validateFileTypeUpload(filename)).toBe(false);
    expect(validateFileTypeUpload(filename2)).toBe(false);
    expect(validateFileTypeUpload(filename3)).toBe(false);
  });
  test("Validate file size upload function should pass with correct file size", () => {
    const filesize = 648822;
    expect(validateFileSizeUpload(filesize)).toBe(true);
  });
  test("Validate file size upload function should not pass with incorrect file size", () => {
    const filesize = 6488220;
    expect(validateFileSizeUpload(filesize)).toBe(false);
  });
});
describe("Register", () => {
  test("Render Register page", () => {
    render(<Register />);
    const element = screen.getByText(/Zarejestruj się/);
    expect(element).toBeInTheDocument();
  });
});
