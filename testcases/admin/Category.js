let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginData = require("../../testdata/Login.json");
let categoryPage = require("../../actions/pageObject/adminPageObject/CategoryPageObject.js");
let dashboardPage = require("../../actions/pageObject/adminPageObject/DashBoardPageObject.js");
let adminData = require("../../testdata/admin.json");
let assert = require("assert");
var addContext = require("mochawesome/addContext");

describe("Category in admin", async function(){
    let driver = null;

    before("Login successful", async function(){
        driver = await openBrowser.openHomePage();
        await driver.sleep(1000);
        homePage.constructorDriver(driver);
        categoryPage.constructorDriver(driver);
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

    this.beforeEach("Click to Category link", async function(){
        dashboardPage.clickToCategoryLink();
        await driver.sleep(1000);
    })

    it("TC01 Insert new category successfully", async function(){
        categoryPage.clickToInsertNewCategoryButton();
        await driver.sleep(1000);
        categoryPage.inputCategoryNameToTextbox(adminData.category.newCateName);
        categoryPage.clickToSaveButton();
        await driver.sleep(1000);
        await categoryPage.verifyInsertSuccessfullMessage();
    });

    it("TC02 Update category successfully", async function(){
        categoryPage.clickToEditIcon();
        await driver.sleep(1000);
        categoryPage.inputCategoryNameToTextbox(adminData.category.updateCateName);
        categoryPage.clickToUpdatebutton();
        await driver.sleep(1000);
        await categoryPage.verifyLastCategoryName();
    });

    it("TC03 Delete category successfully", async function(){
        let listBeforeDelete = await categoryPage.getListRowNumber();
        console.log(listBeforeDelete);
        categoryPage.clickToDeleteIcon();
        await driver.sleep(1000);
        categoryPage.clickToDeleteButton();
        await driver.sleep(1000);
        let listAfterDelete = await categoryPage.getListRowNumber();
        console.log(listAfterDelete);
        assert.equal(await listBeforeDelete-1,await listAfterDelete);
    });

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
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
