
  /**
   * @param {Event} evt
   * @param {Node} node
   * @returns {boolean}
   */
export function shouldCancel(evt, node) {
    const elt = asElement(node)
    if (!elt) {
      return false
    }
    if (evt.type === 'submit' || evt.type === 'click') {
      if (elt.tagName === 'FORM') {
        return true
      }
      if (matches(elt, 'input[type="submit"], button') && closest(elt, 'form') !== null) {
        return true
      }
      if (elt instanceof HTMLAnchorElement && elt.href &&
        (elt.getAttribute('href') === '#' || elt.getAttribute('href').indexOf('#') !== 0)) {
        return true
      }
    }
    return false
  }