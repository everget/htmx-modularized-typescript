
  /**
   * Takes the given class from its siblings, so that among its siblings, only the given element will have the class.
   *
   * @see https://htmx.org/api/#takeClass
   *
   * @param {Node|string} elt the element that will take the class
   * @param {string} clazz the class to take
   */
export function takeClassForElement(elt, clazz) {
    elt = resolveTarget(elt)
    forEach(elt.parentElement.children, function(child) {
      removeClassFromElement(child, clazz)
    })
    addClassToElement(asElement(elt), clazz)
  }
