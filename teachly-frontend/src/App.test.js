import { passwordVerification } from "./hooks/Auth/passwordVerification";
import { emailVerification } from "./hooks/Auth/emailVerification";
import {
  profileTypeVerifier,
  repeatPasswordVerifier,
  detailsVerifier,
} from "./hooks/Auth/registerVerification";

describe("Login", () => {
  test("Validate function should pass with correct email", () => {
    const sampleEmail = "example@gmail.com";
    expect(emailVerification(sampleEmail)).toBe("");
  });
  test("Validate function should not pass with incorrect email", () => {
    const sampleIncorrectEmail = "more unusual”example.com";
    expect(emailVerification(sampleIncorrectEmail)).toBe(
      "Email jest niepoprawny"
    );
  });
  test("Validate function should not pass with no typed email", () => {
    const sampleIncorrectEmail = "";
    expect(emailVerification(sampleIncorrectEmail)).toBe("Proszę podać email");
  });

  test("Validate function should pass with correct password", () => {
    const samplePassword = "password";
    expect(passwordVerification(samplePassword)).toBe("");
  });
  test("Validate function should not pass with incorrect password", () => {
    const sampleIncorrectPassword = "";
    expect(passwordVerification(sampleIncorrectPassword)).toBe(
      "Proszę wpisać hasło"
    );
  });
});
describe("Register", () => {
  test("Validate function should pass with selected profileType", () => {
    const alignment = "Uczeń";
    expect(profileTypeVerifier(alignment)).toBe("");
  });
  test("Validate function should not pass with no selected profileType", () => {
    const alignment = "";
    expect(profileTypeVerifier(alignment)).toBe("Proszę wybrać typ profilu");
  });
  test("Validate function should pass with the same typed passwords", () => {
    const samplePassword = "example";
    const sampleRepeatPassword = "example";
    expect(repeatPasswordVerifier(samplePassword, sampleRepeatPassword)).toBe(
      ""
    );
  });
  test("Validate function should not pass with not the same typed passwords", () => {
    const samplePassword = "example";
    const sampleRepeatPassword = "example2";
    expect(repeatPasswordVerifier(samplePassword, sampleRepeatPassword)).toBe(
      "Hasło nie jest takie same"
    );
  });
  test("Validate function should not pass with not typed repeat password", () => {
    const samplePassword = "";
    const sampleRepeatPassword = "";
    expect(repeatPasswordVerifier(samplePassword, sampleRepeatPassword)).toBe(
      "Proszę wpisać hasło"
    );
  });
  test("Validate function should pass with all typed details inputs", () => {
    const firstName = "John";
    const lastName = "Doe";
    const sex = "Mężczyzna";
    const city = "Warsaw";
    const region = "Mazowieckie";
    const country = "Poland";
    expect(
      detailsVerifier(firstName, lastName, sex, city, region, country)
    ).toBe("");
  });
  test("Validate function should not pass with one not typed input in details form", () => {
    const firstName = "John";
    const lastName = "Doe";
    const sex = "Mężczyzna";
    const city = "Warsaw";
    const region = "Mazowieckie";
    const country = "";
    expect(
      detailsVerifier(firstName, lastName, sex, city, region, country)
    ).toBe("Wszystkie pola muszą zostać wypełnione");
  });
});
