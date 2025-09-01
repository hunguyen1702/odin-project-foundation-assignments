(() => {
  let currentIndex = -1
  let displayOperation = []
  let operation = []
  let lastResult = null
  const numberButtons = document.querySelectorAll(".buttons-row .number")
  const operatorButtons = document.querySelectorAll(".buttons-row .operator")
  const resetButton = document.querySelector("#reset")
  const equalButton = document.querySelector("#equal")
  const switchSignButton = document.querySelector("#switch-sign")
  const percentageButton = document.querySelector("#percentage")
  const OPERATORS = {
    "add": "+",
    "subtract": "-",
    "multiply": "*",
    "divide": "/"
  }
  const DISPLAY_OPERATORS = {
    "add": "+",
    "subtract": "-",
    "multiply": "x",
    "divide": "÷"
  }
  const NUMBER_REGEX = /[0-9.,]*/
  const resultDisplay = document.querySelector("#result")
  const operationDisplay = document.querySelector("#operation")

  const isOperatorCurrent = () => {
    const value = operation[currentIndex]
    return value === "+" || value === "-" || value === "*" || value === "/"
  }

  const reset = () => {
    currentIndex = -1
    operation = []
    displayOperation = []
    resultDisplay.value = ""
    operationDisplay.value = ""
    lastResult = null
  }

  numberButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault()

      if (lastResult !== null) {
        reset()
      }

      const value = e.target.textContent
      if (operation[currentIndex] && operation[currentIndex].includes("-") && !isOperatorCurrent()) {
        return
      }
      if ((currentIndex === -1 || isOperatorCurrent()) && value === ".") {
        operation.push("0.")
        displayOperation.push("0.")
        currentIndex += 1
        resultDisplay.value = displayOperation.join(" ")
        return
      }
      if (currentIndex === -1 || isOperatorCurrent()) {
        currentIndex += 1
        operation.push(value)
        displayOperation.push(value)
      } else if (NUMBER_REGEX.test(operation[currentIndex])) {
        if (operation[currentIndex].includes(".") && value === ".") {
          return
        }
        if (operation[currentIndex] === "0") {
          if (value === 0) {
            return
          } else if (value !== ".") {
            operation[currentIndex] = value
            displayOperation[currentIndex] = value
            return
          }
        }
        operation[currentIndex] += value
        displayOperation[currentIndex] += value
      }
      resultDisplay.value = displayOperation.join(" ")
    })
  })

  operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault()

      if (lastResult !== null) {
        const cacheResult = lastResult
        reset()
        operation.push(cacheResult)
        displayOperation.push(cacheResult)
        currentIndex += 1
        resultDisplay.value = displayOperation.join(" ")
      }

      const operator = e.target.id
      if (currentIndex === -1 || isOperatorCurrent()) {
        return
      } else if (NUMBER_REGEX.test(operation[currentIndex])) {
        currentIndex += 1
        operation.push(OPERATORS[operator])
        displayOperation.push(DISPLAY_OPERATORS[operator])
      }
      resultDisplay.value = displayOperation.join(" ")
    })
  })

  equalButton.addEventListener("click", () => {
    if (currentIndex === -1) {
      return
    }
    if (isOperatorCurrent()) {
      return
    }
    if (operation[currentIndex] === ".") {
      return
    }
    operation.forEach(value => {
      if (value === "+" || value === "-" || value === "*" || value === "/") {
        return
      }
      if (NUMBER_REGEX.test(value)) {
        return
      }
      throw new Error("Malformed expression")
    })

    const result = Math.round(eval(operation.join("")) * 10**12) / 10**12
    resultDisplay.value = eval(result)
    operationDisplay.value = displayOperation.join(" ")
    lastResult = result
  })

  switchSignButton.addEventListener("click", e => {
    e.preventDefault()

    if (lastResult !== null) {
      const cacheResult = lastResult * -1
      reset()
      operation.push(cacheResult)
      displayOperation.push(cacheResult)
      resultDisplay.value = displayOperation.join(" ")
      currentIndex += 1
      return
    }

    if (currentIndex === -1 || isOperatorCurrent()) {
      return
    }
    operation[currentIndex] = (operation[currentIndex] * -1).toString()
    displayOperation[currentIndex] = (displayOperation[currentIndex] * -1).toString()
    resultDisplay.value = displayOperation.join(" ")
  })

  percentageButton.addEventListener("click", e => {
    e.preventDefault()

    if (lastResult !== null) {
      const cacheResult = lastResult * 0.01
      reset()
      operation.push(cacheResult)
      displayOperation.push(cacheResult)
      resultDisplay.value = displayOperation.join(" ")
      currentIndex += 1
      return
    }

    if (currentIndex === -1 || isOperatorCurrent()) {
      return
    }

    operation[currentIndex] = (operation[currentIndex] * 0.01).toString()
    displayOperation[currentIndex] = (displayOperation[currentIndex] * 0.01).toString()
    resultDisplay.value = displayOperation.join(" ")
  })

  resetButton.addEventListener("click", reset)
})()
