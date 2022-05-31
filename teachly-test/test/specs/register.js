describe("Testing the registration process", () => {
  it("Should register with right credentials", async () => {
    await browser.url("http://localhost:3000/");
    //step1
    await $("#profile-icon").click();
    await $("#sign-up").click();
    await $('[value="Student"]').click();
    await $("#email-input").setValue("johndoe@gmail.com");
    await $("#password-input").setValue("Password1$");
    await $("#repassword-input").setValue("Password1$");
    await $("#continue-button").click();
    //step2
    await $("#firstname-input").setValue("John");
    await $("#lastname-input").setValue("Doe");
    await $("#sex-input").click();
    await $('[data-value="male"]').click();
    await $("#city-input").click();
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);
    await $("#region-input").click();
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);
    await $("#country-input").click();
    await browser.keys(["\uE015"]);
    await browser.keys(["\uE007"]);

    const filePath = "./test/data/guy.jpeg";
    const remoteFilePath = await browser.uploadFile(filePath);

    browser.execute(function () {
      document.getElementById("fileUpload-input").style.display = "block";
    });

    $("#fileUpload-input").waitForDisplayed();
    await $("#fileUpload-input").setValue(remoteFilePath);
    await $("#continue-button").click();
    //step3
    await $("span=Adres email").waitForDisplayed();
    await $("#continue-button").click();
    await $("h2=Witaj John Doe").waitForDisplayed();
    await browser.url("http://localhost:3000/activate/10/10");
  });
});
