import Register from "../../pages/Auth/Register/Register";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { validateProfileType, validateRepeatPassowrd, validateDetails, validateFileTypeUpload, validateFileSizeUpload } from "../../hooks/Auth/registerVerification";
import userEvent from "@testing-library/user-event";

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
    expect(validateRepeatPassowrd(samplePassword, sampleRepeatPassword)).toBe("Proszę wpisać powtórzone hasło");
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
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const element = screen.getByText(/Zarejestruj się/);
    expect(element).toBeInTheDocument();
  });
  test("Find email input", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/E-mail/);
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    expect(emailInput.value).toBe("test@gmail.com");
  });
  test("Find password input", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const passwordInput = screen.getByLabelText(/Hasło/);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(passwordInput.value).toBe("password");
  });
  test("Find repeat password input", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const repeatpasswordInput = screen.getByLabelText(/Hasło/);
    fireEvent.change(repeatpasswordInput, { target: { value: "password" } });
    expect(repeatpasswordInput.value).toBe("password");
  });
  test("Find profile type toogle button", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const toogleButtonUczeń = screen.getByTestId(/student/);
    const toogleButtonKorepetytor = screen.getByTestId(/teacher/);
    fireEvent.click(toogleButtonUczeń);
    fireEvent.click(toogleButtonKorepetytor);
    expect(toogleButtonUczeń.value).toBe("Uczeń");
    expect(toogleButtonKorepetytor.value).toBe("Korepetytor");
  });
  test("Verify if no typed inputs error appears", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const conutineButton = screen.getByTestId("continue-button");
    fireEvent.click(conutineButton);
    expect(screen.getByText(/Proszę wybrać typ profilu/)).toBeInTheDocument();
    expect(screen.getByText(/Proszę podać email/)).toBeInTheDocument();
    expect(screen.getByText(/Proszę wpisać hasło/)).toBeInTheDocument();
    expect(screen.getByText(/Proszę wpisać powtórzone hasło/)).toBeInTheDocument();
  });
  test("Verify email is incorrect error appears", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const conutineButton = screen.getByTestId("continue-button");
    fireEvent.click(conutineButton);
    const emailInput = screen.getByLabelText(/E-mail/);
    fireEvent.change(emailInput, { target: { value: "examplegmail.com" } });
    expect(screen.getByText(/Email jest niepoprawny/)).toBeInTheDocument();
  });
  test("Verify if password does not match error appears", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const conutineButton = screen.getByTestId("continue-button");
    fireEvent.click(conutineButton);
    const passwordInput = screen.getByLabelText(/Hasło/);
    const repeatPasswordInput = screen.getByLabelText(/Powtórz hasło/);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "password2" } });
    expect(screen.getByText(/Hasło nie jest takie same/)).toBeInTheDocument();
  });

  const setup = () => {
    const conutineButton = screen.getByTestId("continue-button");
    const toogleButtonUczeń = screen.getByTestId(/student/);
    const emailInput = screen.getByLabelText(/E-mail/);
    const passwordInput = screen.getByLabelText(/Hasło/);
    const repeatPasswordInput = screen.getByLabelText(/Powtórz hasło/);
    fireEvent.click(toogleButtonUczeń);
    fireEvent.change(emailInput, { target: { value: "example@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "password" } });
    fireEvent.click(conutineButton);
  };

  test("Verify if after filing all inputs you are able to click continue", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    setup();
    expect(screen.getByLabelText(/Imię/)).toBeInTheDocument();
  });
  test("Verify if no typed inputs error appears in second step", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    setup();
    const conutineButton = screen.getByTestId("continue-button");
    fireEvent.click(conutineButton);
    expect(screen.getByText(/Wszystkie pola muszą zostać wypełnione/)).toBeInTheDocument();
  });
  test("verify if success message appears after uploading file with correct extension", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    setup();
    const file = new File(["hello"], "hello.jpg", { type: "image/hpg" });
    const input = screen.getByTestId("upload-file");

    userEvent.upload(input, file);

    expect(input.files[0]).toBe(file);
    expect(input.files.item(0)).toBe(file);
    expect(screen.getByText(/Zdjęcie załadowane pomyślnie./)).toBeInTheDocument();
  });
  test("Verify if error message appears after uploading file with incorrect extension", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    setup();
    const file = new File(["hello"], "hello.tiff", { type: "image/tiff" });
    const input = screen.getByTestId("upload-file");
    userEvent.upload(input, file);
    expect(input.files[0]).toBe(file);
    expect(input.files.item(0)).toBe(file);
    expect(screen.getByText(/Nieprawidłowe rozszerzenie pliku lub rozmiar jest zbyt duży/)).toBeInTheDocument();
  });
});
