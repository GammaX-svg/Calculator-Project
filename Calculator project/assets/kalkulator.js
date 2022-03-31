const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};
 
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}
 
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}
 
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}
 
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function percentageNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * 0.01;
}
 
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}
 
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }
    
    if (parseFloat(calculator.firstNumber) % 1 !== 0 || parseFloat(calculator.displayNumber) % 1 !== 0){
        firstNumber = parseFloat(calculator.firstNumber);
        displayNumber = parseFloat(calculator.displayNumber);
    } else {
        firstNumber = parseInt(calculator.firstNumber);
        displayNumber = parseInt(calculator.displayNumber);
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = firstNumber + displayNumber;
    } else if (calculator.operator === "-"){
        result = firstNumber - displayNumber;
    } else if (calculator.operator === "x"){
        result = firstNumber * displayNumber;
    } else {
        result = firstNumber / displayNumber;
    }
  
    if (result % 1 !== 0){
        calculator.displayNumber = result;
    } else {
        calculator.displayNumber = parseInt(result);
    }
 } 
 
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {
 
        // mendapatkan objek elemen yang diklik
        const target = event.target;
 
        if (target.classList.contains('all-clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
 
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        
        if (target.classList.contains('percentage')) {
            percentageNumber();
            return;
        }
 
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
 
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText)
            console.log(target.innerText)
            return;
        }
 
        inputDigit(target.innerText);
        updateDisplay()
    });
}