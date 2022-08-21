let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginData = require("../../testdata/Login.json");
let brandPage = require("../../actions/pageObject/adminPageObject/BrandPageObject.js");
let dashboardPage = require("../../actions/pageObject/adminPageObject/DashBoardPageObject.js");
let adminData = require("../../testdata/admin.json");
let assert = require("assert");
var addContext = require("mochawesome/addContext");

describe("Brand in admin", async function(){
    let driver = null;

    before("Login successful", async function(){
        driver = await openBrowser.openHomePage();
        await driver.sleep(1000);
        homePage.constructorDriver(driver);
        brandPage.constructorDriver(driver);
        loginPage.constructorDriver(driver);
        dashboardPage.constructorDriver(driver);
        homePage.clickToLoginLink();
        await driver.sleep(2000);
        loginPage.inputUsernameTextbox(loginData.adminAccount.username);
        await driver.sleep(1000);
        loginPage.inputPasswordTextbox(loginData.adminAccount.password);
        await driver.sleep(1000);
        loginPage.clickSubmitButton();
        await driver.sleep(2000);
    });

    this.beforeEach("Click to brand link", async function(){
        dashboardPage.clickToBrandLink();
        await driver.sleep(1000);
    })

    it("TC01 Insert new brand successfully", async function(){
        brandPage.clickToInsertNewBrand();
        await driver.sleep(1000);
        brandPage.inputBrandNameToTextbox(adminData.brand.newBrandName);
        brandPage.clickToSaveButton();
        await driver.sleep(1000);
        await brandPage.verifyInsertSuccessfullMessage();
    });

    it("TC02 Update brand successfully", async function(){
        brandPage.clickToEditIcon();
        await driver.sleep(1000);
        brandPage.inputBrandNameToTextbox(adminData.brand.updateBrandName);
        brandPage.clickToUpdatebutton();
        await driver.sleep(1000);
        await brandPage.verifyLastBrandName();
    });

    it("TC03 Delete brand successfully", async function(){
        let listBeforeDelete = await brandPage.getListRowNumber();
        console.log(listBeforeDelete);
        brandPage.clickToDeleteIcon();
        await driver.sleep(1000);
        brandPage.clickToDeleteButton();
        await driver.sleep(1000);
        let listAfterDelete = await brandPage.getListRowNumber();
        console.log(listAfterDelete);
        assert.equal(await listBeforeDelete-1,await listAfterDelete);
    });
    
    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
            let imageFileName = this.currentTest.title + '.jpeg';
            driver.takeScreenshot().then(
                function(image){
                    require('fs').writeFileSync('./screenshots/admin/brand/' + imageFileName, image, 'base64')
                }
            )
            addContext(this,'Following comes the failed test image')
            addContext(this, '../screenshots/admin/brand/' + imageFileName)
        }
    });

    after("Close browser", async function(){
        await driver.quit();
    })
});
