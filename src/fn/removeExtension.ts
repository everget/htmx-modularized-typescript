
  /**
   * removeExtension removes an extension from the htmx registry
   *
   * @see https://htmx.org/api/#removeExtension
   *
   * @param {string} name
   */
export function removeExtension(name) {
    delete extensions[name]
  }
