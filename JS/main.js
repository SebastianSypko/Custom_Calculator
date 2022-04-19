class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
      currentOperandTextElement.innerText = 0
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    signChange() {
        this.currentOperand = this.currentOperand * (-1)
    }

    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
      comunicationAlert.innerText =''
    }
    
    chooseOperation(operation) {
        this.currentOperand.toString()
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }

    is_Natural(num) {
      return (num >= 0.0) && (Math.floor(num) === num) && num !== Infinity;
    }
 
    factorial() {
      function is_Naturall(num) {
        return (num >= 0.0) && (Math.floor(num) === num) && num !== Infinity;
      }
        let computation
        const current = parseFloat(this.currentOperand);
        console.log(current)

        if(is_Naturall(current) === false) {
            comunicationAlert.innerText ='Use only natural numbers!'
            this.clear()
        }
        else {
            let result = 1;
            for (let i=1; i<=current; i++) {
            result *= i;
            }
            computation = result
            this.currentOperand = computation
            this.previousOperand = ''
            this.operation = undefined
            this.updateDisplay()
        } 
    }
   
    compute() {
      function is_Naturall(num) {
        return (num >= 0.0) && (Math.floor(num) === num) && num !== Infinity;
      }
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      console.log(typeof current)
      if (isNaN(current) || isNaN(prev)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
            if(current === 0)
            {
                comunicationAlert.innerText ='do not divide by 0'
              this.clear()
              return
            }
          computation = prev / current
          break
        case '^':
            if(is_Naturall(current) == false || is_Naturall(prev) == false) {
                comunicationAlert.innerText ='Use only natural numbers!'
                this.clear()
                return
            }
            computation = Math.pow(prev, current)
            break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
    
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = '0'
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) 
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
    
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
}
  
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const signButton = document.querySelector('[data-sign]')
const allClearButton = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('.previous-value')
const currentOperandTextElement = document.querySelector('.current-value')
const comunicationAlert = document.querySelector('.comunication')
const selectButton = document.querySelectorAll('.selected')
const calculatorMove = document.querySelector('.calculator-grid')
const changeCalculator = document.querySelector('.acceptChanges')
const areaChange = document.querySelector('.manipulate-area')
const instructionArea = document.querySelector('.instruciton')


const container = []
selectButton.forEach(button => {
    button.addEventListener('click', () => {
        if (button.style.backgroundColor == 'red') {
            button.style.backgroundColor = '#edf2f4'
            let elem = container.indexOf(button.innerText);
            console.log(elem)
            container.splice(elem, 1);
        }
        else {
            button.style.backgroundColor = 'red'
            container.push(button.innerText)
            /*
            function compareFunction(a,b) {
              if (a-b=="NaN"){
                return
              }
              else {
                return a-b
              }
            }
            container.sort(compareFunction)
            */
            container.sort()
        }
    })
})

// Function which sorts array and make it numbers first then operations
function sortElems(sortTable) {
  for(let i=0; i<sortTable.length-1; i++) {
      let arg1 = sortTable[0];
      let arg2 = sortTable[1];
      let checker = arg1-arg2;
      if(isNaN(checker)){
        console.log(sortTable)
        sortTable.push(sortTable.shift())
        console.log(sortTable)
      }
      else{
          break;
      }
  }  
}

//Funcion moves calculator after load of the page
function moveRight(argument) {
  argument.style.justifyContent = "flex-end"
  argument.style.marginRight = "200px";
}

//Function centers calculator after all necesery buttons were selected
function moveCenter(argument) {
  argument.style.justifyContent = "center"
  argument.style.marginRight = "0px";
}

//Function which is responsible for changing calculator display and then creates object from class Calculator on which you can operate
function addArea() {
  sortElems(container);
  const todoDiv = document.createElement('div');
  const numbArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const operation = ['+','-','*','÷','^']
  const frac = '!'
  for (let j = 0; j < container.length; j++) {
    const completedButton = document.createElement('button');
    completedButton.innerHTML = container[j];
    if(numbArray.includes(container[j]) == true) {
    completedButton.classList.add('data-number');
    todoDiv.appendChild(completedButton);
    }
    else if(operation.includes(container[j]) == true){
        completedButton.classList.add('data-operation');
        todoDiv.appendChild(completedButton);
    }
    else if(frac.includes(container[j]) == true){
        completedButton.classList.add('data-operation-factorial');
        todoDiv.appendChild(completedButton);
    }
  }
  todoDiv.classList.add("manipulate-area");
  var oldCalculator = areaChange;
  var newCalculator = todoDiv;
  var parentDiv = oldCalculator.parentNode;
  parentDiv.replaceChild(newCalculator, oldCalculator);
  moveCenter(calculatorMove);
  instructionArea.style.display = 'none' //delete instrucion
  calculatorMove.style.minWidth = '100vw' //makes sure that calculator will be centered
  adaptArea(newCalculator) //function which adapt to how many elemnts are in the new area 

  
  const numberButtons = parentDiv.querySelectorAll('.data-number')
  const operationButtons = parentDiv.querySelectorAll('.data-operation')   
  const factorialButton = parentDiv.querySelector('.data-operation-factorial')  

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
    
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  
  signButton.addEventListener('click', button => {
    calculator.signChange()
    calculator.updateDisplay()
  })  

  if (container.includes('!')){
    factorialButton.addEventListener('click', button => {
      calculator.factorial()
    })
  }
}

