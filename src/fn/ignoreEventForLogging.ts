
  /**
   * @param {string} eventName
   * @returns {boolean}
   */
export function ignoreEventForLogging(eventName) {
    return eventName === 'htmx:afterProcessNode'
  }