const { Builder} = require("selenium-webdriver");
require("chromedriver");
require("geckodriver");

class getBrowserDriver{
    constructor(){
        this.driver = new Builder().forBrowser('chrome').build();
        //this.driver = new Builder().forBrowser('firefox').build();
    }
    openHomePage(){
        this.driver.manage().setTimeouts( { implicit: 30000 } );
        this.driver.manage().window().maximize();
        this.driver.get("http://localhost:3000/home");
        return this.driver;
    }   

}


module.exports= new getBrowserDriver();