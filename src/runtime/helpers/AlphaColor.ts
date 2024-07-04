export default class AlphaColor {
  color: string
  opacity: number

  constructor(color: string) {
    this.color = color
    this.opacity = 1
  }

  parseAlphaColor() {
    const match = this.color.match(/rgba?\(([^)]+)\)/)
    if (match) {
      const [r, g, b, a] = match[1].split(',').map(Number)
      this.color = `rgb(${r}, ${g}, ${b})`
      this.opacity = a !== undefined ? a : 1
    }
    return this
  }
}
