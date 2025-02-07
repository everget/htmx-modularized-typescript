
  /**
   * @param {Element} elt
   * @return {boolean}
   */
export function isAnchorLink(elt) {
    return !!getRawAttribute(elt, 'href') && getRawAttribute(elt, 'href').indexOf('#') >= 0
  }
