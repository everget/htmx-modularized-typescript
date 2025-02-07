
  /**
   * Toggles the given class on an element
   *
   * @see https://htmx.org/api/#toggleClass
   *
   * @param {Element|string} elt the element to toggle the class on
   * @param {string} clazz the class to toggle
   */
export function toggleClassOnElement(elt, clazz) {
    elt = resolveTarget(elt)
    elt.classList.toggle(clazz)
  }
