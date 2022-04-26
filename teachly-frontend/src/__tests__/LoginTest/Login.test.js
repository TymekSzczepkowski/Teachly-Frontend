import { render, screen, fireEvent } from "@testing-library/react";
import { validatePassword } from "../../hooks/Auth/passwordVerification";
import { validateEmail } from "../../hooks/Auth/emailVerification";
import userEvent from "@testing-library/user-event";

import Login from "../../pages/Auth/Login/Login";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";

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
    render(<Login />);
    const element = screen.getByText(/Zaloguj się/);
    expect(element).toBeInTheDocument();
  });
  test("Find Email input", () => {
    render(<Login />);
    const loginInput = screen.getByLabelText(/E-mail/);
    fireEvent.change(loginInput, { target: { value: "test@gmail.com" } });
    expect(loginInput.value).toBe("test@gmail.com");
  });
  // test("Click on link", () => {
  //   render(<Login />);
  //   const link = screen.getByTestId("login-link");
  //   fireEvent.click(link);
  //   expect(window.location.pathname).toBe("http://localhost:3000/register");
  //   // expect(link).toHaveAttribute("href", "/register");
  // });
  test("Click on link", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );
    const user = userEvent.setup();
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    expect(screen.getByText(/Zaloguj się/)).toBeInTheDocument();

    user.click(screen.getByTestId("login-link"));

    // check that the content changed to the new page
    expect(screen.getByText(/Zarejestruj się/)).toBeInTheDocument();
  });
});
