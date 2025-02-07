
  /**
   * @param {Element[]} content
   * @param {HtmxSwapSpecification} swapSpec
   */
export function updateScrollState(content, swapSpec) {
    const first = content[0]
    const last = content[content.length - 1]
    if (swapSpec.scroll) {
      var target = null
      if (swapSpec.scrollTarget) {
        target = asElement(querySelectorExt(first, swapSpec.scrollTarget))
      }
      if (swapSpec.scroll === 'top' && (first || target)) {
        target = target || first
        target.scrollTop = 0
      }
      if (swapSpec.scroll === 'bottom' && (last || target)) {
        target = target || last
        target.scrollTop = target.scrollHeight
      }
    }
    if (swapSpec.show) {
      var target = null
      if (swapSpec.showTarget) {
        let targetStr = swapSpec.showTarget
        if (swapSpec.showTarget === 'window') {
          targetStr = 'body'
        }
        target = asElement(querySelectorExt(first, targetStr))
      }
      if (swapSpec.show === 'top' && (first || target)) {
        target = target || first
        // @ts-ignore For some reason tsc doesn't recognize "instant" as a valid option for now
        target.scrollIntoView({ block: 'start', behavior: htmx.config.scrollBehavior })
      }
      if (swapSpec.show === 'bottom' && (last || target)) {
        target = target || last
        // @ts-ignore For some reason tsc doesn't recognize "instant" as a valid option for now
        target.scrollIntoView({ block: 'end', behavior: htmx.config.scrollBehavior })
      }
    }
  }