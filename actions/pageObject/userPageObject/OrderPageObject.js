let BasePage = require("../../commons/BasePage.js");
let orderPageUI = require("../../../interfaces/userPageUIs/OrderPageUI.js");
let orderData = require("../../../testdata/Order.json");
let assert = require("assert");
let chai = require("chai");

class OrderPageObject extends BasePage{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    clickToOrderButton(){
        this.clickToElement(this.driver, orderPageUI.orderButton);
    }

    clickToOrderButtonPopup(){
        this.clickToElement(this.driver, orderPageUI.orderButtonPopup);
    }

    clickToAddAnotherItemLink(){
        this.clickToElement(this.driver, orderPageUI.addOtheritemLink);
    }

    clickToDeleteButton(){
        this.clickToElement(this.driver, orderPageUI.deleteButton);
    }

    clickToMinusIcon(){
        this.clickToElement(this.driver, orderPageUI.minusIcon);
    }

    async clickToMinusIconManyTimes(){
        for(let i = 0; i < 4; i++){
            this.clickToMinusIcon();
            await this.driver.sleep(1000);
        }
    }

    clickToPlusIcon(){
        this.clickToElement(this.driver, orderPageUI.plusIcon);
    }

    async clickToPlusIconManyTimes(){
        for(let i = 0; i < 4; i++){
            this.clickToPlusIcon();
            await this.driver.sleep(2000);
        }
    }

    async verifyQuantityItemAfterManyClick(value){
        assert.equal(await this.getItemQuantity(value), "5");
    }

    clickToCancelButtonPopup(){
        this.clickToElement(this.driver, orderPageUI.cancelButtonPopup);
    }

    clickToClosePopupIcon(){
        this.clickToElement(this.driver, orderPageUI.closePopupIcon);
    }

    inputAddressTextbox(address){
        this.sendKeyTextbox(this.driver, orderPageUI.addressTextboxPopup, address);
    }

    inputPhonTextbox(phoneNumber){
        this.sendKeyTextbox(this.driver, orderPageUI.phoneNumberTextboxPopup, phoneNumber);
    }

    getEmptyAddressMessage(){
        return this.getElementText(this.driver, orderPageUI.emptyAddressMessage);
    }

    getEmptyPhoneMessage(){
        return this.getElementText(this.driver, orderPageUI.emptyPhoneNumberMessage);
    }

    async verifyEmptyAddressMessage(){
        assert.equal(await this.getEmptyAddressMessage(), orderData.emptyMessage.address);
    }

    async verifyEmptyPhoneMessage(){
        assert.equal(await this.getEmptyPhoneMessage(), orderData.emptyMessage.phoneNumber);
    }

    clickToBaloTSB855Link(productName){
        //this.scrollToViewByJS(this.driver, orderPageUI.baloTSB855Link);
        this.clickToElementByJS(this.driver, this.getDynamicLocator(orderPageUI.baloTSB855Link, productName));
    }

    clickToAddItemToCartButton(){
        this.clickToElement(this.driver, orderPageUI.addItemToCartButton);
    }

    async getItemAmount(){
        let price = await this.getElementText(this.driver, orderPageUI.itemAmount);
        price = await price.replace('đ','').replace(' ','').replaceAll(',','') *1;
        return price;
    }


    getItemQuantity(value){
        return this.getElementAttributeValue(this.driver, orderPageUI.itemQuantityText, value);
    }

    getTotalAmount(value){
        return this.getElementAttributeValue(this.driver, orderPageUI.totalAmount, value);
    }

    async verifyTotalAmount(value){
        let price = await this.getItemAmount();
        let quantity = await this.getItemQuantity(value);
        let total = await price * quantity;
        assert.equal(await this.getTotalAmount(value), total);
    }

    isOrderPopupDisplayed(){
        return this.isElementDisplayed(this.driver, orderPageUI.orderPopup);
    }

    async verifyOrderPopupDisplayed(){
        chai.assert.isTrue(await this.isOrderPopupDisplayed(), "Cannot find popup!");
    }

    clickToHandBackGymbagLink(productName){
        this.clickToElement(this.driver, this.getDynamicLocator(orderPageUI.handBackGymbagLink, productName));
    }

    clickToDeleteHandbackButton(productName){
        this.clickToElement(this.driver, this.getDynamicLocator(orderPageUI.deleteHandBackButton, productName));
    }

    
}

module.exports = new OrderPageObject();