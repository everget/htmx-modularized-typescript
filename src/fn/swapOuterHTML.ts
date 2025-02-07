
  /**
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
export function swapOuterHTML(target, fragment, settleInfo) {
    if (target instanceof Element && target.tagName === 'BODY') { // special case the body to innerHTML because DocumentFragments can't contain a body elt unfortunately
      return swapInnerHTML(target, fragment, settleInfo)
    }
    /** @type {Node} */
    let newElt
    const eltBeforeNewContent = target.previousSibling
    const parentNode = parentElt(target)
    if (!parentNode) { // when parent node disappears, we can't do anything
      return
    }
    insertNodesBefore(parentNode, target, fragment, settleInfo)
    if (eltBeforeNewContent == null) {
      newElt = parentNode.firstChild
    } else {
      newElt = eltBeforeNewContent.nextSibling
    }
    settleInfo.elts = settleInfo.elts.filter(function(e) { return e !== target })
    // scan through all newly added content and add all elements to the settle info so we trigger
    // events properly on them
    while (newElt && newElt !== target) {
      if (newElt instanceof Element) {
        settleInfo.elts.push(newElt)
      }
      newElt = newElt.nextSibling
    }
    cleanUpElement(target)
    if (target instanceof Element) {
      target.remove()
    } else {
      target.parentNode.removeChild(target)
    }
  }