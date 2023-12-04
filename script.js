const calculaterDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorVlaue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // if current display number is 0 replace else add number 
    if (awaitingNextValue) {
        calculaterDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculaterDisplay.textContent;
        calculaterDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // if operator pressed don't add decimal
    if (awaitingNextValue) return;
    // if no decimal add one 
    if (!calculaterDisplay.textContent.includes('.')) {
        calculaterDisplay.textContent = `${calculaterDisplay.textContent}.`;
    }
}

// calcualte first and second values depending on operator 
const calcualte = {
    '/': (firsNumber, secondNumber) => firsNumber / secondNumber,
    '*': (firsNumber, secondNumber) => firsNumber * secondNumber,
    '+': (firsNumber, secondNumber) => firsNumber + secondNumber,
    '-': (firsNumber, secondNumber) => firsNumber - secondNumber,
    '=': (firsNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentVlaue = Number(calculaterDisplay.textContent);
    //   prevent multiple operators 
    if (operatorVlaue && awaitingNextValue){
        operatorVlaue = operator;
        return;
    }

    if (!firstValue) {
        firstValue = currentVlaue;
    } else {
        const calculation = calcualte[operatorVlaue](firstValue, currentVlaue);
        calculaterDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //   ready for next value
    awaitingNextValue = true;
    operatorVlaue = operator;
}

// add event listerner numbers , operator, decimal, buttons 
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// reset dispaly
function resetAll() {
    calculaterDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

clearBtn.addEventListener('click', resetAll);