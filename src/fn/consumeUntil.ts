
  /**
   * @param {string[]} tokens
   * @param {RegExp} match
   * @returns {string}
   */
export function consumeUntil(tokens, match) {
    let result = ''
    while (tokens.length > 0 && !match.test(tokens[0])) {
      result += tokens.shift()
    }
    return result
  }