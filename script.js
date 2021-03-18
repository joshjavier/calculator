/****************************************
 Constants
 ****************************************/

const ADD = '+';
const SUBTRACT = '−';
const MULTIPLY = '×';
const DIVIDE = '÷';

const BUFFER_LIMIT = 10;
const DIGIT = 'digit';
const OPERATION = 'operation';

/****************************************
 Math functions
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
  if (b == 0) return ';(';
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
 Calculator functions
 ****************************************/

// When does the display get updated?
// - when pressing C and CE
// - when pressing a digit or decimal point
// - after pressing an operator
// - after pressing equals

function cancelEntry() {
  buffer = '0';
  populateDisplay(buffer);
}

function clear() {
  cancelEntry();
  register = { a: 0, b: 0, operator: null, answer: 0, flag: null };
}

function updateBuffer(value, e) {
  // Note: The buffer is always a string, otherwise "0." will still
  // register as 0, and the user won't be able to enter decimals.

  let buffer = value.toString();
  const buttonText = e.target.textContent;

  const overflow = (buffer.length >= BUFFER_LIMIT);
  const isDecimal = (buffer.indexOf('.') !== -1);
  const isZero = (buffer === '0');

  switch (register.flag) {
    case OPERATION:
      // if answer exceeds the buffer limit, convert to exponential notation
      if (overflow) buffer = Number(value).toPrecision(4).toString();
      break;

    default:
      if (overflow) break;
      if (buttonText === '.' && isDecimal) break;    // 1 decimal point only
      if (buttonText !== '.' && isZero) buffer = ''; // remove leading zero
      buffer += buttonText;
  }

  return buffer;
}

function populateDisplay(buffer) {
  document.querySelector('.calculator__display').textContent = buffer;
}

function calculate(e) {
  register.flag = OPERATION;
  register.answer = operate(register.operator, register.a, register.b);
  buffer = updateBuffer(register.answer, e);
  populateDisplay(buffer);

  // prepare for next operation
  register.a = register.b;
  register.b = register.answer;
  register.operator = null;

  console.log(register);
}

/****************************************
 Calculator
 ****************************************/

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');

let register = {
  a: 0,
  b: 0,
  operator: null,
  answer: 0,
  flag: null      // controls whether display will be cleared
};

// Assign functions to C and CE buttons
document.querySelector('.clear').addEventListener('click', clear);
document.querySelector('.cancelEntry').addEventListener('click', cancelEntry);

digits.forEach((button) => {
  button.addEventListener('click', (e) => {
    // clear display first if previous button pressed is an operator
    if (register.flag !== DIGIT) {
      cancelEntry();
      register.flag = DIGIT;
    }
    buffer = updateBuffer(buffer, e);
    register.b = Number(buffer);
    populateDisplay(buffer);
  });
});

operators.forEach((button) => {
  button.addEventListener('click', (e) => {
    // C and CE buttons are in a separate block
    if (e.target.textContent[0] === 'C') return;

    // evaluate prior inputs first if any
    if (register.operator) calculate(e);

    register.flag = OPERATION;
    register.a = register.b;
    register.operator = e.target.textContent;
  });
});

equals.addEventListener('click', (e) => {
  if (register.flag === OPERATION) return;
  calculate(e);
});
