const {By} = require("selenium-webdriver");
class PageBase{

    openPageUrl(driver, pageUrl) {
		driver.get(pageUrl);
	}

    refreshPage(driver) {
		driver.navigate().refresh();
	}

    waitForAlertPresence( driver) {
		let explicitWait = new WebDriverWait(driver, 30);
		return explicitWait.until(ExpectedConditions.alertIsPresent());
	}

    // switchToAlert(driver){
    //     driver.switchTo().alert();
    // }

    acceptAlert(driver) {
        let alert = driver.switchTo().alert();
		alert.accept();
	}

    cancelAlert(driver){
        let alert = driver.switchTo().alert();
        alert.dismiss();
    }

    getAlertText(driver) {
        let alert = driver.switchTo().alert();
		return alert.getText();
	}

    senkeyAlert(driver, textValue) {
		//Alert alert = waitForAlertPresence(driver);
        let alert = driver.switchTo().alert();
		alert.sendKeys(textValue);
	}

    getByXpath(xpathLocator){
        return By.xpath(xpathLocator);
    }

    getWebElement(driver, xpathLocator){
        return driver.findElement(this.getByXpath(xpathLocator));
    }

    getListWebElements(driver, xpathLocator) {
		return driver.findElements(this.getByXpath(xpathLocator));
	}

	getListElementsSize(driver, xpathLocator){
		return this.getListWebElements(driver, xpathLocator).size();
	}

    sendKeyTextbox(driver, xpathLocator, textValue){
        let element = this.getWebElement(driver, xpathLocator);
        element.clear();
        element.sendKeys(textValue);
    }

    clickToElement(driver, xpathLocator) {
		this.getWebElement(driver, xpathLocator).click();
	}

	clickToElementByJS(driver, xpathLocator) {
		driver.executeScript("arguments[0].click();", this.getWebElement(driver, xpathLocator));
	}

    getElementText(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).getText();
    }

    getElementAttributeValue(driver, xpathLocator, attributeName) {
		return this.getWebElement(driver, xpathLocator).getAttribute(attributeName);
	}

    getRandomNumber(max) {
		return Math.floor(Math.random() * max);
	}

    hoverMouseToElement(driver, xpathLocator) {
		let actions = driver.actions();
		let element = this.getWebElement(driver, xpathLocator);
		actions.move({duration:3000,origin:element,x:0,y:0}).perform();
	}

    getElementValidationMessage(driver, xpathLocator) {
		return driver.executeScript("return arguments[0].validationMessage;", this.getWebElement(xpathLocator));
	}

    isElementDisplayed(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).isDisplayed();
	}
	
	isElementSelected(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).isSelected();
	}
	
	isElementEnabled(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).isEnabled();
	}

    checkToDefaultCheckboxRadio(driver, xpathLocator) {
		let element = this.getWebElement(driver, xpathLocator);
		if(!element.isSelected()) {
			element.click();
		}
	}

	scrollToViewByJS(driver, xpathLocator){
		driver.executeScript("arguments[0].scrollIntoView(true);", xpathLocator);
	}

	getCurrentDate(){
		var today = new Date();
		return today.getDate() + '/' + (today.getMonth() + 1) + '/' + (today.getYear() + 1900);
	}

}

module.exports = PageBase;