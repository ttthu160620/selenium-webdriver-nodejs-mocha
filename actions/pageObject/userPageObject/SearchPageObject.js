let PageBase = require("../../commons/BasePage.js");
let searchPageUI = require("../../../interfaces/userPageUIs/SearchPageUI.js");
let chai = require('chai');
const { contains } = require("jquery");

class SearchPageObject extends PageBase{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver;
    }

    clickBackToHomePageLink(){
        this.clickToElement(this.driver, searchPageUI.backToHomePageLink);
    }

    isNotExistingItemMessageDisplayed(){
        return this.isElementDisplayed(this.driver, searchPageUI.notExistingItemMessage);
    }

    isResultOfHandBackMessageDisplayed(){
        return this.isElementDisplayed(this.driver, searchPageUI.resultOfHandBackMessage);
    }

    async verifyNotExistingItemMessageIsDisplayed(){
        chai.assert.isTrue(await this.isNotExistingItemMessageDisplayed(), "Message is not displayed");
    }

    async verifyResultOfHandBackMessageDisplayed(){
        chai.assert.isTrue(await this.isResultOfHandBackMessageDisplayed(), "Result different with 18");
    }

    listItemInPage1(){
        return this.getListWebElements(this.driver, searchPageUI.listHandBagInPage1);
    }

    async getListItemPage1Text(){
        let list = await this.listItemInPage1();
        for(let i =0; i<list.length;i++){
            let text = list[i].getText().then(function(result) {
                console.log(result);
                chai.assert.isTrue(contains(result,'Túi Xách'));
            });
        }
    }

    isResultAbsoluteItemMessageDisplayed(){
        return this.isElementDisplayed(this.driver, searchPageUI.resultAbsoluteItemMessage);
    }

    async verifyIsResultAbsoluteItemMessageDisplayed(){
        chai.assert.isTrue(await this.isResultAbsoluteItemMessageDisplayed(), "Result different with 1");
    }

    isBaloItemDisplayed(productName){
        return this.isElementDisplayed(this.driver, this.getDynamicLocator(searchPageUI.baloItem, productName));
    }

    async verifyBaloItemDisplayed(productName){
        chai.assert.isTrue(await this.isBaloItemDisplayed(productName), "Balo is not displayed");
    }

    
}

module.exports = new SearchPageObject();