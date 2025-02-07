
  /**
   * @param {HTMLScriptElement} script
   * @returns {boolean}
   */
export function isJavaScriptScriptNode(script) {
    return script.matches('script') && (script.type === 'text/javascript' || script.type === 'module' || script.type === '')
  }