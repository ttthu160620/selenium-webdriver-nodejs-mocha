const INSERT_CATEGORY_BUTTON = "//a[contains(text(),'Thêm danh mục mới')]";
const CATEGORY_NAME_TEXTBOX = "//input[@name='CatName']";
const SAVE_BUTTON = "//button[@class='btn btn-success']";
const VIEW_LIST_BUTTON = "//a[contains(@class,'viewlist')]";
const DELETE_ICON = "//tbody/tr[last()]//a[contains(@class,'delete')]";
const EDIT_ICON = "//tbody/tr[last()]//a[contains(@class,'edit')]";
const DELETE_BUTTON = "//button[contains(@class,'delete')]";
const UPDATE_BUTTON = "//button[@class='btn btn-outline-success']";
const INSERT_SUCCESSFULL_MESSAGE = "//div[@class='alert alert-success']";
const LAST_CATEGORY_NAME = "//tbody/tr[last()]/td[1]";
const LIST_ROW_NUMBER = "//tbody/tr";

class CategoryPageUI{
    get insertCategoryButton(){
        return INSERT_CATEGORY_BUTTON;
    }

    get categoryNameTextbox(){
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

    get lastCategoryName(){
        return LAST_CATEGORY_NAME;
    }

    get listRowNumber(){
        return LIST_ROW_NUMBER;
    }
}

module.exports = new CategoryPageUI();