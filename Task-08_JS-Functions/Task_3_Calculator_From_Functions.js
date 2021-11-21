// Task 3 Calculator From Functions

const signs = new RegExp('[+\\-*/]');

const zero = (expression = '') => calculateExpression(expression, 0);
const one = (expression = '') => calculateExpression(expression, 1);
const two = (expression = '') => calculateExpression(expression, 2);
const three = (expression = '') => calculateExpression(expression, 3);
const four = (expression = '') => calculateExpression(expression, 4);
const five = (expression = '') => calculateExpression(expression, 5);
const six = (expression = '') => calculateExpression(expression, 6);
const seven = (expression = '') => calculateExpression(expression, 7);
const eight = (expression = '') => calculateExpression(expression, 8);
const nine = (expression = '') => calculateExpression(expression, 9);

const plus = (expression = '') => action(expression, '+');
const minus = (expression = '') => action(expression, '-');
const times = (expression = '') => action(expression, '*');
const dividedBy = (expression = '') => action(expression, '/');

function action(expression, sign) {
  if (signs.test(expression)) {
    return "Error!";
  } else {
    return sign + expression;
  }
}

function calculate(previous, current, sign) {
  switch (sign) {
  case '+':
    return (current + previous).toString();

  case '-':
    return (current - previous).toString();
    
  case '*':
    return (current * previous).toString();

  case '/':
    if (current / previous === Number.POSITIVE_INFINITY) {
      return Number.POSITIVE_INFINITY.toString();
    }

    return parseInt(current / previous).toString();
  
  default: return "Error!";
  }
}

function calculateExpression(expression, current) {
  if (signs.test(expression)) {
    let operands = expression.split(signs);
    return calculate(Number(operands[1]), Number(current), expression[0]).toString();
  } else {
    return current.toString();
  }
}


console.log(seven(times(five())));
console.log(four(plus(nine())));
console.log(eight(minus(three())));
console.log(six(dividedBy(two())));
console.log(eight(dividedBy(three())));
console.log(three(times(three(times(three())))));
console.log(two(plus(two(times(two(minus(one())))))));
console.log(zero(plus(one(dividedBy(one())))));
console.log(one(dividedBy(zero())));
console.log(one());
