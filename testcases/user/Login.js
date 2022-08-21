const {By} = require("selenium-webdriver");
let getBrowserDriver = require("../../actions/commons/BaseTest");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
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
        homePage.constructorDriver(driver);
        loginPage.constructorDriver(driver);
        registerPage.constructorDriver(driver);

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
    
    it("TC1 Login with empty username", async function(){ 
        homePage.clickToLoginLink();
        await driver.sleep(2000);
        loginPage.clickSubmitButton();
        await driver.sleep(1000);
        let alert = await driver.switchTo().alert();
        assert.equal(await alert.getText(), "Mời bạn nhập tên đăng nhập");
        await alert.accept();
    });

    it("TC2 Login with empty password", async function(){
        homePage.clickToLoginLink();
        await driver.sleep(2000);
        loginPage.inputUsernameTextbox(invalidUsername);
        await driver.sleep(1000);
        loginPage.inputPasswordTextbox("");
        await driver.sleep(1000);
        loginPage.clickSubmitButton();
        await driver.sleep(1000);

        let alert = await driver.switchTo().alert();
        assert.equal(await alert.getText(), "Mời bạn nhập password");
        await alert.accept();

    });

    it("TC3 Login with invalid username and password", async function(){
        homePage.clickToLoginLink();
        await driver.sleep(3000);
        loginPage.inputUsernameTextbox(invalidUsername);
        await driver.sleep(1000);
        loginPage.inputPasswordTextbox(invalidPassword);
        await driver.sleep(1000);
        loginPage.clickSubmitButton();
        await driver.sleep(1000);
        assert.equal(await loginPage.getUnsuccessLoginMessage(), "Sai tên đăng nhập hoặc mật khẩu!");
    });

    it("TC4 Login successfully", async function(){
        homePage.clickToLoginLink();
        await driver.sleep(2000);
        loginPage.inputUsernameTextbox(username);
        await driver.sleep(1000);
        loginPage.inputPasswordTextbox(registerData.validInfor.password);
        await driver.sleep(1000);
        loginPage.clickSubmitButton();
        await driver.sleep(1000);
        assert.equal(await driver.findElement(By.xpath("//li[contains(@class,'Login')]/span")).getText(),
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