
  /**
   * @param {Element[]} indicators
   * @param {Element[]} disabled
   */
export function removeRequestIndicators(indicators, disabled) {
    forEach(indicators.concat(disabled), function(ele) {
      const internalData = getInternalData(ele)
      internalData.requestCount = (internalData.requestCount || 1) - 1
    })
    forEach(indicators, function(ic) {
      const internalData = getInternalData(ic)
      if (internalData.requestCount === 0) {
        ic.classList.remove.call(ic.classList, htmx.config.requestClass)
      }
    })
    forEach(disabled, function(disabledElement) {
      const internalData = getInternalData(disabledElement)
      if (internalData.requestCount === 0) {
        disabledElement.removeAttribute('disabled')
        disabledElement.removeAttribute('data-disabled-by-htmx')
      }
    })
  }