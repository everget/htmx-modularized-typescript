
  /**
   * @param {FormData|Object} values
   * @returns string
   */
export function urlEncode(values) {
    values = formDataFromObject(values)
    let returnStr = ''
    values.forEach(function(value, key) {
      returnStr = appendParam(returnStr, key, value)
    })
    return returnStr
  }