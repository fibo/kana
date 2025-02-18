import { kana } from './kana.js'

function html(strings, ...expressions) {
  const template = document.createElement('template')
  template.innerHTML = strings.reduce(
    (result, string, index) => result + string + (expressions[index] ?? ''), ''
  )
  return template
}

// Use Fisher–Yates shuffle algorithm.
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffleArray(arr) {
  let i = arr.length
  let shuffled = arr.slice(0)
  let swap, index
  while (i--) {
    index = Math.floor((i + 1) * Math.random())
    swap = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = swap
  }
  return shuffled
}

/**
 * Display a mora
 * @example
 * <mora-char index="42" display="hiragana"></mora-char>
 */
export class MoraChar extends HTMLElement {
  static localName = 'mora-char'
  static get observedAttributes() { return ['index', 'display'] }
  textNode = document.createTextNode('')
  constructor() {
    super()
    this.appendChild(this.textNode)
  }
  attributeChangedCallback(name, _old, value) {
    if (name == 'display') this.display = value
    if (name == 'index') this.index = value
    this.textNode.textContent = kana[this.index]?.[this.display] ?? ''
  }
}

class BasicChars extends HTMLElement {
  static get observedAttributes() { return ['display'] }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = html`
      <style>
        .container {
          display: inline-grid;
          grid-template-columns: repeat(6, 1fr);
        }
        .cell {
          text-align: center;
          line-height: 1.4;
          padding: .2em .4em;
        }
        .cell--neutral {
          background: var(--color-neutral-1);
        }
        .cell--start-2 { grid-column-start: 2; }
        .cell--start-4 { grid-column-start: 4; }
        .cell--start-5 { grid-column-start: 5; }
        .cell--start-6 { grid-column-start: 6; }
        .cell--span { grid-column-start: 1; grid-column-end: 7; }
      </style>
      <div class="container">
        <div class="cell cell--neutral cell--start-2">a</div>
        <div class="cell cell--neutral">i</div>
        <div class="cell cell--neutral">u</div>
        <div class="cell cell--neutral">e</div>
        <div class="cell cell--neutral">o</div>

        <div class="cell cell--start-2"><mora-char index="0"></mora-char></div>
        <div class="cell"><mora-char index="1"></mora-char></div>
        <div class="cell"><mora-char index="2"></mora-char></div>
        <div class="cell"><mora-char index="3"></mora-char></div>
        <div class="cell"><mora-char index="4"></mora-char></div>

        <div class="cell cell--neutral">k</div>
        <div class="cell"><mora-char index="5"></mora-char></div>
        <div class="cell"><mora-char index="6"></mora-char></div>
        <div class="cell"><mora-char index="7"></mora-char></div>
        <div class="cell"><mora-char index="8"></mora-char></div>
        <div class="cell"><mora-char index="9"></mora-char></div>

        <div class="cell cell--neutral">s</div>
        <div class="cell"><mora-char index="10"></mora-char></div>
        <div class="cell"><mora-char index="11"></mora-char></div>
        <div class="cell"><mora-char index="12"></mora-char></div>
        <div class="cell"><mora-char index="13"></mora-char></div>
        <div class="cell"><mora-char index="14"></mora-char></div>

        <div class="cell cell--neutral">t</div>
        <div class="cell"><mora-char index="15"></mora-char></div>
        <div class="cell"><mora-char index="16"></mora-char></div>
        <div class="cell"><mora-char index="17"></mora-char></div>
        <div class="cell"><mora-char index="18"></mora-char></div>
        <div class="cell"><mora-char index="19"></mora-char></div>

        <div class="cell cell--neutral">n</div>
        <div class="cell"><mora-char index="20"></mora-char></div>
        <div class="cell"><mora-char index="21"></mora-char></div>
        <div class="cell"><mora-char index="22"></mora-char></div>
        <div class="cell"><mora-char index="23"></mora-char></div>
        <div class="cell"><mora-char index="24"></mora-char></div>

        <div class="cell cell--neutral">h</div>
        <div class="cell"><mora-char index="25"></mora-char></div>
        <div class="cell"><mora-char index="26"></mora-char></div>
        <div class="cell"><mora-char index="27"></mora-char></div>
        <div class="cell"><mora-char index="28"></mora-char></div>
        <div class="cell"><mora-char index="29"></mora-char></div>

        <div class="cell cell--neutral">m</div>
        <div class="cell"><mora-char index="30"></mora-char></div>
        <div class="cell"><mora-char index="31"></mora-char></div>
        <div class="cell"><mora-char index="32"></mora-char></div>
        <div class="cell"><mora-char index="33"></mora-char></div>
        <div class="cell"><mora-char index="34"></mora-char></div>

        <div class="cell cell--neutral">y</div>
        <div class="cell"><mora-char index="35"></mora-char></div>
        <div class="cell cell--start-4"><mora-char index="36"></mora-char></div>
        <div class="cell cell--start-6"><mora-char index="37"></mora-char></div>

        <div class="cell cell--neutral">r</div>
        <div class="cell"><mora-char index="38"></mora-char></div>
        <div class="cell"><mora-char index="39"></mora-char></div>
        <div class="cell"><mora-char index="40"></mora-char></div>
        <div class="cell"><mora-char index="41"></mora-char></div>
        <div class="cell"><mora-char index="42"></mora-char></div>

        <div class="cell cell--neutral">w</div>
        <div class="cell"><mora-char index="43"></mora-char></div>
        <div class="cell"><mora-char index="44"></mora-char></div>
        <div class="cell cell--start-5"><mora-char index="45"></mora-char></div>
        <div class="cell"><mora-char index="46"></mora-char></div>

        <div class="cell cell--span"><mora-char index="47"></mora-char>&nbsp;(n)</div>
      </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  attributeChangedCallback(name, _old, value) {
    if (name == 'display')
      for (const element of this.shadowRoot.querySelectorAll('mora-char'))
        element.setAttribute('display', value)
  }
}

class MemoryGame extends HTMLElement {
  static numCols = 2
  static get observedAttributes() { return ['rows'] }
  static cssClass = {
    cell: 'cell',
    cellMatched: 'cell--matched',
    cellSelected: 'cell--selected',
    container: 'container',
  }
  numMatches = 0
  cells = new Map()
  cellIndexes = new Map()
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const { cssClass } = MemoryGame
    const template = html`
      <style>
        .${cssClass.container} {
          display: inline-grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--size-1);
          background: var(--color-neutral-1);
        }
        .${cssClass.cell} {
          width: var(--size-2);
          height: var(--size-2);
          background: var(--color-white);
          border: 1px solid transparent;
          user-select: none;
          display: grid;
          place-content: center;
          transition: all 150ms;
        }
        .${cssClass.cellSelected} {
          border-color: var(--color-accent);
        }
        .${cssClass.cellMatched} {
          background-color: var(--color-neutral-2);
          border-color: var(--color-neutral-2);
        }
      </style>
      <div class="${cssClass.container}"></div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.querySelector(`.${cssClass.container}`)
  }
  attributeChangedCallback(name, _, value) {
    if (name == 'rows') {
      const numRows = this.numRows = Number(value)
      const { numCols } = MemoryGame
      // Remove previous cells and create new ones.
      this.removeCells()
      for (let row = 0; row < numRows; row++)
        for (let col = 0; col < numCols; col++)
          this.createCell(row, col)
      // Populate content.
      this.generateCellsContent()
    }
  }
  connectedCallback() {
    this.container.addEventListener('click', this)
  }
  handleEvent(event) {
    if (event.type == 'click') {
      const { cssClass } = MemoryGame
      const { target } = event
      // If all cells are matched, restart game.
      if (this.numMatches == this.numRows)
        return this.restart()
      // Ignore container.
      if (target === this.container) return
      // Search for the cell, starting from the event target.
      let cell = target
      while (!cell.classList.contains(cssClass.cell))
        cell = cell.parentElement
      // Ignore matched cells.
      if (cell.classList.contains(cssClass.matchCells)) return
      event.stopPropagation()
      const { row, col } = cell.dataset
      const { selectedCol, selectedRow, selectedIndex } = this
      const index = this.cellIndexes.get(this.cellKey(row, col))
      if (selectedRow && selectedCol) {
        if (col == selectedCol) {
          if (row == selectedRow) {
            // Clicking on selected cell, deselect it.
            this.deselectCell(selectedRow, selectedCol)
          } else {
            // Change previous selection.
            this.deselectCell(selectedRow, selectedCol)
            this.selectCell(row, col)
          }
        } else {
          // There could be a match.
          if (index == selectedIndex) {
            this.matchCells(row, col, selectedRow, selectedCol)
            this.numMatches++
          } else {
            // No match
          }
        }
        return
      } else {
        // No previous selection, just select cell.
        this.selectCell(row, col)
      }
    }
  }
  addPair(row1, row2, moraIndex) {
    const key1 = this.cellKey(row1, 0)
    const key2 = this.cellKey(row2, 1)
    const cell1 = this.cells.get(key1)
    const cell2 = this.cells.get(key2)
    this.cellIndexes.set(key1, moraIndex)
    this.cellIndexes.set(key2, moraIndex)
    cell1.innerHTML = `<mora-char display="hiragana" index="${moraIndex}"></mora-char>`
    cell2.innerHTML = `<mora-char display="latin" index="${moraIndex}"></mora-char>`
  }
  cellKey(row, col) {
    return `${row}-${col}`
  }
  createCell(row, col) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    this.cells.set(this.cellKey(row, col), cell)
    cell.dataset.row = row
    cell.dataset.col = col
    this.container.appendChild(cell)
  }
  restart() {
    this.numMatches = 0
    this.selectedRow = undefined
    this.selectedCol = undefined
    this.selectedIndex = undefined
    this.clearCells()
    this.generateCellsContent()
  }
  selectCell(row, col) {
    const { cssClass } = MemoryGame
    const key = this.cellKey(row, col)
    const cell = this.cells.get(key)
    cell.classList.add(cssClass.cellSelected)
    this.selectedRow = row
    this.selectedCol = col
    this.selectedIndex = this.cellIndexes.get(key)
  }
  clearCells() {
    const { cssClass, numCols } = MemoryGame
    const { numRows } = this
    for (let row = 0; row < numRows; row++)
      for (let col = 0; col < numCols; col++) {
        const cell = this.cells.get(this.cellKey(row, col))
        cell.classList.remove(cssClass.cellMatched)
        cell.classList.remove(cssClass.cellSelected)
      }
  }
  deselectCell(row, col) {
    const { cssClass } = MemoryGame
    const cell = this.cells.get(this.cellKey(row, col))
    cell.classList.remove(cssClass.cellSelected)
    this.selectedRow = undefined
    this.selectedCol = undefined
    this.selectedIndex = undefined
  }
  generateCellsContent() {
    const { numRows } = this
    const kanaIndexes = Array.from(Array(kana.length).keys())
    const firstCol = Array.from(Array(numRows).keys())
    const secondCol = shuffleArray(firstCol)
    const moraIndex = shuffleArray(kanaIndexes).slice(0, firstCol.length)
    for (let row = 0; row < numRows; row++)
      this.addPair(firstCol[row], secondCol[row], moraIndex[row])
  }
  matchCells(row1, col1, row2, col2) {
    const { cssClass } = MemoryGame
    this.deselectCell(row1, col1)
    this.deselectCell(row2, col2)
    const cell1 = this.cells.get(this.cellKey(row1, col1))
    const cell2 = this.cells.get(this.cellKey(row2, col2))
    cell1.classList.add(cssClass.cellMatched)
    cell2.classList.add(cssClass.cellMatched)
  }
  removeCells() {
    this.cells.clear()
    this.cellIndexes.clear()
    const { container } = this
    while (container.firstChild)
      container.removeChild(container.lastChild)
  }
}

addEventListener('load', () => {
  customElements.define('basic-chars', BasicChars)
  customElements.define('memory-game', MemoryGame)
  customElements.define('mora-char', MoraChar)
})

