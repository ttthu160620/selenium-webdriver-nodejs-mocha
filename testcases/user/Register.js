let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require ("../../actions/pageObject/userPageObject/HomePageObject.js");
let registerPage = require("../../actions/pageObject/userPageObject/RegisterPageObject.js");
let registerData = require("../../testdata/Register.json");
var addContext = require("mochawesome/addContext");
const log = require("../../log4js/log4jsConfig.js");

describe("Register", function(){
    let driver = null;

    before("Open Homepage", async function(){
        log.info("Pre-Condition - 01: Open homepage");
        driver = await openBrowser.openHomePage();
        registerPage.constructorDriver(driver);
        homePage.constructorDriver(driver);
    });

    this.beforeEach("Click to Register Link", async function(){
        log.info("Login: Navigate to Register page");
        homePage.clickToRegisterLink();
        await driver.sleep(2000);
    });

    it("TC01 Register with empty value", async function(){
        log.info("TC01 Register with empty value")
        log.info("Register - Step 01: Click to 'Register' button");
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);

        log.info("Register - Step 02: Verify username empty message.");
        await registerPage.verifyEmptyUsernameMessage(registerData.emptyMessage.username);

        log.info("Register - Step 02: Verify password empty message.");
        await registerPage.verifyEmptyPasswordMessage(registerData.emptyMessage.password);

        log.info("Register - Step 02: Verify confirm password empty message.");
        await registerPage.verifyEmptyConfPasswordMessage(registerData.emptyMessage.confirmPassword);

        log.info("Register - Step 02: Verify fullname empty message.");
        await registerPage.verifyEmptyFullNameMessage(registerData.emptyMessage.fullName);

        log.info("Register - Step 02: Verify email empty message.");
        await registerPage.verifyEmptyEmailMessage(registerData.emptyMessage.email);
    });

    it("TC02 Register with password have less than 6 characters", async function(){
        log.info("TC02 Register with password have less than 6 characters");
        log.info("Register - Step 01: Enter to Password textbox with value have less than 6 characters is '" + registerData.invalidInfor.password +"'");
        registerPage.inputPasswordTextbox(registerData.invalidInfor.password);

        log.info("Register - Step 02: Click to 'Register' button");
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);

        log.info("Register - Step 03: Verify password error message");
        await registerPage.verifyInvalidPasswordMessage(registerData.invalidMessage.password)
    });

    it("TC03 Register with confirm password different password", async function(){
        log.info("TC03 Register with confirm password different password");
        log.info("Register - Step 01: Enter to Password textbox with valid value is '" + registerData.validInfor.password +"'");
        registerPage.inputPasswordTextbox(registerData.validInfor.password);

        log.info("Register - Step 02: Enter to Confirm Password textbox with invalid value is '" + registerData.invalidInfor.confirmPassword +"'");
        registerPage.inputConfPasswordTextbox(registerData.invalidInfor.confirmPassword);

        log.info("Register - Step 03: Click to 'Register' button");
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);

        log.info("Register - Step 04: Verify confirm passwor error message");
        await registerPage.verifyInvalidConfPasswordMessage(registerData.invalidMessage.confirmPassword);
    });

    it("TC04 Register with invalid email", async function(){
        log.info("TC04 Register with invalid email");
        log.info("Register - Step 01: Enter to Email textbox with invalid email is '" + registerData.invalidInfor.email + "'");
        registerPage.inputEmailTextbox(registerData.invalidInfor.email);

        log.info("Register - Step 02: Click to 'Register' button");
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);

        log.info("Register - Step 03: Verify email error message");
        await registerPage.verifyInvalidEmailMessage(registerData.invalidMessage.email);
    });

    it("TC05 Register successfully", async function(){
        log.info("TC05 Register successfully");
        log.info("Register - Step 01: Enter to Username with valid value is: '" + registerPage.getRandomUsername() +"'");
        registerPage.inputUsernameTextbox(registerPage.getRandomUsername());

        log.info("Register - Step 02: Enter to Password with valid value is: '" + registerData.validInfor.password +"'");
        registerPage.inputPasswordTextbox(registerData.validInfor.password);

        log.info("Register - Step 03: Enter to Confirm Password with valid value is: '" + registerData.validInfor.password +"'");
        registerPage.inputConfPasswordTextbox(registerData.validInfor.password);

        log.info("Register - Step 04: Enter to Fullname with valid value is: '" + registerData.validInfor.fullName +"'");
        registerPage.inputFullNameTextbox(registerData.validInfor.fullName);

        log.info("Register - Step 05: Enter to Email with valid value is: '" + registerData.validInfor.email +"'");
        registerPage.inputEmailTextbox(registerData.validInfor.email);

        log.info("Register - Step 06: Enter to Birthday with valid value is: '" + registerData.validInfor.birthday +"'");
        registerPage.inputBirthdayTextbox(registerData.validInfor.birthday);

        log.info("Register - Step 07: Click to 'Regiister' button");
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);

        log.info("Register - Step 08: Verify successful register message is displayed.");
        await registerPage.verifySuccessfullRegisterMessage(registerData.successfullMessage.successfullRegister);
    });

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
            let imageFileName = this.currentTest.title + '.jpeg';
            driver.takeScreenshot().then(
                function(image){
                    require('fs').writeFileSync('./screenshots/user/register/' + imageFileName, image, 'base64')
                }
            )
            addContext(this,'Following comes the failed test image')
            addContext(this, '../screenshots/user/register/' + imageFileName)
        }
    });

    after("Close browser", function(){
        driver.quit();
    })
});