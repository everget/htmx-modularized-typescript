
  /**
   * @param {string} str
   * @returns {any}
   */
export function internalEval(str) {
    return maybeEval(getDocument().body, function() {
      return eval(str)
    })
  }
