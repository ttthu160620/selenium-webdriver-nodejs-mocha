let BasePage = require("../../commons/BasePage.js");
let productPageUI = require("../../../interfaces/adminPageUIs/ProductPageUI.js");
let adminData = require("../../../testdata/admin.json");
let chai = require("chai");
const { assert } = require("chai");

class ProductPageObject extends BasePage{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    clickInsertNewproductButton(){
        this.clickToElement(this.driver, productPageUI.insertProductButton);
    }

    inputProductNameToTextbox(name){
        this.sendKeyTextbox(this.driver, productPageUI.productNameTextbox, name);
    }

    inputProductDescriptionTextbox(description){
        this.sendKeyTextbox(this.driver, productPageUI.productDesciptionTextbox, description);
    }

    inputProductPriceTextbox(price){
        this.sendKeyTextbox(this.driver, productPageUI.productPriceTextbox, price);
    }

    inputProductQuantityTextbox(quantity){
        this.sendKeyTextbox(this.driver, productPageUI.productQuantityTextbox, quantity);
    }

    inputCategoryIdTextbox(cateID){
        this.sendKeyTextbox(this.driver, productPageUI.categoryIdTextbox, cateID);
    }

    inputBrandIdTextbox(branchID){
        this.sendKeyTextbox(this.driver, productPageUI.brandIdTextbox, branchID);
    }

    clickToSaveButton(){
        this.clickToElement(this.driver, productPageUI.saveButton);
    }

    clickToViewListButton(){
        this.clickToElement(this.driver, productPageUI.viewListButton);
    }

    clickToDeleteIcon(){
        this.clickToElement(this.driver, productPageUI.deleteIcon);
    }

    clickToEditIcon(){
        this.clickToElement(this.driver, productPageUI.editIcon);
    }

    clickToDeleteButton(){
        this.clickToElement(this.driver, productPageUI.deleteButton);
    }

    clickToUpdatebutton(){
        this.clickToElement(this.driver, productPageUI.updateButton);
    }

    getInsertSuccessfulMessageText(){
        return this.getElementText(this.driver, productPageUI.insertSuccessfullMessage);
    }

    async verifyInsertSuccessfullMessage(){
        let message = await this.getInsertSuccessfulMessageText();
        chai.assert.isTrue(await message.includes(adminData.product.insertMessage));
    }

    getLastProductName(){
        return this.getElementText(this.driver, productPageUI.lastProductName);
    }

    async verifyLastProductName(){
        let lastProductName = await this.getLastProductName();
        assert.equal(lastProductName, adminData.product.updateName);
    }

    async getListRowNumber(){
        let list = await this.getListWebElements(this.driver, productPageUI.listRowNumber);
        let size = await list.length;
        return size;
    }
}

module.exports = new ProductPageObject();