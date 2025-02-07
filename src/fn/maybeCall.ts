/**
 * @param {Function} func
 */
export function maybeCall(func: Function): void {
  if (func) {
    func()
  }
}
