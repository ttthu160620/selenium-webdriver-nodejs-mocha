let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginData = require("../../testdata/Login.json");
let brandPage = require("../../actions/pageObject/adminPageObject/BrandPageObject.js");
let dashboardPage = require("../../actions/pageObject/adminPageObject/DashBoardPageObject.js");
let adminData = require("../../testdata/admin.json");
let assert = require("assert");
var addContext = require("mochawesome/addContext");
let log = require("../../log4js/log4jsConfig.js");

describe("Brand in admin", async function(){
    let driver = null;

    before("Login successful", async function(){
        log.info("Pre-Condition - 01: Open homepage");
        driver = await openBrowser.openHomePage();
        await driver.sleep(1000);
        homePage.constructorDriver(driver);
        brandPage.constructorDriver(driver);
        loginPage.constructorDriver(driver);
        dashboardPage.constructorDriver(driver);

        log.info("Pre-Condition - 02: Login with admin account successfully");
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
        log.info("Navigate to Brand page");
        dashboardPage.clickToBrandLink();
        await driver.sleep(1000);
    })

    it("TC01 Insert new brand successfully", async function(){
        log.info("TC01 Insert new brand successfully");
        log.info("Brand - Step 01: Click to 'Thêm thương hiệu mới' button");
        brandPage.clickToInsertNewBrand();
        await driver.sleep(1000);

        log.info("Brand - Step 02: Enter to Brand name textbox with value is '" + adminData.brand.newBrandName + "'");
        brandPage.inputBrandNameToTextbox(adminData.brand.newBrandName);

        log.info("Brand - Step 03: Click to 'Save' button");
        brandPage.clickToSaveButton();
        await driver.sleep(1000);

        log.info("Brand - Step 04: Verify successful insert message is displayed.");
        await brandPage.verifyInsertSuccessfullMessage();
    });

    it("TC02 Update brand successfully", async function(){
        log.info("TC02 Update brand successfully");
        log.info("Brand - Step 01: Click to 'Edit' icon");
        brandPage.clickToEditIcon();
        await driver.sleep(1000);

        log.info("Brand - Step 02: Enter to Brand Name textbox with value is '" + adminData.brand.updateBrandName + "'");
        brandPage.inputBrandNameToTextbox(adminData.brand.updateBrandName);

        log.info("Brand - Step 03: Click to 'Update' button");
        brandPage.clickToUpdatebutton();
        await driver.sleep(1000);

        log.info("Brand - Step 04: Verify the brand name is updated.");
        await brandPage.verifyLastBrandName();
    });

    it("TC03 Delete brand successfully", async function(){
        log.info("TC03 Delete brand successfully");
        let listBeforeDelete = await brandPage.getListRowNumber();
        console.log(listBeforeDelete);

        log.info("Brand - Step 01: Click to 'Delete' icon in last page.");
        brandPage.clickToDeleteIcon();
        await driver.sleep(1000);

        log.info("Brand - Step 02: Click to 'Delete' button.");
        brandPage.clickToDeleteButton();
        await driver.sleep(1000);
        
        log.info("Brand - Step 03: Verify this brand is deleted.");
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
