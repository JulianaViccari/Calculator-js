class Token {
    constructor(input){
        this.input = input;
        this.tokens = [];
    }

    getTokensFromInput(){
        let copyInput = this.input.split('');
        let index = 0;
        let number = "";
        if (copyInput[0] === '-' || copyInput[0] === '+'){
            number = copyInput[0];
            index = 1;
        }

        //"-6*-6"
        //number = -
        while (index < copyInput.length ){
            if (!isNaN(copyInput[index])){
                number += copyInput[index]
                index++;
            }else{
                this.populateToken(number);
                this.populateToken(copyInput[index]);
                number = "";
                if (copyInput[index+1] === '+' || copyInput[index+1] === "-"){
                    number = copyInput[index+1];
                    index +=2;
                }else{
                    index++;
                }
            }
        }
        this.populateToken(number);
        //this.tokens = this.tokens.filter((element)=>{
        //    return element !== '';
        //} )
        return this.tokens;
    }

    populateToken(stringValue){
        if (stringValue !== ""){
            if (!isNaN(stringValue)){
                this.tokens.push(Number(stringValue));
            }else{
                this.tokens.push(stringValue);
            }
        }
    }

    isValidInput(tokens){
        
        let operator = "-+*/";
        let filteredInput = this.tokens.filter((element) => !isNaN(element)); //cria novo array apenas com numeros do copyInput
        
        if(filteredInput.length === 0 ){
            throw new Error("Input inválido")
        }
        
        for(let i = 0; i < this.tokens.length ; i++){
            if(operator.includes(this.tokens[i])){
                return true
            }
        }
    }
}

class Calculator {
    constructor(tokens){
        this.tokens = tokens;
    }

    doCalculate(){
        const mult= "*";
        const sum = "+";
        const deduct = "-"; 
        const division = "/";
        try{
            
            while(this.verifyTokens()){
                
                if(this.tokens.includes(division)){
                    let resultdivision = this.doCalc(division, this.divide);
                    resultdivision;

                }else if(this.tokens.includes(mult)){
                    let resultmult = this.doCalc(mult, this.multiply);
                    resultmult
                    
                }else if(this.tokens.includes(deduct)){
                    let resultdeduct = this.doCalc(deduct, this.subtract);
                    resultdeduct;

                }else if(this.tokens.includes(sum)){
                    let resultsun = this.doCalc(sum, this.add);
                    resultsun;
                
                }
            }
        }catch(erro){
            return erro.message;
        }
        return this.tokens;
    }

    verifyTokens(){
        let operators = "-+*/";
        for (let i = 0; i < this.tokens.length; i++){
            if(operators.includes(this.tokens[i])){
                return true;
            }
        }
        return false;
    }

    doCalc(mathOperador, mathOperationFunction){
        let total = 0
        let limits = {begin: 0 ,end: 0};
    
        let indexOperator = this.indexOfOperator(mathOperador);
        let numberBefore = this.tokens[indexOperator-1];
        limits.begin = indexOperator-1;
        let numberAfter = this.tokens[indexOperator+1];
        limits.end = indexOperator+1;
        total += mathOperationFunction(numberBefore, numberAfter );
        return this.tokens.splice(limits.begin, limits.end+1, total);
    }
      
    add(num1, num2){
        return (num1 + num2);
    }
    
    subtract(num1, num2){
        return (num1 - num2);
    }
    
    multiply(num1, num2){
        return (num1 * num2);
    }
    
    divide(num1, num2){
        return (num1 / num2);
    }
    
    //encontra indice operador
    indexOfOperator(operator){

        return this.tokens.indexOf(operator)
    }
}
const token = new Token("//");
const tokens = token.getTokensFromInput();
const validTokens = token.isValidInput(tokens);
const result = new Calculator(validTokens).doCalculate();
console.log(result);