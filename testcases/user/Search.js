let openBrowser = require("../../actions/commons/BaseTest.js");
let homePage = require("../../actions/pageObject/userPageObject/HomePageObject.js");
let searchPage = require("../../actions/pageObject/userPageObject/SearchPageObject.js");
var addContext = require("mochawesome/addContext");
const log = require("../../log4js/log4jsConfig.js");

describe('Search', async function(){
    let driver = null
    let notExistingItem = "aaaaaaaaaaaaaa";
    let existingItem = "túi xách";
    let absoluteItem = "Túi Xách Targus TBT268AP-72 M Black";
    before('Open browser', async function(){
        log.info("Pre-Condition: Open homepage");
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
        log.info("Search-01 Search with empty data")

        log.info("Search - Step 01: Enter to Search textbox with empty data.");
        homePage.inputSearchTextbox("");

        log.info("Search - Step 02: Click to 'Search' button.");
        homePage.clickToSearchButton();
        await driver.sleep(1000);

        log.info("Search - Step 03: Navigate to Home page");
        searchPage.clickBackToHomePageLink();
    });

    it('Search-02 Search with data is not existing', async function(){
        log.info("Search-02 Search with data is not existing");

        log.info("Search - Step 01: Enter to Search textbox with value is '" + notExistingItem + "'");
        homePage.inputSearchTextbox("balo");

        log.info("Search - Step 02: Click to 'Search' button.");
        homePage.clickToSearchButton();
        await driver.sleep(1000);

        log.info("Search - Step 03: Verify '" + notExistingItem +"' is not displayed.");
        await searchPage.verifyNotExistingItemMessageIsDisplayed();
    });

    it('Search-03 Search with ralative data', async function(){
        log.info("Search-03 Search with ralative data");

        log.info("Search - Step 01: Enter to Search textbox with value is '" + existingItem + "'");
        homePage.inputSearchTextbox(existingItem);

        log.info("Search - Step 02: Click to 'Search' button.");
        homePage.clickToSearchButton();
        await driver.sleep(1000);

        log.info("Search - Step 03: Verify result message is displayed.")
        await searchPage.verifyResultOfHandBackMessageDisplayed();
        //await searchPage.getListItemPage1Text();
    });

    it ('Search-04 Search with absolutely item', async function(){
        log.info("Search-04 Search with absolutely item");

        log.info("Search - Step 01: Enter to Search textbox with value is '" + absoluteItem + "'");
        homePage.inputSearchTextbox(absoluteItem);

        log.info("Search - Step 02: Click to 'Search' button.");
        homePage.clickToSearchButton();
        await driver.sleep(1000);

        log.info("Search - Step 03: Verify result message is displayed.");
        await searchPage.verifyIsResultAbsoluteItemMessageDisplayed();

        log.info("Search - Step 04: Verify 1 item is displayed.");
        await searchPage.verifyBaloItemDisplayed();
    })

    this.afterEach(function(){
        if(this.currentTest.state == 'failed'){
            let imageFileName = this.currentTest.title + '.jpeg';
            driver.takeScreenshot().then(
                function(image){
                    require('fs').writeFileSync('./screenshots/user/search/' + imageFileName, image, 'base64');
                }
            )
            addContext(this,'Following comes the failed test image');
            addContext(this, '../screenshots/user/search/' + imageFileName);
        }
    });
   
    after('Close browser', async function(){
        log.info("Close the browser.");
        await driver.quit();
    });
});