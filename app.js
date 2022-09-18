
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')
const screenDisplay = document.querySelector('[data-display]')
const previousTextElement = document.querySelector('[data-previous-operand]')
const currentTextElement = document.querySelector('[data-current-operand]')

function Calculator(previousTextElement, currentTextElement){
    this.previousTextElement = previousTextElement
    this.currentTextElement = currentTextElement
    this.clear()
}

Calculator.prototype.clear = function(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}

Calculator.prototype.delete = function(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

Calculator.prototype.appendNumber = function(number){
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

Calculator.prototype.chooseOperation = function(operation){
    if(this.currentOperand === '') return
    if(this.previousOperand !== ''){
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''
}

Calculator.prototype.compute = function(){
    let computation 
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch(this.operation) {
        case '+':
            computation = prev + current
            break;
        case '-':
            computation = prev - current
            break;
        case '*':
            computation = prev * current
            break;
        case '/':
            computation = prev / current
            break;
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

Calculator.prototype.updateDisplay = function(){
    this.currentTextElement.innerText = this.currentOperand
    this.previousTextElement.innerText = this.previousOperand
    
}
const calculator = new Calculator(previousTextElement, currentTextElement)



numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', (e) =>{
        calculator.appendNumber(numberButton.innerText)
        calculator.updateDisplay()
        
    })
})

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', (e) =>{
        calculator.chooseOperation(operatorButton.innerText)
        calculator.updateDisplay()
        
    })
})
deleteButton.addEventListener('click', (deleteButton) => {
    calculator.delete()
    calculator.updateDisplay()
   
})
clearAllButton.addEventListener('click', (clearAllButton) => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', (e) => {
    let equalsPressed = 1
    console.log(equalsPressed)
    calculator.compute()
    calculator.updateDisplay()
})