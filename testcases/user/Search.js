let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let searchPage = require("../../actions/pageObject/userPageObject/SearchPageObject.js");
var addContext = require("mochawesome/addContext");

describe('Search', async function(){
    let driver = null;
    
    before('Open browser', async function(){
        driver = await openBrowser.openHomePage();
        homePage.constructorDriver(driver);
        searchPage.constructorDriver(driver);
        await driver.sleep(2000);
    });

    this.beforeEach("Click home icon", async function(){
        homePage.clickToHomeIcon();
        await driver.sleep(1000);
    })

    it('Search-01 Search with empty data', async function(){
        homePage.inputSearchTextbox("");
        homePage.clickToSearchButton();
        await driver.sleep(1000);
        searchPage.clickBackToHomePageLink();
    });

    it('Search-02 Search with data is not existing', async function(){
        homePage.inputSearchTextbox("aaaaaaaaaaaaaa");
        homePage.clickToSearchButton();
        await driver.sleep(1000);
        await searchPage.verifyNotExistingItemMessageIsDisplayed();
    });

    it('Search-03 Search with ralative data', async function(){
        homePage.inputSearchTextbox("túi xách");
        homePage.clickToSearchButton();
        await driver.sleep(1000);
        //verify có 18 sản phẩm xuất hiện và chia thành 3 pages (mỗi page có 8 items)
        await searchPage.verifyResultOfHandBackMessageDisplayed();
        await searchPage.getListItemPage1Text();
    });

    it ('Search-04 Search with absolutely item', async function(){
        homePage.inputSearchTextbox("Túi Xách Targus TBT268AP-72 M Black");
        homePage.clickToSearchButton();
        await driver.sleep(1000);
        await searchPage.verifyIsResultAbsoluteItemMessageDisplayed();
        await searchPage.verifyBaloItemDisplayed();
    })

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
            let imageFileName = this.currentTest.title + '.jpeg';
            driver.takeScreenshot().then(
                function(image){
                    require('fs').writeFileSync('./screenshots/user/search/' + imageFileName, image, 'base64')
                }
            )
            addContext(this,'Following comes the failed test image')
            addContext(this, '../screenshots/user/search/' + imageFileName)
        }
    });
   
    after('Close browser', async function(){
        await driver.quit();
    });
});