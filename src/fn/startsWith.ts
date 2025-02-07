
  /**
   * @param {string} str
   * @param {string} prefix
   * @returns {boolean}
   */
export function startsWith(str, prefix) {
    return str.substring(0, prefix.length) === prefix
  }