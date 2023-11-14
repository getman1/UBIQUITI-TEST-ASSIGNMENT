class CheckoutCompletePage {
    getBackToProducts() {
        return cy.get('[data-test="back-to-products"]');
    }
    getCompleteHeader() {
        return cy.get('.complete-header');
    }
    getCompleteText() {
        return cy.get('.complete-text');
    }
}    

export default CheckoutCompletePage;