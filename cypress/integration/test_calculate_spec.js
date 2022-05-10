describe('calculate test', function (){
    it('add two positive numbers', function (){
        cy.visit('/')

        cy.get('#two').click()
        cy.get('[value="+"]').click()
        cy.get('#seven').click()
        cy.get('[value="="]').click()

        cy.get('#result').should('value','9')
    })

    it(' subtraction two positive numbers', function (){
        cy.visit('/')

        cy.get('#seven').click()
        cy.get('[value="-"]').click()
        cy.get('#two').click()
        cy.get('[value="="]').click()

        cy.get('#result').should('value','5')
    })

    it(' multiplication of two positive numbers', function (){
        cy.visit('/')

        cy.get('#seven').click()
        cy.get('[value="x"]').click()
        cy.get('#two').click()
        cy.get('[value="="]').click()

        cy.get('#result').should('value','14')
    })

    it(' division two positive numbers', function (){
        cy.visit('/')

        cy.get('#one').click()
        cy.get('#zero').click()
        cy.get('[value="/"]').click()
        cy.get('#two').click()
        cy.get('[value="="]').click()

        cy.get('#result').should('value','5')
    })
})