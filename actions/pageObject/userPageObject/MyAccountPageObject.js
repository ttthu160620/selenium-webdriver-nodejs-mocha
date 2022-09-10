let myAccountPageUIs = require("../../../interfaces/userPageUIs/MyAccountPageUI.js");
let BasePage = require ("../../commons/BasePage.js");
let assert = require("assert");
let chai = require('chai');

class myAccountPageObject extends BasePage{
    driver = null;
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    clickToAccountInfoLink(){
        this.clickToElement(this.driver, myAccountPageUIs.accountInfoLink);
    }

    getUsernameInfoValue(attributeName){
        return this.getElementAttributeValue(this.driver, myAccountPageUIs.usernameInfoTextbox, attributeName);
    }

    getEmailInfoValue(attributeName){
        return this.getElementAttributeValue(this.driver, myAccountPageUIs.emailInfoTextbox, attributeName);
    }

    getFullNameInfoValue(attributeName){
        return this.getElementAttributeValue(this.driver, myAccountPageUIs.fullNameInfoTextbox, attributeName);
    }

    getBirthdayInforValue(attributeName){
        return this.getElementAttributeValue(this.driver, myAccountPageUIs.birthDayInfoTextbox, attributeName);
    }

    checkChangePasswordCheckbox(){
        this.checkToDefaultCheckboxRadio(this.driver, myAccountPageUIs.changePasswordCheckbox);
    }

    clickToChangePasswordCheckboxByJS(){
        this.clickToElementByJS(this.driver, myAccountPageUIs.changePasswordCheckbox);
    }

    ischeckChangePasswordCheckboxSelected(){
        return this.isElementSelected(this.driver, myAccountPageUIs.changePasswordCheckbox);
    }

    inputNewPasswordTextbox(newPassword){
        this.sendKeyTextbox(this.driver, myAccountPageUIs.newPasswordTextbox, newPassword);
    }

    inputNewConfPasswordTextbox(newConfPassword){
        this.sendKeyTextbox(this.driver, myAccountPageUIs.confirmNewPasswordTextbox, newConfPassword);
    }

    isUpdateButtonEnabled(){
        return this.isElementEnabled(this.driver, myAccountPageUIs.updateButton);
    }

    clickToUpdateButton(){
        this.clickToElement(this.driver, myAccountPageUIs.updateButton);
    }

    async verifyUsernameInfoValue(usernameInfo, attributeName){
        assert.equal(await this.getUsernameInfoValue(attributeName), usernameInfo);
    }

    async verifyEmailInfoValue(emailInfo, attributeName){
        assert.equal(await this.getEmailInfoValue(attributeName), emailInfo);
    }

    async verifyFullNameInfoValue(fullNameInfo, attributeName){
        assert.equal(await this.getFullNameInfoValue(attributeName), fullNameInfo);
    }

    async verifyBirthdayInfoValue(birthdayInfo, attributeName){
        assert.equal(await this.getBirthdayInforValue(attributeName), birthdayInfo);
    }

    async verifyUpdateButtonIsEnabled(){
        await chai.assert.isTrue(await this.isUpdateButtonEnabled(), "Button is not enabled");
    }

    async verifyUpdateButtonIsDisabled(){
        chai.assert.isFalse(await this.isUpdateButtonEnabled(), "Button is enabled");
    }

    async verifyChangPasswordIsSelected(){
        chai.assert.isTrue(await this.ischeckChangePasswordCheckboxSelected(), "Checkbox is not selected");
    }

    clickToOrderHistoryLink(){
        this.clickToElement(this.driver, myAccountPageUIs.orderedHistoryLink);
    }

    getLastOrderDateText(){
        return this.getElementText(this.driver, myAccountPageUIs.lastOrderDate);
    }

    async verifyLastOrderDateText(){
        let orderDate = "Đặt ngày " + this.getCurrentDate();
        console.log(orderDate);
        assert.equal(await this.getLastOrderDateText(), orderDate);
    }

    isBaloTSB855LinkHistoryDisplayed(productName){
        return this.isElementDisplayed(this.driver, this.getDynamicLocator(myAccountPageUIs.baloTSB855LinkHistory, productName));
    }

    async verifyBaloTSB855LinkHistoryDisplayed(productName){
        chai.assert.isTrue(await this.isBaloTSB855LinkHistoryDisplayed(productName), "Balo TSB855 is not in history!");
    }

}

module.exports = new myAccountPageObject();