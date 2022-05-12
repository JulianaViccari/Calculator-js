describe('Operation with two or more operators', function(){
    it('Visit Calculator and sum and sub values', function(){
        cy.visit('/')

       cy.get('#one').click()
         .get('[value="+"]').click()
         .get('#two').click()
         .get('[value="-"]').click()
         .get('#one').click()
         .get('[value="="]').click()
         .get('#result')

       cy.should('have.value','2')
    })
    it('Visit Calculator sum, sub and div values', function(){
       cy.visit('/')

      cy.get('#nine').click()
        .get('[value="+"]').click()
        .get('#nine').click()
        .get('[value="-"]').click()
        .get('#two').click()
        .get('[value="x"]').click()
        .get('#nine').click()
        .get('[value="/"]').click()
        .get('#three').click()
        .get('[value="="]').click()
        .get('#result')

      cy.should('have.value','12')
    })
  it('Visit Calculator div and div and mult values', function(){
    cy.visit('/')

    cy.get('#nine').click()
    .get('[value="/"]').click()
    .get('#three').click()
    .get('[value="/"]').click()
    .get('#two').click()
    .get('[value="x"]').click()
    .get('#nine').click()
    .get('[value="="]').click()
    .get('#result')

    cy.should('have.value','13.5')
  })
  it('Visit Calculator and sum and sub values', function(){
    cy.visit('/')

    cy.get('[value="-"]').click()
      .get('#one').click()
      .get('[value="-"]').click()
      .get('#two').click()
      .get('[value="-"]').click()
      .get('#one').click()
      .get('[value="="]').click()
      .get('#result')

    cy.should('have.value','-4')
  })
})