import LoginPage from "../pages/LoginPage";
import credentials from '../fixtures/credentials.json';

const loginPage = new LoginPage();

beforeEach(() => {
    cy.clearCookies();
    cy.clearAllSessionStorage({log: true});
    cy.visit('/');
});

describe('User loggin', () => {
   
    it('with empty user name and password', () => {
        loginPage.getLoginButton().click();
        loginPage.errorMessages().should('contain', "Username is required");
    });

    it('with wrong user name and password', () => {
        const username = credentials['invalidCreds'].username
        const password = credentials['invalidCreds'].password
        loginPage.loginWithCredentials(username, password);
        loginPage.errorMessages().should('contain', "do not match any user in this service");
  
    });
         
    it('with locked out user name and password', () => {
        const username = credentials['lockedOutCreds'].username
        const password = credentials['lockedOutCreds'].password
        loginPage.loginWithCredentials(username, password); 
        loginPage.errorMessages().should('contain', "locked out");
    });

    it('with valid user name and password', () => {
        const username = credentials['validCreds'].username
        const password = credentials['validCreds'].password
        loginPage.loginWithCredentials(username, password); 
        cy.url().should('include', '/inventory.html'); // check succesfull login and transition to proper address
    });
  });

  // Also need to take into cosideration, that some issues presented with https://www.saucedemo.com/, becasue 
  // order of test execution matters. As for now - loginTest.cy.js "fluky" 