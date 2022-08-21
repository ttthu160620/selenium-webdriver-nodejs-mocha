let myAccountPage = require("../../actions/pageObject/userPageObject/MyAccountPageObject.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let openBrowser = require("../../actions/commons/BaseTest.js");
let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let loginData = require("../../testdata/Login.json");
var addContext = require("mochawesome/addContext");

describe("Profile of user", async function(){
    let driver = null;

    before("Open brower and login", async function(){
        driver = await openBrowser.openHomePage();
        homePage.constructorDriver(driver);
        myAccountPage.constructorDriver(driver);
        loginPage.constructorDriver(driver);

        homePage.clickToLoginLink();
        await driver.sleep(2000);
        loginPage.inputUsernameTextbox(loginData.validAccount.username);
        await driver.sleep(1000);
        loginPage.inputPasswordTextbox(loginData.validAccount.password);
        await driver.sleep(1000);
        loginPage.clickSubmitButton();
        await driver.sleep(1000);
        await loginPage.verifyLoginSuccessfully(loginData.validAccount.fullName);
    });

    this.beforeEach("Access user profile", async function(){
        homePage.hoverToMyAccountLink();
        await driver.sleep(2000);
        homePage.clickToProfileLink();
        await driver.sleep(2000);
    });

    it("TC01 Verify user's info when login successful", async function(){
        await myAccountPage.verifyUsernameInfoValue(loginData.validAccount.username, "value");
        await myAccountPage.verifyEmailInfoValue(loginData.validAccount.email, "value");
        await myAccountPage.verifyFullNameInfoValue(loginData.validAccount.fullName, "value");
        await myAccountPage.verifyBirthdayInfoValue(loginData.validAccount.birthday, "value");
    });

    it("TC02Change password have less than 6 characters", async function(){
        myAccountPage.clickToChangePasswordCheckboxByJS();
        await driver.sleep(1000);
        await myAccountPage.verifyChangPasswordIsSelected();
        myAccountPage.inputNewPasswordTextbox("12345");
        myAccountPage.inputNewConfPasswordTextbox("12345");
        await driver.sleep(1000);
        await myAccountPage.verifyUpdateButtonIsDisabled();
    });

    it("TC03 TC0Change password have confirm password differrent with password", async function(){
        myAccountPage.clickToChangePasswordCheckboxByJS();
        await driver.sleep(1000);
        await myAccountPage.verifyChangPasswordIsSelected();
        myAccountPage.inputNewPasswordTextbox(loginData.validAccount.newPassword);
        myAccountPage.inputNewConfPasswordTextbox("1234");
        await driver.sleep(1000);
        await myAccountPage.verifyUpdateButtonIsDisabled();
    });

    it("TC04 Change password successfully",async function(){
        this.retries(1);
        myAccountPage.clickToChangePasswordCheckboxByJS();
        await driver.sleep(1000);
        await myAccountPage.verifyChangPasswordIsSelected();
        myAccountPage.inputNewPasswordTextbox(loginData.validAccount.newPassword);
        myAccountPage.inputNewConfPasswordTextbox(loginData.validAccount.newPassword);
        await myAccountPage.verifyUpdateButtonIsEnabled();
        myAccountPage.clickToUpdateButton();
        
        await driver.sleep(2000);
        homePage.hoverToMyAccountLink();
        await driver.sleep(2000);
        homePage.clickToLogoutLink();
        await driver.sleep(2000);

        homePage.clickToLoginLink();
        await driver.sleep(2000);
        loginPage.inputUsernameTextbox(loginData.validAccount.username);
        await driver.sleep(1000);
        loginPage.inputPasswordTextbox(loginData.validAccount.newPassword);
        await driver.sleep(1000);
        loginPage.clickSubmitButton();
        await driver.sleep(1000);
        await loginPage.verifyLoginSuccessfully(loginData.validAccount.fullName);
    });

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
            let imageFileName = this.currentTest.title + '.jpeg';
            driver.takeScreenshot().then(
                function(image){
                    require('fs').writeFileSync('./screenshots/user/myaccount/' + imageFileName, image, 'base64')
                }
            )
            addContext(this,'Following comes the failed test image')
            addContext(this, '../screenshots/' + imageFileName)
        }
    });

    after("Close broswer", async function(){
        await driver.quit();
    });
});