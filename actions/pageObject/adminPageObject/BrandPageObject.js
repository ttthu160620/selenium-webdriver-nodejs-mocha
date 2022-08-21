let BasePage = require("../../commons/BasePage.js");
let brandPageUI = require("../../../interfaces/adminPageUIs/BrandPageUI.js");
let adminData = require("../../../testdata/admin.json");
let chai = require("chai");
let assert = require("assert");

class BrandPageObject extends BasePage{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    clickToInsertNewBrand(){
        this.clickToElement(this.driver, brandPageUI.insertBrandButton);
    }

    inputBrandNameToTextbox(brandName){
        this.sendKeyTextbox(this.driver, brandPageUI.brandNameTextbox, brandName);
    }

    clickToSaveButton(){
        this.clickToElement(this.driver, brandPageUI.saveButton);
    }

    clickToViewListButton(){
        this.clickToElement(this.driver, brandPageUI.viewListButton);
    }

    clickToDeleteIcon(){
        this.clickToElement(this.driver, brandPageUI.deleteIcon);
    }

    clickToEditIcon(){
        this.clickToElement(this.driver, brandPageUI.editIcon);
    }

    clickToDeleteButton(){
        this.clickToElement(this.driver, brandPageUI.deleteButton);
    }

    clickToUpdatebutton(){
        this.clickToElement(this.driver, brandPageUI.updateButton);
    }

    getInsertSuccessfulMessageText(){
        return this.getElementText(this.driver, brandPageUI.insertSuccessfullMessage);
    }

    async verifyInsertSuccessfullMessage(){
        let message = await this.getInsertSuccessfulMessageText();
        console.log(message);
        chai.assert.isTrue(await message.includes(adminData.brand.insertMessage));
    }

    getLastBrandName(){
        return this.getElementText(this.driver, brandPageUI.lastBrandName);
    }

    async verifyLastBrandName(){
        let lastCateName = await this.getLastBrandName();
        assert.equal(lastCateName, adminData.brand.updateBrandName);
    }

    async getListRowNumber(){
        let list = await this.getListWebElements(this.driver, brandPageUI.listRowNumber);
        let size = await list.length;
        return size;
    }
}

module.exports = new BrandPageObject();