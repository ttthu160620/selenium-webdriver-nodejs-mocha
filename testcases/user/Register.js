let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require ("../../actions/pageObject/userPageObject/HomePageObject.js");
let registerPage = require("../../actions/pageObject/userPageObject/RegisterPageObject.js");
let registerData = require("../../testdata/Register.json");
var addContext = require("mochawesome/addContext");

describe("Register", function(){
    let driver = null;

    before("Open Homepage", async function(){
        driver = await openBrowser.openHomePage();
        registerPage.constructorDriver(driver);
        homePage.constructorDriver(driver);
    });

    this.beforeEach("Click to Register Link", async function(){
        homePage.clickToRegisterLink();
        await driver.sleep(2000);
    });

    it("TC01 Register with empty value", async function(){
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);
        await registerPage.verifyEmptyUsernameMessage(registerData.emptyMessage.username);
        await registerPage.verifyEmptyPasswordMessage(registerData.emptyMessage.password);
        await registerPage.verifyEmptyConfPasswordMessage(registerData.emptyMessage.confirmPassword);
        await registerPage.verifyEmptyFullNameMessage(registerData.emptyMessage.fullName);
        await registerPage.verifyEmptyEmailMessage(registerData.emptyMessage.email);
    });

    it("TC02 Register with password have less than 6 characters", async function(){
        registerPage.inputPasswordTextbox(registerData.invalidInfor.password);
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);
        await registerPage.verifyInvalidPasswordMessage(registerData.invalidMessage.password)
    });

    it("TC03 Register with confirm password different password", async function(){
        registerPage.inputPasswordTextbox(registerData.validInfor.password);
        registerPage.inputConfPasswordTextbox(registerData.invalidInfor.confirmPassword);
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);
        await registerPage.verifyInvalidConfPasswordMessage(registerData.invalidMessage.confirmPassword);
    });

    it("TC04 Register with invalid email", async function(){
        registerPage.inputEmailTextbox(registerData.invalidInfor.email);
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);
        await registerPage.verifyInvalidEmailMessage(registerData.invalidMessage.email);
    });

    it("TC05 Register successfully", async function(){
        registerPage.inputUsernameTextbox(registerPage.getRandomUsername());
        registerPage.inputPasswordTextbox(registerData.validInfor.password);
        registerPage.inputConfPasswordTextbox(registerData.validInfor.password);
        registerPage.inputFullNameTextbox(registerData.validInfor.fullName);
        registerPage.inputEmailTextbox(registerData.validInfor.email);
        registerPage.inputBirthdayTextbox(registerData.validInfor.birthday);
        registerPage.clickToRegisterButton();
        await driver.sleep(1000);
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