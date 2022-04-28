import Login from "../../pages/Auth/Login/Login";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { validatePassword } from "../../hooks/Auth/passwordVerification";
import { validateEmail } from "../../hooks/Auth/emailVerification";

describe("Login validation functions", () => {
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
describe("Login form", () => {
  test("Render Login page", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const element = screen.getByText(/Zaloguj się/);
    expect(element).toBeInTheDocument();
  });
  test("Find email input", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/E-mail/);
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    expect(emailInput.value).toBe("test@gmail.com");
  });
  test("Find password input", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const passwordInput = screen.getByLabelText(/Hasło/);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(passwordInput.value).toBe("password");
  });
  test("Verify if no typed inputs error appears", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const buttonContinue = screen.getByTestId("buttonContinue");
    fireEvent.click(buttonContinue);
    expect(screen.getByText(/Proszę podać email/)).toBeInTheDocument();
    expect(screen.getByText(/Proszę wpisać hasło/)).toBeInTheDocument();
  });
  test("Verify if wrong email error appears, when email is incorrect", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const loginInput = screen.getByLabelText(/E-mail/);
    fireEvent.change(loginInput, { target: { value: "testgmail.com" } });
    const buttonContinue = screen.getByTestId("buttonContinue");
    fireEvent.click(buttonContinue);
    expect(screen.getByText(/Email jest niepoprawny/)).toBeInTheDocument();
  });
});
