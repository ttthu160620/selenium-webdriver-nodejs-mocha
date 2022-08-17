const {By, Alert} = require("selenium-webdriver");
let getBrowserDriver = require("../../actions/commons/BaseTest");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js")
let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let registerPage = require("../../actions/pageObject/userPageObject/RegisterPageObject.js");
let registerData = require("../../testdata/Register.json");
let assert = require("assert");
var addContext = require("mochawesome/addContext");


describe("Login", function() {

    let driver = null;
    let username = null;
    let invalidUsername = "abcd";
    let invalidPassword = "123";

    before("Open homepage", async function(){
        driver = await getBrowserDriver.openHomePage();
        await homePage.constructorDriver(driver);
        await loginPage.constructorDriver(driver);
        await registerPage.constructorDriver(driver);

        await homePage.clickToRegisterLink();
        await driver.sleep(2000);(driver);
        username = registerPage.getRandomUsername();
        await registerPage.inputUsernameTextbox(username);
        await registerPage.inputPasswordTextbox(registerData.validInfor.password);
        await registerPage.inputConfPasswordTextbox(registerData.validInfor.password);
        await registerPage.inputFullNameTextbox(registerData.validInfor.fullName);
        await registerPage.inputEmailTextbox(registerData.validInfor.email);
        await registerPage.inputBirthdayTextbox(registerData.validInfor.birthday);
        await registerPage.clickToRegisterButton();
        await driver.sleep(1000);
        await registerPage.verifySuccessfullRegisterMessage(registerData.successfullMessage.successfullRegister);
        
    })
    
    it("TC1: Login with empty username", async function(){ 
        await homePage.clickToLoginLink();
        await driver.sleep(2000);
        await loginPage.clickSubmitButton();
        await driver.sleep(1000);
        let alert = await driver.switchTo().alert();
        await assert.equal(await alert.getText(), "Mời bạn nhập tên đăng nhập");
        await alert.accept();
    });

    it("TC2: Login with empty password", async function(){
        await homePage.clickToLoginLink();
        await driver.sleep(2000);
        await loginPage.inputUsernameTextbox(invalidUsername);
        await driver.sleep(1000);
        await loginPage.inputPasswordTextbox("");
        await driver.sleep(1000);
        await loginPage.clickSubmitButton();
        await driver.sleep(1000);

        let alert = await driver.switchTo().alert();
        await assert.equal(await alert.getText(), "Mời bạn nhập password");
        await alert.accept();

    });

    it("TC3: Login with invalid username and password", async function(){
        await homePage.clickToLoginLink();
        await driver.sleep(3000);
        await loginPage.inputUsernameTextbox(invalidUsername);
        await driver.sleep(1000);
        await loginPage.inputPasswordTextbox(invalidPassword);
        await driver.sleep(1000);
        await loginPage.clickSubmitButton();
        await driver.sleep(1000);
        await assert.equal(await loginPage.getUnsuccessLoginMessage(), "Sai tên đăng nhập hoặc mật khẩu!");
    });

    it("TC4: Login successfully", async function(){
        await homePage.clickToLoginLink();
        await driver.sleep(2000);
        await loginPage.inputUsernameTextbox(username);
        await driver.sleep(1000);
        await loginPage.inputPasswordTextbox(registerData.validInfor.password);
        await driver.sleep(1000);
        await loginPage.clickSubmitButton();
        await driver.sleep(1000);
        await assert.equal(await driver.findElement(By.xpath("//li[contains(@class,'Login')]/span")).getText(),
                                                    registerData.validInfor.fullName);
    });

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
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