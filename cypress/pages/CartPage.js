class CartPage {
    getCartContent() {
        return cy.get('#cart_contents_container');
    }
    getCheckout() {
        return cy.get('[data-test="checkout"]');
    }

}    

export default CartPage;