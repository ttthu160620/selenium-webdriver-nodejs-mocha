let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginData = require("../../testdata/Login.json");
let categoryPage = require("../../actions/pageObject/adminPageObject/CategoryPageObject.js");
let dashboardPage = require("../../actions/pageObject/adminPageObject/DashBoardPageObject.js");
let adminData = require("../../testdata/admin.json");
let assert = require("assert");
var addContext = require("mochawesome/addContext");
let log = require("../../log4js/log4jsConfig.js");

describe("Category in admin", async function(){
    let driver = null;

    before("Login successful", async function(){
        log.info("Pre-Condition - 01: Open homepage");
        driver = await openBrowser.openHomePage();
        await driver.sleep(1000);
        homePage.constructorDriver(driver);
        categoryPage.constructorDriver(driver);
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

    this.beforeEach("Click to Category link", async function(){
        log.info("Navigate to Category page");
        dashboardPage.clickToCategoryLink();
        await driver.sleep(1000);
    })

    it("TC01 Insert new category successfully", async function(){
        log.info("TC01 Insert new category successfully");
        log.info("Category - Step 01: Click to 'Thêm loại sản phẩm mới' button");
        categoryPage.clickToInsertNewCategoryButton();
        await driver.sleep(1000);

        log.info("Category - Step 02: Enter to Category name textbox with value is '" + adminData.category.newCateName + "'");
        categoryPage.inputCategoryNameToTextbox(adminData.category.newCateName);
        
        log.info("Category - Step 03: Click to 'Save' button");
        categoryPage.clickToSaveButton();
        await driver.sleep(1000);

        log.info("Category - Step 04: Verify successful insert message is displayed.");
        await categoryPage.verifyInsertSuccessfullMessage();
    });

    it("TC02 Update category successfully", async function(){
        log.info("TC02 Update category successfully");
        log.info("Category - Step 01: Click to 'Edit' icon");
        categoryPage.clickToEditIcon();
        await driver.sleep(1000);

        log.info("Category - Step 02: Enter to Category Name textbox with value is '" + adminData.category.updateCateName + "'");
        categoryPage.inputCategoryNameToTextbox(adminData.category.updateCateName);
        
        log.info("Category - Step 03: Click to 'Update' button");
        categoryPage.clickToUpdatebutton();
        await driver.sleep(1000);

        log.info("Category - Step 04: Verify the Category name is updated.");
        await categoryPage.verifyLastCategoryName();
    });

    it("TC03 Delete category successfully", async function(){
        log.info("TC03 Delete Category successfully");
        let listBeforeDelete = await categoryPage.getListRowNumber();
        console.log(listBeforeDelete);

        log.info("Category - Step 01: Click to 'Delete' icon in last page.");
        categoryPage.clickToDeleteIcon();
        await driver.sleep(1000);

        log.info("Category - Step 02: Click to 'Delete' button.");
        categoryPage.clickToDeleteButton();
        await driver.sleep(1000);
        let listAfterDelete = await categoryPage.getListRowNumber();
        console.log(listAfterDelete);

        log.info("Category - Step 03: Verify this Category is deleted.");
        assert.equal(await listBeforeDelete-1,await listAfterDelete);
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
                    require('fs').writeFileSync('./screenshots/admin/category/' + imageFileName, image, 'base64')
                }
            )
            addContext(this,'Following comes the failed test image')
            addContext(this, '../screenshots/admin/category/' + imageFileName)
        }
    });

    after("Close browser", async function(){
        await driver.quit();
    })
});
