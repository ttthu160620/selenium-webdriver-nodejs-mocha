let BasePage = require ("../../commons/BasePage.js");
let registerPageUIs = require("../../../interfaces/userPageUIs/RegisterPageUI.js");
let registerData = require("../../../testdata/Register.json");
let assert = require("assert");

class RegisterPageObject extends BasePage{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    inputUsernameTextbox(username){
        this.sendKeyTextbox(this.driver, registerPageUIs.usernameTextbox, username );
    }

    inputPasswordTextbox(password){
        this.sendKeyTextbox(this.driver, registerPageUIs.passwordTextbox, password );
    }

    inputConfPasswordTextbox(confirmPassword){
        this.sendKeyTextbox(this.driver, registerPageUIs.confirmPasswordTextbox, confirmPassword);
    }

    inputFullNameTextbox(fullName){
        this.sendKeyTextbox(this.driver, registerPageUIs.fullNameTexbox, fullName);
    }

    inputEmailTextbox(email){
        this.sendKeyTextbox(this.driver, registerPageUIs.emailTextbox, email);
    }

    inputBirthdayTextbox(birthday){
        this.sendKeyTextbox(this.driver, registerPageUIs.birthdayTextbox, birthday);
    }

    getEmptyUsernameMessage(){
        return this.getElementText(this.driver, registerPageUIs.emptyUsernameMessage);
    }

    getEmptyPasswordMessage(){
        return this.getElementText(this.driver, registerPageUIs.emptyPasswordMessage);
    }

    getEmptyConfPasswordMessage(){
        return this.getElementText(this.driver, registerPageUIs.emptyConfPasswordMessage);
    }

    getEmptyFullNameMessage(){
        return this.getElementText(this.driver, registerPageUIs.emptyFullNameMessage);
    }

    getEmptyEmailMessage(){
        return this.getElementText(this.driver, registerPageUIs.emptyEmailMessage);
    }

    getInvalidPasswordMessage(){
        return this.getElementText(this.driver, registerPageUIs.invalidPasswordMessage);
    }

    getInvalidConfPasswordMessage(){
        return this.getElementText(this.driver, registerPageUIs.invalidConfPasswordMessage);
    }

    getInvalidEmailMessage(){
        return this.getElementText(this.driver, registerPageUIs.invalidEmailMessage);
    }

    clickToRegisterButton(){
        this.clickToElement(this.driver, registerPageUIs.registerButton);
    }

    getSuccessfulRegisterMessage(){
        return this.getElementText(this.driver, registerPageUIs.successfulRegisterMessage);
    }

    async verifyEmptyUsernameMessage(message){
        assert.equal(await this.getEmptyUsernameMessage(), message);
    }

    async verifyEmptyPasswordMessage(message){
        assert.equal(await this.getEmptyPasswordMessage(), message);
    }

    async verifyEmptyConfPasswordMessage(message){
        assert.equal(await this.getEmptyConfPasswordMessage(), message);
    }

    async verifyEmptyFullNameMessage(message){
        assert.equal(await this.getEmptyFullNameMessage(), message);
    }

    async verifyEmptyEmailMessage(message){
        assert.equal(await this.getEmptyEmailMessage(), message);
    }

    async verifyInvalidPasswordMessage(message){
        assert.equal(await this.getInvalidPasswordMessage(), message);
    }

    async verifyInvalidConfPasswordMessage(message){
        assert.equal(await this.getInvalidConfPasswordMessage(), message);
    }

    async verifyInvalidEmailMessage(message){
        assert.equal(await this.getInvalidEmailMessage(), message);
    }

    async verifySuccessfullRegisterMessage(message){
        assert.equal(await this.getSuccessfulRegisterMessage(), message);
    }

    getRandomUsername(){
        return registerData.validInfor.username + this.getRandomNumber(999);

    }
}

module.exports = new RegisterPageObject();