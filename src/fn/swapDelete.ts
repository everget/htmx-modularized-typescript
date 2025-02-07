
  /**
   * @param {Node} target
   */
export function swapDelete(target) {
    cleanUpElement(target)
    const parent = parentElt(target)
    if (parent) {
      return parent.removeChild(target)
    }
  }
