
  /**
   * @param {HtmxSwapStyle} swapStyle
   * @param {Element} elt
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
export function swapWithStyle(swapStyle, elt, target, fragment, settleInfo) {
    switch (swapStyle) {
      case 'none':
        return
      case 'outerHTML':
        swapOuterHTML(target, fragment, settleInfo)
        return
      case 'afterbegin':
        swapAfterBegin(target, fragment, settleInfo)
        return
      case 'beforebegin':
        swapBeforeBegin(target, fragment, settleInfo)
        return
      case 'beforeend':
        swapBeforeEnd(target, fragment, settleInfo)
        return
      case 'afterend':
        swapAfterEnd(target, fragment, settleInfo)
        return
      case 'delete':
        swapDelete(target)
        return
      default:
        var extensions = getExtensions(elt)
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i]
          try {
            const newElements = ext.handleSwap(swapStyle, target, fragment, settleInfo)
            if (newElements) {
              if (Array.isArray(newElements)) {
                // if handleSwap returns an array (like) of elements, we handle them
                for (let j = 0; j < newElements.length; j++) {
                  const child = newElements[j]
                  if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                    settleInfo.tasks.push(makeAjaxLoadTask(child))
                  }
                }
              }
              return
            }
          } catch (e) {
            logError(e)
          }
        }
        if (swapStyle === 'innerHTML') {
          swapInnerHTML(target, fragment, settleInfo)
        } else {
          swapWithStyle(htmx.config.defaultSwapStyle, elt, target, fragment, settleInfo)
        }
    }
  }