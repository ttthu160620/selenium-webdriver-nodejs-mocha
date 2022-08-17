const USERNAME_TEXTBOX ="//input[@id='txtUsername']";
const PASSWORD_TEXTBOX ="//input[@id='txtPWD']";
const CONFIRM_PASSWORD_TEXTBOX = "//input[@id='txtCPWD']";
const FULLNAME_TEXTBOX = "//input[@id='txtName']";
const EMAIL_TEXTBOX = "//input[@id='txtEmail']";
const BIRTHDAY_TEXTBOX = "//input[@id='txtDOB']";

const EMPTY_USERNAME_MESSAGE = "//p[@id='emptyUsernameMessage']";
const EMPTY_PASSWORD_MESSAGE = "//p[@id='emptyPasswordMessage']";
const INVALID_PASSWORD_MESSAGE = "//p[@id='invalidPasswordMessage']";
const EMPTY_CONFIRM_PASSWORD_MESSAGE = "//p[@id='emptyCPwdMsg']";
const INVALID_CONFIRM_PASSWORD__MESSAGE = "//p[@id='invalidCPwdMsg']";
const EMPTY_FULLNAME_MESSAGE = "//p[@id='emptyNameMsg']";
const EMPTY_EMAIL_MESSAGE = "//p[@id='emptyEmailMsg']";
const INVALID_EMAIL_MESSAGE = "//p[@id='invalidEmail']";

const REGISTER_BUTTON = "//button[@id='btn-signup']";
const SUCCESSFULL_MESSAGE = "//div[@class='alert alert-success']/p";

class RegisterPageUIs{
    get usernameTextbox(){
        return USERNAME_TEXTBOX;
    }

    get passwordTextbox(){
        return PASSWORD_TEXTBOX;
    }

    get confirmPasswordTextbox(){
        return CONFIRM_PASSWORD_TEXTBOX;
    }

    get fullNameTexbox(){
        return FULLNAME_TEXTBOX;
    }

    get emailTextbox(){
        return EMAIL_TEXTBOX;
    }

    get birthdayTextbox(){
        return BIRTHDAY_TEXTBOX;
    }

    get emptyUsernameMessage(){
        return EMPTY_USERNAME_MESSAGE;
    }
   
    get emptyPasswordMessage(){
        return EMPTY_PASSWORD_MESSAGE;
    }

    get invalidPasswordMessage(){
        return INVALID_PASSWORD_MESSAGE;
    }
    
    get emptyConfPasswordMessage(){
        return EMPTY_CONFIRM_PASSWORD_MESSAGE;
    }

    get invalidConfPasswordMessage(){
        return INVALID_CONFIRM_PASSWORD__MESSAGE;
    }

    get emptyEmailMessage(){
        return EMPTY_EMAIL_MESSAGE;
    }

    get invalidEmailMessage(){
        return INVALID_EMAIL_MESSAGE;
    }

    get emptyFullNameMessage(){
        return EMPTY_FULLNAME_MESSAGE;
    }

    get registerButton(){
        return REGISTER_BUTTON;
    }

    get successfulRegisterMessage(){
        return SUCCESSFULL_MESSAGE;
    }
}

module.exports = new RegisterPageUIs();