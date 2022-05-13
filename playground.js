
//Testando codigo com regex

function calculate(input) {
    console.log(input)
    let copyInput = input.split(/([\+\-]\d{1,}|[\+\-\*\/])/);
    const operator = "-+*/";
    const mult= "*";
    const sum = "+";
    const deduct = "-"; 
    const division = "/";

    copyInput = copyInput.filter((element)=>{
        return element != ''
    } )

    try{
        while(isValidInput(copyInput, operator) ){
            
        if(copyInput.includes(division)){
            let resultdivision = resultOperator(copyInput, division, divide);
            resultdivision;

        }else if(copyInput.includes(mult)){
            let resultmult = resultOperator(copyInput, mult, multiply);
            resultmult
            
        }else if(copyInput.includes(deduct)){
            let resultdeduct = resultOperator(copyInput, deduct, subtract);
            resultdeduct;

        }else if(copyInput.includes(sum)){
            let resultsun = resultOperator(copyInput, sum, add);
            resultsun;
        }else{
        let result = copyInput.reduce((acc, curr) => Number(acc)+Number(curr));
        copyInput = result;
        return copyInput
        }
        }
    }catch(erro){
        return erro.message
    }

    
    return copyInput
}
  
function resultOperator(copyInput, compareOperador, mathOperationFunction){
    let total = 0
    let limits = {begin: 0 ,end: 0};

    let indexOperator = indexOfOperator(copyInput, compareOperador);
    let numberBefore = Number(copyInput[indexOperator-1]);
    limits.begin = indexOperator-1;
    let numberAfter = Number(copyInput[indexOperator+1]);
    limits.end = indexOperator+1;
    total += mathOperationFunction(numberBefore, numberAfter );
    return copyInput.splice(limits.begin, limits.end+1, total);
}
  
//validação para input
function isValidInput(copyInput, operator){
    let filteredInput = copyInput.filter((element) => !isNaN(element)); //cria novo array apenas com numeros do copyInput

    if(filteredInput.length === 0){
        throw new Error("Input inválido")
    }

    for(let i = 0; i < copyInput.length ; i++){
        if(operator.includes(copyInput[i]) || copyInput.length !== 1){
          return true
        }
    }
    
}
   
const add = (num1, num2)=>{
    return (num1 + num2);
}

const subtract = (num1, num2) => {
    return (num1 - num2);
}

const multiply= (num1, num2)=>{
    return (num1 * num2);
}

const divide = (num1, num2) =>{
    return (num1 / num2);
}

//encontra indice operador
function indexOfOperator(input, operator){
    return input.indexOf(operator)
}

calculate('12-1/2')



