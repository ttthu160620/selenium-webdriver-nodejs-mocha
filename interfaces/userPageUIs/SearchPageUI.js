const BACK_TO_HOME_PAGE_LINK = "//a[text()='Về trang chủ']";
const NOT_EXISTING_ITEM_MESSAGE = "//div[contains(text(),'Không có sản phẩm thoả yêu cầu.')]";
const RESULT_OF_HAND_BACK_MESSAGE = "//li[contains(text(), 'Có 18 mặt hàng được tìm thấy')]";
const LIST_HAND_BACK_IN_PAGE1 = "//form[@action='/checkout/add']//a[contains(text(),'Túi Xách')]";
const RESULT_ABSOLUTE_ITEM_MESSAGE = "//li[contains(text(),'Có 1 mặt hàng được tìm thấy')]";
//Túi Xách Targus TBT268AP-72 M Black
const BALO_ITEM = "//form//a[text()='%s']";

class SearchPageUI{
    get backToHomePageLink(){
        return BACK_TO_HOME_PAGE_LINK;
    }

    get notExistingItemMessage(){
        return NOT_EXISTING_ITEM_MESSAGE;
    }

    get resultOfHandBackMessage(){
        return RESULT_OF_HAND_BACK_MESSAGE;
    }

    get listHandBagInPage1(){
        return LIST_HAND_BACK_IN_PAGE1;
    }

    get resultAbsoluteItemMessage(){
        return RESULT_ABSOLUTE_ITEM_MESSAGE;
    }

    get baloItem(){
        return BALO_ITEM;
    }
}

module.exports = new SearchPageUI();