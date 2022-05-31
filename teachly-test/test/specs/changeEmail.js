import { login } from "./login";
describe("Testing e-mail change request", () => {
  it("Should send a request to change the e-mail", async () => {
    await login;
    //step 1
    await $("#profile-icon").click();
    await $("#settings").click();
    await $("#profile-data").click();
    await browser.url("http://localhost:3000/settings/editemail");
    await $("#change-email-button").click();
    //step 2
    await browser.url("http://localhost:3000/email-reset/123456789/987654321");
    await $("#new-email-input").setValue("doe@gmail.com");
    await $("#repeat-email-input").setValue("doe@gmail.com");
    await $("#change-email-button-send").click();
    //step 3
    await browser.url("http://localhost:3000/email-reset-confirm/123/321/22");
    await $("#change-email-button-confirm").click();
  });
});
