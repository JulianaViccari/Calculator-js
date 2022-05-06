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

//(1+20) - ((3*4)/3)
//1+20-3*4/3
function calculate(input) {
  console.log(input)
  let copyInput = input.split('')
  const operator = "-+*/";
  const mult= "*";
  const sum = "+";
  const deduct = "-"; 
  const division = "/";
  //
  
  while(compareString(copyInput, operator) ){
      
    let limits = {
       begin: 0,
       end: 0
    }

    if(copyInput.includes(division)){
      let resultdivision = resultOperator(copyInput, division, divide, limits);
      copyInput.splice(limits.begin, limits.end+1, resultdivision);

    }else if(copyInput.includes(mult)){
      let resultmult = resultOperator(copyInput, mult, multiply, limits);
      copyInput.splice(limits.begin, limits.end+1, resultmult);
      
    }else if(copyInput.includes(deduct)){
    let resultdeduct = resultOperator(copyInput, deduct, subtract, limits);
    copyInput.splice(limits.begin, limits.end+1, resultdeduct);

    }else if(copyInput.includes(sum)){
      let resultsun = resultOperator(copyInput, sum, add, limits);
      copyInput.splice(limits.begin, limits.end+1, resultsun);

    }
  }
  return copyInput
}

function compareString(copyInput, operator){
  for(let i = 0; i < copyInput.length ; i++){
    if(operator.includes(copyInput[i])){
      return true
    }
  }
}

function resultOperator(copyInput, compareOperador, mathOperationFunction, limits){
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
  return (num1 / num2);
}

function indexOfOperator(input, operator){
 return input.indexOf(operator)
}

function getNumberBefore(copyInput, positionIndexOperator, limits){
  let operatorMath = "-+*/"
  let numero = [];
  for(let i = positionIndexOperator -1; i >= 0; i--){
    if(operatorMath.includes(copyInput[i])){
      break;
    }else{
      numero = copyInput[i] + numero;
      limits.begin = i;
    } 
  }
  return Number(numero)
}

function getNumberAfter(copyInput, positionIndexOperator, limits){
  let operatorMath = "-+*/"
  let numero = [];
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

