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

    /**
     * faz push na variavel tokens
     * @param {string} stringValue 
     */
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

const test = new Token("//");
const tokens = test.getTokensFromInput();



console.log(test.isValidInput(tokens));
