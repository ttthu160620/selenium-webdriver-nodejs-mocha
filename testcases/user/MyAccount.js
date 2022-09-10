let myAccountPage = require("../../actions/pageObject/userPageObject/MyAccountPageObject.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let openBrowser = require("../../actions/commons/BaseTest.js");
let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let loginData = require("../../testdata/Login.json");
var addContext = require("mochawesome/addContext");
let log = require("../../log4js/log4jsConfig.js");

describe("Profile of user", async function(){
    let driver = null;
    let invalidPassword = "12345";
    before("Open brower and login", async function(){
        log.info("Pre-Condition - 01: Open homepage");
        driver = await openBrowser.openHomePage();
        await driver.sleep(2000);
        homePage.constructorDriver(driver);
        myAccountPage.constructorDriver(driver);
        loginPage.constructorDriver(driver);

        log.info("Pre-Condition - 02: Login successfully.");
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
        log.info("Navigate to Profile page");
        homePage.hoverToMyAccountLink();
        await driver.sleep(2000);
        homePage.clickToProfileLink();
        await driver.sleep(2000);
    });

    it("TC01 Verify user's info when login successful", async function(){
        log.info("TC01 Verify user's info when login successful");
        log.info("Profile - Step 01: Verify Username value is displayed.");
        await myAccountPage.verifyUsernameInfoValue(loginData.validAccount.username, "value");

        log.info("Profile - Step 02: Verify Email value is displayed.");
        await myAccountPage.verifyEmailInfoValue(loginData.validAccount.email, "value");

        log.info("Profile - Step 03: Verify Fullname value is displayed.");
        await myAccountPage.verifyFullNameInfoValue(loginData.validAccount.fullName, "value");

        log.info("Profile - Step 04: Verify Birthday value is displayed.");
        await myAccountPage.verifyBirthdayInfoValue(loginData.validAccount.birthday, "value");
    });

    it("TC02 Change password have less than 6 characters", async function(){
        log.info("TC02 Change password have less than 6 characters");
        log.info("Profile - Step 01: Click to Change Pasword check box");
        myAccountPage.clickToChangePasswordCheckboxByJS();
        await driver.sleep(1000);

        log.info("Profile - Step 02: Verify Change Password checkbox is selected");
        await myAccountPage.verifyChangPasswordIsSelected();

        log.info("Profile - Step 03: Enter to New Password textbox with value has less than 6 characters is '" +invalidPassword+ "'");
        myAccountPage.inputNewPasswordTextbox(invalidPassword);

        log.info("Profile - Step 04: Enter to New Confirm Password textbox with value has less than 6 characters is '" +invalidPassword+ "'");
        myAccountPage.inputNewConfPasswordTextbox(invalidPassword);
        await driver.sleep(1000);

        log.info("Profile - Step 05: Verify 'Update' button is disabled.");
        await myAccountPage.verifyUpdateButtonIsDisabled();
    });

    it("TC03 Change password have confirm password differrent with password", async function(){
        log.info("TC03 Change password have confirm password differrent with password");
        log.info("Profile - Step 01: Click to Change Pasword check box");
        myAccountPage.clickToChangePasswordCheckboxByJS();
        await driver.sleep(1000);

        log.info("Profile - Step 02: Verify Email value is displayed.");
        await myAccountPage.verifyChangPasswordIsSelected();

        log.info("Profile - Step 03: Enter to New Password textbox with valid value is '" +loginData.validAccount.newPassword+ "'");
        myAccountPage.inputNewPasswordTextbox(loginData.validAccount.newPassword);

        log.info("Profile - Step 04: Enter to New Confirm Password textbox with value different password is '" +invalidPassword+ "'");
        myAccountPage.inputNewConfPasswordTextbox(invalidPassword);
        await driver.sleep(1000);

        log.info("Profile - Step 05: Verify 'Update' button is disabled.");
        await myAccountPage.verifyUpdateButtonIsDisabled();
    });

    it("TC04 Change password successfully",async function(){
        log.info("TC04 Change password successfully");
        log.info("Profile - Step 01: Click to Change Pasword check box");
        myAccountPage.clickToChangePasswordCheckboxByJS();
        await driver.sleep(1000);

        log.info("Profile - Step 02: Verify Email value is displayed.");
        await myAccountPage.verifyChangPasswordIsSelected();

        log.info("Profile - Step 03: Enter to New Password textbox with valid value is '" +loginData.validAccount.newPassword+ "'");
        myAccountPage.inputNewPasswordTextbox(loginData.validAccount.newPassword);

        log.info("Profile - Step 04: Enter to New Confirm Password textbox with valid value'" +loginData.validAccount.newPassword+ "'");
        myAccountPage.inputNewConfPasswordTextbox(loginData.validAccount.newPassword);

        log.info("Profile - Step 05: Verify 'Update' button is enabled.");
        await myAccountPage.verifyUpdateButtonIsEnabled();

        log.info("Profile - Step 06: Click to 'Update' button.");
        myAccountPage.clickToUpdateButton();
        
        log.info("Profile - Step 07: Hover to My Account link");
        await driver.sleep(2000);
        homePage.hoverToMyAccountLink();
        await driver.sleep(2000);

        log.info("Profile - Step 08: Click to 'Logout'");
        homePage.clickToLogoutLink();
        await driver.sleep(2000);

        log.info("Profile - Step 09: Click to 'Login' link");
        homePage.clickToLoginLink();
        await driver.sleep(2000);

        log.info("Profile - Step 10: Enter to Username textbox with valid value is '" + loginData.validAccount.username +"'");
        loginPage.inputUsernameTextbox(loginData.validAccount.username);
        await driver.sleep(1000);

        log.info("Profile - Step 11: Enter to Username textbox with valid value is '" + loginData.validAccount.newPassword +"'");
        loginPage.inputPasswordTextbox(loginData.validAccount.newPassword);
        await driver.sleep(1000);

        log.info("Profile - Step 12: Click to 'Submit' button");
        loginPage.clickSubmitButton();
        await driver.sleep(1000);

        log.info("Profile - Step 13: Verify account's fullname is correct.");
        await loginPage.verifyLoginSuccessfully(loginData.validAccount.fullName);
    });

    this.afterEach(function(){
        if(this.currentTest.state == 'passed'){
            log.info("-------------------PASSED-----------------");
        }
        if(this.currentTest.state == 'failed'){
            log.info("-------------------FAILED-----------------");
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