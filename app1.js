const previousTextElement = document.querySelector('[data-previous-operand]')
const currentTextElement = document.querySelector('[data-current-operand]')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')
const equalsButton = document.querySelector('[data-equals]')
let pressed;
let currentNumber = ''
let previousNumber = ''
let currentOperand = undefined
let previousOperand = undefined

clearAllButton.addEventListener('click', () => {
    clear()
    updateDisplay()
})
deleteButton.addEventListener('click', (event) => {
    pressed = false
    backSpace()
    updateDisplay()
})

numberButtons.forEach(numberButton => {
   numberButton.addEventListener('click', (e) => {
    appendNumber(numberButton.innerText)
    updateDisplay()
   }) 
})
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        chooseOperation(operatorButton.innerText)
        updateDisplay()
    })
})

equalsButton.addEventListener('click', (event) => {
    pressed = true
    operate(currentOperand, currentNumber, previousNumber)
    updateDisplay()

})
const clear = function(){
    currentNumber = ''
    currentOperand = undefined
    previousNumber = ''
    previousOperand = undefined
}
const backSpace = function(){
    currentNumber = currentNumber.toString().slice(0, -1)

}
const appendNumber = function(number){
    if(pressed && currentNumber !== ''){
        currentNumber = ''
        pressed = false
    }
    if(number === '.' && currentNumber.includes('.')) return
    currentNumber = currentNumber.toString() + number.toString()
}
const chooseOperation = function (operator){
    if(currentNumber === '') return
    if(previousNumber !== '') {
        operate(currentOperand, currentNumber, previousNumber)
    }
    currentOperand = operator
    previousNumber = currentNumber
    currentNumber= ''
    pressed = false

}
const updateDisplay = function(){
    currentTextElement.innerText = currentNumber
    previousTextElement.innerText = previousNumber
}

const add = function(num1, num2){
    let sum = Number(num1) + Number(num2)
    return sum
}
const subtract = function(num1, num2){
    let sum = Number(num2) - Number(num1)
    return sum;
}
const multiply = function(num1, num2){
    let sum = Number(num1) * Number(num2)
    return sum;
}
const divide = function(num1, num2){
    let sum = Number(num2) / Number(num1)
    return sum;
}

const operate = function(operand, num1, num2 ){
    let result;
    if(operand === undefined || num1 === ''){
        return result = 0
    }
    switch(operand){
        case '+':
            result = add(num1, num2)
            break;
        case '-':
            result = subtract(num1, num2)
            break;
        case '*':
            result = multiply(num1, num2)
            break;
        case '/':
            result = divide(num1, num2)
            break;
    }
    
    currentNumber = result
    previousNumber = ''
    currentOperand = undefined
}





