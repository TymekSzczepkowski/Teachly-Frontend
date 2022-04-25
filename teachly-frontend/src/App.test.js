import { render, screen } from "@testing-library/react";
import { passwordVerifier } from "./pages/Auth/Login/Login";

describe("login", () => {
  test("validate function should pass on correct input", () => {
    const email = "test@test.com";
    expect(passwordVerifier("dfs")).toBe("");
  });
});
