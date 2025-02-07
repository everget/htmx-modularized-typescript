
  /**
   * Removes an element from the DOM
   *
   * @see https://htmx.org/api/#remove
   *
   * @param {Node} elt
   * @param {number} [delay]
   */
export function removeElement(elt, delay) {
    elt = resolveTarget(elt)
    if (delay) {
      getWindow().setTimeout(function() {
        removeElement(elt)
        elt = null
      }, delay)
    } else {
      parentElt(elt).removeChild(elt)
    }
  }