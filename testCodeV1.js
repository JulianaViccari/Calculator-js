function calculate(input) {
    let copyInput = input.split('')
    const operator = "-+*/";
    const mult= "*";
    const sum = "+";
    const deduct = "-"; 
    const division = "/";
    
    try{
      while(isValidInput(copyInput, operator) ){
          
        let limits = {
          begin: 0,
          end: 0
        }
        
        if(copyInput.includes(division)){
          let resultdivision = doCalc(copyInput, division, divide, limits);
          copyInput.splice(limits.begin, limits.end+1, resultdivision);
    
        }else if(copyInput.includes(mult)){
          let resultmult = doCalc(copyInput, mult, multiply, limits);
          copyInput.splice(limits.begin, limits.end+1, resultmult);
          
        }else if(copyInput.includes(deduct)){
        let resultdeduct = doCalc(copyInput, deduct, subtract, limits);
        copyInput.splice(limits.begin, limits.end+1, resultdeduct);
    
        }else if(copyInput.includes(sum)){
          let resultsun = doCalc(copyInput, sum, add, limits);
          copyInput.splice(limits.begin, limits.end+1, resultsun);
    
        }
      }
    }catch(erro){
      return erro.message
    }
  
    return copyInput
  }
  
  //validação para input
  function isValidInput(copyInput, operator){
    let filteredInput = copyInput.filter((element) => !isNaN(element)); //cria novo array apenas com numeros do copyInput
    
    if(filteredInput.length === 0){
      throw new Error("Input inválido")
    }
    
     for(let i = 0; i < copyInput.length ; i++){
      if(operator.includes(copyInput[i])){
        return true
      }
    }
  }
  
  function doCalc(copyInput, compareOperador, mathOperationFunction, limits){
    let total = 0
  
    let indexOperator = indexOfOperator(copyInput, compareOperador);
    let numberBefore = getNumberBefore(copyInput, indexOperator, limits);
    let numberAfter = getNumberAfter(copyInput, indexOperator, limits);
    total += mathOperationFunction(numberBefore, numberAfter );
    return total;
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
    if(num2 === 0){
      throw new Error("Não é possivel divisão por 0")
    }else{
    return (num1 / num2);
    }
  }
  
  //encontra indice operador
  function indexOfOperator(input, operator){
   return input.indexOf(operator)
  }
  
  //retorna em indice único numero antes o positionIndexOperator
  function getNumberBefore(copyInput, positionIndexOperator, limits){
    let operatorMath = "-+*/"
    let numero = [];
    //if abaixo merece atenção
    if(copyInput[positionIndexOperator - 1] === '*' || copyInput[positionIndexOperator - 1] === '/'){
      throw new Error("Expressão mal formada")
    }
  
    for(let i = positionIndexOperator -1; i >= 0; i--){
      if(operatorMath.includes(copyInput[i])){ 
        if(i === 0 ){
          numero.unshift(copyInput[i]);
          limits.begin = i;
        }else{
          break;
        }
      }else{
        numero.unshift(copyInput[i]);
        limits.begin = i;
      } 
    }
    return Number(numero.join(''))
  }
  
  //retorna em indice único números( e operadores ) após o positionIndexOperator
  function getNumberAfter(copyInput, positionIndexOperator, limits){
    let operatorMath = "-+*/"
    let numero = [];
    
    if(operatorMath.includes(copyInput[positionIndexOperator + 1])){//retira proximo operador positionIndexOperator do copyInput e armazena em numero
      numero.push(copyInput[positionIndexOperator + 1 ])
      copyInput.splice(positionIndexOperator + 1, 1)
    }
  
    for(let i = positionIndexOperator +1; i < copyInput.length ; i++){ 
        if(operatorMath.includes(copyInput[i])){
            break;
        }else{
            numero.push(copyInput[i]);
            limits.end = i;
        } 
    }
    return Number(numero.join(''));
  }