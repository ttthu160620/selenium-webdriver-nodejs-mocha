let loginPageUis = require("../../../interfaces/userPageUIs/LoginPageUI.js");
let BasePage = require ("../../commons/BasePage.js");
let assert = require("assert");

class LoginPageObject extends BasePage{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    inputUsernameTextbox(username){
        this.sendKeyTextbox(this.driver, loginPageUis.usernameTextbox, username );
    }

    inputPasswordTextbox(password){
        this.sendKeyTextbox(this.driver, loginPageUis.passwordTextbox, password );
    }

    clickSubmitButton(){
        this.clickToElement(this.driver, loginPageUis.submitBtn);
    }

    getUsernameAlertMessage(){
        this.getAlertText(this.driver);
    }

    acceptAlert(){
        this.acceptAlert(this.driver);
    }

    getPasswordAlertMessage(){
        this.switchToAlert(this.driver);
        this.getAlertText();
    }

    getUnsuccessLoginMessage(){
        return this.getElementText(this.driver, loginPageUis.unsucessfulLoginMessage);
    }

    async verifyLoginSuccessfully(message){
        await assert.equal(await this.getElementText(this.driver, "//li[contains(@class,'Login')]/span"),message);
    }

    loginAsUser(username, password){
        this.inputUsernameTextbox(username);
        this.driver.sleep(1000);
        this.inputPasswordTextbox(password);
        this.driver.sleep(1000);
        this.clickSubmitButton();
    }

    loginAsAdmin(username, password){
        this.inputUsernameTextbox(username);
        this.inputPasswordTextbox(password);
        this.clickSubmitButton();
    }

}

module.exports = new LoginPageObject();