
  /**
   * @param {string} [path]
   */
export function restoreHistory(path) {
    saveCurrentPageToHistory()
    path = path || location.pathname + location.search
    const cached = getCachedHistory(path)
    if (cached) {
      const fragment = makeFragment(cached.content)
      const historyElement = getHistoryElement()
      const settleInfo = makeSettleInfo(historyElement)
      handleTitle(cached.title)
      handlePreservedElements(fragment)
      swapInnerHTML(historyElement, fragment, settleInfo)
      restorePreservedElements()
      settleImmediately(settleInfo.tasks)
      getWindow().setTimeout(function() {
        window.scrollTo(0, cached.scroll)
      }, 0) // next 'tick', so browser has time to render layout
      currentPathForHistory = path
      triggerEvent(getDocument().body, 'htmx:historyRestore', { path, item: cached })
    } else {
      if (htmx.config.refreshOnHistoryMiss) {
        // @ts-ignore: optional parameter in reload() function throws error
        // noinspection JSUnresolvedReference
        window.location.reload(true)
      } else {
        loadHistoryFromServer(path)
      }
    }
  }