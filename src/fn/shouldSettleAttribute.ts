
  /**
   * @param {string} name
   * @returns {boolean}
   */
export function shouldSettleAttribute(name) {
    const attributesToSettle = htmx.config.attributesToSettle
    for (let i = 0; i < attributesToSettle.length; i++) {
      if (name === attributesToSettle[i]) {
        return true
      }
    }
    return false
  }
