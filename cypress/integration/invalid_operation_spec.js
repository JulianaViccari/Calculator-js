describe('Operation with wrong operators input', function(){
    it('Visit Calculator and div another div operator', function(){
        cy.visit('/')
      
        cy.get('#eight').click()
          .get('[value="/"]').click()
          .get('[value="/"]').click()
          .get('#two').click()
          .get('[value="="]').click()
          .get('#result')

        cy.should('have.value','Input inválido')
    })

    it('Visit Calculator div per zero', function(){
        cy.visit('/')

        cy.get('#nine').click()
          .get('[value="/"]').click()
          .get('#zero').click()
          .get('[value="="]').click()
          .get('#result')

        cy.should('have.value','Infinity')
    })

    it('Visit Calculator div and mult operator ', function(){
        cy.visit('/')
 
        cy.get('#nine').click()
          .get('[value="/"]').click()
          .get('[value="x"]').click()
          .get('#three').click()
          .get('[value="="]').click()
          .get('#result')

        cy.should('have.value','Input inválido')
    })

    it('Visit Calculator mult and div operator ', function(){
    cy.visit('/')
    
    cy.get('#nine').click()
      .get('[value="x"]').click()
      .get('[value="/"]').click()
      .get('#three').click()
      .get('[value="="]').click()
      .get('#result')

    cy.should('have.value','Expressão mal formada')
    })

    it('Visit Calculator div and div operator ', function(){
    cy.visit('/')
    
    cy.get('[value="/"]').click()
        .get('[value="/"]').click()
        .get('[value="="]').click()
        .get('#result')
    
    cy.should('have.value','Input inválido')
    })

    it('Visit Calculator mult and mult operator ', function(){
    cy.visit('/')
    
    cy.get('[value="x"]').click()
        .get('[value="x"]').click()
        .get('[value="="]').click()
        .get('#result')
    
    cy.should('have.value','Input inválido')
    })
})