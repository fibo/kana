import { kana } from './kana.js'

/**
 * Display a mora
 * @example
 * <mora-char index="42" display="hiragana"></mora-char>
 */
export class MoraChar extends HTMLElement {
  static get observedAttributes() {
    return ['index', 'display']
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML = '<slot></slot>'
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  attributeChangedCallback(name, _old, value) {
    if (name == 'display') this.display = value
    if (name == 'index') this.index = value
    this.textContent = kana[this.index]?.[this.display] ?? ''
  }
}

addEventListener('load', () => {
  customElements.define('mora-char', MoraChar)
})
