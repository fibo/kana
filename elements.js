import { kana } from './kana.js'

function html(strings, ...expressions) {
  const template = document.createElement('template')
  template.innerHTML = strings.reduce(
    (result, string, index) => result + string + (expressions[index] ?? ''), ''
  )
  return template
}

/**
 * Display a mora
 * @example
 * <mora-char index="42" display="hiragana"></mora-char>
 */
export class MoraChar extends HTMLElement {
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
          background: var(--color-neutral);
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
  selectedRow
  selectedCol
  cellSelectedCssClass = 'cell--selected'
  cells = new Map()
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = html`
      <style>
        .container {
          display: inline-grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--size-1);
          background: var(--color-neutral);
        }
        .cell {
          width: var(--size-2);
          height: var(--size-2);
          background: var(--color-white);
          border: 1px solid transparent;
        }
        .cell--selected {
          border-color: var(--color-accent);
        }
      </style>
      <div class="container">
      </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.querySelector('.container')
    const numCols = 2
    const numRows = 6
    for (let row = 0; row < numRows; row++)
      for (let col = 0; col < numCols; col++)
        this.createCell(row, col)
  }
  connectedCallback() {
    this.container.addEventListener('click', this)
  }
  handleEvent(event) {
    if (event.type == 'click') {
      event.stopPropagation()
      const { target } = event
      if (target === this.container) return
      const { row, col } = target.dataset
      const { selectedCol, selectedRow } = this
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
        }
        return
      } else {
        // No previous selection, just select cell.
        this.selectCell(row, col)
      }
      // event.target.classList.toggle
    }
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
  selectCell(row, col) {
    const cell = this.cells.get(this.cellKey(row, col))
    cell.classList.add(this.cellSelectedCssClass)
    this.selectedRow = row
    this.selectedCol = col
  }
  deselectCell(row, col) {
    const cell = this.cells.get(this.cellKey(row, col))
    cell.classList.remove(this.cellSelectedCssClass)
    this.selectedRow = undefined
    this.selectedCol = undefined
  }
}

addEventListener('load', () => {
  customElements.define('basic-chars', BasicChars)
  customElements.define('memory-game', MemoryGame)
  customElements.define('mora-char', MoraChar)
})

