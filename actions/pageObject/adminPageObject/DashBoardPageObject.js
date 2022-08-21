let BasePage = require("../../commons/BasePage.js");
let dashboardPageUI = require("../../../interfaces/adminPageUIs/DashBoardPageUI.js");

class DashBoardPageObject extends BasePage{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    clickToCategoryLink(){
        this.clickToElement(this.driver, dashboardPageUI.categoryLink);
    }

    clickToBrandLink(){
        this.clickToElement(this.driver, dashboardPageUI.branchLink);
    }

    clickToProductLink(){
        this.clickToElement(this.driver, dashboardPageUI.productLink);
    }
}

module.exports = new DashBoardPageObject();