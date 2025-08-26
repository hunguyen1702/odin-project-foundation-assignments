(() => {
  const CHOICES = ['Paper', 'Rock', 'Scissors']
  const WINNING_SCORE = 5
  const resultContainer = document.querySelector("#result")
  const humanScoreElement = document.querySelector("#human-points")
  const computerScoreElement = document.querySelector("#computer-points")
  const humanChoiceElm = document.querySelector("#human-choice")
  const computerChoiceElm = document.querySelector("#computer-choice")
  let humanScore = 0
  let computerScore = 0

  const showResult = (result) => {
    resultContainer.textContent = result
  }

  const showChoice = (target, choice) => {
    if (target === "human") {
      humanChoiceElm.textContent = choice
    } else if (target === "computer") {
      computerChoiceElm.textContent = choice
    }
  }

  const resetGame = () => {
    round = 1
    humanScore = 0
    computerScore = 0
    resetScoreBoard()
  }

  const resetScoreBoard = () => {
    document.querySelectorAll(".points .win").forEach(element => {
      element.classList.remove("win")
    })
  }

  const addScore = (winner) => {
    if (winner == "human") {
      humanScore += 1
      humanScoreElement.children[humanScore - 1].classList.add("win")
    } else if (winner == "computer") {
      computerScore += 1
      computerScoreElement.children[computerScore - 1].classList.add("win")
    }
  }

  const playRound = (humanChoice) => {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)]
    showChoice("human", humanChoice)
    showChoice("computer", computerChoice)

    if (humanChoice === computerChoice) {
      showResult("Tie!")
    }

    const humanChoiceIndex = CHOICES.findIndex(choice => choice === humanChoice)
    const computerChoiceIndex = CHOICES.findIndex(choice => choice === computerChoice)

    if (humanChoiceIndex === 0 && computerChoiceIndex === 2) {
      addScore("computer")
      showResult("You lose!")
    } else if (humanChoiceIndex === 2 && computerChoiceIndex === 0) {
      addScore("human")
      showResult("You win!")
    } else if (humanChoiceIndex < computerChoiceIndex) {
      addScore("human")
      showResult("You win!")
    } else {
      addScore("computer")
      showResult("You lose!")
    }

    if (humanScore === WINNING_SCORE) {
      showResult("You win the game!")
      resetGame()
      return
    } else if (computerScore === WINNING_SCORE) {
      showResult("You lose the game!")
      resetGame()
      return
    }
  }

  document.querySelector("#rock").addEventListener("click", () => {
    playRound("Rock")
  })
  document.querySelector("#paper").addEventListener("click", () => {
    playRound("Paper")
  })
  document.querySelector("#scissors").addEventListener("click", () => {
    playRound("Scissors")
  })
})()
