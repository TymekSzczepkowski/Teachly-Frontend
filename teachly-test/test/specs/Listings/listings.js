import { login } from "../Auth/login";
describe("Testing displaying all listings and displaying specific one ", () => {
  it("Should filter listings by subject", async () => {
    await login;
    await $("#seachbar").click();
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);
  });
  it("Should filter listings by location", async () => {
    await $("#location-filter").click();
    await $("#location-filter").setValue("g");
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);
  });

  it("Should open a specific lesson card", async () => {
    await $("#open-lesson-card-button").click();
    await $("#make-an-appointment-button").waitForDisplayed();
  });
  it("Should open a teacher details on lesson card", async () => {
    await $("#teacher-details-button").click();
    await $("#card-header").waitForDisplayed();
    await browser.keys(["\uE00C"]);
  });
  it("Should open a teacher feedback on lesson card", async () => {
    await $('//*[@id="teacher-feedback-button"]').waitForClickable({ timeout: 5000 }, { interval: 1000 });
    await $('//*[@id="teacher-feedback-button"]').click();
    await $("#feedback-list").waitForDisplayed();
    await browser.keys(["\uE00C"]);
  });
  it("Should open an another teacher lesson on lesson card", async () => {
    await $('//*[@id="AnotherLessonOffer-button"]').click();
    await $("#make-an-appointment-button").waitForDisplayed();
  });
});
