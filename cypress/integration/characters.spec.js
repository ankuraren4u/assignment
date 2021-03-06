describe('Starwar Characters', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000') 
    })
  
    // 1. We have an HTML element of type form with a class 'city-country'.
    it('Autosuggest should have focus', () => {
       cy.focused().parent().should('have.class', 'ui-autosuggest');
    })

    // 1. We have an HTML element of type form with a class 'city-country'.
    it('Autosuggest should shouw results', () => {
        cy.focused().should('have.class', 'ui-autosuggest');
     })
});
