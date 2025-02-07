
  /**
   * @param {string} str
   * @returns {string[]}
   */
export function tokenizeString(str) {
    /** @type string[] */
    const tokens = []
    let position = 0
    while (position < str.length) {
      if (SYMBOL_START.exec(str.charAt(position))) {
        var startPosition = position
        while (SYMBOL_CONT.exec(str.charAt(position + 1))) {
          position++
        }
        tokens.push(str.substr(startPosition, position - startPosition + 1))
      } else if (STRINGISH_START.indexOf(str.charAt(position)) !== -1) {
        const startChar = str.charAt(position)
        var startPosition = position
        position++
        while (position < str.length && str.charAt(position) !== startChar) {
          if (str.charAt(position) === '\\') {
            position++
          }
          position++
        }
        tokens.push(str.substr(startPosition, position - startPosition + 1))
      } else {
        const symbol = str.charAt(position)
        tokens.push(symbol)
      }
      position++
    }
    return tokens
  }