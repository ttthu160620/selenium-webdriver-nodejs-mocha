const INSERT_BRAND_BUTTON = "//a[contains(text(),'Thêm thương hiệu mới')]";
const CATEGORY_NAME_TEXTBOX = "//input[@name='BrandName']";
const SAVE_BUTTON = "//button[@class='btn btn-success']";
const VIEW_LIST_BUTTON = "//a[contains(@class,'viewlist')]";
const DELETE_ICON = "//tbody/tr[last()]//a[contains(@class,'delete')]";
const EDIT_ICON = "//tbody/tr[last()]//a[contains(@class,'edit')]";
const DELETE_BUTTON = "//button[contains(@class,'delete')]";
const UPDATE_BUTTON = "//button[@class='btn btn-outline-success']";
const INSERT_SUCCESSFULL_MESSAGE = "//div[@class='alert alert-success']";
const LAST_BRAND_NAME = "//tbody/tr[last()]/td[1]";
const LIST_ROW_NUMBER = "//tbody/tr";

class BrandPageUI{
    get insertBrandButton(){
        return INSERT_BRAND_BUTTON;
    }

    get brandNameTextbox(){
        return CATEGORY_NAME_TEXTBOX;
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

    get lastBrandName(){
        return LAST_BRAND_NAME;
    }

    get listRowNumber(){
        return LIST_ROW_NUMBER;
    }
}

module.exports = new BrandPageUI();