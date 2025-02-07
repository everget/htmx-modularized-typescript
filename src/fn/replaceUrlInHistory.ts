
  /**
   * @param {string} path
   */
export function replaceUrlInHistory(path) {
    if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, '', path)
    currentPathForHistory = path
  }