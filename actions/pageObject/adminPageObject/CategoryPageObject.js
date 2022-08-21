let BasePage = require("../../commons/BasePage.js");
let categoryPageUI = require("../../../interfaces/adminPageUIs/CategoryPageUI.js");
let adminData = require("../../../testdata/admin.json");
let chai = require("chai");
const { assert } = require("chai");

class CategoryPageObject extends BasePage{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    clickToInsertNewCategoryButton(){
        this.clickToElement(this.driver, categoryPageUI.insertCategoryButton);
    }

    inputCategoryNameToTextbox(cateName){
        this.sendKeyTextbox(this.driver, categoryPageUI.categoryNameTextbox, cateName);
    }

    clickToSaveButton(){
        this.clickToElement(this.driver, categoryPageUI.saveButton);
    }

    clickToViewListButton(){
        this.clickToElement(this.driver, categoryPageUI.viewListButton);
    }

    clickToDeleteIcon(){
        this.clickToElement(this.driver, categoryPageUI.deleteIcon);
    }

    clickToEditIcon(){
        this.clickToElement(this.driver, categoryPageUI.editIcon);
    }

    clickToDeleteButton(){
        this.clickToElement(this.driver, categoryPageUI.deleteButton);
    }

    clickToUpdatebutton(){
        this.clickToElement(this.driver, categoryPageUI.updateButton);
    }

    getInsertSuccessfulMessageText(){
        return this.getElementText(this.driver, categoryPageUI.insertSuccessfullMessage);
    }

    async verifyInsertSuccessfullMessage(){
        let message = await this.getInsertSuccessfulMessageText();
        chai.assert.isTrue(await message.includes(adminData.category.insertMessage));
    }

    getLastCategoryName(){
        return this.getElementText(this.driver, categoryPageUI.lastCategoryName);
    }

    async verifyLastCategoryName(){
        let lastCateName = await this.getLastCategoryName();
        assert.equal(lastCateName, adminData.category.updateCateName);
    }

    async getListRowNumber(){
        let list = await this.getListWebElements(this.driver, categoryPageUI.listRowNumber);
        let size = await list.length;
        return size;
    }
}

module.exports = new CategoryPageObject();