describe('calculate test', function (){
    it('Visit Calculator and add two positive numbers', function (){
        cy.visit('/')

        cy.get('#two').click()
        cy.get('[value="+"]').click()
        cy.get('#seven').click()
        cy.get('[value="="]').click()

        cy.get('#result').should('value','9')
    })

    it('Visit Calculator and subtraction two positive numbers', function (){
        cy.visit('/')

        cy.get('#seven').click()
        cy.get('[value="-"]').click()
        cy.get('#two').click()
        cy.get('[value="="]').click()

        cy.get('#result').should('value','5')
    })

    it('Visit Calculator and multiplication of two positive numbers', function (){
        cy.visit('/')

        cy.get('#seven').click()
        cy.get('[value="x"]').click()
        cy.get('#two').click()
        cy.get('[value="="]').click()

        cy.get('#result').should('value','14')
    })

    it('Visit Calculator and division two positive numbers', function (){
        cy.visit('/')

        cy.get('#one').click()
        cy.get('#zero').click()
        cy.get('[value="/"]').click()
        cy.get('#two').click()
        cy.get('[value="="]').click()

        cy.get('#result').should('value','5')
    })
    it('Visit Calculator and sub values result negative', function(){
        
        cy.visit('/')
        
        cy.get('#one').click()
        cy.get('#three').click()
        cy.get('[value="-"]').click()
        cy.get('#one').click()
        cy.get('#four').click()
        cy.get('[value="="]').click()
        cy.get('#result')
        
        cy.should('have.value','-1')
    })
      it('Visit Calculator and mult values positive', function(){
        
        cy.visit('index.html')
       
        cy.get('#one').click()
        cy.get('#nine').click()
        cy.get('[value="x"]').click()
        cy.get('#five').click()
        cy.get('#four').click()
        cy.get('[value="="]').click()
        cy.get('#result')
        
        cy.should('have.value','1026')
    })
      it('Visit Calculator and div values positive', function(){
       
        cy.visit('index.html')
        
        cy.get('#one').click()
        cy.get('#zero').click()
        cy.get('[value="/"]').click()
        cy.get('#five').click()
        cy.get('[value="="]').click()
        cy.get('#result')
        
        cy.should('have.value','2')
    })
      it('Visit Calculator and division values negative', function(){
       
        cy.visit('index.html')
      
        cy.get('[value="-"]').click()
        cy.get('#six').click()
        cy.get('[value="x"]').click()
        cy.get('[value="-"]').click()
        cy.get('#six').click()
        cy.get('[value="="]').click()
        cy.get('#result')
        
        cy.should('have.value','36')
    })
  
})