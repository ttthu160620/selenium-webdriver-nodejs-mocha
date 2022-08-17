const DASHBOARD_LINK = "//ul[@id='side-main-menu']//a[text()='Trang chủ ']";
const BRANCH_LINK = "//ul[@id='side-main-menu']//a[text()='Thương hiệu ']";
const PRODUCT_LINK = "//ul[@id='side-main-menu']//a[text()='Loại sản phẩm ']";
const CATEGORY_LINK ="//ul[@id='side-main-menu']//a[text()='Sản phẩm ']";
const LOGOUT_BUTTON = "//span[text()='Logout']";

class DashboardPageUI{
    get dashboardLink(){
        return DASHBOARD_LINK;
    }

    get branchLink(){
        return BRANCH_LINK;
    }

    get productLink(){
        return PRODUCT_LINK;
    }

    get categoryLink(){
        return CATEGORY_LINK;
    }

    get logoutButton(){
        return LOGOUT_BUTTON;
    }
}

module.exports = new DashboardPageUI();