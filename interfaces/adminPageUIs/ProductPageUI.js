const INSERT_PRODUCT_BUTTON = "//a[contains(text(),'Thêm sản phẩm mới')]";
const PRODUCT_NAME_TEXTBOX = "//input[@name='ProName']";
const PRODUCT_DESCIPTION_TEXTBOX = "//input[@name='Description']";
const PRODUCT_PRICE_TEXTBOX = "//input[@name='Price']";
const PRODUCT_QUANTITY_TEXTBOX = "//input[@name='Quantity']";
const CATEGORY_ID_TEXTBOX = "//input[@name='CatID']";
const BRAND_ID_TEXTBOX = "//input[@name='BrandID']";
const SAVE_BUTTON = "//button[@class='btn btn-success']";
const VIEW_LIST_BUTTON = "//a[contains(@class,'viewlist')]";
const DELETE_ICON = "//tbody/tr[last()]//a[contains(@class,'delete')]";
const EDIT_ICON = "//tbody/tr[last()]//a[contains(@class,'edit')]";
const DELETE_BUTTON = "//button[contains(@class,'delete')]";
const UPDATE_BUTTON = "//button[@class='btn btn-outline-success']";
const INSERT_SUCCESSFULL_MESSAGE = "//div[@class='alert alert-success']";
const LAST_PRODUCT_NAME = "//tbody/tr[last()]/td[1]";
const LIST_ROW_NUMBER = "//tbody/tr";

class ProductPageUI{
    get insertProductButton(){
        return INSERT_PRODUCT_BUTTON;
    }

    get productNameTextbox(){
        return PRODUCT_NAME_TEXTBOX;
    }

    get productDesciptionTextbox(){
        return PRODUCT_DESCIPTION_TEXTBOX;
    }

    get productPriceTextbox(){
        return PRODUCT_PRICE_TEXTBOX;
    }

    get productQuantityTextbox(){
        return PRODUCT_QUANTITY_TEXTBOX;
    }

    get categoryIdTextbox(){
        return CATEGORY_ID_TEXTBOX;
    }

    get brandIdTextbox(){
        return BRAND_ID_TEXTBOX;
    }

    get saveButton(){
        return SAVE_BUTTON;
    }

    get viewListButton(){
        return VIEW_LIST_BUTTON;
    }

    get deleteIcon(){
        return DELETE_ICON;
    }

    get editIcon(){
        return EDIT_ICON;
    }

    get deleteButton(){
        return DELETE_BUTTON;
    }

    get updateButton(){
        return UPDATE_BUTTON;
    }

    get insertSuccessfullMessage(){
        return INSERT_SUCCESSFULL_MESSAGE;
    }

    get lastProductName(){
        return LAST_PRODUCT_NAME;
    }

    get listRowNumber(){
        return LIST_ROW_NUMBER;
    }
}

module.exports = new ProductPageUI();