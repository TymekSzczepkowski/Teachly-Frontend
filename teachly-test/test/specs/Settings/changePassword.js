import { login } from "../Auth/login";

describe("Testing password change request", () => {
  it("Should send a request to change the password", async () => {
    await login;
    await $("#profile-icon").click();
    await $("#settings").click();
    await $("#profile-data").click();
    await browser.url("http://localhost:3000/settings/editpassword");
    await $("#change-password-button").click();
    await browser.url("http://localhost:3000/password/reset/confirm/123456789/987654321");
    await $("#new-password-input").setValue("Password1%");
    await $("#repeat-password-input").setValue("Password1%");
    await $("#change-password-button-send").click();
  });
});
