let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginData = require("../../testdata/Login.json");
let productPage = require("../../actions/pageObject/adminPageObject/ProductPageObject.js");
let dashboardPage = require("../../actions/pageObject/adminPageObject/DashBoardPageObject.js");
let adminData = require("../../testdata/admin.json");
let assert = require("assert");
var addContext = require("mochawesome/addContext");

describe("Product in admin", async function(){
    let driver = null;

    before("Login successful", async function(){
        driver = await openBrowser.openHomePage();
        await driver.sleep(1000);
        homePage.constructorDriver(driver);
        productPage.constructorDriver(driver);
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

    this.beforeEach("Click to product link", async function(){
        dashboardPage.clickToProductLink();
        await driver.sleep(1000);
    })

    it("TC01 Insert new product successfully", async function(){
        productPage.clickInsertNewproductButton();
        await driver.sleep(1000);
        productPage.inputProductNameToTextbox(adminData.product.name);
        await driver.sleep(1000);
        productPage.inputProductDescriptionTextbox(adminData.product.description);
        await driver.sleep(1000);
        productPage.inputProductPriceTextbox(adminData.product.price);
        await driver.sleep(1000);
        productPage.inputProductQuantityTextbox(adminData.product.quantity);
        await driver.sleep(1000);
        productPage.inputCategoryIdTextbox(adminData.product.categoryID);
        await driver.sleep(1000);
        productPage.inputBrandIdTextbox(adminData.product.brandID);
        await driver.sleep(1000);
        productPage.clickToSaveButton();
        await driver.sleep(1000);
        await productPage.verifyInsertSuccessfullMessage();
    });

    it("TC02 Update product successfully", async function(){
        productPage.clickToEditIcon();
        await driver.sleep(1000);
        productPage.inputProductNameToTextbox(adminData.product.updateName);
        await driver.sleep(1000);
        productPage.clickToUpdatebutton();
        await driver.sleep(1000);
        await productPage.verifyLastProductName();
    });

    it("TC03 Delete product successfully", async function(){
        let listBeforeDelete = await productPage.getListRowNumber();
        console.log(listBeforeDelete);
        productPage.clickToDeleteIcon();
        await driver.sleep(1000);
        productPage.clickToDeleteButton();
        await driver.sleep(1000);
        let listAfterDelete = await productPage.getListRowNumber();
        console.log(listAfterDelete);
        assert.equal(await listBeforeDelete-1,await listAfterDelete);
    });

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
            let imageFileName = this.currentTest.title + '.jpeg';
            driver.takeScreenshot().then(
                function(image){
                    require('fs').writeFileSync('./screenshots/admin/product/' + imageFileName, image, 'base64');
                }
            )
            addContext(this,'Following comes the failed test image');
            addContext(this, '../screenshots/admin/product/' + imageFileName);
        }
    });

    after("Close browser", async function(){
        await driver.quit();
    })
});
