let lightTheme = "styles/light.css";
let darkTheme = "styles/dark.css";

//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);

//function to handle keyboard inputs
function keyboardInputHandler(e) {
  //grabbing the liveScreen
  let res = document.getElementById("result");

  //numbers
  if (e.key === "0") {
    res.value += "0";
  } else if (e.key === "1") {
    res.value += "1";
  } else if (e.key === "2") {
    res.value += "2";
  } else if (e.key === "3") {
    res.value += "3";
  } else if (e.key === "4") {
    res.value += "4";
  } else if (e.key === "5") {
    res.value += "5";
  } else if (e.key === "6") {
    res.value += "6";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "8") {
    res.value += "8";
  } else if (e.key === "9") {
    res.value += "9";
  }

  //operators
  if (e.key === "+") {
    res.value += "+";
  } else if (e.key === "-") {
    res.value += "-";
  } else if (e.key === "*") {
    res.value += "*";
  } else if (e.key === "/") {
    res.value += "/";
  }

  //decimal key
  if (e.key === ".") {
    res.value += ".";
  }

  //press enter to see result
  if (e.key === "Enter") {
    e.preventDefault();

    res.value = calculate(res.value || null);
  }

  //backspace for removing the last input
  if (e.key === "Backspace") {
    let resultInput = res.value;

    //remove the last element in the string
    res.value = resultInput.substring(0, res.value.length - 1);
  }
}

// Clears the screen on click of C button.
function clearScreen() {
  document.getElementById("result").value = "";
}

// Displays entered value on screen.
function liveScreen(value) {
  let res = document.getElementById("result");
  if (!res.value) {
    res.value = "";
  }
  res.value += value;
}

// Swaps the stylesheet in order to  achieve dark mode.
function changeTheme() {
  let darkMode = document.getElementById("dark-mode");
  let theme = document.getElementById("theme");
  if (theme.getAttribute("href") === lightTheme) {
    theme.href = darkTheme;
    darkMode.innerHTML = "Light Mode 🌞";
  } else {
    theme.href = lightTheme;
    darkMode.innerHTML = "Dark Mode 🌙";
  }
}

class Token {
  constructor(input){
      this.input = input;
      this.tokens = [];
  }

  isValidInput(){
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

  _populateToken(stringValue){
    if (stringValue !== ""){
      if (!isNaN(stringValue)){
          this.tokens.push(Number(stringValue));
      }else{
        if (this.tokens[this.tokens.length -1] === "*" || this.tokens[this.tokens.length -1] === "/" ){
          throw new Error("Input inválido")
        }else{
          this.tokens.push(stringValue);
        }
      }
    }
  } 

  getTokensFromInput(){
    let copyInput = this.input.split('');
    let index = 0;
    let number = "";
    if (copyInput[0] === '-' || copyInput[0] === '+'){
        number = copyInput[0];
        index = 1;
    }

    while (index < copyInput.length){
      if (!isNaN(copyInput[index])){
          number += copyInput[index]
          index++;
      }else{
          this._populateToken(number);
          this._populateToken(copyInput[index]);
          number = "";
          if (copyInput[index+1] === '+' || copyInput[index+1] === "-"){
              number = copyInput[index+1];
              index +=2;
          }else{
              index++;
          }
      }
    }
    this._populateToken(number);

    if(this.isValidInput()){
      return this.tokens
    }else{
      throw new Error("Input inválido")
    };
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
    if(num2 === 0){
      throw new Error("Não é possivel divisão por 0")
    }else{
      return (num1 / num2);
    }
  }
  
  //encontra indice operador
  indexOfOperator(operator){
      return this.tokens.indexOf(operator)
  }
}

function calculate(input) {
  try {
    const tokens = new Token(input).getTokensFromInput();
    const result = new Calculator(tokens).doCalculate();
    return result;
  
  } catch (error) {
    return error.message; 
  }
}

