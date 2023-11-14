import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";
import CartPage from "../pages/CartPage";
import CheckoutStepOnePage from "../pages/CheckoutStepOnePage"
import CheckoutStepTwoPage from "../pages/CheckoutStepTwoPage"
import CheckoutCompletePage from "../pages/CheckoutCompletePage";
import credentials from '../fixtures/credentials.json';
import userdata from "../fixtures/userdata.json"

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutStepOnePage = new CheckoutStepOnePage();
const checkoutStepTwoPage = new CheckoutStepTwoPage();
const checkoutCompletePage = new CheckoutCompletePage();

beforeEach(() => {
    cy.clearCookies();
    cy.clearAllSessionStorage({log: true});
    cy.visit('/');
});

describe('User loggin', () => {

it('buy product', () => {
    const username = credentials['validCreds'].username
    const password = credentials['validCreds'].password
    loginPage.loginWithCredentials(username, password);
    inventoryPage.getHeader().should('contain', "Swag Labs"); //check header
    inventoryPage.getSocial().should('exist');  //check footer by checking social networks links 
    inventoryPage.getTwitter().should('have.attr', 'href', 'https://twitter.com/saucelabs');
    inventoryPage.getFacebook().should('have.attr', 'href', 'https://www.facebook.com/saucelabs');
    inventoryPage.getLinkedin().should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/');
    inventoryPage.getFooter().should('contain', "2023");
        
    inventoryPage.getProductSort().select('Price (low to high)'); //Sort on: Price (low to high)
    let lastChild = 'Sauce Labs Fleece Jacket';
    inventoryPage.getInventoryList().children().last().should('contain', lastChild); //Add the last product to the cart.
    inventoryPage.getFleece().should('contain', "Add to cart").click(); 
        
    inventoryPage.getProductSort().select('Name (A to Z)'); //Sort on: Name (A to Z)
    let secondChild = 'Sauce Labs Bike Light'
    inventoryPage.getInventoryList().children().eq(1).should('contain', secondChild); //Add the top right product to the cart
    inventoryPage.getBikeLight().should('contain', "Add to cart").click();   
    inventoryPage.getShoppingCart().click();

    cy.url().should('include', '/cart.html'); // check cart page
    cartPage.getCartContent().should('exist').and('contain', lastChild).and('contain', secondChild); //Verify items to purchase matches the ones put in cart.
    cartPage.getCheckout().click(); 

    cy.url().should('include', '/checkout-step-one.html'); // "checkout your information" page (Proceed to checkout)
    const firstname = userdata['userInfo'].firstname
    const lastname = userdata['userInfo'].lastname
    const zipcode = userdata['userInfo'].zipcode
    checkoutStepOnePage.fillData(firstname, lastname, zipcode);

    cy.url().should('include', '/checkout-step-two.html'); // "checkout overview" page
    checkoutStepTwoPage.getFinishButton().click(); 
    
    cy.url().should('include', '/checkout-complete.html'); // "order complete" page. Verify that the purchase was successful
    checkoutCompletePage.getBackToProducts().should('exist').should('contain', 'Back Home');
    checkoutCompletePage.getCompleteHeader().should('contain', "Thank you for your order!");
    checkoutCompletePage.getCompleteText().should('contain', "Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    checkoutCompletePage.getBackToProducts().click();  
    cy.url().should('include', '/inventory.html');


    });
  });

 // Best practice, to separete login pre-condition (better via API calls) and buyProduct test itself