
  /**
   * @param {Element} elt
   * @returns {string}
   */
export function cleanInnerHtmlForHistory(elt) {
    const className = htmx.config.requestClass
    const clone = /** @type Element */ (elt.cloneNode(true))
    forEach(findAll(clone, '.' + className), function(child) {
      removeClassFromElement(child, className)
    })
    // remove the disabled attribute for any element disabled due to an htmx request
    forEach(findAll(clone, '[data-disabled-by-htmx]'), function(child) {
      child.removeAttribute('disabled')
    })
    return clone.innerHTML
  }