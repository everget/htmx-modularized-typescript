
  /**
   * @param {DocumentFragment} fragment
   * @param {Node} elt
   */
export function takeChildrenFor(fragment, elt) {
    while (elt.childNodes.length > 0) {
      fragment.append(elt.childNodes[0])
    }
  }