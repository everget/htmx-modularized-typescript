
  /**
   * @param {HtmxSwapStyle} swapStyle
   * @param {Element} target
   * @returns {boolean}
   */
export function isInlineSwap(swapStyle, target) {
    const extensions = getExtensions(target)
    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions[i]
      try {
        if (extension.isInlineSwap(swapStyle)) {
          return true
        }
      } catch (e) {
        logError(e)
      }
    }
    return swapStyle === 'outerHTML'
  }