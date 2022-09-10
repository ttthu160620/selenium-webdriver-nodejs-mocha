let homePageUIs = require ("../../../interfaces/userPageUIs/HomePageUI.js");
let BasePage = require("../../commons/BasePage.js");

class HomePageObject extends BasePage{
    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver;
    }

    clickToHomeIcon(){
        this.clickToElement(this.driver, homePageUIs.homeIcon);
    }

    clickToLoginLink(){
        this.clickToElement(this.driver, homePageUIs.loginLink);
    }

    clickToRegisterLink(){
        this.clickToElement(this.driver, homePageUIs.registerLink);
    }

    hoverToMyAccountLink(){
        this.hoverMouseToElement(this.driver, homePageUIs.myAccountLink);
    }

    clickToProfileLink(){
        this.clickToElement(this.driver, homePageUIs.profileLink);
    }

    clickToLogoutLink(){
        this.clickToElement(this.driver, homePageUIs.logoutLink);
    }

    hoverToCategoryDropdown(){
        this.hoverMouseToElement(this.driver, homePageUIs.categoryDropdown);
    }

    hoverToBranchDropdown(){
        this.hoverMouseToElement(this.driver, homePageUIs.branchDropdown);
    }

    clickToBackpackItem(){
        this.clickToElement(this.driver, homePageUIs.backpackItem);
    }

    clickToHandBagItem(){
        this.clickToElement(this.driver, homePageUIs.handBagItem);
    }

    clickToMikkorBranch(){
        this.clickToElement(this.driver, homePageUIs.mikkorItemOfBranch);
    }

    inputSearchTextbox(searchValue){
        this.sendKeyTextbox(this.driver, homePageUIs.searchTextbox, searchValue);
    }

    clickToSearchButton(){
        this.clickToElement(this.driver, homePageUIs.searchButton);
    }

    clickToCartLink(){
        this.clickToElement(this.driver, homePageUIs.cartLink);
    }
}

module.exports = new HomePageObject();