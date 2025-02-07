
  /**
   * @param {Element} elt
   */
export function cancelPolling(elt) {
    getInternalData(elt).cancelled = true
  }