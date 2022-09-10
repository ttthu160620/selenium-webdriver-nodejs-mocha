const {By, until} = require("selenium-webdriver");
const LONG_TIMEOUT = 30000;
class PageBase{

    openPageUrl(driver, pageUrl) {
		driver.get(pageUrl);
	}

    refreshPage(driver) {
		driver.navigate().refresh();
	}

    waitForAlertPresence( driver) {
		return driver.wait(until.alertIsPresent(), LONG_TIMEOUT);
	}

    acceptAlert(driver) {
        let alert = this.waitForAlertPresence(driver);
		alert.accept();
	}

    cancelAlert(driver){
        let alert = this.waitForAlertPresence(driver);
        alert.dismiss();
    }

    getAlertText(driver) {
        let alert = this.waitForAlertPresence(driver);
		return alert.getText();
	}

    senkeyAlert(driver, textValue) {
        let alert = this.waitForAlertPresence(driver);
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

	waitForElementClickable(driver, xpathLocator){
		driver.wait(until.elementLocated(this.getByXpath(xpathLocator)), LONG_TIMEOUT);
	}

	waitForElementVisible(driver, xpathLocator){
		let element = this.getWebElement(driver, xpathLocator);
		driver.wait(until.elementIsVisible(element), LONG_TIMEOUT);
	}

	getCurrentDate(){
		var today = new Date();
		return today.getDate() + '/' + (today.getMonth() + 1) + '/' + (today.getYear() + 1900);
	}

	getDynamicLocator(str, ...arr) {
		for(let i=0;i<arr.length;i++) {
			str = str.replace('%s',arr[i]);
		}
		return str;
	}
}

module.exports = PageBase;