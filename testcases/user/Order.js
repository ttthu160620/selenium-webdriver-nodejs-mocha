let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let loginData = require("../../testdata/Login.json");
let orderPage = require("../../actions/pageObject/userPageObject/OrderPageObject.js");
let orderData = require("../../testdata/Order.json");
let myAccountPage = require("../../actions/pageObject/userPageObject/MyAccountPageObject.js");
let assert = require("assert");
var addContext = require("mochawesome/addContext");
const log = require("../../log4js/log4jsConfig.js");

describe('Order', async function(){
    let driver = null;
    
    before('Login successfully', async function(){
        log.info("Pre-Condition - 01: Open homepage");
        driver = await openBrowser.openHomePage();
        await driver.sleep(2000);
        homePage.constructorDriver(driver);
        orderPage.constructorDriver(driver);
        loginPage.constructorDriver(driver);
        myAccountPage.constructorDriver(driver);

        log.info("Pre-Condition - 02: Login successfully");
        homePage.clickToLoginLink();
        await driver.sleep(2000);
        loginPage.inputUsernameTextbox(loginData.validAccount.username);
        await driver.sleep(1000);
        loginPage.inputPasswordTextbox(loginData.validAccount.password);
        await driver.sleep(1000);
        loginPage.clickSubmitButton();
        await driver.sleep(1000);
        await loginPage.verifyLoginSuccessfully(loginData.validAccount.fullName);
    });

    it('TC01 Order unsuccessfully if cart does not have item', async function(){
        log.info("TC01 Order unsuccessfully if cart does not have item")
        log.info("Order - Step 01: Navigate to Cart page");
        homePage.clickToCartLink();
        await driver.sleep(1000);

        log.info("Order - Step 02: Click to 'Order' button");
        orderPage.clickToOrderButton();
        await driver.sleep(1000);

        log.info("Order - Step 03: Verify error message in alert");
        let alert = await driver.switchTo().alert();
        assert.equal(await alert.getText(), "Giỏ hàng trống. Không thể đặt hàng.");

        log.info("Order - Step 04: Click to 'OK' button in alert.");
        await alert.accept();
    });

    it('TC02 Choose any 1 item add to cart', async function(){
        log.info("TC02 Choose any 1 item add to cart");
        log.info("Order - Step 01: Navigate Home page");
        homePage.clickToHomeIcon();
        await driver.sleep(1000);

        log.info("Order - Step 02: Enter to Search textbox with value is'" + orderData.items.backPack + "'");
        homePage.inputSearchTextbox(orderData.items.backPack);
        await driver.sleep(1000);

        log.info("Order - Step 03: Click to 'Search' button");
        homePage.clickToSearchButton();
        await driver.sleep(2000);

        log.info("Order - Step 04: Click to Balo TSB855 link");
        orderPage.clickToBaloTSB855Link("Balo Targus TSB906-70 M Black");
        await driver.sleep(1000);

        log.info("Order - Step 05: Click to 'Thêm vào giỏ hàng' button.");
        orderPage.clickToAddItemToCartButton();
        await driver.sleep(1000);

        let amount = await orderPage.getItemAmount();
        console.log(amount);
        let qty = await orderPage.getItemQuantity(orderData.attribute.value);
        console.log(qty);
        let totalAmount = await orderPage.getTotalAmount(orderData.attribute.value);
        console.log(totalAmount);

        log.info("Order - Step 07: Verify total amount in cart");
        await orderPage.verifyTotalAmount(orderData.attribute.value);
    });

    it('TC03 Increase quantity in cart', async function(){
        log.info("TC03 Increase quantity in cart");
        log.info("Order - Step 01: Click to '+' icon");
        orderPage.clickToPlusIcon();
        await driver.sleep(1000);

        log.info("Order - Step 02: Click to '+' icon");
        orderPage.clickToPlusIcon();
        await driver.sleep(1000);

        log.info("Order - Step 03: Click to '+' icon");
        orderPage.clickToPlusIcon();
        await driver.sleep(1000);

        log.info("Order - Step 04: Verify total amount in cart");
        let total = await orderPage.getTotalAmount(orderData.attribute.value);
        console.log(total);
        await orderPage.verifyTotalAmount(orderData.attribute.value);
    });

    it('TC04 Descrease quantity in cart', async function(){
        log.info("TC04 Descrease quantity in cart");
        log.info("Order - Step 01: Click to '-' icon");
        orderPage.clickToMinusIcon();
        await driver.sleep(1000);
        log.info("Order - Step 02: Click to '-' icon");
        orderPage.clickToMinusIcon();
        await driver.sleep(1000);

        log.info("Order - Step 02: Verify total amount in cart");
        let total = await orderPage.getTotalAmount(orderData.attribute.value);
        console.log(total);
        await orderPage.verifyTotalAmount(orderData.attribute.value);
    });

    it('TC05 Add other items to cart', async function(){
        log.info("TC05 Add other items to cart");
        log.info("Order - Step 01: Click to 'Mua thêm sản phẩm khác' link");
        orderPage.clickToAddAnotherItemLink();
        await driver.sleep(1000);

        log.info("Order - Step 02: Enter to Search textbox with value is'" + orderData.items.handBack + "'");
        homePage.inputSearchTextbox(orderData.items.handBack);
        await driver.sleep(1000);

        log.info("Order - Step 03: Click to 'Search' button");
        homePage.clickToSearchButton();
        await driver.sleep(2000);

        log.info("Order - Step 04: Click to item link");
        orderPage.clickToHandBackGymbagLink("Túi Xách Simplecarry Gymbag S Black");
        await driver.sleep(1000);

        log.info("Order - Step 05: Click to 'Thêm vào giỏ hàng' button");
        orderPage.clickToAddItemToCartButton();
        await driver.sleep(1000);
    });

    it('TC06 Remove item in cart', async function(){
        orderPage.clickToDeleteHandbackButton("Túi Xách Simplecarry Gymbag S Black");
        await driver.sleep(1000);
        await orderPage.verifyTotalAmount(orderData.attribute.value);
    });

    it('TC07 Order unsuccessfully with empty address and phone number', async function(){
        log.info("TC07 Order unsuccessfully with empty address and phone number")
        log.info("Order - Step 01: Click to 'Tiến hành đặt hàng' button");
        orderPage.clickToOrderButton();
        await driver.sleep(1000);

        log.info("Order - Step 02: Verify oder popup is displayed");
        await orderPage.verifyOrderPopupDisplayed();

        log.info("Order - Step 03: Click to 'Đặt hàng' button");
        orderPage.clickToOrderButtonPopup();
        await driver.sleep(1000);

        log.info("Order - Step 04: Verify empty address message is displayed.");
        await orderPage.verifyEmptyAddressMessage();

        log.info("Order - Step 05: Verify empty phone number message is displayed.");
        await orderPage.verifyEmptyPhoneMessage();

        log.info("Order - Step 06: Click to close popup icon");
        orderPage.clickToClosePopupIcon();
    });

    it ('TC08 Order successfully with valid data', async function(){
        log.info("TC08 Order successfully with valid data");
        log.info("Order - Step 01: Click to 'Tiến hành đặt hàng' button");
        orderPage.clickToOrderButton();
        await driver.sleep(1000);

        log.info("Order - Step 02: Verify oder popup is displayed");
        await orderPage.verifyOrderPopupDisplayed();

        log.info("Order - Step 03: Enter to Address textbox with valid value is " +orderData.validInfor.address+ "'");
        orderPage.inputAddressTextbox(orderData.validInfor.address);
        await driver.sleep(1000);

        log.info("Order - Step 04: Enter to Phone Number textbox with valid value is " + orderData.validInfor.phoneNumber + "'");
        orderPage.inputPhonTextbox(orderData.validInfor.phoneNumber);
        await driver.sleep(1000);

        log.info("Order - Step 05: Click to 'Đặt hàng' button");
        orderPage.clickToOrderButtonPopup();
        await driver.sleep(5000);

        log.info("Order - Step 06: Navigate to 'Lịch sử mua hàng' page");
        myAccountPage.clickToOrderHistoryLink();
        await driver.sleep(1000);

        log.info("Order - Step 07: Verify this order is displayed in this history page");
        await myAccountPage.verifyLastOrderDateText();
        await myAccountPage.verifyBaloTSB855LinkHistoryDisplayed("Balo Targus TSB906-70 M Black");
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
                    require('fs').writeFileSync('./screenshots/user/order/' + imageFileName, image, 'base64')
                }
            )
            addContext(this,'Following comes the failed test image')
            addContext(this, '../screenshots/user/order/' + imageFileName)
        }
    });

    after('Close browser', async function(){
        await driver.quit();
    });
});