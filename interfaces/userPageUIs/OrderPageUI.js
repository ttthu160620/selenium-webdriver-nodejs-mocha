const ORDER_BUTTON = "//button[text()='Tiến hành đặt hàng']";
const ADD_OTHER_ITEM_LINK = "//a[contains(text(),'Mua thêm sản phẩm khác')]";
const DELETE_BUTTON = "//button[text()='Xóa']";
const MINUS_ICON = "//button[@name='down']";
const PLUS_ICON = "//button[@name='up']";
const ITEM_QUANTITY_TEXT = "//input[@id='qty']";
const ORDER_POPUP = "//div[@id='myModal']";
const ADDRESS_TEXTBOX_POPUP = "//input[@id='address']";
const PHONE_NUMBER_TEXTBOX_POPUP = "//input[@id='phone']";
const EMPTY_ADDRESS_MESSAGE = "//p[@id='emptyAddress']";
const EMPTY_PHONE_NUMBER_MESSAGE = "//p[@id='emptyPhone']";
const ORDER_BUTTON_POPUP = "//button[@class='btn btn-success']";
const CANCEL_BUTTON_POPUP = "//button[@class='btn btn-secondary']";
const CLOSE_POPUP_BUTTON = "//button[@class='close']/span";

const BALO_TSB855_LINK = "//h5//a[text()='%s']";
const ADD_ITEM_TO_CART_BUTTON = "//div[@class='cart-box']/button[@type='submit']";
const ITEM_AMOUNT = "//span[contains(@class,'amount')]";
const TOTAL_AMOUNT = "//input[@id='sum']";

//Túi Xách Simplecarry Gymbag S Black
const HAND_BACK_GYMBAG_LINK = "//h5//a[text()='%s']";
const DELETE_HAND_BANK_BUTTON = "//a[text()='%s']/parent::p/following-sibling::form//button[text()='Xóa']";

class OrderPageUI{
    get orderTest(){
        return BALO_TSB855_LINK_TEST;
    }


    get orderButton(){
        return ORDER_BUTTON;
    }

    get orderButtonPopup(){
        return ORDER_BUTTON_POPUP;
    }

    get addOtheritemLink(){
        return ADD_OTHER_ITEM_LINK;
    }

    get deleteButton(){
        return DELETE_BUTTON;
    }

    get minusIcon(){
        return MINUS_ICON;
    }

    get plusIcon(){
        return PLUS_ICON;
    }

    get itemQuantityText(){
        return ITEM_QUANTITY_TEXT;
    }

    get orderPopup(){
        return ORDER_POPUP;
    }

    get addressTextboxPopup(){
        return ADDRESS_TEXTBOX_POPUP;
    }

    get phoneNumberTextboxPopup(){
        return PHONE_NUMBER_TEXTBOX_POPUP;
    }

    get emptyAddressMessage(){
        return EMPTY_ADDRESS_MESSAGE;
    }

    get emptyPhoneNumberMessage(){
        return EMPTY_PHONE_NUMBER_MESSAGE;
    }

    get cancelButtonPopup(){
        return CANCEL_BUTTON_POPUP;
    }

    get closePopupIcon(){
        return CLOSE_POPUP_BUTTON;
    }

    get baloTSB855Link(){
        return BALO_TSB855_LINK;
    }

    get addItemToCartButton(){
        return ADD_ITEM_TO_CART_BUTTON;
    }

    get itemAmount(){
        return ITEM_AMOUNT;
    }

    get totalAmount(){
        return TOTAL_AMOUNT;
    }

    get handBackGymbagLink(){
        return HAND_BACK_GYMBAG_LINK;
    }

    get deleteHandBackButton(){
        return DELETE_HAND_BANK_BUTTON;
    }

}

module.exports = new OrderPageUI();