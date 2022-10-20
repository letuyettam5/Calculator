
class Calulator {
    constructor(prevOperandTextEle, currOperandTextEle) {
        this.prevOperandTextEle = prevOperandTextEle;
        this.currOperandTextEle = currOperandTextEle;
        this.clear();
    }

    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(op) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = op;
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
              computation = prev + curr
              break
            case '-':
              computation = prev - curr
              break
            case 'x':
              computation = prev * curr
              break
            case '/':
              computation = prev / curr
              break
            default:
              return
        }
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    update() {
        this.currOperandTextEle.innerText = this.currOperand
        this.prevOperandTextEle.innerText = this.prevOperand
    }
}

const numberButton = document.querySelectorAll('[number]');
const operationButton = document.querySelectorAll('[operation]');
const equalsButton = document.querySelector('[equal]');
const acButton = document.querySelector('[ac]');
const delButton = document.querySelector('[del]');
const prevOperandTextEle = document.querySelector('[prev-operand]');
const currOperandTextEle = document.querySelector('[curr-operand]');
const calculator = new Calulator(prevOperandTextEle, currOperandTextEle)


numberButton.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText)
        calculator.update()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText)
        calculator.update()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.update()
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.update()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.update()
})