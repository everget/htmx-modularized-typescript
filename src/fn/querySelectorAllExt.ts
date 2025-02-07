
  /**
   * @param {Node|Element|Document|string} elt
   * @param {string} selector
   * @param {boolean=} global
   * @returns {(Node|Window)[]}
   */
export function querySelectorAllExt(elt, selector, global) {
    elt = resolveTarget(elt)
    if (selector.indexOf('closest ') === 0) {
      return [closest(asElement(elt), normalizeSelector(selector.substr(8)))]
    } else if (selector.indexOf('find ') === 0) {
      return [find(asParentNode(elt), normalizeSelector(selector.substr(5)))]
    } else if (selector === 'next') {
      return [asElement(elt).nextElementSibling]
    } else if (selector.indexOf('next ') === 0) {
      return [scanForwardQuery(elt, normalizeSelector(selector.substr(5)), !!global)]
    } else if (selector === 'previous') {
      return [asElement(elt).previousElementSibling]
    } else if (selector.indexOf('previous ') === 0) {
      return [scanBackwardsQuery(elt, normalizeSelector(selector.substr(9)), !!global)]
    } else if (selector === 'document') {
      return [document]
    } else if (selector === 'window') {
      return [window]
    } else if (selector === 'body') {
      return [document.body]
    } else if (selector === 'root') {
      return [getRootNode(elt, !!global)]
    } else if (selector === 'host') {
      return [(/** @type ShadowRoot */(elt.getRootNode())).host]
    } else if (selector.indexOf('global ') === 0) {
      return querySelectorAllExt(elt, selector.slice(7), true)
    } else {
      return toArray(asParentNode(getRootNode(elt, !!global)).querySelectorAll(normalizeSelector(selector)))
    }
  }