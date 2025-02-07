
  /**
   * @param {HtmxResponseHandlingConfig} responseHandlingConfig
   * @param {number} status
   * @return {boolean}
   */
export function codeMatches(responseHandlingConfig, status) {
    var regExp = new RegExp(responseHandlingConfig.code)
    return regExp.test(status.toString(10))
  }