document.addEventListener('DOMContentLoaded', moveRight(calculatorMove));
changeCalculator.addEventListener('click', addArea)


function adaptArea(argument) {
  let matrixElems = container.length;
  let i
  let j
  const isPrime = matrixElems => {
    for(let i = 2, s = Math.sqrt(matrixElems); i <= s; i++)
        if(matrixElems % i === 0) return false; 
    return matrixElems > 1;
  }

  if(matrixElems %2 == 0 && matrixElems<10) {
      i=matrixElems/2
      j=2
      let wymiar = 400/i;
      argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
      argument.style.gridTemplateRows = `repeat(${j},100px)`
  }
  else if(matrixElems==10){
      i=4
      j=3
      let wymiar = 400/i;
      argument.style.gridTemplateRows = `repeat(${j},100px)`
      argument.style.gridTemplateColumns = `repeat(auto-fill, minmax(100px, 2fr))`
      const lC = argument.lastChild;
      lC.style.width = '200px'
      const lS = lC.previousSibling;
      lS.style.width = '200px'
      lC.style.marginLeft = "100px";
  }
      else if(matrixElems==12){
      i=4
      j=3
      let wymiar = 400/i;
      argument.style.gridTemplateRows = `repeat(3,100px)`;
      argument.style.gridTemplateColumns = `repeat(4,100px)`;

  }

      else if(matrixElems==14){
      i=4
      j=4
      let wymiar = 400/i;
      argument.style.gridTemplateRows = `repeat(${j},100px)`
      argument.style.gridTemplateColumns = `repeat(auto-fill, minmax(100px, 2fr))`
      const lC = argument.lastChild;
      lC.style.width = '200px'
      const lS = lC.previousSibling;
      lS.style.width = '200px'
      lC.style.marginLeft = "100px";
  }
  else if(matrixElems==16){
      i=4
      j=4
      let wymiar = 400/i;
      argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
      argument.style.gridTemplateRows = `repeat(${j},100px)`
  }
  else if(matrixElems == 1) {  
      argument.style.gridTemplateColumns = `400px`
      argument.style.gridTemplateRows = `400px`
  }
  else if(matrixElems == 3) {  
      i=2
      j=2
      let wymiar = 400/i;
      argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
      argument.style.gridTemplateRows = `repeat(${j},100px)`
      const lC = argument.lastChild;
      lC.style.width = '400px'
  }
      else if(matrixElems == 5) {  
      i=2
      j=3
      let wymiar = 400/i;
      argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
      argument.style.gridTemplateRows = `repeat(${j},100px)`
      const lC = argument.lastChild;
      lC.style.width = '400px'
  }
  else if(matrixElems == 7) {  
    i=3
    j=3
    let wymiar = 400/i;
    argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
    argument.style.gridTemplateRows = `repeat(${j},100px)`
    const lC = argument.lastChild;
    lC.style.width = '400px'
}
else if(matrixElems == 9) {  
  i=3
  j=3
  let wymiar = 400/i;
  argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
  argument.style.gridTemplateRows = `repeat(${j},100px)`
  //const lC = argument.lastChild;
  //lC.style.width = '400px'
}
else if(matrixElems == 11) {  
  i=3
  j=4
  let wymiar = 400/i;
  argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
  argument.style.gridTemplateRows = `repeat(${j},100px)`
  //const lC = argument.lastChild;
  //lC.style.width = '400px'
  const lC = argument.lastChild;
  lC.style.width = '200px'
  const lS = lC.previousSibling;
  lS.style.width = '200px'
  lC.style.marginLeft = "67px";
}
else if(matrixElems == 13) {  
  i=4
  j=4
  let wymiar = 400/i;
  argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
  argument.style.gridTemplateRows = `repeat(${j},100px)`
  const lC = argument.lastChild;
  lC.style.width = '400px'
}
else if(matrixElems == 15) {  
  i=4
  j=4
  let wymiar = 400/i;
  argument.style.gridTemplateColumns = `repeat(${i},${wymiar}px)`
  argument.style.gridTemplateRows = `repeat(${j},100px)`
}

}