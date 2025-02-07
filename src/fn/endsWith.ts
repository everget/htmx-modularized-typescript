
  /**
   * @param {string} str
   * @param {string} suffix
   * @returns {boolean}
   */
export function endsWith(str, suffix) {
    return str.substring(str.length - suffix.length) === suffix
  }