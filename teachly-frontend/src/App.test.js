import { passwordVerifier } from "./pages/Auth/Login/Login";
import { emailVerification } from "./hooks/Auth/emailVerification";

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
    expect(passwordVerifier(samplePassword)).toBe("");
  });
  test("Validate function should not pass with incorrect password", () => {
    const sampleIncorrectPassword = "";
    expect(passwordVerifier(sampleIncorrectPassword)).toBe(
      "Proszę wpisać hasło"
    );
  });
});
describe("Register", () => {
  
});
