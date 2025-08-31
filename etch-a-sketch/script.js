(() => {
  const DEFAULT_GRID_SIZE = 16
  const DEFAULT_PALETTE_COLORS = [
    "#165591",
    "#b92502",
    "#ebaa02",
    "#cf204e",
    "#322782",
    "#e16458"
  ]
  const HEX_REGEX = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  const RGB_REGEX = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/

  const sketchBoardContainer = document.querySelector(".sketch-board-container")
  const gridSizeInput = document.querySelector("#grid-size-input")
  const currentColorElement = document.querySelector("#picking-color")
  const defaultPaletteElement = document.querySelector(".default-palette")
  const customPaletteElement = document.querySelector("#custom-palette-input")
  const resetButton = document.querySelector("#reset-button")

  let gridSize = DEFAULT_GRID_SIZE
  let currentColor = DEFAULT_PALETTE_COLORS[0]
  let coloring = false

  const showCurrentColor = () => {
    currentColorElement.style.backgroundColor = currentColor
  }

  const getCurrentColorRbg = () => {
    let match = HEX_REGEX.exec(currentColor)
    if (match) {
      return [match[1], match[2], match[3]]
    }
    match = RGB_REGEX.exec(currentColor)
    if (match) {
      return [match[1], match[2], match[3]]
    }
  }

  const showDefaultPalette = () => {
    DEFAULT_PALETTE_COLORS.forEach(color => {
      const colorElement = document.createElement("div")
      colorElement.classList.add("color")
      colorElement.classList.add("picker-hover")
      colorElement.style.backgroundColor = color
      defaultPaletteElement.appendChild(colorElement)
    })
  }

  const addDefaultPaletteEventListener = () => {
    defaultPaletteElement.querySelectorAll(".color").forEach(colorElement => {
      colorElement.addEventListener("click", () => {
        currentColor = colorElement.style.backgroundColor
        showCurrentColor()
      })
    })
  }

  const resetSketchBoard = () => {
    sketchBoardContainer.innerHTML = ""
  }

  const colorGrid = (grid) => {
    const currentColorRbg = getCurrentColorRbg()
    const gridColorRbgMatch = RGB_REGEX.exec(grid.style.backgroundColor)
    if (gridColorRbgMatch && currentColorRbg) {
      const [gridR, gridG, gridB] = gridColorRbgMatch.slice(1)
      if (gridR === "255" && gridG === "255" && gridB === "255") {
        grid.style.backgroundColor = currentColor
        return
      }
      let newR = Number(gridR) - (Number(currentColorRbg[0]) / 6)
      let newB = Number(gridB) - (Number(currentColorRbg[1]) / 6)
      let newG = Number(gridG) - (Number(currentColorRbg[2]) / 6)
      newR = newR < (Number(currentColorRbg[0]) / 6) ? gridR : newR
      newB = newB < (Number(currentColorRbg[1]) / 6) ? gridB : newB
      newG = newG < (Number(currentColorRbg[2]) / 6) ? gridG : newG
      grid.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`
    }
  }

  const assignGridEventListener = (grid) => {
    const HOLD_TIME_TO_DARKER = 500
    let mouseHoldTimeInterval
    grid.addEventListener("mousedown", () => {
      coloring = true
      colorGrid(grid)
      mouseHoldTimeInterval = setInterval(() => colorGrid(grid), HOLD_TIME_TO_DARKER)
    })
    grid.addEventListener("mouseup", () => {
      coloring = false
      clearTimeout(mouseHoldTimeInterval)
    })
    grid.addEventListener("mouseenter", () => {
      if (coloring) {
        colorGrid(grid)
        mouseHoldTimeInterval = setInterval(() => colorGrid(grid), HOLD_TIME_TO_DARKER)
      }
    })
    grid.addEventListener("mouseleave", () => {
      clearTimeout(mouseHoldTimeInterval)
    })
  }

  const generateGrid = () => {
    resetSketchBoard()
    const screenHeight = window.innerHeight
    const sketchBoardSize = screenHeight * 0.78
    sketchBoardContainer.style.height = `${sketchBoardSize}px`
    sketchBoardContainer.style.width = `${sketchBoardSize}px`

    for (i = 0; i < gridSize; i++) {
      const row = document.createElement("div")
      row.classList.add("row")
      for (j = 0; j < gridSize; j++) {
        const grid = document.createElement("div")
        grid.classList.add("grid")
        grid.style.backgroundColor = "#ffffff"
        assignGridEventListener(grid)
        row.appendChild(grid)
      }
      sketchBoardContainer.appendChild(row)
    }
  }

  addEventListener("resize", () => {
    generateGrid()
  })

  gridSizeInput.addEventListener("input", (e) => {
    e.preventDefault()
    gridSize = e.target.value
    generateGrid()
  })

  customPaletteElement.addEventListener("input", (e) => {
    e.preventDefault()
    currentColor = e.target.value
    showCurrentColor()
  })

  resetButton.addEventListener("click", () => {
    resetSketchBoard()
    generateGrid()
  })

  generateGrid()
  showCurrentColor()
  showDefaultPalette()
  addDefaultPaletteEventListener()
})();
