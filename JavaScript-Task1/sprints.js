const result = document.getElementById("result");
const number1 = document.getElementById('num1');
const number2 = document.getElementById('num2');

const add = function() {
    makeOperation('+');
}

const subtract = function() {
    makeOperation('-');
}

const multiply = function() {
    makeOperation('*');
}

const divide = function() {
    makeOperation('/');
}

const reset = function() {
    number1.value = "";
    number2.value = "";
    result.value = "";
}

const makeOperation = function(operation) {
    let num1 = parseInt(number1.value);
    let num2 = parseInt(number2.value);
    if(isValid(num1, num2)) {
        switch(operation) {
            case '+':
                result.value = num1 + num2;
                break;
            case '-':
                result.value = num1 - num2;
                break;
            case '*':
                result.value = num1 * num2;
                break;
            case '/':
                result.value = parseFloat(num1 / num2);
                break;
        }
        
    } else {
        alert("Enter Valid Numbers !!")
        document.getElementById("num1").value = "";
        document.getElementById("num2").value = "";
    }
}

const isValid = function(n1, n2) {
    if(Number.isInteger(n1) && Number.isInteger(n2)){
        return true;
    } else{
        return false;
    }
}