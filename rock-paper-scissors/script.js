(() => {
  const CHOICES = ['rock', 'paper', 'scissors']
  const ROUNDS = 5

  const playRound = () => {
    const humanChoice = prompt('Choose Rock, Paper, or Scissors:').toLowerCase()
    if (!CHOICES.includes(humanChoice)) {
      return null
    }

    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)]
    if (humanChoice === computerChoice) {
      alert('Tie!')
      return 0
    }

    const humanChoiceIndex = CHOICES.findIndex(choice => choice === humanChoice)
    const computerChoiceIndex = CHOICES.findIndex(choice => choice === computerChoice)

    if (humanChoiceIndex < computerChoiceIndex) {
      alert('You win!')
      return 1
    } else {
      alert('You lose!')
      return -1
    }
  }

  const playGame = () => {
    let humanScore = 0
    let computerScore = 0

    for (i = 1; i <= ROUNDS; i++) {
      console.log(`Round ${i} starts!`)
      let result = playRound()
      while (result === null) {
        console.log('You have to choose between Rock, Paper, or Scissors!')
        result = playRound()
      }

      if (result > 0) {
        humanScore += result
      } else {
        computerScore -= result
      }
      console.log(`Round ${i} ends!`)
    }

    if (humanScore > computerScore) {
      alert('You win the game!')
    }
    if (humanScore < computerScore) {
      alert('You lose the game!')
    }
  }

  playGame()
})()
