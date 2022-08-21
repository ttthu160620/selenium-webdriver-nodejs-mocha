let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let loginPage = require ("../../actions/pageObject/userPageObject/LoginPageObject.js");
let loginData = require("../../testdata/Login.json");
let orderPage = require("../../actions/pageObject/userPageObject/OrderPageObject.js");
let orderData = require("../../testdata/Order.json");
let myAccountPage = require("../../actions/pageObject/userPageObject/MyAccountPageObject.js");
let assert = require("assert");
var addContext = require("mochawesome/addContext");

describe('Order', async function(){
    let driver = null;
    
    before('Login successfully', async function(){
        driver = await openBrowser.openHomePage();
        homePage.constructorDriver(driver);
        orderPage.constructorDriver(driver);
        loginPage.constructorDriver(driver);
        myAccountPage.constructorDriver(driver);

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
        homePage.clickToCartLink();
        await driver.sleep(1000);
        orderPage.clickToOrderButton();
        await driver.sleep(1000);
        let alert = await driver.switchTo().alert();
        assert.equal(await alert.getText(), "Giỏ hàng trống. Không thể đặt hàng.");
        await alert.accept();
    });

    it('TC02 Choose any 1 item add to cart', async function(){
        homePage.clickToHomeIcon();
        await driver.sleep(1000);
        homePage.inputSearchTextbox(orderData.items.backPack);
        await driver.sleep(1000);
        homePage.clickToSearchButton();
        await driver.sleep(2000);
        orderPage.clickToBaloTSB855Link();
        await driver.sleep(1000);
        orderPage.clickToAddItemToCartButton();
        await driver.sleep(1000);
        let amount = await orderPage.getItemAmount();
        console.log(amount);
        let qty = await orderPage.getItemQuantity(orderData.attribute.value);
        console.log(qty);
        let totalAmount = await orderPage.getTotalAmount(orderData.attribute.value);
        console.log(totalAmount);
        await orderPage.verifyTotalAmount(orderData.attribute.value);
    });

    it('TC03 Increase quantity in cart', async function(){
        orderPage.clickToPlusIcon();
        await driver.sleep(1000);
        orderPage.clickToPlusIcon();
        await driver.sleep(1000);
        orderPage.clickToPlusIcon();
        await driver.sleep(1000);
        let total = await orderPage.getTotalAmount(orderData.attribute.value);
        console.log(total);
        await orderPage.verifyTotalAmount(orderData.attribute.value);
    });

    it('TC04 Descrease quantity in cart', async function(){
        orderPage.clickToMinusIcon();
        await driver.sleep(1000);
        orderPage.clickToMinusIcon();
        await driver.sleep(1000);
        let total = await orderPage.getTotalAmount(orderData.attribute.value);
        console.log(total);
        await orderPage.verifyTotalAmount(orderData.attribute.value);
    });

    it('TC05 Add other items to cart', async function(){
        orderPage.clickToAddAnotherItemLink();
        await driver.sleep(1000);
        homePage.inputSearchTextbox(orderData.items.handBack);
        await driver.sleep(1000);
        homePage.clickToSearchButton();
        await driver.sleep(2000);
        orderPage.clickToHandBackGymbagLink();
        await driver.sleep(1000);
        orderPage.clickToAddItemToCartButton();
        await driver.sleep(1000);
    });

    it('TC06 Remove item in cart', async function(){
        orderPage.clickToDeleteHandbackButton();
        await driver.sleep(1000);
        await orderPage.verifyTotalAmount(orderData.attribute.value);
    });

    it('TC07 Order unsuccessfully with empty address and phone number', async function(){
        orderPage.clickToOrderButton();
        await driver.sleep(1000);
        await orderPage.verifyOrderPopupDisplayed();
        orderPage.clickToOrderButtonPopup();
        await driver.sleep(1000);
        await orderPage.verifyEmptyAddressMessage();
        await orderPage.verifyEmptyPhoneMessage();
        orderPage.clickToClosePopupIcon();
    });

    it ('TC08 Order successfully with valid data', async function(){
        orderPage.clickToOrderButton();
        await driver.sleep(1000);
        orderPage.inputAddressTextbox(orderData.validInfor.address);
        await driver.sleep(1000);
        orderPage.inputPhonTextbox(orderData.validInfor.phoneNumber);
        await driver.sleep(1000);
        orderPage.clickToOrderButtonPopup();
        await driver.sleep(5000);
        myAccountPage.clickToOrderHistoryLink();
        await driver.sleep(1000);
        await myAccountPage.verifyLastOrderDateText();
        await myAccountPage.verifyBaloTSB855LinkHistoryDisplayed();
    });

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
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