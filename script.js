/****************************************
 Functions
 ****************************************/

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case ADD:
      return add(a, b);
    case SUBTRACT:
      return subtract(a, b);
    case MULTIPLY:
      return multiply(a, b);
    case DIVIDE:
      return divide(a, b);
  }
}

/****************************************
 Interaction
 ****************************************/

function populateDisplay(e) {
  const key = e.target.textContent;
  const displayValue = display.textContent;

  // Constraints
  if ( (displayValue.length === 10) // 10 characters (incl. decimal point)
    || (key === '.' && displayValue.indexOf('.') !== -1) // 1 decimal point
  ) {
    return;
  }

  // Remove leading zero, except for decimal values less than 1
  if (displayValue === '0' && key !== '.') {
    display.textContent = '';
  }

  display.textContent += key;
}

function clearDisplay() {
  display.textContent = 0;
}

function clearAll() {
  calc.numbers = [0, 0];
  calc.operator = null;
  clearDisplay();
}


/****************************************
 Constant variables
 ****************************************/

const ADD = '+';
const SUBTRACT = '−';
const MULTIPLY = '×';
const DIVIDE = '÷';


/****************************************
 Calculator
 ****************************************/

const display = document.querySelector('.calculator__display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');

const calc = {
  numbers: [0, 0],
  operator: null,
  answer: 0,
  rewrite: false
};

digits.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (calc.rewrite) clearDisplay();
    calc.rewrite = false;
    populateDisplay(e);
    calc.numbers[1] = Number(display.textContent);
  });
});

operators.forEach((button) => {
  button.addEventListener('click', (e) => {
    calc.numbers[0] = calc.numbers[1];
    calc.operator = e.target.textContent;
    calc.rewrite = true;

    if (calc.operator[0] === 'C') {
      if (calc.operator[1] === 'E') clearDisplay();
      else clearAll();
      return;
    }
  });
});

equals.addEventListener('click', (e) => {
  calc.answer = operate(calc.operator, ...calc.numbers);
  display.textContent = calc.answer;
  calc.numbers = [0, calc.answer];
});
