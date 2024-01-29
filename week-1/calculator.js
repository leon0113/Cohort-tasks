/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
    constructor() {
        this.result = 0;
    }
    add(num) {
        this.result += num;
    }
    substract(num) {
        this.result -= num;
    }
    multiply(num) {
        this.result *= num;
    }
    divide(num) {
        if (num == 0) throw new Error("Can't divide with 0");
        this.result /= num;
    }
    clear() {
        this.result = 0;
    }
    getResult() {
        return this.result;
    }

    calculate(expression) {
        //To remove multiple continuous spaces and trim the expression
        const cleanedExpression = expression.replace(/\s+/g, ' ').trim();

        // Validate expression for non-numerical characters
        if (!/^[\d\s+\-*/().]+$/.test(cleanedExpression)) {
            throw new Error("Invalid expression. Only numerical values and arithmetic operators are allowed.");
        }

        try {
            function cal(expr) {
                const x = eval(expr);
                return x;
            }
            const res = cal(cleanedExpression);
            this.result = res;
        } catch (error) {
            throw new Error("Invalid expression. Please check your input.");
        }
    }
}

const calculator = new Calculator();

calculator.add(11);
calculator.substract(2);
calculator.multiply(2);
calculator.divide(9);
calculator.clear()
console.log(calculator.getResult());


calculator.calculate("10 +   2 *    (   6 - (4 + 1) / 2) + 5");
console.log(calculator.getResult());