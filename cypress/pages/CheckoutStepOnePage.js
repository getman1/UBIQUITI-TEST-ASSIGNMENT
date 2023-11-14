class CheckoutStepOnePage {
    getFirstName() {
        return cy.get('[data-test="firstName"]');
    }
    getLastName() {
        return cy.get('[data-test="lastName"]');
    }
    getZipCode() {
        return cy.get('[data-test="postalCode"]');
    }
    getContinueButton() {
        return cy.get('[data-test="continue"]');
    }
    
    fillData(firstname, lastname, zipcode) {
        this.getFirstName().type(firstname);
        this.getLastName().type(lastname);
        this.getZipCode().type(zipcode);
        this.getContinueButton().click();
    }
}    

export default CheckoutStepOnePage;