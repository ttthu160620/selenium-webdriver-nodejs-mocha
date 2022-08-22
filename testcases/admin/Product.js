let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginData = require("../../testdata/Login.json");
let productPage = require("../../actions/pageObject/adminPageObject/ProductPageObject.js");
let dashboardPage = require("../../actions/pageObject/adminPageObject/DashBoardPageObject.js");
let adminData = require("../../testdata/admin.json");
let assert = require("assert");
var addContext = require("mochawesome/addContext");
let log = require("../../log4js/log4jsConfig.js");

describe("Product in admin", async function(){
    let driver = null;

    before("Login successful", async function(){
        log.info("Pre-Condition - 01: Open homepage");
        driver = await openBrowser.openHomePage();
        await driver.sleep(1000);
        homePage.constructorDriver(driver);
        productPage.constructorDriver(driver);
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

    this.beforeEach("Click to product link", async function(){
        log.info("Navigate to Product page");
        dashboardPage.clickToProductLink();
        await driver.sleep(1000);
    })

    it("TC01 Insert new product successfully", async function(){
        log.info("TC01 Insert new product successfully");
        log.info("Product - Step 01: Click to 'Thêm sản phẩm mới' button");
        productPage.clickInsertNewproductButton();
        await driver.sleep(1000);

        log.info("Product - Step 02: Enter to Product name textbox with value is '" + adminData.product.name + "'");
        productPage.inputProductNameToTextbox(adminData.product.name);
        await driver.sleep(1000);

        log.info("Product - Step 03: Enter to Product Description textbox with value is '" + adminData.product.description + "'");
        productPage.inputProductDescriptionTextbox(adminData.product.description);
        await driver.sleep(1000);

        log.info("Product - Step 04: Enter to Product Price textbox with value is '" + adminData.product.price + "'");
        productPage.inputProductPriceTextbox(adminData.product.price);
        await driver.sleep(1000);

        log.info("Product - Step 05: Enter to Product Quantity textbox with value is '" + adminData.product.quantity + "'");
        productPage.inputProductQuantityTextbox(adminData.product.quantity);
        await driver.sleep(1000);

        log.info("Product - Step 06: Enter to Category ID textbox with value is '" + adminData.product.categoryID + "'");
        productPage.inputCategoryIdTextbox(adminData.product.categoryID);
        await driver.sleep(1000);

        log.info("Product - Step 07: Enter to Product ID textbox with value is '" + adminData.product.brandID + "'");
        productPage.inputBrandIdTextbox(adminData.product.brandID);
        await driver.sleep(1000);

        log.info("Product - Step 08: Click to 'Save' button");
        productPage.clickToSaveButton();
        await driver.sleep(1000);

        log.info("Product - Step 09: Verify successful insert message is displayed.");
        await productPage.verifyInsertSuccessfullMessage();
    });

    it("TC02 Update product successfully", async function(){
        log.info("TC02 Update Product successfully");
        log.info("Product - Step 01: Click to 'Edit' icon");
        productPage.clickToEditIcon();
        await driver.sleep(1000);

        log.info("Product - Step 02: Enter to Product Name textbox with value is '" + adminData.product.updateName + "'");
        productPage.inputProductNameToTextbox(adminData.product.updateName);
        await driver.sleep(1000);

        log.info("Product - Step 03: Click to 'Update' button");
        productPage.clickToUpdatebutton();
        await driver.sleep(1000);

        log.info("Product - Step 04: Verify the Product name is updated.");
        await productPage.verifyLastProductName();
    });

    it("TC03 Delete product successfully", async function(){
        log.info("TC03 Delete Product successfully");
        let listBeforeDelete = await productPage.getListRowNumber();
        console.log(listBeforeDelete);

        log.info("Product - Step 01: Click to 'Delete' icon in last page.");
        productPage.clickToDeleteIcon();
        await driver.sleep(1000);

        log.info("Product - Step 02: Click to 'Delete' button.");
        productPage.clickToDeleteButton();
        await driver.sleep(1000);

        log.info("Product - Step 03: Verify this Product is deleted.");
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
