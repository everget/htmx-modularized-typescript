
  /**
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
export function swapInnerHTML(target, fragment, settleInfo) {
    const firstChild = target.firstChild
    insertNodesBefore(target, firstChild, fragment, settleInfo)
    if (firstChild) {
      while (firstChild.nextSibling) {
        cleanUpElement(firstChild.nextSibling)
        target.removeChild(firstChild.nextSibling)
      }
      cleanUpElement(firstChild)
      target.removeChild(firstChild)
    }
  }