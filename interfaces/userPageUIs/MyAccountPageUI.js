const ACCOUNT_INFOR_LINK = "//span[text()='Thông tin tài khoản']";
const USERNAME_INFOR_TEXTBOX = "//input[@id='inputUserName']";
const EMAIL_INFOR_TEXTBOX = "//input[@id='email']";
const FULLNAME_INFOR_TEXTBOX = "//input[@id='inputFullName']";
const BIRTHDAY_INFOR_TEXTBOX = "//input[@id='txtDOB']";

const CHANGE_PASSWORD_CHECKBOX = "//input[@id='changepw']";
const NEW_PASSWORD_TEXTBOX = "//input[@id='new_password']";
const CONFIRM_NEW_PASSWORD_TEXTBOX = "//input[@id='re_new_password']";

const UPDATE_BUTTON = "//button[@id='btnCapNhat']";

const ORDERED_HISTORY_LINK = "//a//span[text()='Lịch sử mua hàng']";
const LAST_ORDER_DATE_TEXT = "//div[contains(@class,'order')][1]//div[contains(@class,'orderDate')]";
const DYNAMIC_ITEM_LINK_HISTORY_BY_TEXT = "//div[contains(@class,'order')][1]//div[contains(@class,'orderDate')]/ancestor::div[contains(@class,'date')]//following-sibling::div[contains(@class,'item')]//a[text()='%s']";

class MyAccountPageUIs{
    get accountInfoLink(){
        return ACCOUNT_INFOR_LINK;
    }

    get usernameInfoTextbox(){
        return USERNAME_INFOR_TEXTBOX;
    }

    get emailInfoTextbox(){
        return EMAIL_INFOR_TEXTBOX;
    }

    get fullNameInfoTextbox(){
        return FULLNAME_INFOR_TEXTBOX;
    }

    get birthDayInfoTextbox(){
        return BIRTHDAY_INFOR_TEXTBOX;
    }

    get changePasswordCheckbox(){
        return CHANGE_PASSWORD_CHECKBOX;
    }

    get newPasswordTextbox(){
        return NEW_PASSWORD_TEXTBOX;
    }

    get confirmNewPasswordTextbox(){
        return CONFIRM_NEW_PASSWORD_TEXTBOX;;
    }

    get updateButton(){
        return UPDATE_BUTTON;
    }

    get orderedHistoryLink(){
        return ORDERED_HISTORY_LINK;
    }

    get lastOrderDate(){
        return LAST_ORDER_DATE_TEXT;
    }

    get baloTSB855LinkHistory(){
        return DYNAMIC_ITEM_LINK_HISTORY_BY_TEXT;
    }
}

module.exports = new MyAccountPageUIs();