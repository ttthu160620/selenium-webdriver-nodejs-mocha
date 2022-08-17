const USERNAME_TEXTBOX = "//input[@id='txtUsername']";
const PASSWORD_TEXTBOX = "//input[@id='txtPWD']";
const SUBMIT_BUTTON = "//div[@class='form-group']//button[text()='Submit']";
const UNSUCESS_LOGIN_MESSAGE = "//div[@class='alert alert-danger']/p";
class LoginPageUIs{
    get usernameTextbox(){
        return USERNAME_TEXTBOX;
    }

    get passwordTextbox(){
        return PASSWORD_TEXTBOX;
    }

    get submitBtn(){
        return SUBMIT_BUTTON;
    }

    get unsucessfulLoginMessage(){
        return UNSUCESS_LOGIN_MESSAGE;
    }
}

module.exports = new LoginPageUIs()