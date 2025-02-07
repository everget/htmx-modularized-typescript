
  /**
   * @param {string} resp
   * @returns {Document}
   */
export function parseHTML(resp) {
    const parser = new DOMParser()
    return parser.parseFromString(resp, 'text/html')
  }
