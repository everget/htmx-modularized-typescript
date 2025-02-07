
  /**
   * @param {HTMLAnchorElement} elt
   * @returns {boolean}
   */
export function isLocalLink(elt) {
    return location.hostname === elt.hostname &&
      getRawAttribute(elt, 'href') &&
      getRawAttribute(elt, 'href').indexOf('#') !== 0
  }