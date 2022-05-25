export const login = describe("Testing the login process", () => {
  it("Should login with right credentials", async () => {
    await browser.url("http://localhost:3000/");
    await $("#profile-icon").click();
    await $("#sign-in").click();
    await $("#email-input").setValue("johndoe@gmail.com");
    await $("#password-input").setValue("Password1$");
    await $("#sign-in-button").click();
  });
});
