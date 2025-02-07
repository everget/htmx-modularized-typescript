
  /**
   * @returns {boolean}
   */
export function canAccessLocalStorage() {
    const test = 'htmx:localStorageTest'
    try {
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }