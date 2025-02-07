

  /**
   * @param {string} url
   * @param {Element} rootElt
   */
export function saveToHistoryCache(url, rootElt) {
    if (!canAccessLocalStorage()) {
      return
    }

    // get state to save
    const innerHTML = cleanInnerHtmlForHistory(rootElt)
    const title = getDocument().title
    const scroll = window.scrollY

    if (htmx.config.historyCacheSize <= 0) {
      // make sure that an eventually already existing cache is purged
      localStorage.removeItem('htmx-history-cache')
      return
    }

    url = normalizePath(url)

    const historyCache = parseJSON(localStorage.getItem('htmx-history-cache')) || []
    for (let i = 0; i < historyCache.length; i++) {
      if (historyCache[i].url === url) {
        historyCache.splice(i, 1)
        break
      }
    }

    /** @type HtmxHistoryItem */
    const newHistoryItem = { url, content: innerHTML, title, scroll }

    triggerEvent(getDocument().body, 'htmx:historyItemCreated', { item: newHistoryItem, cache: historyCache })

    historyCache.push(newHistoryItem)
    while (historyCache.length > htmx.config.historyCacheSize) {
      historyCache.shift()
    }

    // keep trying to save the cache until it succeeds or is empty
    while (historyCache.length > 0) {
      try {
        localStorage.setItem('htmx-history-cache', JSON.stringify(historyCache))
        break
      } catch (e) {
        triggerErrorEvent(getDocument().body, 'htmx:historyCacheError', { cause: e, cache: historyCache })
        historyCache.shift() // shrink the cache and retry
      }
    }
  }
