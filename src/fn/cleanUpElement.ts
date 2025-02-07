
  /**
   * @param {Node} element
   */
export function cleanUpElement(element) {
    triggerEvent(element, 'htmx:beforeCleanupElement')
    deInitNode(element)
    // @ts-ignore IE11 code
    // noinspection JSUnresolvedReference
    if (element.children) { // IE
      // @ts-ignore
      forEach(element.children, function(child) { cleanUpElement(child) })
    }
  }