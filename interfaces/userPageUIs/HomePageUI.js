const HOME_ICON = "//a[text()='Shop Pohs']";
const SEARCH_TEXTBOX = "//input[@type='search']";
const SEARCH_BUTTON = "//input[@type='search']/following-sibling::button";
const LOGIN_LINK = "//a[@id='login']";
const REGISTER_LINK = "//a[@id='register']";

const MY_ACCOUNT = "//li[@class='dropdown Login']";
const PROFILE_LINK = "//ul[@class='dropdown-menu']//a[text()='Profile']";
const CART_IN_PROFILE_LINK = "//ul[@class='dropdown-menu']//a[text()='Giỏ hàng']";
const LOGOUT_LINK = "//a[@id='lnkLogout']";

const CATEGORY_DROPDOWN = "//nav[@class='dropdown mr-custom'][1]/button[@id='listItemDropdown']";
const BACKPACK_ITEM = "//span[text()='Ba lô']";
const HAND_BAG_ITEM = "//span[text()='Túi xách']";
const BRAND_DROPDOWN = "//nav[@class='dropdown mr-custom'][2]/button[@id='listItemDropdown']";
const MIKKOR_ITEM ="//span[text()='Mikkor']";
const CART_LINK = "//a[@class = 'nav-link']"

class HomePageUIs{

    get homeIcon(){
        return HOME_ICON;
    }

    get searchTextbox(){
        return SEARCH_TEXTBOX;
    }

    get searchButton(){
        return SEARCH_BUTTON;
    }

    get loginLink(){
        return LOGIN_LINK;
    }

    get registerLink(){
        return REGISTER_LINK;
    }

    get myAccountLink(){
        return MY_ACCOUNT;
    }

    get profileLink(){
        return PROFILE_LINK;
    }

    get cartInProfileLink(){
        return CART_IN_PROFILE_LINK;
    }

    get logoutLink(){
        return LOGOUT_LINK;
    }

    get categoryDropdown(){
        return CATEGORY_DROPDOWN;
    }

    get branchDropdown(){
        return BRAND_DROPDOWN;
    }

    get backpackItem(){
        return BACKPACK_ITEM;
    }

    get handBagItem(){
        return HAND_BAG_ITEM;
    }

    get mikkorItemOfBranch(){
        return MIKKOR_ITEM;
    }

    get cartLink(){
        return CART_LINK;
    }
}
module.exports = new HomePageUIs();