import { login } from "../Auth/login";
describe("Testing MyAccount page", () => {
  it("Should display MyAccount page", async () => {
    await login;
    await $("#profile-icon").click();
    await $("#my-account").click();
    await $("#account-details").waitForDisplayed();
  });
  it("Should add a new lesson", async () => {
    await $('//*[@id="addNewLesson-button"]').click();
    await $("#title-input").setValue("Test");
    await $("#city-input").click();
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);
    await $("#description-input").setValue("Testowy opis");
    await $("#price-input").setValue("100");
    await $("#subject-input").click();
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);
    await $("#level-input").click();
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);
    await $("#type-buttonGroup").click();
    await $("#addLesson-button").click();
    await $('//*[@id="Test-heading"]').waitForDisplayed();
  });

  it("Should edit one of my lessons", async () => {
    await $('//*[@id="Test-id"]').click();
    await $('//*[@id="subject-input"]').waitForClickable({ timeout: 5000 }, { interval: 1000 });
    await $('//*[@id="subject-input"]').click();
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);
    await $('//*[@id="saveOffer-button"]').click();
  });
  it("Should delete one of my lessons", async () => {
    await $('//*[@id="Test-id"]').click();
    await $('//*[@id="deleteOffer-button"]').waitForClickable({ timeout: 5000 }, { interval: 1000 });
    await $('//*[@id="deleteOffer-button"]').click();
    await $('//*[@id="deleteOffer-button2"]').click();
  });
});
