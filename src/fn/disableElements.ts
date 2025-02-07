
  /**
   * @param {Element} elt
   * @returns {Element[]}
   */
export function disableElements(elt) {
    let disabledElts = /** @type Element[] */ (findAttributeTargets(elt, 'hx-disabled-elt'))
    if (disabledElts == null) {
      disabledElts = []
    }
    forEach(disabledElts, function(disabledElement) {
      const internalData = getInternalData(disabledElement)
      internalData.requestCount = (internalData.requestCount || 0) + 1
      disabledElement.setAttribute('disabled', '')
      disabledElement.setAttribute('data-disabled-by-htmx', '')
    })
    return disabledElts
  }