(() => {
  class Game {
    static MAX_MOVE_COUNT = 9

    constructor(player1Name = "Player 1", player2Name = "Player 2") {
      this.player1Name = player1Name
      this.player2Name = player2Name
      this.playerSymbols = {
        x: player1Name,
        o: player2Name
      }
      this.board = new Board()
      this._currentTurn = "x"
      this.moveCount = 0
    }

    get currentPlayerName() {
      return this.playerSymbols[this._currentTurn]
    }

    get currentTurn() {
      return this._currentTurn
    }

    get winnerMove() {
      return this.board.winnerMove
    }

    switchTurn() {
      this._currentTurn = this._currentTurn === "x" ? "o" : "x"
    }

    playerMove(row, col) {
      this.board.move(this._currentTurn, row, col)
      this.moveCount += 1
      if (this.board.checkWin(this._currentTurn)) {
        return this.currentPlayerName
      }
      if (this.moveCount === Game.MAX_MOVE_COUNT) {
        return "draw"
      }

      this.switchTurn()
      return null
    }

    reset() {
      this.board.clearBoard()
      this.board.winnerMove = undefined
      this.moveCount = 0
    }
  }

  class Board {
    constructor() {
      this.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]
    }

    move(symbol, row, col) {
      if (this.board[row][col] !== null)
        return false

      this.board[row][col] = symbol
      return true
    }

    set winnerMove(winnerMove) {
      this._winnerMove = winnerMove
    }

    get winnerMove() {
      return this._winnerMove
    }

    checkWin(symbol) {
      let gameBoard = this.board
      for (let i = 0; i <= 2; i++) {
        if (gameBoard[i][0] === symbol && gameBoard[i][1] === symbol && gameBoard[i][2] === symbol) {
          this.winnerMove = [[i, 0], [i, 1], [i, 2]]
          return true
        }

        if (gameBoard[0][i] === symbol && gameBoard[1][i] === symbol && gameBoard[2][i] === symbol) {
          this.winnerMove = [[0, i], [1, i], [2, i]]
          return true
        }
      }

      if (gameBoard[0][0] === symbol && gameBoard[1][1] === symbol && gameBoard[2][2] === symbol) {
        this.winnerMove = [[0, 0], [1, 1], [2, 2]]
        return true
      }
      if (gameBoard[0][2] === symbol && gameBoard[1][1] === symbol && gameBoard[2][0] === symbol) {
        this.winnerMove = [[0, 2], [1, 1], [2, 0]]
        return true
      }

      return false
    }

    clearBoard() {
      this.board = new Array(3).fill(null).map(() => new Array(3).fill(null))
    }
  }

  const createGameController = (player1Name, player2Name) => {
    let gameStarted = false
    let gameEnd = false
    let game = new Game(player1Name, player2Name)
    let _winner

    const playMove = (row, col) => {
      if (!gameStarted) return
      if (gameEnd) return

      const result = game.playerMove(row, col)
      if (result) {
        _winner = result
        gameEnd = true
      }

      return true
    }

    const resetGame = (player1Name, player2Name) => {
      game = new Game(player1Name, player2Name)
      gameEnd = false
      gameStarted = true
      _winner = undefined
    }

    const currentPlayerName = () => game.currentPlayerName
    const currentTurn = () => game.currentTurn
    const winnerMove = () => game.winnerMove
    const winner = () => _winner

    return { playMove, resetGame, currentPlayerName, currentTurn, winnerMove, winner };
  }

  const createUIController = () => {
    const boardContainer = document.querySelector(".container")
    const player1NameInput = document.querySelector("#player1-name")
    const player2NameInput = document.querySelector("#player2-name")
    const gameController = createGameController(player1NameInput.value, player2NameInput.value)
    const startButton = document.querySelector("button")
    const result = document.querySelector(".result")

    const renderGame = () => {
      renderBoard()
      startButton.addEventListener("click", renderBoard)
    }

    const renderBoard = () => {
      result.textContent = ""
      boardContainer.innerHTML = ""
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const square = document.createElement("div")
          square.classList.add("square")
          square.dataset.row = row
          square.dataset.col = col
          square.addEventListener("click", e => renderMove(e.target))
          boardContainer.appendChild(square)
        }
      }
      gameController.resetGame(player1NameInput.value, player2NameInput.value)
    }

    const renderMove = (elm) => {
      const currentTurn = gameController.currentTurn()
      const result = gameController.playMove(Number(elm.dataset.row), Number(elm.dataset.col))
      if (result) elm.textContent = currentTurn
      renderWinner()
    }

    const renderWinner = () => {
      const winnerMove = gameController.winnerMove()
      if (winnerMove && winnerMove.length) {
        winnerMove.forEach(move => {
          const square = document.querySelector(`.square[data-row="${move[0]}"][data-col="${move[1]}"]`)
          square.classList.add("winner-move")
        })
      }
      if (gameController.winner() === "draw") {
        result.textContent = "Draw!!!"
      } else if (gameController.winner()) {
        result.textContent = `The winner is ${gameController.winner()}`
      } else {
        result.textContent = ""
      }
    }

    return { renderGame }
  }

  const uiController = createUIController()
  uiController.renderGame();
})()
