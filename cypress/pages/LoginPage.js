class LoginPage {
    getUserName() {
        return cy.get('[data-test="username"]');
    }
    getPassword() {
        return cy.get('[data-test="password"]');
    }
    getLoginButton() {
        return cy.get('[data-test="login-button"]');
    }
    errorMessages() {
        return cy.get('.error-message-container');
    }
    loginWithCredentials(username, password) {
        this.getUserName().type(username);
        this.getPassword().type(password);
        this.getLoginButton().click();
    }
}

export default LoginPage;