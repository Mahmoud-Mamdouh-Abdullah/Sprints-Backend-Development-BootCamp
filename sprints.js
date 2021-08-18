const result = document.getElementById("result");
const number1 = document.getElementById('num1');
const number2 = document.getElementById('num2');

function add() {
    makeOperation('+');
}


function subtract() {
    makeOperation('-');
}

function multiply() {
    makeOperation('*');
}

function divide() {
    makeOperation('/');
}

function reset() {
    number1.value = "";
    number2.value = "";
    result.value = "";
}

function makeOperation(operation) {
    let num1 = parseInt(number1.value);
    let num2 = parseInt(number2.value);
    console.log(`${num1} and ${num2}`)
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

function isValid(n1, n2) {
    if(Number.isInteger(n1) && Number.isInteger(n2)){
        return true;
    } else{
        return false;
    }
}