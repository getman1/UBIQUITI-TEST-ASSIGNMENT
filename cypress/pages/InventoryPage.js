class InventoryPage {
    getHeader() {
        return cy.get(".primary_header");
    }
    getSocial() {
        return cy.get('.social');
    }
    getTwitter() {
        return cy.get('.social_twitter a');
    }
    getFacebook() {
        return cy.get('.social_facebook a');
    }
    getLinkedin() {
        return cy.get('.social_linkedin a');
    }
    getFooter() {
        return cy.get('.footer_copy');
    }
    getProductSort() {
        return cy.get('[data-test="product_sort_container"]');
    }
    getInventoryList() {
        return cy.get('.inventory_list');
    }
    getFleece() {
        return cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    }
    getBikeLight() {
        return cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]');
    }
    getShoppingCart() {
        return cy.get('.shopping_cart_container');
    }
}    

export default InventoryPage;