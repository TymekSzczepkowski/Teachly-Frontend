import { validatePassword } from "../../hooks/Auth/passwordVerification";
import { validateEmail } from "../../hooks/Auth/emailVerification";

describe("Testing login validation functions", () => {
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
    const samplePassword = "Password1$";
    expect(validatePassword(samplePassword)).toBe("");
  });
  test("Validate password function should not pass with incorrect password", () => {
    const sampleIncorrectPassword = "";
    expect(validatePassword(sampleIncorrectPassword)).toBe("Proszę wpisać hasło");
  });
});
