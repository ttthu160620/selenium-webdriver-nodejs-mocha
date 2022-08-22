const {By} = require("selenium-webdriver");
let getBrowserDriver = require("../../actions/commons/BaseTest");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let registerPage = require("../../actions/pageObject/userPageObject/RegisterPageObject.js");
let registerData = require("../../testdata/Register.json");
let assert = require("assert");
var addContext = require("mochawesome/addContext");
const log = require("../../log4js/log4jsConfig.js");

describe("Login", function() {

    let driver = null;
    let username = null;
    let invalidUsername = "abcd";
    let invalidPassword = "123";

    before("Open homepage", async function(){
        log.info("Pre-Condition - 01: Open homepage");
        driver = await getBrowserDriver.openHomePage();

        homePage.constructorDriver(driver);
        loginPage.constructorDriver(driver);
        registerPage.constructorDriver(driver);

        log.info("Pre-Condition - 02: Register successfully.");
        homePage.clickToRegisterLink();
        await driver.sleep(2000);(driver);
        username = registerPage.getRandomUsername();
        registerPage.inputUsernameTextbox(username);
        registerPage.inputPasswordTextbox(registerData.validInfor.password);
        registerPage.inputConfPasswordTextbox(registerData.validInfor.password);
        registerPage.inputFullNameTextbox(registerData.validInfor.fullName);
        registerPage.inputEmailTextbox(registerData.validInfor.email);
        registerPage.inputBirthdayTextbox(registerData.validInfor.birthday);
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);
        await registerPage.verifySuccessfullRegisterMessage(registerData.successfullMessage.successfullRegister);
        
    })
    
    it("TC01 Login with empty username", async function(){ 
        log.info("TC1 Login with empty username");
        log.info("Login - Step 01: Navigate to Login page");
        homePage.clickToLoginLink();
        await driver.sleep(2000);

        log.info("Login - Step 02: Click to 'Submit' button");
        loginPage.clickSubmitButton();
        await driver.sleep(1000);

        log.info("Login - Step 03: Verify error message in alert.");
        let alert = await driver.switchTo().alert();
        assert.equal(await alert.getText(), "Mời bạn nhập tên đăng nhập");

        log.info("Login - Step 04: Click to 'OK' button in alert");
        await alert.accept();
    });

    it("TC02 Login with empty password", async function(){
        log.info("TC02 Login with empty username");
        log.info("Login - Step 01: Navigate to Login page");
        homePage.clickToLoginLink();
        await driver.sleep(2000);

        log.info("Login - Step 02: Enter to Username textbox with value is '" + invalidUsername +"'");
        loginPage.inputUsernameTextbox(invalidUsername);
        await driver.sleep(1000);

        log.info("Login - Step 03: Enter to Username textbox with value is empty data");
        loginPage.inputPasswordTextbox("");
        await driver.sleep(1000);

        log.info("Login - Step 04: Click to 'Submit' button");
        loginPage.clickSubmitButton();
        await driver.sleep(1000);

        log.info("Login - Step 05: Verify error message in alert.");
        let alert = await driver.switchTo().alert();
        assert.equal(await alert.getText(), "Mời bạn nhập password");

        log.info("Login - Step 06: Click to 'OK' button in alert");
        await alert.accept();

    });

    it("TC3 Login with invalid username and password", async function(){
        log.info("TC3 Login with invalid username and password");
        log.info("Login - Step 01: Navigate to Login page");
        homePage.clickToLoginLink();
        await driver.sleep(3000);

        log.info("Login - Step 02: Enter to Username textbox with invalid value is '" + invalidUsername +"'");
        loginPage.inputUsernameTextbox(invalidUsername);
        await driver.sleep(1000);

        log.info("Login - Step 03: Enter to Password textbox with invalid value is '" + invalidPassword +"'");
        loginPage.inputPasswordTextbox(invalidPassword);
        await driver.sleep(1000);

        log.info("Login - Step 04: Click to 'Submit' button");
        loginPage.clickSubmitButton();
        await driver.sleep(1000);
        assert.equal(await loginPage.getUnsuccessLoginMessage(), "Sai tên đăng nhập hoặc mật khẩu!");
    });

    it("TC4 Login successfully", async function(){
        log.info("TC04 Login successfully");
        log.info("Login - Step 01: Navigate to Login page");
        homePage.clickToLoginLink();
        await driver.sleep(2000);

        log.info("Login - Step 02: Enter to Username textbox with valid value is '" + username +"'");
        loginPage.inputUsernameTextbox(username);
        await driver.sleep(1000);

        log.info("Login - Step 03: Enter to Password textbox with invalid value is '" + registerData.validInfor.password +"'");
        loginPage.inputPasswordTextbox(registerData.validInfor.password);
        await driver.sleep(1000);

        log.info("Login - Step 04: Click to 'Submit' button");
        loginPage.clickSubmitButton();
        await driver.sleep(1000);

        log.info("Login - Step 05: Verify account's fullname is correct.");
        assert.equal(await driver.findElement(By.xpath("//li[contains(@class,'Login')]/span")).getText(),
                                                    registerData.validInfor.fullName);
    });

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
            //this.retries(1);
            let imageFileName = this.currentTest.title + '.jpeg';
            driver.takeScreenshot().then(
                function(image){
                    require('fs').writeFileSync('./screenshots/user/login/' + imageFileName, image, 'base64')
                }
            )
            addContext(this,'Following comes the failed test image')
            addContext(this, '../screenshots/user/login/' + imageFileName)
        }
    });

    after ("Close browser", async function(){
        driver.quit();
    });
});