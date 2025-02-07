
  /**
   * @param {any} o
   * @param {string} type
   * @returns
   */
export function isType(o, type) {
    return Object.prototype.toString.call(o) === '[object ' + type + ']'
  }